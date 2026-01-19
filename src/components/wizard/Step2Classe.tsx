'use client';

import React, { useState } from 'react';
import { useCharacterCreation } from '@/contexts/CharacterCreationContext';
import { classesData, ClassData } from '@/data/classes';
import Card from '@/components/ui/Card';

export default function Step2Classe() {
  const { character, setClass } = useCharacterCreation();
  const [selectedClassIndex, setSelectedClassIndex] = useState<string | null>(
    character.class?.index || null
  );

  const handleSelectClass = (classData: ClassData) => {
    setSelectedClassIndex(classData.index);
    setClass({
      index: classData.index,
      name: classData.name,
      hitDie: classData.hitDie,
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Escolha sua Classe</h2>
        <p className="text-gray-600">
          Cada classe define seu papel no grupo e suas habilidades especiais
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[600px] overflow-y-auto pr-2">
        {classesData.map((classData) => {
          const isSelected = selectedClassIndex === classData.index;

          return (
            <Card
              key={classData.index}
              onClick={() => handleSelectClass(classData)}
              selected={isSelected}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {classData.name}
              </h3>
              <p className="text-gray-700 mb-3 text-sm">{classData.description}</p>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-semibold text-gray-800">Papel no Grupo: </span>
                  <span className="text-blue-600">{classData.role}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Arquétipo: </span>
                  <span className="text-gray-700 italic">{classData.archetype}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Dificuldade: </span>
                  <span className="text-gray-700">{classData.difficulty}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Dado de Vida: </span>
                  <span className="text-gray-700">d{classData.hitDie}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Proficiências: </span>
                  <span className="text-gray-700 text-xs">{classData.proficienciesSummary}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Características: </span>
                  <span className="text-gray-700 text-xs">{classData.featuresSummary}</span>
                </div>
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
