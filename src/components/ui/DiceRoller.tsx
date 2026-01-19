'use client';

import React, { useState } from 'react';
import Button from './Button';

interface DiceRollerProps {
  onRollComplete: (value: number) => void;
  label?: string;
  disabled?: boolean;
}

export default function DiceRoller({ onRollComplete, label = 'Rolar Dados', disabled = false }: DiceRollerProps) {
  const [rolls, setRolls] = useState<number[]>([]);
  const [finalValue, setFinalValue] = useState<number | null>(null);

  const roll4d6 = () => {
    if (disabled || finalValue !== null) return;
    
    // Rolar 4 dados de 6 lados
    const diceRolls: number[] = [];
    for (let i = 0; i < 4; i++) {
      diceRolls.push(Math.floor(Math.random() * 6) + 1);
    }
    
    // Ordenar e descartar o menor
    const sorted = [...diceRolls].sort((a, b) => b - a);
    const dropped = sorted.pop()!;
    const sum = sorted.reduce((a, b) => a + b, 0);
    
    setRolls(diceRolls);
    setFinalValue(sum);
    onRollComplete(sum);
  };

  return (
    <div className="space-y-4">
      <Button onClick={roll4d6} variant="secondary" disabled={disabled || finalValue !== null}>
        {label}
      </Button>
      
      {rolls.length > 0 && (
        <div className="space-y-2">
          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-600">Rolagens:</span>
            {rolls.map((roll, index) => {
              const isDropped = roll === Math.min(...rolls);
              return (
                <span
                  key={index}
                  className={`text-lg font-bold ${
                    isDropped ? 'line-through text-red-500' : 'text-blue-600'
                  }`}
                >
                  {roll}
                </span>
              );
            })}
          </div>
          
          {finalValue !== null && (
            <div className="text-lg font-semibold text-gray-800">
              Valor final: <span className="text-blue-600 text-xl">{finalValue}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
