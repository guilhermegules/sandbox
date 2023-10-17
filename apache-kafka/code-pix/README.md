# Code PIX

- Solução para simularmos transgerências de valores entre bancos através de chaves
- Simularemos diversos bancos e contas bancárias que possuem uma chave pix
- Cada cibta bancária poderá cadastrar sua chave pix
- Uma conta bancária poderá realizar uma transferência para outra conta em outro banco, utilizando a chave pix de destino
- Uma transação não pode ser perdida; mesmo que o codepix esteja fora do ar
- Uma transação não pode ser perdida; mesmo que o outro banco esteja fora do ar

## Sobre os bancos

- O banco será um micro serviço com funções limitadas a cadastro de contas e chaves pix, bem como transferência de valores
- Utilizaremos a mesma aplicação para simularmos diversos bancos, mudando cores e código
- Nest.js no backend
- Next.js no frontend

## Sobre o CodePix

- O microserviço CodePix será responsável por intermediar as transferencias bancárias
- Receberá a transação de transferência
- Encaminhará a transação para o banco destino PENDING
- Recebe a confirmação do banco destino CONFIRMED
- Envia confirmação para o banco origem informando quando o banco de destino processou
- Recebe a confirmação do banco de origem de que ele processou COMPLETED
- Marca a transação como completa
