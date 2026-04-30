# bash

> Repository for study about bash scripting and linux

## DIRETÓRIOS ESTRUTURAIS DO LINUX

- `/` - É o diretório Raiz/ROOT/Principal, isto é, detém todos diretório essenciais ao funcionamento essenciais ao funcionamento do SO.
- `/sbin` - É o diretório que contém os comandos que poderão ser executados pelo Administrador do SO.
- `/bin` - É o diretório que detém os comandos/executáveis comuns aos usuários do SO.
- `/usr` - É o diretório detentor das aplicações instalados pelos usuários.
- `/home` - É o diretório que contém os perfis dos usuários do SO.
- `/etc` - É o diretório que abriga os arquivos de configuração.
- `/dev` - contém os arquivos relacionados aos dispositivos (placas e periféricos).
- `/var` - Detém as variáveis ou arquivos do sistema operacional.
- `/opt` - Detém os arquivos dos pacotes/programas instalados que não fazem parte da distribuição.
- `swap` - É uma partição utilizada pelo SO para auxiliar a memória volátil.
- `/tmp` - Arquivos temporários e logs.

## COMANDOS BÁSICOS:

- `cd` – Navegação nos diretórios;
- `ls` (list) – Lista o conteúdo de um diretório;
- `ls –l` – lista todos os arquivos com detalhes;
- `ls –la` – lista todos os arquivos com detalhes inclusive ocultos;
- `ls -l /var/www (caminho)` - lista todos os arquivos com detalhes em outro diretório;
- `pwd (path work directory)` – Exibe o caminho completo do diretório corrente/atual;
- `tree` - Pode ser relativo ou absoluto exibe a estrutura dos arquivos que compõem aquela árvore.
- `touch` - Cria um arquivo EX: touch nome_do_arquivo;
- `mkdir` - Cria um diretório EX: mkdir nome_do_diretorio;
- `nano` - Editor de texto EX: nano nome_do_arquivo;
- `cat` - Exibe o conteúdo do arquivo EX: cat nome_do_arquivo;
- `more` - Exibe o conteúdo do arquivo com paginação bottom EX: more nome_do_arquivo;
- `less` - Exibe o conteúdo do arquivo com paginação to or bottom EX: less nome_do_arquivo;
- `clear` - Limpa o terminal;
- `cp` - Copia arquivos EX: cp arquivo-original arquivo gerado;
- `cp -R (R = recursive)` - Cópia inclusive pastas, necessita do R para ativar recursividade pois a pasta receberá arquivos.
- `rm` - Remove arquivos EX: rm nome_do_arquivo;
- `rmdir` - Remove diretórios vazios EX: rm nome_do_diretorio;
- `rm -R` - Remove qualquer diretório mesmo com arquivos dentro EX: em -R nome_do_diretorio;
- `mv` - Move ou renomeia um arquivo ou diretório EX: mv origem destino;
- `ls -l | grep` - Pesquisa por termos dentro do diretório EX: ls -l |greep nome_do_arquivo;
- `grep` - Específica os dados de saída;
- `|` - inicia o comando de saída;
- `man` - Manual EX: man mkdir (Será mostrado todos os comandos relativos a mkdir).
