const express = require('express')
const rota = require('./rota')
const app = express()

app.use(express.json())
app.use(rota)

app.listen(3000)