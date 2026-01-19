'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useCharacterCreation } from '@/contexts/CharacterCreationContext';
import { Character } from '@/types/character';
import DiceRoller from '@/components/ui/DiceRoller';
import Button from '@/components/ui/Button';

const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];
const ATTRIBUTE_LABELS = [
  { key: 'strength', label: 'Força' },
  { key: 'dexterity', label: 'Destreza' },
  { key: 'constitution', label: 'Constituição' },
  { key: 'intelligence', label: 'Inteligência' },
  { key: 'wisdom', label: 'Sabedoria' },
  { key: 'charisma', label: 'Carisma' },
] as const;

export default function Step3Atributos() {
  const { character, setAttributes } = useCharacterCreation();
  const [method, setMethod] = useState<'dice' | 'array' | null>(null);
  const [diceRolls, setDiceRolls] = useState<{ [key: string]: number }>({});
  const [arrayDistribution, setArrayDistribution] = useState<{ [key: string]: number }>({});
  const [usedArrayValues, setUsedArrayValues] = useState<number[]>([]);
  const [hasApplied, setHasApplied] = useState(false);

  const handleDiceRoll = (attributeKey: string, value: number) => {
    setDiceRolls((prev) => ({ ...prev, [attributeKey]: value }));
  };

  const handleArraySelect = (attributeKey: string, value: number) => {
    setArrayDistribution((prev) => {
      const newDist = { ...prev };
      // Remover valor anterior se houver
      const oldValue = newDist[attributeKey];
      if (oldValue) {
        setUsedArrayValues((prevUsed) => prevUsed.filter((v) => v !== oldValue));
      }
      newDist[attributeKey] = value;
      return newDist;
    });
    setUsedArrayValues((prev) => [...prev, value]);
  };

  const applyAttributes = useCallback(() => {
    if (hasApplied) return; // Evitar aplicar múltiplas vezes

    const attributes: Character['attributes'] = {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    };

    if (method === 'dice') {
      ATTRIBUTE_LABELS.forEach((attr) => {
        attributes[attr.key] = diceRolls[attr.key] || 0;
      });
    } else if (method === 'array') {
      ATTRIBUTE_LABELS.forEach((attr) => {
        attributes[attr.key] = arrayDistribution[attr.key] || 0;
      });
    }

    setAttributes(attributes);
    setHasApplied(true);
  }, [method, diceRolls, arrayDistribution, setAttributes, hasApplied]);

  // Resetar hasApplied quando o método mudar
  useEffect(() => {
    setHasApplied(false);
  }, [method]);

  // Aplicar automaticamente quando todos os atributos estiverem prontos
  useEffect(() => {
    if (!method || hasApplied) return;
    
    if (allAttributesSet()) {
      applyAttributes();
    }
  }, [diceRolls, arrayDistribution, method, hasApplied, applyAttributes]);

  const allAttributesSet = () => {
    if (method === 'dice') {
      return ATTRIBUTE_LABELS.every((attr) => diceRolls[attr.key] && diceRolls[attr.key] > 0);
    } else if (method === 'array') {
      return (
        ATTRIBUTE_LABELS.every((attr) => arrayDistribution[attr.key] && arrayDistribution[attr.key] > 0) &&
        usedArrayValues.length === STANDARD_ARRAY.length
      );
    }
    return false;
  };

  const getAvailableArrayValues = () => {
    return STANDARD_ARRAY.filter((v) => !usedArrayValues.includes(v));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Gere seus Atributos</h2>
        <p className="text-gray-600">
          Escolha como você quer gerar os valores dos seus atributos
        </p>
      </div>

      {!method && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div
            onClick={() => setMethod('dice')}
            className="bg-white border-2 border-gray-300 rounded-lg p-8 cursor-pointer hover:border-blue-500 hover:shadow-lg transition-all text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Rolar Dados</h3>
            <p className="text-gray-600 mb-4">
              Role 4d6 para cada atributo e descarte o menor valor
            </p>
            <div className="text-sm text-gray-500">
              Mais aleatório e emocionante
            </div>
          </div>

          <div
            onClick={() => setMethod('array')}
            className="bg-white border-2 border-gray-300 rounded-lg p-8 cursor-pointer hover:border-blue-500 hover:shadow-lg transition-all text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Standard Array</h3>
            <p className="text-gray-600 mb-4">
              Use os valores fixos: 15, 14, 13, 12, 10, 8
            </p>
            <div className="text-sm text-gray-500">
              Mais balanceado e previsível
            </div>
          </div>
        </div>
      )}

      {method === 'dice' && (
        <div className="space-y-6">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 font-semibold">
              Role 4d6 para cada atributo. O menor valor será descartado automaticamente.
              {character.race && ' Os bônus raciais serão aplicados automaticamente.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ATTRIBUTE_LABELS.map((attr) => (
              <div
                key={attr.key}
                className="bg-white border-2 border-gray-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{attr.label}</h3>
                  {diceRolls[attr.key] && (
                    <span className="text-2xl font-bold text-blue-600">
                      {diceRolls[attr.key]}
                    </span>
                  )}
                </div>
                <DiceRoller
                  onRollComplete={(value) => handleDiceRoll(attr.key, value)}
                  label={`Rolar para ${attr.label}`}
                  disabled={!!diceRolls[attr.key]}
                />
              </div>
            ))}
          </div>

          {allAttributesSet() && (
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mt-4">
              <p className="text-green-800 font-semibold text-center">
                ✓ Todos os atributos foram gerados! Eles foram aplicados automaticamente.
              </p>
            </div>
          )}
        </div>
      )}

      {method === 'array' && (
        <div className="space-y-6">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 font-semibold">
              Distribua os valores [15, 14, 13, 12, 10, 8] entre os atributos.
              {character.race && ' Os bônus raciais serão aplicados automaticamente.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ATTRIBUTE_LABELS.map((attr) => {
              const currentValue = arrayDistribution[attr.key];
              const available = getAvailableArrayValues();

              return (
                <div
                  key={attr.key}
                  className="bg-white border-2 border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-bold text-gray-900">{attr.label}</h3>
                    {currentValue && (
                      <span className="text-2xl font-bold text-blue-600">{currentValue}</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {STANDARD_ARRAY.map((value) => {
                      const isUsed = usedArrayValues.includes(value) && currentValue !== value;
                      const isSelected = currentValue === value;

                      return (
                        <button
                          key={value}
                          onClick={() => handleArraySelect(attr.key, value)}
                          disabled={isUsed}
                          className={`
                            px-4 py-2 rounded-lg font-semibold transition-all
                            ${isSelected
                              ? 'bg-blue-600 text-white'
                              : isUsed
                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }
                          `}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {allAttributesSet() && (
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mt-4">
              <p className="text-green-800 font-semibold text-center">
                ✓ Todos os atributos foram distribuídos! Eles foram aplicados automaticamente.
              </p>
            </div>
          )}
        </div>
      )}

      {character.attributes && Object.values(character.attributes).some((v) => v > 0) && (
        <div className="mt-8 bg-green-50 border-2 border-green-200 rounded-lg p-4">
          <p className="text-green-800 font-semibold text-center">
            ✓ Atributos aplicados! Verifique o preview da ficha para ver os valores finais com bônus raciais.
          </p>
        </div>
      )}
    </div>
  );
}
