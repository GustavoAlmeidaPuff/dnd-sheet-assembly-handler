import {
  APIListResponse,
  Race,
  Class,
  Background,
  Equipment,
} from '@/types/api';

const API_BASE_URL = 'https://www.dnd5eapi.co/api';

// Função auxiliar para fazer requisições
async function fetchAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  return response.json();
}

// Raças
export async function fetchRaces(): Promise<APIListResponse> {
  return fetchAPI<APIListResponse>('/races');
}

export async function fetchRace(index: string): Promise<Race> {
  return fetchAPI<Race>(`/races/${index}`);
}

// Classes
export async function fetchClasses(): Promise<APIListResponse> {
  return fetchAPI<APIListResponse>('/classes');
}

export async function fetchClass(index: string): Promise<Class> {
  return fetchAPI<Class>(`/classes/${index}`);
}

// Backgrounds
export async function fetchBackgrounds(): Promise<APIListResponse> {
  return fetchAPI<APIListResponse>('/backgrounds');
}

export async function fetchBackground(index: string): Promise<Background> {
  return fetchAPI<Background>(`/backgrounds/${index}`);
}

// Equipamento
export async function fetchEquipment(index: string): Promise<Equipment> {
  return fetchAPI<Equipment>(`/equipment/${index}`);
}

// Buscar equipamento inicial de uma classe
export async function fetchStartingEquipment(
  classIndex: string
): Promise<Class['starting_equipment']> {
  const classData = await fetchClass(classIndex);
  return classData.starting_equipment;
}
