# Gerenciamento de Estoque

## Descrição
Um aplicativo desktop para ajudar pequenas empresas a gerenciar seu estoque de forma eficiente. O sistema permite o cadastro de produtos, fornecedores e movimentações, além de gerar relatórios sobre vendas e estoque.

## Funcionalidades

### 1. Tela Principal
- **Menu Superior**:
  - Arquivo: (Novo, Abrir, Salvar, Sair)
  - Editar: (Adicionar, Editar, Excluir)
  - Relatórios: (Vendas, Estoque)

- **Barra Lateral**:
  - Produtos
  - Fornecedores
  - Movimentações
  - Relatórios

- **Área de Conteúdo**:
  - Tabela de Produtos com colunas: Nome, Descrição, Categoria, Preço, Quantidade, Fornecedor.
  - Campo de Pesquisa para buscar produtos.
  - Botão "Adicionar Produto".

### 2. Tela de Cadastro de Produtos
- **Campos**:
  - Nome
  - Descrição
  - Categoria
  - Preço
  - Quantidade
  - Fornecedor (dropdown)

- **Botões**:
  - Salvar
  - Cancelar

### 3. Tela de Cadastro de Fornecedores
- **Campos**:
  - Nome
  - Contato

- **Botões**:
  - Salvar
  - Cancelar

### 4. Tela de Registro de Movimentações
- **Dropdown de Produtos**
- **Campos**:
  - Tipo (Entrada/Saída)
  - Quantidade
  - Data

- **Botões**:
  - Registrar Movimentação
  - Cancelar

### 5. Tela de Relatórios
- **Filtros**:
  - Data Inicial
  - Data Final
  - Tipo de Relatório

- **Botão "Gerar Relatório"**
- **Área de Visualização**: Gráficos e tabelas com dados do relatório gerado.









## Estrutura do Banco de Dados

### Tabela de Produtos
- `id` (PK)
- `nome`
- `descricao`
- `categoria`
- `preco`
- `quantidade`
- `fornecedor_id` (FK)
- `data_cadastro`

### Tabela de Fornecedores
- `id` (PK)
- `nome`
- `contato`

### Tabela de Movimentações
- `id` (PK)
- `produto_id` (FK)
- `quantidade`
- `data`








## Tecnologias Sugeridas
- **Linguagem**: Python ou Java
- **Interface**: Tkinter (Python) ou JavaFX (Java)
- **Banco de Dados**: SQLite ou PostgreSQL/MySQL
- **Frontend**: HTML/CSS para interfaces web (se aplicável)

## Design Visual
- Cores: Verde e branco, para uma aparência profissional.
- Tipografia: Clara e legível.
- Ícones: Utilizar Font Awesome para melhorar a usabilidade.

## Considerações Finais
O aplicativo será uma ferramenta útil para o gerenciamento de estoques, permitindo que pequenas empresas tenham mais controle sobre seus produtos e fornecedores.
