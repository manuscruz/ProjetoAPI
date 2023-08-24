# API do Banco Digital - Projeto Piloto
Bem-vindo ao projeto piloto da API para um Banco Digital! Este é o primeiro passo para a implementação de um sistema completo de Banco Digital.

## Funcionalidades Principais:

- **Criar conta bancária:** Crie novas contas com informações únicas.
- **Listar contas bancárias:** Veja todas as contas existentes.
- **Atualizar usuário da conta:** Atualize os dados dos titulares das contas.
- **Excluir conta bancária:** Remova contas com saldo zero.
- **Depositar:** Adicione dinheiro às contas.
- **Sacar:** Retire dinheiro de uma conta.
- **Transferir:** Transfira fundos entre contas.
- **Consultar saldo:** Verifique o saldo de uma conta.
- **Extrato:** Visualize o histórico de transações.

## Como Executar:

1. Clone o repositório.
2. Acesse a pasta do projeto.
3. Instale as dependências: *npm install*.
4. Inicie o servidor: *npm run dev*.
5. Acesse a API em: ***http://localhost:3000***.

## Teste de funcionalidades:

### Rotas criadas:

![image](https://github.com/manuscruz/ProjetoAPI/assets/127244889/fdfdf244-a46c-4f92-b77e-bd8746474d30)

Com Insomnia é possível testar todas as rotas com as condições propostas.

![image](https://github.com/manuscruz/ProjetoAPI/assets/127244889/82408f26-2853-4e72-aca4-1ce0a2013f21)

Os dados são armazenados temporariamente em memória, utilizando uma estrutura de objeto contida no arquivo bancodedados.js. Isso significa que, enquanto o servidor estiver em execução, os dados são mantidos na memória RAM do sistema, permitindo que as operações sejam realizadas e consultadas. No entanto, assim que o servidor for encerrado, os dados armazenados em memória serão perdidos e não serão persistidos a longo prazo.





