'use client';

import React, { useEffect, useState } from 'react';
import { useCharacterCreation } from '@/contexts/CharacterCreationContext';
import { fetchBackgrounds, fetchBackground } from '@/lib/api/dnd5eapi';
import { Background } from '@/types/api';
import { translateBackground } from '@/lib/utils/translations';
import Card from '@/components/ui/Card';

// Subset inicial: Acólito, Criminoso, Herói do Povo, Sábio
const initialBackgrounds = ['acolyte', 'criminal-spy', 'folk-hero', 'sage'];

export default function Step5Antecedente() {
  const { character, setBackground } = useCharacterCreation();
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBackgroundIndex, setSelectedBackgroundIndex] = useState<string | null>(
    character.background?.index || null
  );

  useEffect(() => {
    async function loadBackgrounds() {
      try {
        setLoading(true);
        const backgroundList = await fetchBackgrounds();
        const backgroundPromises = backgroundList.results
          .filter((b) => initialBackgrounds.includes(b.index))
          .map((b) => fetchBackground(b.index));
        const backgroundData = await Promise.all(backgroundPromises);
        setBackgrounds(backgroundData);
      } catch (error) {
        console.error('Erro ao carregar antecedentes:', error);
      } finally {
        setLoading(false);
      }
    }
    loadBackgrounds();
  }, []);

  const handleSelectBackground = (background: Background) => {
    setSelectedBackgroundIndex(background.index);
    setBackground({
      index: background.index,
      name: background.name,
    });
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-lg text-gray-600">Carregando antecedentes...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Escolha seu Antecedente</h2>
        <p className="text-gray-600">
          Seu antecedente define sua história antes de se tornar um aventureiro
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {backgrounds.map((background) => {
          const isSelected = selectedBackgroundIndex === background.index;
          const featureDesc = background.feature.desc.join(' ');

          return (
            <Card
              key={background.index}
              onClick={() => handleSelectBackground(background)}
              selected={isSelected}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {translateBackground(background.name)}
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="font-semibold text-gray-800 mb-1">Característica:</div>
                  <div className="text-sm text-gray-700">{background.feature.name}</div>
                  <div className="text-xs text-gray-600 mt-1 line-clamp-3">{featureDesc}</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-800 mb-1">Proficiências:</div>
                  <div className="text-sm text-gray-700">
                    {background.starting_proficiencies.map((p) => p.name).join(', ')}
                  </div>
                </div>
                {background.personality_traits && (
                  <div>
                    <div className="font-semibold text-gray-800 mb-1">Traços de Personalidade:</div>
                    <div className="text-xs text-gray-600">
                      Escolha {background.personality_traits.choose} traço{background.personality_traits.choose > 1 ? 's' : ''}
                    </div>
                  </div>
                )}
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
