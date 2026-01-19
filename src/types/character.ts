export interface EquipmentItem {
  index: string;
  name: string;
  quantity?: number;
  armorClass?: number;
  armorCategory?: string;
}

export interface Character {
  id?: string;
  userId: string;
  // Atributos
  attributes: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  // Modificadores (calculados)
  modifiers: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  // Raça
  race: {
    index: string;
    name: string;
    abilityBonuses: { [key: string]: number };
  } | null;
  // Classe
  class: {
    index: string;
    name: string;
    hitDie: number;
  } | null;
  // Antecedente
  background: {
    index: string;
    name: string;
  } | null;
  // Equipamento inicial
  equipment: EquipmentItem[];
  // Defesa
  armorClass: number;
  hitPoints: number;
  // Personalidade
  personality: {
    ideals: string;
    bonds: string;
    flaws: string;
  };
  createdAt: Date | string;
}
