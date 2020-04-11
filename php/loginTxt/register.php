<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
  <link rel="stylesheet" href="./css/register.css">
  <title>Register</title>
</head>
<body>
  <div class="container">
    <div class="d-flex justify-content-center h-100">
      <div class="card cardbox">
        <div class="card-header">
          <h3>Register</h3>
        </div>
        <div class="card-body">
          <div class="form-group">
            <form id="login" method="post" role="form" class="form" accept-charset="UTF-8">
            <div class="input-group form-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-user"></i></span>
              </div>
              <input type="text" name="registerUser" class="form-control" placeholder="username">
            </div>
            <div class="input-group form-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-key"></i></span>
              </div>
              <input type="password" name="registerPass" class="form-control" placeholder="password">
            </div>
            <div class="input-group form-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-envelope"></i></span>
              </div>
              <input type="email" name="registerEmail" class="form-control" placeholder="Email @">
            </div>
              <div class="form-group">
                <button name="btnRegister" class="btn btn-block btn-primary">Register</button>
              </div>
            </form>
          </div>
          <div class="login-or">
            <hr class="hr-or">
          </div>
          <div class="bottom text-center">
            Have account? <a href="index.php"><b>Login</b></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>

</html>