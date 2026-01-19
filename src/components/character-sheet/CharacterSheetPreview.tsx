'use client';

import React from 'react';
import { useCharacterCreation } from '@/contexts/CharacterCreationContext';
import { translateAttribute } from '@/lib/utils/translations';

export default function CharacterSheetPreview() {
  const { character } = useCharacterCreation();

  const attributes = [
    { key: 'strength', label: 'Força' },
    { key: 'dexterity', label: 'Destreza' },
    { key: 'constitution', label: 'Constituição' },
    { key: 'intelligence', label: 'Inteligência' },
    { key: 'wisdom', label: 'Sabedoria' },
    { key: 'charisma', label: 'Carisma' },
  ] as const;

  return (
    <div className="bg-amber-50 border-2 border-amber-800 rounded-lg p-6 shadow-lg font-serif">
      <h2 className="text-2xl font-bold text-amber-900 mb-4 text-center border-b-2 border-amber-800 pb-2">
        Ficha do Personagem
      </h2>

      {/* PV e CA em destaque */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white border-2 border-amber-700 rounded p-3 text-center">
          <div className="text-sm text-amber-800 font-semibold">PV</div>
          <div className="text-3xl font-bold text-amber-900">
            {character.hitPoints || 0}
          </div>
        </div>
        <div className="bg-white border-2 border-amber-700 rounded p-3 text-center">
          <div className="text-sm text-amber-800 font-semibold">CA</div>
          <div className="text-3xl font-bold text-amber-900">
            {character.armorClass || 10}
          </div>
        </div>
      </div>

      {/* Atributos e Modificadores */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-amber-900 mb-3 border-b border-amber-700 pb-1">
          Atributos
        </h3>
        <div className="space-y-2">
          {attributes.map((attr) => {
            const value = character.attributes?.[attr.key] || 0;
            const modifier = character.modifiers?.[attr.key] || 0;
            const modifierDisplay = modifier >= 0 ? `+${modifier}` : `${modifier}`;
            
            return (
              <div
                key={attr.key}
                className="flex justify-between items-center bg-white border border-amber-600 rounded p-2"
              >
                <span className="text-sm font-semibold text-amber-900">{attr.label}</span>
                <div className="flex gap-3 items-center">
                  <span className="text-amber-800 font-bold">{value}</span>
                  <span className="text-amber-700 font-semibold w-10 text-right">
                    {modifierDisplay}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Raça, Classe, Antecedente */}
      <div className="space-y-3">
        {character.race && (
          <div className="bg-white border border-amber-600 rounded p-2">
            <div className="text-xs text-amber-700 font-semibold">RAÇA</div>
            <div className="text-sm text-amber-900 font-bold">{character.race.name}</div>
          </div>
        )}
        
        {character.class && (
          <div className="bg-white border border-amber-600 rounded p-2">
            <div className="text-xs text-amber-700 font-semibold">CLASSE</div>
            <div className="text-sm text-amber-900 font-bold">{character.class.name}</div>
          </div>
        )}
        
        {character.background && (
          <div className="bg-white border border-amber-600 rounded p-2">
            <div className="text-xs text-amber-700 font-semibold">ANTECEDENTE</div>
            <div className="text-sm text-amber-900 font-bold">{character.background.name}</div>
          </div>
        )}

        {/* Personalidade */}
        {character.personality && (
          <div className="bg-white border border-amber-600 rounded p-2">
            <div className="text-xs text-amber-700 font-semibold">PERSONALIDADE</div>
            {character.personality.ideals && character.personality.bonds && character.personality.flaws ? (
              <div className="text-xs text-green-700 font-semibold mt-1">
                ✓ Completa
              </div>
            ) : (
              <div className="text-xs text-yellow-700 font-semibold mt-1">
                ⚠ Incompleta
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
