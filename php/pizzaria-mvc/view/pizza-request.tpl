<!DOCTYPE html>
<html lang="pt-BR">

{include file="head.tpl"}

<body>
  {include file="sidebar.tpl"}

  <div class="main-panel">
    {include file="navbar.tpl" navbarTitle="Aqui vamos selecionar os melhores ingredientes"}
    <div class="content">
      <div class="container-fluid">
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
                          <option value="{$price}">R${$price}</option>
                        {/foreach}
                      </select>
                    </div>
                  </div>

                  <div class="form-group">
                    <button type="submit" class="form-control btn btn-primary submit px-3">Adicionar pizza</button>
                  </div>
                </form>

                {if $calculatedPrice > 0}
                  <p>Preço total de: R${$calculatedPrice}</p>
                {/if}

                Contagem de pizzas: {$pizzaCount}
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