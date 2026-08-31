# MyProfile

Aplicação mobile desenvolvida em React Native com Expo para gerenciamento e personalização de perfil de usuário.

## 📱 Sobre o projeto

O MyProfile é uma aplicação desenvolvida para permitir que usuários gerenciem suas informações pessoais e personalizem sua experiência dentro do aplicativo.

O projeto foi desenvolvido de forma colaborativa por uma equipe de 5 integrantes, utilizando Git e GitHub para controle de versão, organização das branches e integração das funcionalidades.

## 🚀 Tecnologias

- React Native
- Expo
- TypeScript
- Expo Router
- AsyncStorage
- Git
- GitHub

## 📦 Versão

- Expo SDK 57
- React Native
- TypeScript

## ⚙️ Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/kauarodrigues1/MyProfile.git

2. Acesse a pasta do projeto
cd MyProfile
3. Instale as dependências
npm install
4. Inicie o projeto
npx expo start
5. Executar no navegador

Com o Expo iniciado, pressione:

W

no terminal para abrir a aplicação no navegador.

✨ Funcionalidades
Cadastro de usuário
Gerenciamento de perfil
Personalização da interface
Tema Light
Tema Dark
Alternância entre temas
Persistência do tema utilizando AsyncStorage
Recuperação automática do tema ao abrir o aplicativo
Componentes visuais reutilizáveis
Validação de campos
Interface responsiva

🎨 Tema e Interface

A aplicação possui suporte aos modos Light e Dark.

A preferência selecionada pelo usuário é armazenada utilizando AsyncStorage e recuperada automaticamente quando o aplicativo é iniciado.

Foram desenvolvidos componentes reutilizáveis para manter a padronização visual da aplicação:

CustomInput
PrimaryButton
ThemeSwitch

Também foram padronizados:

Cores
Espaçamentos
Tipografia
Botões
Campos de entrada
Elementos da interface
Responsividade

💾 Armazenamento

O projeto utiliza AsyncStorage para armazenamento local de informações, incluindo a preferência de tema do usuário.

📁 Estrutura do projeto
MyProfile/
├── assets/
├── scripts/
├── src/
│   ├── app/
│   ├── components/
│   ├── constants/
│   ├── context/
│   ├── hooks/
│   ├── screens/
│   ├── services/
│   └── types/
├── .gitignore
├── app.json
├── package.json
├── README.md
└── tsconfig.json

🌿 Organização das Branches

O desenvolvimento foi organizado utilizando branches independentes para cada funcionalidade.

main
├── cadastro
├── tema
├── login
├── perfil
└── readme

Cada integrante desenvolve sua funcionalidade em uma branch específica e, posteriormente, as alterações são integradas ao projeto principal.

👥 Integrantes
Enzo Galhardo 	RM 561001
Felipe Santos Marceli	RM 560456
Kauã Rodrigues de Souza	RM 559335
Kauan Diogo	RM 560727
Leonardo Luiz Jardim Queijo	RM 559842

👤 Responsabilidades
Kauã Rodrigues de Souza
Desenvolvimento da funcionalidade de Login.

Kauan Diogo
Desenvolvimento da funcionalidade de Cadastro.

Enzo Galhardo
Desenvolvimento da funcionalidade de Perfil.

Felipe Santos Marceli
Desenvolvimento das demais funcionalidades da aplicação.

Leonardo Luiz Jardim Queijo
Desenvolvimento do Tema Light e Dark.
Implementação do Switch de tema.
Persistência do tema com AsyncStorage.
Criação de componentes visuais reutilizáveis.
Padronização da interface.
Revisão de responsividade.
Integração final.
Documentação do projeto.

🧪 Validação

Para verificar se o projeto está compilando corretamente:

npx tsc --noEmit

Para iniciar a aplicação:

npx expo start
