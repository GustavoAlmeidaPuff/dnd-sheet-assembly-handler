'use client';

import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const stepLabels = [
  'Raça',
  'Classe',
  'Atributos',
  'Equipamento',
  'Antecedente',
  'Personalidade',
  'Revisão',
];

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        {stepLabels.map((label, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;
          
          return (
            <div
              key={stepNum}
              className={`flex-1 text-center ${
                isActive ? 'font-bold text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-1 ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : isCompleted
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}>
                {isCompleted ? '✓' : stepNum}
              </div>
              <div className="text-xs hidden sm:block">{label}</div>
            </div>
          );
        })}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
