<html lang="pt-BR">
{include file="head.tpl"}

<body>
  <div class="container d-flex justify-content-center flex-column h-100 mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 text-center mb-5">
        <h2 class="heading-section">Bem vindo a Pizzaria do Siri Cascudo</h2>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-12 col-lg-10">
        <div class="wrap d-md-flex">
          <div class="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
            <div class="text w-100">
              <p>Não tem conta ainda?</p>
              <a href="#" class="btn btn-white btn-outline-white">Registre-se</a>
            </div>
          </div>
          <div class="login-wrap p-4 p-lg-5">
            <div class="d-flex">
              <div class="w-100">
                <h3 class="mb-4">Login</h3>
              </div>
            </div>
            <form action="login.php" class="signin-form" method="POST">
              <div class="form-group mb-3">
                <label class="label" for="email">Email</label>
                <input type="text" class="form-control" required id="email" name="email">
              </div>
              <div class="form-group mb-3">
                <label class="label" for="password">Senha</label>
                <input type="password" class="form-control" required id="password" name="password">
              </div>
              <div class="form-group">
                <button type="submit" class="form-control btn btn-primary submit px-3">Login</button>
              </div>
              <div class="form-group d-md-flex">
                <div class="w-50 text-left">
                  <label class="checkbox-wrap checkbox-primary mb-0">Lembre-se de mim
                    <input type="checkbox" checked>
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div class="w-50 text-md-right">
                  <a href="#">Esqueci minha senha</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  {include file="scripts.tpl"}
</body>

</html>