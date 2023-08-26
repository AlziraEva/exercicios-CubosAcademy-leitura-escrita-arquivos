const express = require('express')
const { listaDePokemons, obterPokemon } = require('./controladores/funcaopokemon')
const rota = express()

rota.get('/pokemon', listaDePokemons)
rota.get('/pokemon/:idOuNome', obterPokemon)

module.exports = rota