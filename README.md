# 🛍️ Fashion Store App

<div align="center">
  <img src="assets/app-icon.png" alt="Fashion Store Logo" width="100"/>
</div>

## 📱 Sobre o Projeto

Fashion Store é um aplicativo móvel moderno desenvolvido com React Native e Expo, oferecendo uma experiência de compra elegante e intuitiva para uma loja de roupas e acessórios.

## ✨ Características

- 🎨 Interface moderna e elegante
- 🛒 Carrinho de compras intuitivo
- 📱 Design responsivo
- 🔐 Autenticação segura
- 📦 Gerenciamento de produtos
- 🎯 Dashboard administrativo
- 💳 Processo de checkout simplificado

## 🚀 Tecnologias Utilizadas

- ⚛️ React Native
- 📱 Expo
- 🎨 Styled Components
- 🔐 Supabase (Banco de dados e Autenticação)
- 📦 React Navigation
- 💅 Linear Gradient
- 🎯 TypeScript

## 📋 Pré-requisitos

- Node.js
- npm ou yarn
- Expo CLI
- Um dispositivo móvel ou emulador
- Conta no Supabase

## 🛠️ Instalação e Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/correaito/fashionapp.git
   cd fashionapp
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

3. Configuração do Supabase:

   a. Crie uma conta no [Supabase](https://supabase.com) se ainda não tiver

   b. Crie um novo projeto no Supabase:

   - Vá para o [Dashboard do Supabase](https://app.supabase.com)
   - Clique em "New Project"
   - Preencha as informações do projeto
   - Aguarde a criação do projeto

   c. Obtenha as credenciais do projeto:

   - No menu lateral, vá em "Project Settings"
   - Clique em "API"
   - Você encontrará:
     - Project URL (anote-a)
     - anon public key (anote-a)

   d. Configure as variáveis de ambiente:

   - Na raiz do projeto, crie um arquivo chamado `.env`
   - Adicione as seguintes variáveis:

   ```env
   SUPABASE_URL=sua_project_url
   SUPABASE_ANON_KEY=sua_anon_public_key
   ```

   - Substitua:
     - `sua_project_url` pela URL do projeto que você anotou
     - `sua_anon_public_key` pela chave anônima que você anotou

   > ⚠️ **IMPORTANTE**:
   >
   > - Nunca compartilhe ou comite o arquivo `.env`
   > - O arquivo `.env` está no `.gitignore` para sua segurança
   > - Cada desenvolvedor precisa criar seu próprio arquivo `.env`

4. Inicie o projeto:
   ```bash
   npm start
   # ou
   yarn start
   ```

## 📱 Uso

1. Abra o aplicativo Expo Go no seu dispositivo móvel
2. Escaneie o QR Code gerado no terminal
3. Ou execute em um emulador Android/iOS

## 🎯 Funcionalidades Principais

### 👤 Usuários

- Login/Registro
- Visualização de produtos
- Adição ao carrinho
- Finalização de compra

### 👨‍💼 Administradores

- Dashboard administrativo
- Gerenciamento de produtos
- Visualização de estatísticas

## 📸 Screenshots

[Adicione screenshots do seu aplicativo aqui]

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">
  Feito com ❤️ por <a href="https://www.linkedin.com/in/alan-garmatter-07b3b3295/">Alan Garmatter</a>
</div>
