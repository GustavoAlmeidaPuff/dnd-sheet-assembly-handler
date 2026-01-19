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
  const { character } = useCharacterCreation();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateCharacter = (): boolean => {
    if (!character.race || !character.class || !character.background) {
      return false;
    }
    if (!character.attributes || Object.values(character.attributes).some((v) => v === 0)) {
      return false;
    }
    if (!character.personality || !character.personality.ideals || !character.personality.bonds || !character.personality.flaws) {
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    const user = getCurrentUser();
    if (!user) {
      setError('Você precisa estar logado para salvar um personagem.');
      return;
    }

    if (!validateCharacter()) {
      setError('Por favor, complete todos os passos do wizard antes de salvar.');
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

  if (!validateCharacter()) {
    return (
      <div className="text-center py-12">
        <div className="text-lg text-red-600 mb-4">
          Por favor, complete todos os passos anteriores antes de revisar.
        </div>
        <Button onClick={() => router.push('/criar-personagem')} variant="secondary">
          Voltar ao Wizard
        </Button>
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
