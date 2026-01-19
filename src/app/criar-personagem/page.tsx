'use client';

import React from 'react';
import { CharacterCreationProvider } from '@/contexts/CharacterCreationContext';
import WizardContainer from '@/components/wizard/WizardContainer';

export default function CriarPersonagemPage() {
  return (
    <CharacterCreationProvider>
      <WizardContainer />
    </CharacterCreationProvider>
  );
}
