# 📱 MyProfile

Aplicação mobile desenvolvida em **React Native**, utilizando **Expo** e **TypeScript**, para cadastro, autenticação local, gerenciamento de perfil e personalização da interface por meio dos temas **Light** e **Dark**.

O projeto foi desenvolvido de forma colaborativa por uma equipe de 5 integrantes, utilizando **Git e GitHub** para controle de versão, organização das branches e integração das funcionalidades.

---

## 👥 Integrantes

| RM        | Integrante                  |
| --------- | --------------------------- |
| RM 561001 | Enzo Galhardo               |
| RM 560456 | Felipe Santos Marceli       |
| RM 559335 | Kauã Rodrigues de Souza     |
| RM 560727 | Kauan Diogo                 |
| RM 559842 | Leonardo Luiz Jardim Queijo |

---

## 📸 Prints da Aplicação

### 🔐 Login

<img width="908" height="821" alt="Tela de Login" src="https://github.com/user-attachments/assets/cea3262f-bdd6-4a06-80a5-10bab56f190b" />

### 📝 Cadastro

<img width="785" height="876" alt="Tela de Criar Conta" src="https://github.com/user-attachments/assets/4b781aeb-da51-4687-8530-22da800baa75" />

### 👤 MyProfile

<img width="1373" height="689" alt="Tela MyProfile" src="https://github.com/user-attachments/assets/d9f8407b-845b-448f-a666-648fac73f5cf" />

### 🌙 Modo Noturno

<img width="1277" height="680" alt="Modo Noturno" src="https://github.com/user-attachments/assets/7be201bc-93e9-4bc1-9cbe-8c7762cfcb1e" />

### 👤 Perfil

<img width="1008" height="797" alt="Tela de Perfil" src="https://github.com/user-attachments/assets/104f4de3-7ed2-45eb-91c8-def1acd45921" />

### ✏️ Editar Perfil

<img width="926" height="900" alt="Editar Perfil" src="https://github.com/user-attachments/assets/e68b9669-fa80-4ff4-a5db-cd0a0901174e" />

---

## 📖 Sobre o Projeto

O **MyProfile** é uma aplicação mobile desenvolvida para permitir que usuários gerenciem suas informações pessoais e personalizem sua experiência dentro do aplicativo.

A aplicação conta com funcionalidades de cadastro, login, gerenciamento de perfil, validação de campos e personalização da interface através dos temas Light e Dark.

O projeto foi desenvolvido de forma colaborativa utilizando **Git e GitHub**, com branches independentes para organização e integração das funcionalidades.

---

## 🚀 Tecnologias Utilizadas

* **React Native**
* **Expo**
* **TypeScript**
* **Expo Router**
* **AsyncStorage**
* **Git**
* **GitHub**

### 📦 Versões

* **Expo SDK:** 57
* **React Native**
* **TypeScript**

---

## ✨ Funcionalidades

* 📝 Cadastro de usuário
* 🔐 Login e autenticação local
* 👤 Gerenciamento de perfil
* ✏️ Edição de informações do perfil
* ✅ Validação de campos
* ☀️ Tema Light
* 🌙 Tema Dark
* 🔄 Alternância entre temas
* 💾 Persistência do tema utilizando AsyncStorage
* 🔄 Recuperação automática do tema ao abrir o aplicativo
* 🧩 Componentes visuais reutilizáveis
* 📱 Interface responsiva

---

## 🎨 Tema e Interface

A aplicação possui suporte aos modos:

* ☀️ **Light**
* 🌙 **Dark**

A preferência selecionada pelo usuário é armazenada utilizando **AsyncStorage** e recuperada automaticamente quando o aplicativo é iniciado.

Foram desenvolvidos componentes reutilizáveis para manter a padronização visual da aplicação:

* `CustomInput`
* `PrimaryButton`
* `ThemeSwitch`

Também foram padronizados:

* Cores
* Espaçamentos
* Tipografia
* Botões
* Campos de entrada
* Elementos da interface
* Responsividade

---

## 💾 Armazenamento Local

O projeto utiliza **AsyncStorage** para armazenamento local de informações, incluindo a preferência de tema do usuário.

A preferência de tema é persistida para que o aplicativo consiga recuperar automaticamente a configuração escolhida quando for aberto novamente.

---

## 📁 Estrutura do Projeto

```text
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
```

---

## 🌿 Organização das Branches

O desenvolvimento foi organizado utilizando branches independentes para cada funcionalidade.

```text
main
├── cadastro
├── tema
├── login
├── perfil
└── readme
```

Cada integrante desenvolveu sua funcionalidade em uma branch específica e, posteriormente, as alterações foram integradas ao projeto principal.

---

## 👤 Responsabilidades

### Kauã Rodrigues de Souza

* Desenvolvimento da funcionalidade de Login.

### Kauan Diogo

* Desenvolvimento da funcionalidade de Cadastro.

### Enzo Galhardo

* Desenvolvimento da funcionalidade de Perfil.

### Felipe Santos Marceli

* Desenvolvimento das demais funcionalidades da aplicação.

### Leonardo Luiz Jardim Queijo

* Desenvolvimento do Tema Light e Dark.
* Implementação do Switch de tema.
* Persistência do tema com AsyncStorage.
* Criação de componentes visuais reutilizáveis.
* Padronização da interface.
* Revisão de responsividade.
* Integração final.
* Documentação do projeto.

---

## ⚙️ Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/kauarodrigues1/MyProfile.git
```

### 2. Acesse a pasta do projeto

```bash
cd MyProfile
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Inicie o projeto

```bash
npx expo start
```

### 5. Executar no navegador

Com o Expo iniciado, pressione:

```text
W
```

no terminal para abrir a aplicação no navegador.

---

## 🧪 Validação

Para verificar se o projeto está compilando corretamente com TypeScript:

```bash
npx tsc --noEmit
```

Para iniciar a aplicação:

```bash
npx expo start
```

---

## 📱 Execução

Após iniciar o Expo, é possível executar a aplicação utilizando as opções disponibilizadas pelo Expo, incluindo a execução no navegador.

---

## 📚 Resumo

O **MyProfile** foi desenvolvido utilizando React Native, Expo e TypeScript, aplicando conceitos de:

* Desenvolvimento mobile
* Componentização
* Hooks
* TypeScript
* Persistência local
* Formulários
* Validação
* Gerenciamento de estado
* Temas Light/Dark
* Controle de versão com Git e GitHub

O projeto busca consolidar os conhecimentos de desenvolvimento mobile por meio da construção de uma aplicação completa de gerenciamento e personalização de perfil.
