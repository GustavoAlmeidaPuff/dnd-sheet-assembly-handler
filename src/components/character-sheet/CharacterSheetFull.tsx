'use client';

import React from 'react';
import { Character } from '@/types/character';

interface CharacterSheetFullProps {
  character: Character;
}

export default function CharacterSheetFull({ character }: CharacterSheetFullProps) {
  const attributes = [
    { key: 'strength', label: 'Força' },
    { key: 'dexterity', label: 'Destreza' },
    { key: 'constitution', label: 'Constituição' },
    { key: 'intelligence', label: 'Inteligência' },
    { key: 'wisdom', label: 'Sabedoria' },
    { key: 'charisma', label: 'Carisma' },
  ] as const;

  return (
    <div className="bg-amber-50 border-4 border-amber-800 rounded-lg p-8 shadow-xl font-serif max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-amber-900 mb-6 text-center border-b-4 border-amber-800 pb-4">
        Ficha Completa do Personagem
      </h1>

      {/* Informações Principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border-2 border-amber-700 rounded p-4 text-center">
          <div className="text-sm text-amber-800 font-semibold mb-2">PONTOS DE VIDA</div>
          <div className="text-4xl font-bold text-amber-900">{character.hitPoints}</div>
        </div>
        <div className="bg-white border-2 border-amber-700 rounded p-4 text-center">
          <div className="text-sm text-amber-800 font-semibold mb-2">CLASSE DE ARMADURA</div>
          <div className="text-4xl font-bold text-amber-900">{character.armorClass}</div>
        </div>
        <div className="bg-white border-2 border-amber-700 rounded p-4 text-center">
          <div className="text-sm text-amber-800 font-semibold mb-2">DADO DE VIDA</div>
          <div className="text-4xl font-bold text-amber-900">
            d{character.class?.hitDie || 8}
          </div>
        </div>
      </div>

      {/* Atributos e Modificadores */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-amber-900 mb-4 border-b-2 border-amber-700 pb-2">
          Atributos e Modificadores
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {attributes.map((attr) => {
            const value = character.attributes[attr.key];
            const modifier = character.modifiers[attr.key];
            const modifierDisplay = modifier >= 0 ? `+${modifier}` : `${modifier}`;
            
            return (
              <div
                key={attr.key}
                className="bg-white border-2 border-amber-600 rounded p-4 text-center"
              >
                <div className="text-sm font-semibold text-amber-800 mb-2">{attr.label}</div>
                <div className="text-3xl font-bold text-amber-900 mb-1">{value}</div>
                <div className="text-lg text-amber-700 font-semibold">{modifierDisplay}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Informações do Personagem */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {character.race && (
          <div className="bg-white border-2 border-amber-600 rounded p-4">
            <div className="text-xs text-amber-700 font-semibold mb-2">RAÇA</div>
            <div className="text-xl text-amber-900 font-bold">{character.race.name}</div>
          </div>
        )}
        
        {character.class && (
          <div className="bg-white border-2 border-amber-600 rounded p-4">
            <div className="text-xs text-amber-700 font-semibold mb-2">CLASSE</div>
            <div className="text-xl text-amber-900 font-bold">{character.class.name}</div>
          </div>
        )}
        
        {character.background && (
          <div className="bg-white border-2 border-amber-600 rounded p-4">
            <div className="text-xs text-amber-700 font-semibold mb-2">ANTECEDENTE</div>
            <div className="text-xl text-amber-900 font-bold">{character.background.name}</div>
          </div>
        )}
      </div>

      {/* Equipamento */}
      {character.equipment.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-amber-900 mb-4 border-b-2 border-amber-700 pb-2">
            Equipamento Inicial
          </h2>
          <div className="bg-white border-2 border-amber-600 rounded p-4">
            <ul className="list-disc list-inside space-y-2">
              {character.equipment.map((item, index) => (
                <li key={index} className="text-amber-900">
                  {item.quantity && item.quantity > 1 ? `${item.quantity}x ` : ''}
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Personalidade */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-amber-900 mb-4 border-b-2 border-amber-700 pb-2">
          Personalidade
        </h2>
        
        {character.personality.ideals && (
          <div className="bg-white border-2 border-amber-600 rounded p-4">
            <div className="text-sm font-semibold text-amber-800 mb-2">IDEIAS</div>
            <div className="text-amber-900">{character.personality.ideals}</div>
          </div>
        )}
        
        {character.personality.bonds && (
          <div className="bg-white border-2 border-amber-600 rounded p-4">
            <div className="text-sm font-semibold text-amber-800 mb-2">VÍNCULOS</div>
            <div className="text-amber-900">{character.personality.bonds}</div>
          </div>
        )}
        
        {character.personality.flaws && (
          <div className="bg-white border-2 border-amber-600 rounded p-4">
            <div className="text-sm font-semibold text-amber-800 mb-2">DEFEITOS</div>
            <div className="text-amber-900">{character.personality.flaws}</div>
          </div>
        )}
      </div>
    </div>
  );
}
