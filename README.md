 # 🛍️ Fashion Store App

<div align="center">
  <img src="assets/app-icon.png" alt="Fashion Store Logo" width="200"/>
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

   b. Crie um novo projeto no Supabase

   c. Após criar o projeto, vá em Project Settings > API

   d. Crie um arquivo \`.env\` na raiz do projeto com as seguintes variáveis:

   ```env
   SUPABASE_URL=sua_url_do_projeto
   SUPABASE_ANON_KEY=sua_chave_anon
   ```

   e. Substitua:

   - \`sua_url_do_projeto\` pela URL do seu projeto (Project URL)
   - \`sua_chave_anon\` pela chave anônima (anon public)

   f. Alternativamente, você pode configurar diretamente no arquivo \`src/lib/supabase.ts\`:

   ```typescript
   const supabaseUrl = "sua_url_do_projeto";
   const supabaseAnonKey = "sua_chave_anon";
   ```

4. Inicie o projeto:
   ```bash
   npm start
   # ou
   yarn start
   ```

## 📱 Uso

1. Abra o aplicativo Expo Go no seu dispositivo móvel.
2. Escaneie o QR Code gerado no terminal.
3. Ou execute em um emulador Android/iOS.

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

Adicione capturas de tela do aplicativo para ilustrar suas funcionalidades e aparência.

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto.
2. Criar uma branch para sua feature:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit suas mudanças:
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push para a branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Abrir um Pull Request.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">
  Feito com ❤️ por <a href="https://www.linkedin.com/in/alan-garmatter-07b3b3295/">Alan Garmatter</a>
</div>