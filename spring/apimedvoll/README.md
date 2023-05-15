# API MED VOLL

## CORS

O CORS é um mecanismo utilizado para adicionar cabeçalhos HTTP que informam aos navegadores para permitir que uma aplicação Web seja executada em uma origem e acesse recursos de outra origem diferente. Esse tipo de ação é chamada de requisição cross-origin HTTP. Na prática, então, ele informa aos navegadores se um determinado recurso pode ou não ser acessado.

Mas por que os erros acontecem? Chegou a hora de entender!
## Same-origin policy

Por padrão, uma aplicação Front-end, escrita em JavaScript, só consegue acessar recursos localizados na mesma origem da solicitação. Isso acontece por conta da política de mesma origem (same-origin policy), que é um mecanismo de segurança dos Browsers que restringe a maneira de um documento ou script de uma origem interagir com recursos de outra origem. Essa política possui o objetivo de frear ataques maliciosos.

Duas URLs compartilham a mesma origem se o protocolo, porta (caso especificado) e host são os mesmos. Vamos comparar possíveis variações considerando a URL https://cursos.alura.com.br/category/programacao:
URL	Resultado	Motivo
https://cursos.alura.com.br/category/front-end	Mesma origem	Só o caminho difere
http://cursos.alura.com.br/category/programacao	Erro de CORS	Protocolo diferente (http)
https://faculdade.alura.com.br:80/category/programacao	Erro de CORS	Host diferente

Agora, fica a dúvida: o que fazer quando precisamos consumir uma API com URL diferente sem termos problemas com o CORS? Como, por exemplo, quando queremos consumir uma API que roda na porta 8000 a partir de uma aplicação React rodando na porta 3000. Veja só!

Ao enviar uma requisição para uma API de origem diferente, a API precisa retornar um header chamado Access-Control-Allow-Origin. Dentro dele, é necessário informar as diferentes origens que serão permitidas para consumir a API, em nosso caso: Access-Control-Allow-Origin: http://localhost:3000.

É possível permitir o acesso de qualquer origem utilizando o símbolo *(asterisco): Access-Control-Allow-Origin: *. Mas isso não é uma medida recomendada, pois permite que origens desconhecidas acessem o servidor, a não ser que seja intencional, como no caso de uma API pública. Agora vamos ver como fazer isso no Spring Boot de maneira correta.

## Habilitando diferentes origens no Spring Boot

Para configurar o CORS e habilitar uma origem específica para consumir a API, basta criar uma classe de configuração como a seguinte:

@Configuration
public class CorsConfiguration implements WebMvcConfigurer {

```java
@Configuration
public class CorsConfiguration implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD", "TRACE", "CONNECT");
    }
}
```

http://localhost:3000 seria o endereço da aplicação Front-end e .allowedMethods os métodos que serão permitidos para serem executados. Com isso, você poderá consumir a sua API sem problemas a partir de uma aplicação Front-end.

## Java Record

Lançado oficialmente no Java 16, mas disponível desde o Java 14 de maneira experimental, o Record é um recurso que permite representar uma classe imutável, contendo apenas atributos, construtor e métodos de leitura, de uma maneira muito simples e enxuta.

Esse tipo de classe se encaixa perfeitamente para representar classes DTO, já que seu objetivo é apenas representar dados que serão recebidos ou devolvidos pela API, sem nenhum tipo de comportamento.

Para se criar uma classe DTO imutável, sem a utilização do Record, era necessário escrever muito código. Vejamos um exemplo de uma classe DTO que representa um telefone:

```java
public final class Telefone {

    private final String ddd;
    private final String numero;

    public Telefone(String ddd, String numero) {
        this.ddd = ddd;
        this.numero = numero;
    }

    @Override
    public int hashCode() {
        return Objects.hash(ddd, numero);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        } else if (!(obj instanceof Telefone)) {
            return false;
        } else {
            Telefone other = (Telefone) obj;
            return Objects.equals(ddd, other.ddd)
              && Objects.equals(numero, other.numero);
        }
    }

    public String getDdd() {
        return this.ddd;
    }

    public String getNumero() {
        return this.numero;
    }
}
```

Agora com o Record, todo esse código pode ser resumido com uma única linha:

```java
public record Telefone(String ddd, String numero){}
```

Por baixo dos panos, o Java vai transformar esse Record em uma classe imutável, muito similar ao código exibido anteriormente.

Mais detalhes sobre esse recurso podem ser encontrados na [documentação oficial](https://docs.oracle.com/en/java/javase/16/language/records.html).

## Arquivo properties ou yaml?

As configurações de uma aplicação Spring Boot são feitas em arquivos externos, sendo que podemos usar arquivo de propriedades ou arquivo YAML. 

### Arquivo de propriedades

Por padrão, o Spring Boot acessa as configurações definidas no arquivo application.properties, que usa um formato de chave=valor:

```properties
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/clinica
spring.datasource.username=root
spring.datasource.password=root
```

Cada linha é uma configuração única, então é preciso expressar dados hierárquicos usando os mesmos prefixos para nossas chaves, ou seja, precisamos repetir prefixos, neste caso, spring e datasource. 

### YAML Configuration

YAML é um outro formato bastante utilizado para definir dados de configuração hierárquica, como é feito no Spring Boot.

Pegando o mesmo exemplo do nosso arquivo application.properties, podemos convertê-lo para YAML alterando seu nome para application.yml e modificando seu conteúdo para:

```yaml
spring:
    datasource:
        driver-class-name: com.mysql.cj.jdbc.Driver
        url: jdbc:mysql://localhost:3306/clinica
        username: root
        password: root
```

Com YAML, a configuração se tornou mais legível, pois não contém prefixos repetidos. Além de legibilidade e redução de repetição, o uso de YAML facilita o armazenamento de variáveis de configuração de ambiente, conforme recomenda o 12 Factor App, uma metodologia bastante conhecida e utilizada que define 12 boas práticas para criar uma aplicação moderna, escalável e de manutenção simples.

## Padrão DAO

O padrão de projeto DAO, conhecido também por Data Access Object, é utilizado para persistência de dados, onde seu principal objetivo é separar regras de negócio de regras de acesso a banco de dados. Nas classes que seguem esse padrão, isolamos todos os códigos que lidam com conexões, comandos SQLs e funções diretas ao banco de dados, para que assim tais códigos não se espalhem por outros pontos da aplicação, algo que dificultaria a manutenção do código e também a troca das tecnologias e do mecanismo de persistência.

### Implementação

Vamos supor que temos uma tabela de produtos em nosso banco de dados. A implementação do padrão DAO seria o seguinte:

Primeiro, seria necessário criar uma classe básica de domínio Produto:

```java
public class Produto {
    private Long id;
    private String nome;
    private BigDecimal preco;
    private String descricao;

    // construtores, getters e setters
}
```

Em seguida, precisaríamos criar a classe ProdutoDao, que fornece operações de persistência para a classe de domínio Produto:

```java
public class ProdutoDao {

    private final EntityManager entityManager;

    public ProdutoDao(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public void create(Produto produto) {
        entityManager.persist(produto);
    }

    public Produto read(Long id) {
        return entityManager.find(Produto.class, id);
    }

    public void update(Produto produto) {
        entityManger.merge(produto);
    }

    public void remove(Produto produto) {
        entityManger.remove(produto);
   }

}
```

No exemplo anterior foi utilizado a JPA como tecnologia de persistência dos dados da aplicação.

## Padrão repository

De acordo com o famoso livro Domain-Driven Design, de Eric Evans: 

> O repositório é um mecanismo para encapsular armazenamento, recuperação e comportamento de pesquisa, que emula uma coleção de objetos.

implificando, um repositório também lida com dados e oculta consultas semelhantes ao DAO. No entanto, ele fica em um nível mais alto, mais próximo da lógica de negócios de uma aplicação. Um repositório está vinculado à regra de negócio da aplicação e está associado ao agregado dos seus objetos de negócio, retornando-os quando preciso.

Só que devemos ficar atentos, pois assim como no padrão DAO, regras de negócio que estão envolvidas com processamento de informações não devem estar presentes nos repositórios. Os repositórios não devem ter a responsabilidade de tomar decisões, aplicar algoritmos de transformação de dados ou prover serviços diretamente a outras camadas ou módulos da aplicação. Mapear entidades de domínio e prover as funcionalidades da aplicação são responsabilidades muito distintas.

Um repositório fica entre as regras de negócio e a camada de persistência:

1. Ele provê uma interface para as regras de negócio onde os objetos são acessados como em uma coleção;
2. Ele usa a camada de persistência para gravar e recuperar os dados necessários para persistir e recuperar os objetos de negócio.

Portanto, é possível até utilizar um ou mais DAOs em um repositório.
