import { Character, EquipmentItem } from '@/types/character';

/**
 * Calcula o modificador de atributo
 * Fórmula: Math.floor((atributo - 10) / 2)
 */
export function calculateModifier(attribute: number): number {
  return Math.floor((attribute - 10) / 2);
}

/**
 * Calcula a Classe de Armadura (CA)
 */
export function calculateAC(
  armor: EquipmentItem | null,
  dexterityMod: number
): number {
  if (!armor) {
    // Sem armadura: 10 + modificador de Destreza
    return 10 + dexterityMod;
  }

  // Se a armadura tem um valor de CA fixo
  if (armor.armorClass !== undefined) {
    // Se a armadura permite bônus de Destreza
    if (armor.armorCategory === 'light') {
      return armor.armorClass + dexterityMod;
    } else if (armor.armorCategory === 'medium') {
      // Armadura média: máximo +2 de Destreza
      return armor.armorClass + Math.min(dexterityMod, 2);
    } else {
      // Armadura pesada: sem bônus de Destreza
      return armor.armorClass;
    }
  }

  // Fallback: 10 + modificador de Destreza
  return 10 + dexterityMod;
}

/**
 * Calcula os Pontos de Vida iniciais
 * Fórmula: hitDie + modificador de Constituição
 */
export function calculateHP(
  classHitDie: number,
  constitutionMod: number
): number {
  return classHitDie + constitutionMod;
}

/**
 * Aplica bônus raciais aos atributos base
 */
export function applyRacialBonuses(
  baseAttributes: Character['attributes'],
  raceBonuses: { [key: string]: number }
): Character['attributes'] {
  const attributeMap: { [key: string]: keyof Character['attributes'] } = {
    str: 'strength',
    dex: 'dexterity',
    con: 'constitution',
    int: 'intelligence',
    wis: 'wisdom',
    cha: 'charisma',
  };

  const result = { ...baseAttributes };

  for (const [key, bonus] of Object.entries(raceBonuses)) {
    const attrKey = attributeMap[key.toLowerCase()];
    if (attrKey) {
      result[attrKey] += bonus;
    }
  }

  return result;
}

/**
 * Calcula todos os modificadores baseado nos atributos
 */
export function calculateAllModifiers(
  attributes: Character['attributes']
): Character['modifiers'] {
  return {
    strength: calculateModifier(attributes.strength),
    dexterity: calculateModifier(attributes.dexterity),
    constitution: calculateModifier(attributes.constitution),
    intelligence: calculateModifier(attributes.intelligence),
    wisdom: calculateModifier(attributes.wisdom),
    charisma: calculateModifier(attributes.charisma),
  };
}
