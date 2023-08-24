const express = require('express');
const {listaDeContas, criarConta, atualizarConta, deletarConta} = require('./controladores/contas');
const {depositoEmconta, listaDeDepositos, sacarValor, listaDeSaques, listarTransferencias, transferencias, verificarSaldo, listarExtrato} = require('./controladores/movimentacao');

const rotas = express();



rotas.get("/contas", listaDeContas);
rotas.post("/contas", criarConta);
rotas.put("/contas/:numeroConta/usuario", atualizarConta);
rotas.delete("/contas/:numeroConta", deletarConta);
rotas.get("/transacoes/depositar", listaDeDepositos);
rotas.post("/transacoes/depositar", depositoEmconta);
rotas.get("/transacoes/sacar", listaDeSaques);
rotas.post("/transacoes/sacar", sacarValor),
rotas.get("/transacoes/transferir", listarTransferencias);
rotas.post("/transacoes/transferir", transferencias)
rotas.get("/contas/saldo", verificarSaldo),
rotas.get("/contas/extrato", listarExtrato)

module.exports ={
    rotas  
};