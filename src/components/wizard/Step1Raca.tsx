'use client';

import React, { useEffect, useState } from 'react';
import { useCharacterCreation } from '@/contexts/CharacterCreationContext';
import { fetchRaces, fetchRace } from '@/lib/api/dnd5eapi';
import { Race } from '@/types/api';
import { translateRace } from '@/lib/utils/translations';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function Step1Raca() {
  const { character, setRace } = useCharacterCreation();
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRaceIndex, setSelectedRaceIndex] = useState<string | null>(
    character.race?.index || null
  );

  // Subset inicial: Humano, Elfo, Anão, Halfling
  const initialRaces = ['human', 'elf', 'dwarf', 'halfling'];

  useEffect(() => {
    async function loadRaces() {
      try {
        setLoading(true);
        const raceList = await fetchRaces();
        const racePromises = raceList.results
          .filter((r) => initialRaces.includes(r.index))
          .map((r) => fetchRace(r.index));
        const raceData = await Promise.all(racePromises);
        setRaces(raceData);
      } catch (error) {
        console.error('Erro ao carregar raças:', error);
      } finally {
        setLoading(false);
      }
    }
    loadRaces();
  }, []);

  const handleSelectRace = (race: Race) => {
    setSelectedRaceIndex(race.index);
    setRace(race);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-lg text-gray-600">Carregando raças...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Escolha sua Raça</h2>
        <p className="text-gray-600">
          Cada raça oferece bônus únicos e características especiais
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {races.map((race) => {
          const isSelected = selectedRaceIndex === race.index;
          const abilityBonusesText = race.ability_bonuses
            .map((b) => `${b.ability_score.index.toUpperCase()} +${b.bonus}`)
            .join(', ');

          return (
            <Card
              key={race.index}
              onClick={() => handleSelectRace(race)}
              selected={isSelected}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {translateRace(race.name)}
              </h3>
              <p className="text-gray-700 mb-4">{race.size_description}</p>
              <div className="space-y-2">
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
                {race.traits.length > 0 && (
                  <div>
                    <span className="font-semibold text-gray-800">Traços: </span>
                    <span className="text-gray-700">
                      {race.traits.length} traço{race.traits.length > 1 ? 's' : ''} racial{race.traits.length > 1 ? 'is' : ''}
                    </span>
                  </div>
                )}
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
