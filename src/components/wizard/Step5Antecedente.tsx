'use client';

import React, { useState } from 'react';
import { useCharacterCreation } from '@/contexts/CharacterCreationContext';
import { backgroundsData, BackgroundData } from '@/data/backgrounds';
import Card from '@/components/ui/Card';

export default function Step5Antecedente() {
  const { character, setBackground } = useCharacterCreation();
  const [selectedBackgroundIndex, setSelectedBackgroundIndex] = useState<string | null>(
    character.background?.index || null
  );

  const handleSelectBackground = (background: BackgroundData) => {
    setSelectedBackgroundIndex(background.index);
    setBackground({
      index: background.index,
      name: background.name,
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Escolha seu Antecedente</h2>
        <p className="text-gray-600">
          Seu antecedente define sua história antes de se tornar um aventureiro
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {backgroundsData.map((background) => {
          const isSelected = selectedBackgroundIndex === background.index;

          return (
            <Card
              key={background.index}
              onClick={() => handleSelectBackground(background)}
              selected={isSelected}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {background.name}
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="font-semibold text-gray-800 mb-1 text-sm">História:</div>
                  <div className="text-xs text-gray-700 line-clamp-3">{background.storyHook}</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-800 mb-1 text-sm">Personalidade:</div>
                  <div className="text-xs text-gray-700 line-clamp-2">{background.personalityExample}</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-800 mb-1 text-sm">Habilidades:</div>
                  <div className="text-xs text-gray-700">{background.skills.join(', ')}</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-800 mb-1 text-sm">Característica:</div>
                  <div className="text-xs text-gray-700 font-semibold">{background.feature}</div>
                  <div className="text-xs text-gray-600 mt-1">{background.featureDescription}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {selectedBackgroundIndex && (
        <div className="text-center mt-6">
          <p className="text-green-600 font-semibold">
            ✓ Antecedente selecionado! Use os exemplos de personalidade como inspiração no próximo passo.
          </p>
        </div>
      )}
    </div>
  );
}
