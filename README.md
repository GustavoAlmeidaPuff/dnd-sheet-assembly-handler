# Forja de Personagens D&D 5e

Aplicação full-stack para criação de personagens de D&D 5ª Edição com wizard completo e preview de ficha em tempo real.

## 🎯 Características

- **Wizard de 7 passos** guiado para criação de personagens
- **Preview em tempo real** da ficha do personagem sempre visível
- **Integração com DND5EAPI** para dados oficiais de raças, classes e backgrounds
- **Autenticação Firebase** com Google OAuth
- **Salvamento na nuvem** com Firestore
- **Design responsivo** com preview fixo (desktop) ou colapsável (mobile)
- **Cálculos automáticos** de modificadores, CA e PV

## 🛠️ Tecnologias

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **Firebase** (Auth + Firestore)
- **TypeScript**
- **DND5EAPI** (API pública para dados de D&D 5e)

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta Firebase (para autenticação e banco de dados)

## 🚀 Configuração

1. **Clone o repositório e instale as dependências:**

```bash
npm install
```

2. **Configure o Firebase:**

   - Acesse [Firebase Console](https://console.firebase.google.com/)
   - Crie um novo projeto
   - Ative Authentication → Google
   - Crie um banco de dados Firestore
   - Copie as credenciais do projeto

3. **Crie o arquivo `.env.local` na raiz do projeto:**

```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
```

4. **Execute o servidor de desenvolvimento:**

```bash
npm run dev
```

5. **Acesse a aplicação:**

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Páginas Next.js
│   ├── page.tsx            # Landing page
│   ├── criar-personagem/   # Wizard de criação
│   └── meus-personagens/    # Lista de personagens
├── components/
│   ├── wizard/             # Componentes do wizard
│   ├── character-sheet/     # Preview e ficha completa
│   ├── ui/                  # Componentes reutilizáveis
│   └── auth/                # Autenticação
├── contexts/                # Context API
├── lib/
│   ├── firebase/            # Configuração Firebase
│   ├── api/                 # Cliente DND5EAPI
│   └── utils/               # Utilitários e cálculos
└── types/                   # Tipos TypeScript
```

## 🎮 Como Usar

1. **Faça login** com sua conta Google
2. **Clique em "Criar Personagem"** na landing page
3. **Siga os 7 passos do wizard:**
   - Escolha sua Raça
   - Escolha sua Classe
   - Gere seus Atributos (dados ou Standard Array)
   - Selecione Equipamento Inicial
   - Escolha seu Antecedente
   - Defina Personalidade (Ideais, Vínculos, Defeitos)
   - Revise e Salve
4. **Visualize seus personagens** na página "Meus Personagens"

## 📝 Notas

- O projeto usa um **subset inicial** de raças e classes para começar pequeno
- Raças disponíveis: Humano, Elfo, Anão, Halfling
- Classes disponíveis: Guerreiro, Mago, Clérigo, Ladino
- Backgrounds disponíveis: Acólito, Criminoso, Herói do Povo, Sábio
- Os dados são buscados da API pública [DND5EAPI](https://www.dnd5eapi.co/)

## 🔮 Próximos Passos

- Expandir raças e classes disponíveis
- Adicionar sub-raças e sub-classes
- Implementar magias para classes mágicas
- Adicionar exportação PDF
- Sistema de talentos

## 📄 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.
