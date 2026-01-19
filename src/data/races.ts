// Dados estáticos das raças em PT-BR

export interface RaceData {
  index: string;
  name: string;
  description: string;
  vibe: string;
  playstyle: string;
  speed: number;
  size: string;
  sizeDescription: string;
  abilityBonuses: { [key: string]: number };
  traits: string[];
  languages: string[];
}

export const racesData: RaceData[] = [
  {
    index: 'dwarf',
    name: 'Anão',
    description: 'Os anões são uma raça resistente e determinada, conhecidos por sua habilidade em mineração, metalurgia e construção. Eles valorizam tradição, clãs e trabalho árduo.',
    vibe: 'Resistente, Tradicional, Trabalhador',
    playstyle: 'Tanque ou Suporte. Excelente para jogadores que gostam de personagens resistentes e com história rica.',
    speed: 25,
    size: 'Médio',
    sizeDescription: 'Anões têm entre 1,20m e 1,50m de altura e pesam cerca de 70kg. Seu tamanho é Médio.',
    abilityBonuses: { con: 2 },
    traits: ['Visão no Escuro', 'Resistência Anã', 'Proficiência com Ferramentas'],
    languages: ['Comum', 'Anão'],
  },
  {
    index: 'elf',
    name: 'Elfo',
    description: 'Os elfos são uma raça graciosa e longeva, conectada com a magia e a natureza. Eles são conhecidos por sua agilidade, sentidos aguçados e resistência a encantamentos.',
    vibe: 'Gracioso, Mágico, Conectado à Natureza',
    playstyle: 'Dano à Distância, Mago ou Patrulheiro. Ideal para jogadores que preferem agilidade e magia.',
    speed: 30,
    size: 'Médio',
    sizeDescription: 'Elfos têm entre 1,50m e 1,80m de altura e são esguios. Seu tamanho é Médio.',
    abilityBonuses: { dex: 2 },
    traits: ['Visão no Escuro', 'Sentidos Aguçados', 'Transe', 'Resistência a Encantamentos'],
    languages: ['Comum', 'Élfico'],
  },
  {
    index: 'halfling',
    name: 'Halfling',
    description: 'Os halflings são uma raça pequena e otimista, conhecidos por sua sorte e habilidade de passar despercebidos. Eles valorizam conforto, comida e comunidade.',
    vibe: 'Alegre, Sortudo, Ágil',
    playstyle: 'Ladino ou Suporte. Perfeito para jogadores que gostam de personagens ágeis e com sorte.',
    speed: 25,
    size: 'Pequeno',
    sizeDescription: 'Halflings têm cerca de 90cm de altura e pesam cerca de 20kg. Seu tamanho é Pequeno.',
    abilityBonuses: { dex: 2 },
    traits: ['Sorte', 'Corajoso', 'Ágil'],
    languages: ['Comum', 'Halfling'],
  },
  {
    index: 'human',
    name: 'Humano',
    description: 'Os humanos são a raça mais versátil e adaptável. Eles se espalham por todo o mundo e se adaptam a qualquer ambiente ou situação.',
    vibe: 'Versátil, Adaptável, Ambicioso',
    playstyle: 'Qualquer classe. A escolha perfeita para jogadores que querem máxima flexibilidade.',
    speed: 30,
    size: 'Médio',
    sizeDescription: 'Humanos variam muito em altura e peso. Seu tamanho é Médio.',
    abilityBonuses: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
    traits: ['Versatilidade'],
    languages: ['Comum', 'Um idioma adicional à sua escolha'],
  },
  {
    index: 'dragonborn',
    name: 'Draconato',
    description: 'Os draconatos são descendentes de dragões, conhecidos por sua força, orgulho e conexão com elementos. Eles têm escamas coloridas e podem exalar energia elemental.',
    vibe: 'Orgulhoso, Poderoso, Elemental',
    playstyle: 'Guerreiro, Paladino ou Bárbaro. Ideal para jogadores que querem poder bruto e presença.',
    speed: 30,
    size: 'Médio',
    sizeDescription: 'Draconatos têm entre 1,80m e 2,10m de altura e pesam cerca de 100kg. Seu tamanho é Médio.',
    abilityBonuses: { str: 2, cha: 1 },
    traits: ['Ancestralidade Dracônica', 'Sopro Dracônico', 'Resistência Dracônica'],
    languages: ['Comum', 'Dracônico'],
  },
  {
    index: 'gnome',
    name: 'Gnomo',
    description: 'Os gnomos são uma raça pequena e curiosa, conhecidos por sua inteligência, engenhosidade e conexão com a magia. Eles são inventores, ilusionistas e estudiosos.',
    vibe: 'Curioso, Inteligente, Mágico',
    playstyle: 'Mago, Artífice ou Suporte. Perfeito para jogadores que gostam de magia e engenhosidade.',
    speed: 25,
    size: 'Pequeno',
    sizeDescription: 'Gnomos têm entre 90cm e 1,20m de altura e pesam entre 18kg e 20kg. Seu tamanho é Pequeno.',
    abilityBonuses: { int: 2 },
    traits: ['Visão no Escuro', 'Astúcia de Gnomo', 'Engenhosidade'],
    languages: ['Comum', 'Gnômico'],
  },
  {
    index: 'half-elf',
    name: 'Meio-Elfo',
    description: 'Os meio-elfos são o resultado da união entre humanos e elfos. Eles combinam a versatilidade dos humanos com a graça e magia dos elfos.',
    vibe: 'Versátil, Carismático, Adaptável',
    playstyle: 'Bardo, Feiticeiro ou qualquer classe carismática. Ideal para jogadores que querem versatilidade e carisma.',
    speed: 30,
    size: 'Médio',
    sizeDescription: 'Meio-elfos têm entre 1,50m e 1,80m de altura. Seu tamanho é Médio.',
    abilityBonuses: { cha: 2 },
    traits: ['Visão no Escuro', 'Sentidos Aguçados', 'Versatilidade', 'Resistência a Encantamentos'],
    languages: ['Comum', 'Élfico', 'Um idioma adicional à sua escolha'],
  },
  {
    index: 'half-orc',
    name: 'Meio-Orc',
    description: 'Os meio-orcs são descendentes de humanos e orcs, conhecidos por sua força bruta, resistência e fúria. Eles são guerreiros naturais e sobreviventes.',
    vibe: 'Feroz, Resistente, Poderoso',
    playstyle: 'Bárbaro, Guerreiro ou Paladino. Perfeito para jogadores que querem poder bruto e resistência.',
    speed: 30,
    size: 'Médio',
    sizeDescription: 'Meio-orcs têm entre 1,70m e 2,10m de altura e são musculosos. Seu tamanho é Médio.',
    abilityBonuses: { str: 2, con: 1 },
    traits: ['Visão no Escuro', 'Ameaçador', 'Resiliência Implacável', 'Ataque Selvagem'],
    languages: ['Comum', 'Orc'],
  },
  {
    index: 'tiefling',
    name: 'Tiefling',
    description: 'Os tieflings são descendentes de humanos e demônios ou diabos. Eles têm características infernais como chifres, cauda e olhos incomuns, além de uma conexão natural com magia infernal.',
    vibe: 'Misterioso, Carismático, Mágico',
    playstyle: 'Bruxo, Feiticeiro ou Bardo. Ideal para jogadores que gostam de magia e personagens com história complexa.',
    speed: 30,
    size: 'Médio',
    sizeDescription: 'Tieflings têm altura e peso similares aos humanos, mas com características infernais. Seu tamanho é Médio.',
    abilityBonuses: { int: 1, cha: 2 },
    traits: ['Visão no Escuro', 'Resistência Infernal', 'Legado Infernal'],
    languages: ['Comum', 'Infernal'],
  },
];
