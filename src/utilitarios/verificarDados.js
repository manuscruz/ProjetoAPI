const bancodedados = require('../bancodedados');

const verificarDados = (tipoDeDado, dado)=>{
    return bancodedados.contas.find(conta => {
        return conta.usuario[tipoDeDado] === dado;
    })

};

const verificarConta = (tipoDeDado, dado)=>{
    return bancodedados.contas.find(conta =>{
        return conta[tipoDeDado] === dado.toString();
    })
}



module.exports={
    verificarDados,
    verificarConta
}