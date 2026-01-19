// Traduções PT-BR para termos da API DND5EAPI

export const attributeTranslations: { [key: string]: string } = {
  str: 'Força',
  dex: 'Destreza',
  con: 'Constituição',
  int: 'Inteligência',
  wis: 'Sabedoria',
  cha: 'Carisma',
  strength: 'Força',
  dexterity: 'Destreza',
  constitution: 'Constituição',
  intelligence: 'Inteligência',
  wisdom: 'Sabedoria',
  charisma: 'Carisma',
};

export const raceTranslations: { [key: string]: string } = {
  human: 'Humano',
  elf: 'Elfo',
  dwarf: 'Anão',
  halfling: 'Halfling',
  dragonborn: 'Draconato',
  gnome: 'Gnomo',
  'half-elf': 'Meio-Elfo',
  'half-orc': 'Meio-Orc',
  tiefling: 'Tiefling',
};

export const classTranslations: { [key: string]: string } = {
  barbarian: 'Bárbaro',
  bard: 'Bardo',
  cleric: 'Clérigo',
  druid: 'Druida',
  fighter: 'Guerreiro',
  monk: 'Monge',
  paladin: 'Paladino',
  ranger: 'Patrulheiro',
  rogue: 'Ladino',
  sorcerer: 'Feiticeiro',
  warlock: 'Bruxo',
  wizard: 'Mago',
};

export const backgroundTranslations: { [key: string]: string } = {
  acolyte: 'Acólito',
  'criminal-spy': 'Criminoso',
  'folk-hero': 'Herói do Povo',
  'noble-knight': 'Nobre',
  sage: 'Sábio',
  soldier: 'Soldado',
  charlatan: 'Charlatão',
  entertainer: 'Artista',
  'guild-artisan': 'Artesão de Guilda',
  hermit: 'Eremita',
  outlander: 'Forasteiro',
  sailor: 'Marinheiro',
  urchin: 'Órfão',
};

export function translateAttribute(key: string): string {
  return attributeTranslations[key.toLowerCase()] || key;
}

export function translateRace(key: string): string {
  return raceTranslations[key.toLowerCase()] || key;
}

export function translateClass(key: string): string {
  return classTranslations[key.toLowerCase()] || key;
}

export function translateBackground(key: string): string {
  return backgroundTranslations[key.toLowerCase()] || key;
}
