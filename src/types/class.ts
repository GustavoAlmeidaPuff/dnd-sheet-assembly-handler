import { Class } from './api';

export interface ClassDisplay extends Class {
  role?: string;
  archetype?: string;
  difficulty?: string;
  proficienciesSummary?: string;
  featuresSummary?: string;
}
