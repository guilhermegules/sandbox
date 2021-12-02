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
                <form action="download-report.php" method="POST" enctype="multipart/form-data">
                  <button type="submit" class="btn btn-icon card-icon">
                    <span class="material-icons">
                      file_download
                    </span>
                  </button>
                </form>
                <p class="card-category">Relatório de pedidos</p>

                {if $hasLink}
                <a id='report' href='relatorio.csv' download='relatorio.csv'>Baixar</a>"
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

  {include file="scripts.tpl"}
</body>

</html>