'use client';

import React, { useState, useEffect } from 'react';
import { useCharacterCreation } from '@/contexts/CharacterCreationContext';
import { backgroundsData } from '@/data/backgrounds';
import Button from '@/components/ui/Button';

// Exemplos de ideais, vínculos e defeitos (do livro do jogador)
const exampleIdeals = [
  'Justiça. Os inocentes devem ser protegidos. (Bom)',
  'Poder. Se eu sou forte, posso tomar o que quero. (Mau)',
  'Responsabilidade. Devo proteger aqueles que dependem de mim. (Leal)',
  'Independência. Quando as pessoas seguem ordens cegamente, elas se tornam escravos. (Caótico)',
  'Conhecimento. O caminho para o poder e a autossuficiência é através do conhecimento. (Neutro)',
  'Beleza. O que é belo merece ser preservado. (Qualquer)',
];

const exampleBonds = [
  'Eu protegeria minha família ou companheiros com minha vida.',
  'Eu traí alguém que confiava em mim. Preciso fazer as pazes.',
  'Meu instrumento é meu bem mais precioso, e me lembra de alguém que amo.',
  'Eu devo tudo ao meu mestre, que me ensinou tudo que sei.',
  'Alguém roubou algo precioso de mim, e eu vou recuperá-lo.',
  'Eu quero me tornar famoso, não importa o que seja necessário.',
];

const exampleFlaws = [
  'Eu confio demais naqueles que têm poder sobre mim.',
  'Tenho dificuldade em confiar em meus aliados.',
  'Sou cobiçoso e não consigo resistir a tentação de roubar tesouros.',
  'Eu mentiria para evitar me meter em problemas.',
  'Eu sou muito orgulhoso e não admito quando estou errado.',
  'Eu tenho um vício que me coloca em situações perigosas.',
];

export default function Step6Personalidade() {
  const { character, setPersonality } = useCharacterCreation();
  const [ideals, setIdeals] = useState(character.personality?.ideals || '');
  const [bonds, setBonds] = useState(character.personality?.bonds || '');
  const [flaws, setFlaws] = useState(character.personality?.flaws || '');
  const [backgroundExamples, setBackgroundExamples] = useState<{
    ideals: string[];
    bonds: string[];
    flaws: string[];
  } | null>(null);

  useEffect(() => {
    if (!character.background) return;

    // Buscar exemplos do antecedente selecionado nos dados estáticos
    const bg = backgroundsData.find((b) => b.index === character.background?.index);
    if (bg) {
      // Usar exemplos genéricos, mas poderíamos adicionar exemplos específicos por antecedente
      setBackgroundExamples({
        ideals: exampleIdeals,
        bonds: exampleBonds,
        flaws: exampleFlaws,
      });
    }
  }, [character.background]);

  const handleSave = () => {
    setPersonality({
      ideals,
      bonds,
      flaws,
    });
  };

  const insertExample = (type: 'ideals' | 'bonds' | 'flaws', example: string) => {
    if (type === 'ideals') {
      setIdeals(example);
    } else if (type === 'bonds') {
      setBonds(example);
    } else {
      setFlaws(example);
    }
  };

  const examples = backgroundExamples || {
    ideals: exampleIdeals,
    bonds: exampleBonds,
    flaws: exampleFlaws,
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Defina sua Personalidade</h2>
        <p className="text-gray-600">
          Descreva os ideais, vínculos e defeitos do seu personagem
        </p>
      </div>

      <div className="space-y-6">
        {/* Ideais */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-2">
            Ideais
          </label>
          <textarea
            value={ideals}
            onChange={(e) => setIdeals(e.target.value)}
            placeholder="O que seu personagem valoriza? O que o motiva?"
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none min-h-[100px]"
          />
          <div className="mt-2">
            <div className="text-sm text-gray-600 mb-2">Exemplos (clique para usar):</div>
            <div className="flex flex-wrap gap-2">
              {examples.ideals.slice(0, 3).map((example, index) => (
                <button
                  key={index}
                  onClick={() => insertExample('ideals', example)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded border border-gray-300 text-left max-w-xs truncate"
                  title={example}
                >
                  {example.length > 50 ? `${example.substring(0, 50)}...` : example}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Vínculos */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-2">
            Vínculos
          </label>
          <textarea
            value={bonds}
            onChange={(e) => setBonds(e.target.value)}
            placeholder="O que seu personagem valoriza? O que o motiva?"
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none min-h-[100px]"
          />
          <div className="mt-2">
            <div className="text-sm text-gray-600 mb-2">Exemplos (clique para usar):</div>
            <div className="flex flex-wrap gap-2">
              {examples.bonds.slice(0, 3).map((example, index) => (
                <button
                  key={index}
                  onClick={() => insertExample('bonds', example)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded border border-gray-300 text-left max-w-xs truncate"
                  title={example}
                >
                  {example.length > 50 ? `${example.substring(0, 50)}...` : example}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Defeitos */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-2">
            Defeitos
          </label>
          <textarea
            value={flaws}
            onChange={(e) => setFlaws(e.target.value)}
            placeholder="Quais são as fraquezas do seu personagem?"
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none min-h-[100px]"
          />
          <div className="mt-2">
            <div className="text-sm text-gray-600 mb-2">Exemplos (clique para usar):</div>
            <div className="flex flex-wrap gap-2">
              {examples.flaws.slice(0, 3).map((example, index) => (
                <button
                  key={index}
                  onClick={() => insertExample('flaws', example)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded border border-gray-300 text-left max-w-xs truncate"
                  title={example}
                >
                  {example.length > 50 ? `${example.substring(0, 50)}...` : example}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <Button onClick={handleSave} variant="primary">
          Salvar Personalidade
        </Button>
      </div>

      {(ideals || bonds || flaws) && (
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mt-4">
          <p className="text-green-800 font-semibold text-center">
            ✓ Personalidade definida! Clique em "Salvar Personalidade" para confirmar.
          </p>
        </div>
      )}
    </div>
  );
}
