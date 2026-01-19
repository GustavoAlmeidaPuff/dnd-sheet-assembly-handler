// Dados estáticos dos antecedentes em PT-BR

export interface BackgroundData {
  index: string;
  name: string;
  storyHook: string;
  personalityExample: string;
  skills: string[];
  feature: string;
  featureDescription: string;
}

export const backgroundsData: BackgroundData[] = [
  {
    index: 'acolyte',
    name: 'Acólito',
    storyHook: 'Você passou sua vida servindo em um templo, aprendendo rituais sagrados e servindo uma divindade. Você conhece os segredos da fé e tem acesso a templos e mosteiros.',
    personalityExample: 'Você sempre tenta ajudar os necessitados e acredita que há um propósito maior em tudo. Você pode ser devoto e compassivo, ou rígido e dogmático.',
    skills: ['Intuição', 'Persuasão'],
    feature: 'Refúgio do Fiel',
    featureDescription: 'Você e seus companheiros podem receber ajuda gratuita em templos, mosteiros e outros locais sagrados de sua fé.',
  },
  {
    index: 'charlatan',
    name: 'Charlatão',
    storyHook: 'Você sempre soube como manipular pessoas e tirar proveito de situações. Você tem uma identidade falsa e sabe como enganar e ludibriar.',
    personalityExample: 'Você é charmoso e persuasivo, mas também desonesto. Você pode ser um vigarista simpático ou um manipulador perigoso.',
    skills: ['Enganação', 'Furtividade'],
    feature: 'Identidade Falsa',
    featureDescription: 'Você criou uma segunda identidade que inclui documentos, conhecidos e disfarces. Você pode assumir essa identidade quando necessário.',
  },
  {
    index: 'criminal',
    name: 'Criminoso',
    storyHook: 'Você é um membro do submundo, acostumado a viver fora da lei. Você tem contatos no crime organizado e sabe como operar nas sombras.',
    personalityExample: 'Você é desconfiado e cauteloso, mas leal aos seus. Você pode ser um ladrão simpático ou um criminoso perigoso.',
    skills: ['Enganação', 'Furtividade'],
    feature: 'Contato Criminoso',
    featureDescription: 'Você tem um contato confiável que atua como seu elo com a rede criminosa. Você pode passar mensagens e obter informações.',
  },
  {
    index: 'entertainer',
    name: 'Artista',
    storyHook: 'Você é um artista itinerante, acostumado a se apresentar para plateias. Você pode ser um bardo, ator, dançarino ou qualquer tipo de artista.',
    personalityExample: 'Você é carismático e expressivo, sempre buscando impressionar. Você pode ser vaidoso ou generoso com seu talento.',
    skills: ['Acrobacia', 'Atuação'],
    feature: 'Popularidade',
    featureDescription: 'Você pode sempre encontrar um lugar para se apresentar e pode obter informações e favores de outros artistas e fãs.',
  },
  {
    index: 'folk-hero',
    name: 'Herói do Povo',
    storyHook: 'Você veio de origens humildes e se tornou um herói local ao defender seu povo. Você é conhecido e respeitado por pessoas comuns.',
    personalityExample: 'Você é humilde e compassivo, sempre disposto a ajudar os necessitados. Você pode ser simples ou determinado.',
    skills: ['Tratamento de Animais', 'Ferramentas de Artesão'],
    feature: 'Rusticidade',
    featureDescription: 'Você pode sempre encontrar um lugar para se esconder, descansar ou se recuperar entre pessoas comuns que o respeitam.',
  },
  {
    index: 'guild-artisan',
    name: 'Artesão de Guilda',
    storyHook: 'Você é membro de uma guilda de artesãos, aprendendo um ofício específico. Você tem conexões comerciais e sabe como negociar.',
    personalityExample: 'Você é trabalhador e orgulhoso de seu ofício. Você pode ser meticuloso ou criativo, mas sempre valoriza qualidade.',
    skills: ['Intuição', 'Persuasão'],
    feature: 'Membro da Guilda',
    featureDescription: 'Como membro respeitado de uma guilda, você pode obter ajuda de outros membros e acesso a recursos da guilda.',
  },
  {
    index: 'hermit',
    name: 'Eremita',
    storyHook: 'Você viveu isolado por anos, estudando, meditando ou buscando conhecimento. Você descobriu algo importante durante seu isolamento.',
    personalityExample: 'Você é sábio e contemplativo, mas pode ser desconectado da sociedade. Você pode ser pacífico ou determinado.',
    skills: ['Medicina', 'Religião'],
    feature: 'Descoberta',
    featureDescription: 'Durante seu isolamento, você descobriu algo importante - um segredo, uma verdade ou uma revelação que mudou sua perspectiva.',
  },
  {
    index: 'noble',
    name: 'Nobre',
    storyHook: 'Você nasceu em uma família nobre, acostumado ao luxo e privilégio. Você entende política, etiqueta e como usar sua influência.',
    personalityExample: 'Você é refinado e educado, mas pode ser arrogante ou condescendente. Você valoriza tradição e status.',
    skills: ['História', 'Persuasão'],
    feature: 'Posição de Privilégio',
    featureDescription: 'Graças à sua origem nobre, as pessoas tendem a tratá-lo com respeito e você pode obter audiências com pessoas importantes.',
  },
  {
    index: 'outlander',
    name: 'Forasteiro',
    storyHook: 'Você cresceu na natureza selvagem, longe da civilização. Você é um sobrevivente experiente e conhece os segredos da natureza.',
    personalityExample: 'Você é independente e autossuficiente, mas pode ser desconfiado de estranhos. Você valoriza liberdade e natureza.',
    skills: ['Atletismo', 'Sobrevivência'],
    feature: 'Origem Selvagem',
    featureDescription: 'Você tem experiência em sobreviver na natureza e pode sempre encontrar comida e água fresca para você e seus companheiros.',
  },
  {
    index: 'sage',
    name: 'Sábio',
    storyHook: 'Você passou anos estudando em bibliotecas e universidades, acumulando conhecimento. Você sabe onde encontrar informações e como pesquisar.',
    personalityExample: 'Você é curioso e intelectual, sempre buscando aprender. Você pode ser distraído ou focado, mas sempre valoriza conhecimento.',
    skills: ['Arcanismo', 'História'],
    feature: 'Pesquisador',
    featureDescription: 'Quando você não sabe algo, você sabe onde encontrar a informação. Você pode obter acesso a bibliotecas e arquivos.',
  },
  {
    index: 'sailor',
    name: 'Marinheiro',
    storyHook: 'Você passou anos no mar, navegando e enfrentando tempestades. Você conhece portos, rotas marítimas e como sobreviver no oceano.',
    personalityExample: 'Você é aventureiro e independente, acostumado à vida no mar. Você pode ser supersticioso ou pragmático, mas sempre leal à sua tripulação.',
    skills: ['Atletismo', 'Percepção'],
    feature: 'Passagem de Navio',
    featureDescription: 'Quando você precisa viajar, você pode obter passagem gratuita em navios. Você tem contatos em portos e sabe como navegar.',
  },
  {
    index: 'soldier',
    name: 'Soldado',
    storyHook: 'Você serviu em um exército ou milícia, aprendendo disciplina e táticas de combate. Você conhece a vida militar e tem contatos militares.',
    personalityExample: 'Você é disciplinado e leal, acostumado a seguir ordens. Você pode ser rígido ou adaptável, mas sempre valoriza honra e dever.',
    skills: ['Atletismo', 'Intimidação'],
    feature: 'Patente Militar',
    featureDescription: 'Você tem uma patente militar que ainda é reconhecida. Você pode obter ajuda de soldados e acesso a instalações militares.',
  },
  {
    index: 'urchin',
    name: 'Órfão',
    storyHook: 'Você cresceu nas ruas, aprendendo a sobreviver sozinho. Você conhece os segredos das cidades e sabe como se mover sem ser notado.',
    personalityExample: 'Você é desconfiado e independente, mas leal aos poucos que confia. Você pode ser amargo ou esperançoso, mas sempre resiliente.',
    skills: ['Furtividade', 'Prestidigitação'],
    feature: 'Origem Urbana',
    featureDescription: 'Você conhece os segredos das cidades e pode sempre encontrar um lugar para se esconder, descansar ou obter informações nas ruas.',
  },
];
