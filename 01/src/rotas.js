const express = require('express')
const { listarProdutos, obterProduto, calcularFrete } = require('./controladores/funcao')
const rotas = express()

rotas.get('/produtos', listarProdutos)
rotas.get('/produtos/:idProduto', obterProduto)
rotas.get('/produtos/:idProduto/frete/:cep', calcularFrete)

module.exports = rotas
