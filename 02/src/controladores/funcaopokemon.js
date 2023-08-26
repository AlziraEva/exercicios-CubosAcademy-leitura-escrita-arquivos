const { listarPokemons, detalharPokemon } = require('utils-playground')

const listaDePokemons = async (req, res) => {
    const { pagina } = req.query
    try {
        const listaPokemons = await listarPokemons(pagina ?? 1)
        return res.json(listaPokemons.results)
    } catch (erro) {
        return res.status(500).json('erro do servidor')
    }
}

const obterPokemon = async (req, res) => {
    const { idOuNome } = req.params
    try {
        const detalheDoPokemon = await detalharPokemon(idOuNome)
        const { id, nome, height, weight, base_experience, forms, abilities, species } = detalheDoPokemon
        return res.json({ id, nome, height, weight, base_experience, forms, abilities, species })
    } catch (erro) {
        return res.status(500).json('erro do servidor')
    }

}

module.exports = {
    listaDePokemons,
    obterPokemon
}