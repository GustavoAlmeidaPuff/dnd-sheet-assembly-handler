'use client';

import React, { useState } from 'react';
import { useCharacterCreation } from '@/contexts/CharacterCreationContext';
import ProgressBar from './ProgressBar';
import Step1Raca from './Step1Raca';
import Step2Classe from './Step2Classe';
import Step3Atributos from './Step3Atributos';
import Step4Equipamento from './Step4Equipamento';
import Step5Antecedente from './Step5Antecedente';
import Step6Personalidade from './Step6Personalidade';
import Step7Revisao from './Step7Revisao';
import CharacterSheetPreview from '@/components/character-sheet/CharacterSheetPreview';
import Button from '@/components/ui/Button';

const TOTAL_STEPS = 7;

const steps = [
  { component: Step1Raca, title: 'Raça' },
  { component: Step2Classe, title: 'Classe' },
  { component: Step3Atributos, title: 'Atributos' },
  { component: Step4Equipamento, title: 'Equipamento' },
  { component: Step5Antecedente, title: 'Antecedente' },
  { component: Step6Personalidade, title: 'Personalidade' },
  { component: Step7Revisao, title: 'Revisão' },
];

export default function WizardContainer() {
  const { currentStep, setCurrentStep, character } = useCharacterCreation();
  const [isPreviewCollapsed, setIsPreviewCollapsed] = useState(false);
  const CurrentStepComponent = steps[currentStep - 1].component;

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canGoNext = () => {
    // Validações básicas para cada passo
    switch (currentStep) {
      case 1:
        return true; // Sempre pode avançar, mas precisa selecionar raça
      case 2:
        return true; // Sempre pode avançar, mas precisa selecionar classe
      case 3:
        return true; // Sempre pode avançar, mas precisa gerar atributos
      case 4:
        return true; // Equipamento é carregado automaticamente
      case 5:
        return true; // Sempre pode avançar, mas precisa selecionar antecedente
      case 6:
        // Verificar se a personalidade foi salva
        return !!(
          character.personality?.ideals &&
          character.personality?.bonds &&
          character.personality?.flaws &&
          character.personality.ideals.trim().length > 0 &&
          character.personality.bonds.trim().length > 0 &&
          character.personality.flaws.trim().length > 0
        );
      case 7:
        return false; // Último passo
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Wizard Content */}
          <div className={`flex-1 ${isPreviewCollapsed ? 'w-full' : 'lg:w-2/3'}`}>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <CurrentStepComponent />

              {/* Navigation */}
              {currentStep < TOTAL_STEPS && (
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  <Button
                    onClick={handlePrevious}
                    variant="secondary"
                    disabled={currentStep === 1}
                  >
                    Anterior
                  </Button>
                  <Button
                    onClick={handleNext}
                    variant="primary"
                    disabled={!canGoNext()}
                  >
                    Próximo
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Preview - Desktop: fixo à direita, Mobile: colapsável */}
          <div className={`${isPreviewCollapsed ? 'hidden' : 'lg:w-1/3'} lg:block`}>
            <div className="lg:sticky lg:top-8">
              {/* Botão para colapsar no mobile */}
              <div className="lg:hidden mb-4">
                <Button
                  onClick={() => setIsPreviewCollapsed(true)}
                  variant="secondary"
                  className="w-full"
                >
                  Ocultar Preview
                </Button>
              </div>
              <CharacterSheetPreview />
            </div>
          </div>

          {/* Botão para mostrar preview colapsado (mobile) */}
          {isPreviewCollapsed && (
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 p-4 shadow-lg">
              <Button
                onClick={() => setIsPreviewCollapsed(false)}
                variant="primary"
                className="w-full"
              >
                Mostrar Preview da Ficha
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
