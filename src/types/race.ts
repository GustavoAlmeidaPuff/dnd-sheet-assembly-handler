import { Race } from './api';

export interface RaceDisplay extends Race {
  description?: string;
  vibe?: string;
  playstyle?: string;
  traitsSummary?: string;
}
