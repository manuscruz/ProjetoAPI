const express = require('express');
const senhaValida = require('./intermediario');
const rotas = require('./rotas');

const app = express();

app.use(express.json());

app.use(senhaValida);
app.use(rotas.rotas);



app.listen(3000);