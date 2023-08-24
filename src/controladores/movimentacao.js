const bancodedados = require('../bancodedados');
const { verificarDados, verificarConta} = require('../utilitarios/verificarDados');
const {format} = require('date-fns');

const dataHora = new Date();
const dataFormatada = format(dataHora, 'yyy-MM-dd HH:mm:ss')


const listaDeDepositos = (req, res)=>{

    return res.status(200).json(bancodedados.depositos);
}

const depositoEmconta = (req, res)=>{

    const {numero_conta, valor} = req.body;
    
    const validarConta = verificarConta("numero", numero_conta )

        
    if(!numero_conta || !valor ){
        return res.status(400).json({mensagem:"O número da conta e o valor são obrigatórios!"});
    }

    if(!validarConta){
        return res.status(404).json({mensagem: "Essa conta não é valida!"})
    }

    if(valor <= 0){
        return res.status(400).json({mensagem:"O valor depositado deve ser maior que zero!"})
    }

    const novoDeposito = {
        data: dataFormatada,
        numero_conta,
        valor,
    }

    validarConta.saldo +=valor;

    bancodedados.depositos.push(novoDeposito);

    return res.status(204).send()
};

const listaDeSaques = (req, res)=>{

    return res.status(200).json(bancodedados.saques);
}


const sacarValor = (req, res)=>{
    const {numero_conta, valor, senha} = req.body;
    
    const validarConta = verificarConta("numero", numero_conta )

    if(!validarConta){
        return res.status(404).json({mensagem: "Essa conta não é valida!"})
    }
        
    if(!numero_conta || !valor || !senha){
        return res.status(400).json({mensagem:"O número da conta, valor e senha são obrigatórios!"});
    }

    if(valor <= 0){
        return res.status(400).json({mensagem:"O valor não pode ser zero!"})
    }


    if(validarConta.usuario.senha.length !== req.body.senha.length){
        return res.status(404).json({mensagem:"Senha incorreta!"})

    };

    for(let i = 0; i < validarConta.usuario.senha.length; i++){
        if(validarConta.usuario.senha[i] !== req.body.senha[i]){
            return res.status(404).json({mensagem:"Senha incorreta!"})
        }
    }

    const saldoAtual = validarConta.saldo;

    if(saldoAtual < valor){
        return res.status(400).json({mensagem:"Saldo insuficiente para o saque!"})
    }

    validarConta.saldo -= valor;

    const novoSaque ={
        data: dataFormatada,
        numero_conta,
        valor,
    };

    bancodedados.saques.push(novoSaque);

    return res.status(204).send();
}

const listarTransferencias =(req, res)=>{
    return res.status(200).json(bancodedados.transferencias);
}

const transferencias = (req, res)=>{

    const {numero_conta_origem, numero_conta_destino, valor, senha} = req.body;

    if(!numero_conta_destino || !numero_conta_origem || valor === undefined || !senha){
        return res.status(400).json({mensagem:"Informe todos os dados são obrigatórios!"});

    };

    const contaOrigem = verificarConta("numero", numero_conta_origem);

    const contaDestino = verificarConta("numero", numero_conta_destino);

    if(!contaOrigem || !contaDestino){
        return res.status(404).json({mensagem:"Conta origem ou destino não existe"});
    };

    if(contaOrigem.usuario.senha !== senha){
        return res.status(400).json({mensagem:"Senha incorreta!"});
    };

    if(valor <= 0){
        return res.status(400).json({mensagem:"O valor não pode ser zero!"})
    }

    if(contaOrigem.saldo < valor){
        return res.status(400).json({mensagem:"Saldo insuficiente"});

    };

    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;

    const novaTransferencia = {
        data: dataFormatada,
        numero_conta_origem,
        numero_conta_destino,
        valor,
    }

    bancodedados.transferencias.push(novaTransferencia);

    return res.status(204).send();
    

}

const verificarSaldo = (req, res)=>{

    const {numero_conta, senha}= req.body;

    if(!numero_conta || !senha){
        return res.status(400).json({mensagem:"Informe número da conta e senha!"});
    };

    const conta = verificarConta("numero", numero_conta);

    if(!conta){
        return res.status(400).json({mensagem:"Conta bancária  não encontrada!"});
    };

    //estranhamente essa validação funcionaou aqui mas não deu certo em Sacar valor, por isso que lá eu fiz com for.
    if(conta.usuario.senha !== senha){
        return res.status(400).json({mensagem:"Senha incorreta!"});
    };

    return res.status(200).json({saldo:conta.saldo})

};

const listarExtrato = (req, res)=>{
    const {numero_conta, senha} = req.body;

    if(!numero_conta || !senha){
        return res.status(400).json({mensagem:"Número da conta e senha são obrigatórios!"})
    };

    const validarConta = verificarConta("numero", numero_conta);

    if(!validarConta){
        return res.status(400).json({mensagem:"Conta bancária não encontrada!"});
    };

    if(validarConta.usuario.senha !== senha){
        return res.status(400).json({mensagem:"Senha incorreta!"});
    };

    const extrato = {
        depositos: bancodedados.depositos.filter(deposito => deposito.numero_conta === numero_conta),
        saques: bancodedados.saques.filter(saque => saque.numero_conta === numero_conta),
        transferenciasEnviadas: bancodedados.transferencias.filter(transferencia => transferencia.numero_conta_origem === numero_conta),
        transferenciasRecebidas: bancodedados.transferencias.filter(transferencia => transferencia.numero_conta_destino === numero_conta),
        
    };

    return res.status(200).json({extrato})

}


module.exports={
    listaDeDepositos,
    depositoEmconta,
    listaDeSaques,
    sacarValor,
    listarTransferencias,
    transferencias,
    verificarSaldo,
    listarExtrato

}