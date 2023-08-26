const { getStateFromZipcode } = require('utils-playground')
let produtos = require('../bancodedados/produtos')

const listarProdutos = async (req, res) => {
    return res.status(200).json(produtos)
}

const obterProduto = async (req, res) => {
    const { idProduto } = req.params
    const produto = produtos.find(produto => produto.id === Number(idProduto))

    if (!produto) {
        return res.status(400).json({ mensagem: 'produto não encontrado' })
    }
    return res.status(200).json(produto)
}

const calcularFrete = async (req, res) => {
    const { idProduto, cep } = req.params
    const produto = produtos.find(produto => produto.id === Number(idProduto))
    if (!produto) {
        return res.status(400).json({ mensagem: 'produto não encontrado' })
    }
    try {
        const estado = await getStateFromZipcode(cep)
        let calculo = 0
        if (estado === "BA" || estado === "SE" || estado === "AL" || estado === "PE" || estado === "PB") {
            calculo = produto.valor * 0.1
        }
        else if (estado === "SP" || estado === "RJ") {
            calculo = produto.valor * 0.15
        }
        else {
            calculo = produto.valor * 0.12
        }

        const produtoFrete = {
            produto,
            estado,
            frete: calculo
        }
        return res.status(201).json(produtoFrete)
    } catch (erro) {
        return res.status(500).json('erro do servidor')
    }
}

module.exports = {
    listarProdutos,
    obterProduto,
    calcularFrete
}