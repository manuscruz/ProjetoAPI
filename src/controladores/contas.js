const bancodedados = require('../bancodedados');
const { verificarDados, verificarConta} = require('../utilitarios/verificarDados');


let numeroConta = "1";

const listaDeContas = (req, res)=>{

    return res.status(200).json(bancodedados.contas);
}

const criarConta = (req, res)=>{
   
    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body;

    if(!nome || !cpf || !data_nascimento || !telefone || !email || !senha ){
        return res.status(400).json({mensagem:"Todos os campos são de preenchimento obrigatório."});
    }

    const verificarCpf = verificarDados("cpf", cpf);

    const verificarEmail = verificarDados("email", email);

    if(verificarCpf || verificarEmail){
        return res.status(400).json({ mensagem: "Já existe uma conta com o cpf ou e-mail informado!"})
    }   

        const contaNova = {
            numero: numeroConta,
            saldo: 0,
            usuario:{
                nome,
                cpf,
                data_nascimento,
                telefone,
                email,
                senha
            }
        }

    numeroConta = String(Number(numeroConta)+1)

    bancodedados.contas.push(contaNova)

    return res.status(201).send();

}

const atualizarConta = (req, res)=>{

    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body;

    let contaValida = verificarConta("numero", req.params.numeroConta )

    if(!contaValida){
        return res.status(404).json({mensagem: "Essa conta não é valida!"})
    }

    if(!nome || !cpf || !data_nascimento || !telefone || !email || !senha ){
        return res.status(400).json({mensagem:"Todos os campos são de preenchimento obrigatório."});
    }

    const verificarCpf = verificarDados("cpf", cpf);

    const verificarEmail = verificarDados("email", email);

    if(verificarCpf){
        return res.status(400).json({ mensagem: "O CPF informado já existe cadastrado!"});
    }
    if(verificarEmail){
        return res.status(400).json({ mensagem: "O Email informado já existe cadastrado!"});
    }    
   
 
    if(nome,cpf,data_nascimento,telefone,email, senha){
        contaValida.usuario.email = email;
        contaValida.usuario.senha = senha;
        contaValida.usuario.telefone = telefone;
        contaValida.usuario.data_nascimento = data_nascimento;
        contaValida.usuario.cpf = cpf;
        contaValida.usuario.nome = nome;
    }
    


    return res.status(204).send();
}

const deletarConta = (req, res)=>{
    const buscarConta = verificarConta("numero", req.params.numeroConta )

    if(!buscarConta){
        return res.status(404).json({mensagem: "Essa conta não existe!"})
    }

    if(buscarConta.saldo !== 0){
        return res.status(404).json({mensagem:"A conta só pode ser removida se o saldo for zero!"})
    }

    const indexConta = bancodedados.contas.indexOf(buscarConta);
    bancodedados.contas.splice(indexConta, 1);

    return res.status(204).send()



};




module.exports={
    listaDeContas,
    criarConta,
    atualizarConta,
    deletarConta
}