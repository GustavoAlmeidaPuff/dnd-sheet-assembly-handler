'use client';

import React, { useEffect, useState } from 'react';
import { useCharacterCreation } from '@/contexts/CharacterCreationContext';
import { fetchClasses, fetchClass } from '@/lib/api/dnd5eapi';
import { Class } from '@/types/api';
import { translateClass } from '@/lib/utils/translations';
import Card from '@/components/ui/Card';

// Subset inicial: Guerreiro, Mago, Clérigo, Ladino
const initialClasses = ['fighter', 'wizard', 'cleric', 'rogue'];

// Mapeamento de papéis e dificuldades
const classInfo: { [key: string]: { role: string; difficulty: string; archetype: string } } = {
  fighter: {
    role: 'Tanque / Dano',
    difficulty: 'Fácil',
    archetype: 'Guerreiro de elite',
  },
  wizard: {
    role: 'Suporte / Controle',
    difficulty: 'Avançado',
    archetype: 'Mestre das artes arcanas',
  },
  cleric: {
    role: 'Suporte / Cura',
    difficulty: 'Médio',
    archetype: 'Servo divino',
  },
  rogue: {
    role: 'Dano / Utilidade',
    difficulty: 'Médio',
    archetype: 'Mestre das sombras',
  },
};

export default function Step2Classe() {
  const { character, setClass } = useCharacterCreation();
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClassIndex, setSelectedClassIndex] = useState<string | null>(
    character.class?.index || null
  );

  useEffect(() => {
    async function loadClasses() {
      try {
        setLoading(true);
        const classList = await fetchClasses();
        const classPromises = classList.results
          .filter((c) => initialClasses.includes(c.index))
          .map((c) => fetchClass(c.index));
        const classData = await Promise.all(classPromises);
        setClasses(classData);
      } catch (error) {
        console.error('Erro ao carregar classes:', error);
      } finally {
        setLoading(false);
      }
    }
    loadClasses();
  }, []);

  const handleSelectClass = (classData: Class) => {
    setSelectedClassIndex(classData.index);
    setClass({
      index: classData.index,
      name: classData.name,
      hitDie: classData.hit_die,
    });
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-lg text-gray-600">Carregando classes...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Escolha sua Classe</h2>
        <p className="text-gray-600">
          Cada classe define seu papel no grupo e suas habilidades especiais
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[600px] overflow-y-auto pr-2">
        {classes.map((classData) => {
          const isSelected = selectedClassIndex === classData.index;
          const info = classInfo[classData.index] || {
            role: 'Variado',
            difficulty: 'Médio',
            archetype: 'Aventureiro',
          };

          return (
            <Card
              key={classData.index}
              onClick={() => handleSelectClass(classData)}
              selected={isSelected}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {translateClass(classData.name)}
              </h3>
              <div className="space-y-3">
                <div>
                  <span className="font-semibold text-gray-800">Papel no Grupo: </span>
                  <span className="text-blue-600">{info.role}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Arquétipo: </span>
                  <span className="text-gray-700 italic">{info.archetype}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Dificuldade: </span>
                  <span className="text-gray-700">{info.difficulty}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Dado de Vida: </span>
                  <span className="text-gray-700">d{classData.hit_die}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Proficiências: </span>
                  <span className="text-gray-700">
                    {classData.proficiencies.length} proficiência{classData.proficiencies.length > 1 ? 's' : ''}
                  </span>
                </div>
                {classData.proficiency_choices.length > 0 && (
                  <div>
                    <span className="font-semibold text-gray-800">Escolhas: </span>
                    <span className="text-gray-700">
                      {classData.proficiency_choices
                        .map((choice) => `Escolher ${choice.choose}`)
                        .join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {selectedClassIndex && (
        <div className="text-center mt-6">
          <p className="text-green-600 font-semibold">
            ✓ Classe selecionada! O equipamento inicial será carregado no próximo passo.
          </p>
        </div>
      )}
    </div>
  );
}
