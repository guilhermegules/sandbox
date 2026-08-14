<!DOCTYPE html>
<html lang="pt-BR">

{include file="head.tpl"}

<body>
  {include file="sidebar.tpl"}

  <div class="main-panel">
    {include file="navbar.tpl" navbarTitle="Aqui vamos selecionar os melhores ingredientes"}

    <div class="content">
      <div class="container-fluid">

        {if $pizzaCount >= 5}
          <div class="alert alert-success" role="alert">
            Brinde Coca-Cola grátis!
          </div>
        {/if}

        {if $hasBeenSaved}
          <div class="alert alert-success" role="alert">
            Pedido realizado com sucesso!
          </div>
        {/if}

        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header card-header-primary">
                <h4 class="card-title">Realizar pedido</h4>
              </div>
              <div class="card-body">
                <form action="pizza-request.php" class="signin-form" method="POST">
                  <div class="row">
                    <div class="col-4 form-group mb-3">
                      <label class="label" for="type">Sabor:</label>
                      <select class="form-control" required id="type" name="type">
                        <option selected disabled>Selecione o sabor</option>
                        {foreach $types as $type}
                          <option value="{$type}">{$type}</option>
                        {/foreach}
                      </select>
                    </div>

                    <div class="col-4 form-group mb-3">
                      <label class="label" for="price">Preço:</label>
                      <select class="form-control" required id="price" name="price">
                        <option selected disabled>Selecione o preço</option>
                        {foreach $prices as $price}
                          <option value="{$price}">R${$price|string_format:"%.2f"}</option>
                        {/foreach}
                      </select>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-2">
                      <button type="submit" value="ADD" name="submit"
                        class="form-control btn btn-primary submit px-3">Adicionar pizza</button>
                    </div>
                    <div class="col-2">
                      <button type="submit" value="SAVE" name="submit"
                        class="form-control btn btn-primary submit px-3">Finalizar pedido</button>
                    </div>
                  </div>
                </form>

                {if $calculatedPrice > 0}
                  <p class="mt-2">Preço total de: <strong>R$ {$calculatedPrice|string_format:"%.2f"}</strong></p>
                {/if}

                <p>Contagem de pizzas: {$pizzaCount}</p>

                {if $pizzaCount >= 15}
                  <p class="mt-2">{$user} irá ganhar <strong>R$ {$bonus|string_format:"%.2f"}</strong> de comissão
                  </p>
                {/if}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {include file="footer.tpl"}
  </div>
  </div>
  {include file="view/scripts.tpl"}
</body>

</html>