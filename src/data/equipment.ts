// Dados estáticos de equipamento inicial por classe em PT-BR

import { EquipmentItem } from '@/types/character';

export const startingEquipmentByClass: { [key: string]: EquipmentItem[] } = {
  barbarian: [
    { index: 'greataxe', name: 'Machado Grande', quantity: 1 },
    { index: 'handaxe', name: 'Machadinha', quantity: 2 },
    { index: 'explorers-pack', name: 'Mochila de Explorador', quantity: 1 },
    { index: 'javelin', name: 'Dardo', quantity: 4 },
  ],
  bard: [
    { index: 'rapier', name: 'Rapieira', quantity: 1 },
    { index: 'leather-armor', name: 'Armadura de Couro', quantity: 1, armorClass: 11, armorCategory: 'light' },
    { index: 'dagger', name: 'Adaga', quantity: 1 },
    { index: 'entertainers-pack', name: 'Mochila de Artista', quantity: 1 },
    { index: 'lute', name: 'Alaúde', quantity: 1 },
  ],
  cleric: [
    { index: 'mace', name: 'Maça', quantity: 1 },
    { index: 'scale-mail', name: 'Cota de Malha', quantity: 1, armorClass: 14, armorCategory: 'medium' },
    { index: 'light-crossbow', name: 'Besta Leve', quantity: 1 },
    { index: 'priests-pack', name: 'Mochila de Clérigo', quantity: 1 },
    { index: 'shield', name: 'Escudo', quantity: 1 },
  ],
  druid: [
    { index: 'scimitar', name: 'Cimitarra', quantity: 1 },
    { index: 'leather-armor', name: 'Armadura de Couro', quantity: 1, armorClass: 11, armorCategory: 'light' },
    { index: 'explorers-pack', name: 'Mochila de Explorador', quantity: 1 },
    { index: 'druidic-focus', name: 'Foco Druídico', quantity: 1 },
  ],
  fighter: [
    { index: 'chain-mail', name: 'Cota de Malha', quantity: 1, armorClass: 16, armorCategory: 'heavy' },
    { index: 'longsword', name: 'Espada Longa', quantity: 1 },
    { index: 'shield', name: 'Escudo', quantity: 1 },
    { index: 'light-crossbow', name: 'Besta Leve', quantity: 1 },
    { index: 'handaxe', name: 'Machadinha', quantity: 1 },
  ],
  monk: [
    { index: 'shortsword', name: 'Espada Curta', quantity: 1 },
    { index: 'dart', name: 'Dardo', quantity: 10 },
    { index: 'explorers-pack', name: 'Mochila de Explorador', quantity: 1 },
  ],
  paladin: [
    { index: 'chain-mail', name: 'Cota de Malha', quantity: 1, armorClass: 16, armorCategory: 'heavy' },
    { index: 'longsword', name: 'Espada Longa', quantity: 1 },
    { index: 'shield', name: 'Escudo', quantity: 1 },
    { index: 'priests-pack', name: 'Mochila de Clérigo', quantity: 1 },
    { index: 'holy-symbol', name: 'Símbolo Sagrado', quantity: 1 },
  ],
  ranger: [
    { index: 'scale-mail', name: 'Cota de Malha', quantity: 1, armorClass: 14, armorCategory: 'medium' },
    { index: 'longbow', name: 'Arco Longo', quantity: 1 },
    { index: 'quiver', name: 'Aljava', quantity: 1 },
    { index: 'arrow', name: 'Flecha', quantity: 20 },
    { index: 'explorers-pack', name: 'Mochila de Explorador', quantity: 1 },
  ],
  rogue: [
    { index: 'rapier', name: 'Rapieira', quantity: 1 },
    { index: 'shortbow', name: 'Arco Curto', quantity: 1 },
    { index: 'quiver', name: 'Aljava', quantity: 1 },
    { index: 'arrow', name: 'Flecha', quantity: 20 },
    { index: 'leather-armor', name: 'Armadura de Couro', quantity: 1, armorClass: 11, armorCategory: 'light' },
    { index: 'thieves-tools', name: 'Ferramentas de Ladino', quantity: 1 },
    { index: 'burglars-pack', name: 'Mochila de Ladrão', quantity: 1 },
  ],
  sorcerer: [
    { index: 'light-crossbow', name: 'Besta Leve', quantity: 1 },
    { index: 'component-pouch', name: 'Bolsa de Componentes', quantity: 1 },
    { index: 'scholars-pack', name: 'Mochila de Estudioso', quantity: 1 },
    { index: 'dagger', name: 'Adaga', quantity: 2 },
  ],
  warlock: [
    { index: 'light-crossbow', name: 'Besta Leve', quantity: 1 },
    { index: 'component-pouch', name: 'Bolsa de Componentes', quantity: 1 },
    { index: 'scholars-pack', name: 'Mochila de Estudioso', quantity: 1 },
    { index: 'simple-weapon', name: 'Arma Simples', quantity: 1 },
  ],
  wizard: [
    { index: 'quarterstaff', name: 'Cajado', quantity: 1 },
    { index: 'component-pouch', name: 'Bolsa de Componentes', quantity: 1 },
    { index: 'scholars-pack', name: 'Mochila de Estudioso', quantity: 1 },
    { index: 'spellbook', name: 'Grimório', quantity: 1 },
  ],
};
