# Sistema de Controle Bélico



##  Funcionalidades Principais
- Cadastro, edição, remoção e visualização de unidades, equipes, guardas e armas
- Gerenciamento de movimentações(empréstimos e devoluções) de armas
- autenticação de usuários

### Configurando o Backend (Rails)

1. Acesse a pasta do Backend:
   ```sh
   cd ../backend
   ```
1. Instale as dependências:
   ```sh
   bundle install
   ```
2. Configure o banco de dados:
   ```sh
   rails db:create db:migrate db:seed
   ```
3. Inicie o servidor Rails:
   ```sh
   rails server
   ```

### Configurando o Frontend (Next.js)
1. Acesse a pasta do frontend:
   ```sh
   cd ../frontend
   ```
2. Instale as dependências:
   ```sh
   npm install  
   ```
3. Inicie o servidor Next.js:
   ```sh
   npm run dev 
   ```






##  Tecnologias Utilizadas
- **Backend:** Ruby on Rails
- **Frontend:** Next.js + TypeScript
- **Estilização:** Tailwind CSS


