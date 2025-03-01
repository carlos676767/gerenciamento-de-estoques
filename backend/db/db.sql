CREATE TABLE PRODUTOS (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    id_fornecedor INTEGER,
    nome TEXT NOT NULL,
    descricao TEXT NOT NULL,
    categoria TEXT NOT NULL,
    valor REAL NOT NULL,
    quantidade INTEGER NOT NULL,
    data_cadastro TEXT NOT NULL,
    FOREIGN KEY (id_fornecedor) REFERENCES FORNECEDORES(id) ON DELETE CASCADE
);


CREATE TABLE FORNECEDORES(
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    nome_forncedor varchar(255) NOT NULL,
    contato varchar(255) UNIQUE NOT NULL,
    data_cadastro varchar(255) NOT NULL
);



CREATE TABLE USUARIO(
    nome_user VARCHAR(255) NOT NULL,
    senha_user VARCHAR(255) NOT NULL
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
)

CREATE TABLE MOVIMENTACOES (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    produto_id INTEGER NOT NULL,
    quantidade INTEGER NOT NULL,
    status TEXT CHECK(status IN ('entrada', 'saida'))
    data TEXT NOT NULL,
    FOREIGN KEY (produto_id) REFERENCES PRODUTOS(id)
);