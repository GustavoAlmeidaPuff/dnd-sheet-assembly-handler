'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCharacterCreation } from '@/contexts/CharacterCreationContext';
import { saveCharacter } from '@/lib/firebase/firestore';
import { getCurrentUser } from '@/lib/firebase/auth';
import { Character } from '@/types/character';
import { calculateAC, calculateHP } from '@/lib/utils/calculations';
import CharacterSheetFull from '@/components/character-sheet/CharacterSheetFull';
import Button from '@/components/ui/Button';

export default function Step7Revisao() {
  const { character, setCurrentStep } = useCharacterCreation();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateCharacter = (): { isValid: boolean; missingSteps: Array<{ step: number; name: string; message: string }> } => {
    const missingSteps: Array<{ step: number; name: string; message: string }> = [];

    if (!character.race) {
      missingSteps.push({
        step: 1,
        name: 'Raça',
        message: 'Você precisa selecionar uma raça',
      });
    }

    if (!character.class) {
      missingSteps.push({
        step: 2,
        name: 'Classe',
        message: 'Você precisa selecionar uma classe',
      });
    }

    if (!character.attributes || Object.values(character.attributes).some((v) => v === 0)) {
      missingSteps.push({
        step: 3,
        name: 'Atributos',
        message: 'Você precisa gerar e aplicar todos os atributos',
      });
    }

    if (!character.equipment || character.equipment.length === 0) {
      missingSteps.push({
        step: 4,
        name: 'Equipamento',
        message: 'O equipamento inicial precisa ser carregado',
      });
    }

    if (!character.background) {
      missingSteps.push({
        step: 5,
        name: 'Antecedente',
        message: 'Você precisa selecionar um antecedente',
      });
    }

    if (!character.personality || !character.personality.ideals || !character.personality.bonds || !character.personality.flaws) {
      missingSteps.push({
        step: 6,
        name: 'Personalidade',
        message: 'Você precisa preencher Ideais, Vínculos e Defeitos',
      });
    }

    return {
      isValid: missingSteps.length === 0,
      missingSteps,
    };
  };

  const handleSave = async () => {
    const user = getCurrentUser();
    if (!user) {
      setError('Você precisa estar logado para salvar um personagem.');
      return;
    }

    const validation = validateCharacter();
    if (!validation.isValid) {
      setError(`Por favor, complete os seguintes passos: ${validation.missingSteps.map(s => s.name).join(', ')}`);
      return;
    }

    try {
      setSaving(true);
      setError(null);

      // Calcular CA e PV finais se ainda não foram calculados
      const armor = character.equipment?.find((e) => e.armorClass !== undefined) || null;
      const dexMod = character.modifiers?.dexterity || 0;
      const ac = character.armorClass || calculateAC(armor, dexMod);
      const hp = character.hitPoints || (character.class ? calculateHP(character.class.hitDie, character.modifiers?.constitution || 0) : 0);

      const characterToSave: Character = {
        userId: user.uid,
        attributes: character.attributes!,
        modifiers: character.modifiers!,
        race: character.race!,
        class: character.class!,
        background: character.background!,
        equipment: character.equipment || [],
        armorClass: ac,
        hitPoints: hp,
        personality: character.personality!,
        createdAt: new Date(),
      };

      await saveCharacter(characterToSave);
      router.push('/meus-personagens');
    } catch (err) {
      console.error('Erro ao salvar personagem:', err);
      setError('Erro ao salvar personagem. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const validation = validateCharacter();

  if (!validation.isValid) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Revisão Final</h2>
          <p className="text-gray-600">
            Complete os passos faltantes antes de revisar
          </p>
        </div>

        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-red-900 mb-4">
            Passos Incompletos
          </h3>
          <ul className="space-y-3">
            {validation.missingSteps.map((missing) => (
              <li key={missing.step} className="flex items-start gap-3">
                <span className="text-red-600 font-bold text-lg">•</span>
                <div className="flex-1">
                  <div className="font-semibold text-red-900">
                    Passo {missing.step}: {missing.name}
                  </div>
                  <div className="text-sm text-red-700">{missing.message}</div>
                  <button
                    onClick={() => setCurrentStep(missing.step)}
                    className="text-sm text-blue-600 hover:text-blue-800 underline mt-1 font-semibold"
                  >
                    → Ir para o Passo {missing.step}: {missing.name}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center">
          <Button onClick={() => router.push('/criar-personagem')} variant="secondary">
            Voltar ao Wizard
          </Button>
        </div>
      </div>
    );
  }

  const fullCharacter: Character = {
    id: '',
    userId: '',
    attributes: character.attributes!,
    modifiers: character.modifiers!,
    race: character.race!,
    class: character.class!,
    background: character.background!,
    equipment: character.equipment || [],
    armorClass: character.armorClass || 10,
    hitPoints: character.hitPoints || 0,
    personality: character.personality!,
    createdAt: new Date(),
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Revisão Final</h2>
        <p className="text-gray-600">
          Revise todos os detalhes do seu personagem antes de salvar
        </p>
      </div>

      <CharacterSheetFull character={fullCharacter} />

      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-semibold text-center">{error}</p>
        </div>
      )}

      <div className="flex justify-center gap-4">
        <Button onClick={handleSave} variant="primary" disabled={saving}>
          {saving ? 'Salvando...' : 'Salvar Personagem'}
        </Button>
      </div>
    </div>
  );
}
