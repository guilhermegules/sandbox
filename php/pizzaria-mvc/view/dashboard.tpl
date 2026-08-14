<!DOCTYPE html>
<html lang="pt-BR">

{include file="head.tpl"}

<body>
  {include file="sidebar.tpl"}
  <div class="main-panel">
    {include file="navbar.tpl" navbarTitle="Status"}
    <div class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="card card-stats pb-3">
              <div class="card-header card-header-warning card-header-icon">
                <div class="card-icon">
                  <i class="material-icons"> local_pizza
                  </i>
                </div>
                <p class="card-category">{"Total de pizzas cadastradas"|truncate:20} </p>
                <h3 class="card-title">
                  10
                </h3>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="card card-stats pb-3">
              <div class="card-header card-header-success card-header-icon">
                <div class="card-icon">
                  <i class="material-icons">store</i>
                </div>
                <p class="card-category">{"Total em vendas"|truncate:15}</p>
                <h3 class="card-title">R$34,245</h3>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-sm-6">
            <div class="card card-stats pb-3">
              <div class="card-header card-header-danger card-header-icon">
                <div class="card-icon">
                  <i class="material-icons">info_outline</i>
                </div>
                <p class="card-category">{"Total de funcionários"|truncate:20}</p>
                <h3 class="card-title">10</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {include file="footer.tpl"}
  </div>
  </div>
  {include file="scripts.tpl"}
</body>

</html>