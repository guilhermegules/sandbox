<!DOCTYPE html>
<html lang="pt-BR">

{include file="head.tpl"}

<body>
  {include file="sidebar.tpl"}

  <div class="main-panel">
    {include file="navbar.tpl" navbarTitle="Aqui vamos selecionar os melhores ingredientes"}

    <div class="content">
      <div class="container-fluid">

        {if $savedSuccessful}
          <div class="alert alert-success" role="alert">
            Pizza salva com sucesso!
          </div>
        {/if}

        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header card-header-primary">
                <h4 class="card-title">Cadastrar uma nova pizza</h4>
              </div>
              <div class="card-body">
                <form action="pizza-register.php" class="signin-form" method="POST">
                  <div class="row">
                    <div class="col-4 form-group mb-3">
                      <label class="label" for="type">Sabor:</label>
                      <input type="text" name="type" id="type" />
                    </div>

                    <div class="col-4 form-group mb-3">
                      <label class="label" for="price">Preço:</label>
                      <input type="number" name="price" id="price" />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-3">
                      <button type="submit" name="submit" value="SUBMIT"
                        class="form-control btn btn-primary submit px-3">Cadastrar
                        pizza</button>
                    </div>
                  </div>
                </form>

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