const Forncedor = require('../controller/cadastarFornecedor')
const Produtos = require('../controller/CadastrarProduto')
const getProdutos = require('../controller/GetProdutos')
const apii = require('express').Router()
apii.post('/post/product',Produtos.routerProducy)
apii.get('/produtos', getProdutos.listProduct)
apii.post('/forncedores', Forncedor.RouterFor)
module.exports = apii