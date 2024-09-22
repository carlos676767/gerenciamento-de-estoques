const Produtos = require('../controller/CadastrarProduto')
const apii = require('express').Router()
apii.post('/post/product',Produtos.routerProducy )

module.exports = apii