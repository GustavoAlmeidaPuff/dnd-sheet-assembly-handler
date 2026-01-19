'use client';

import React, { useState } from 'react';
import { useCharacterCreation } from '@/contexts/CharacterCreationContext';
import { racesData, RaceData } from '@/data/races';
import Card from '@/components/ui/Card';

export default function Step1Raca() {
  const { character, setRace } = useCharacterCreation();
  const [selectedRaceIndex, setSelectedRaceIndex] = useState<string | null>(
    character.race?.index || null
  );

  const handleSelectRace = (race: RaceData) => {
    setSelectedRaceIndex(race.index);
    // Passar diretamente os dados estáticos com abilityBonuses
    setRace({
      index: race.index,
      name: race.name,
      abilityBonuses: race.abilityBonuses,
    } as any);
  };

  const getAttributeName = (key: string): string => {
    const map: { [key: string]: string } = {
      str: 'Força',
      dex: 'Destreza',
      con: 'Constituição',
      int: 'Inteligência',
      wis: 'Sabedoria',
      cha: 'Carisma',
    };
    return map[key] || key;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Escolha sua Raça</h2>
        <p className="text-gray-600">
          Cada raça oferece bônus únicos e características especiais
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {racesData.map((race) => {
          const isSelected = selectedRaceIndex === race.index;
          const abilityBonusesText = Object.entries(race.abilityBonuses)
            .map(([key, bonus]) => `${getAttributeName(key)} +${bonus}`)
            .join(', ');

          return (
            <Card
              key={race.index}
              onClick={() => handleSelectRace(race)}
              selected={isSelected}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {race.name}
              </h3>
              <p className="text-gray-700 mb-3 text-sm">{race.description}</p>
              <div className="mb-3">
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  {race.vibe}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-semibold text-gray-800">Bônus de Atributos: </span>
                  <span className="text-blue-600">{abilityBonusesText}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Velocidade: </span>
                  <span className="text-gray-700">{race.speed} pés</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Tamanho: </span>
                  <span className="text-gray-700">{race.size}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Traços: </span>
                  <span className="text-gray-700">{race.traits.join(', ')}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-800">Idiomas: </span>
                  <span className="text-gray-700">{race.languages.join(', ')}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {selectedRaceIndex && (
        <div className="text-center mt-6">
          <p className="text-green-600 font-semibold">
            ✓ Raça selecionada! Os bônus serão aplicados automaticamente nos atributos.
          </p>
        </div>
      )}
    </div>
  );
}
