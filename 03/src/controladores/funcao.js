const { buscarEndereco } = require('utils-playground')
const fs = require('fs/promises')

const procurarECadastrar = async (req, res) => {
    const { cep } = req.params
    try {
        const parseEndereco = JSON.parse(await fs.readFile('./src/enderecos.json'))
        let enderecoEncontrado = parseEndereco.find(endereco => endereco.cep.replace('-', '') === cep)
        if (enderecoEncontrado) {
            return res.json(enderecoEncontrado)
        }
        enderecoEncontrado = await buscarEndereco(cep)
        if (enderecoEncontrado.erro) {
            return res.status(400).json({ mensagem: 'endereço não encontrado' })
        }

        parseEndereco.push(enderecoEncontrado)

        await fs.writeFile('./src/enderecos.json', JSON.stringify(parseEndereco))

        return res.json(enderecoEncontrado)


    } catch (error) {
        return res.status(400).json({ mensagem: error.message })
    }
}

module.exports = procurarECadastrar


