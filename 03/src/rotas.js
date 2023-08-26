const express = require('express')
const procurarECadastrar = require('./controladores/funcao')
const rota = express()

rota.get('/enderecos/:cep', procurarECadastrar)

module.exports = rota
