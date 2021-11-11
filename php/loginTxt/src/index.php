<?php
require_once("Controller/UserController.php");
$userController = new UserController();
$msg = "";
if (filter_input(INPUT_POST, "loginUser", FILTER_SANITIZE_STRING)) {
  if ($userController->auth(filter_input(INPUT_POST, "loginUser", FILTER_SANITIZE_STRING), filter_input(INPUT_POST, "loginPass", FILTER_SANITIZE_STRING))) {
    header("Location: panel.php");
  } else {
    $msg = "<div class='alert alert-warning'>Email or password invalid</div>";
  }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./bootstrap/css/bootstrap.min.css">
  <link rel="stylesheet" href="./css/styles.css">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
  <title>Login TXT</title>
</head>

<body>
  <div class="container">
    <div class="d-flex justify-content-center h-100">
      <div class="card">
        <div class="card-header">
          <h3>Sign In</h3>
          <div class="d-flex justify-content-end social_icon">
            <span><i class="fab fa-facebook-square"></i></span>
            <span><i class="fab fa-google-plus-square"></i></span>
            <span><i class="fab fa-twitter-square"></i></span>
          </div>
        </div>
        <div class="card-body">
          <form>
            <div class="input-group form-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-user"></i></span>
              </div>
              <input type="text" name="loginUser" class="form-control" placeholder="Email @">
            </div>
            <div class="input-group form-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fas fa-key"></i></span>
              </div>
              <input type="password" name="loginPass" class="form-control" placeholder="Password">
            </div>
            <div class="form-group">
              <input type="submit" value="Login" class="btn float-right login_btn">
            </div>
          </form>
          <div>
            <?= $msg; ?>
          </div>
        </div>
        <div class="card-footer">
          <div class="d-flex justify-content-center links">
            Don't have an account?<a href="register.php">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script src="./js/jquery.js"></script>
  <script src="./bootstrap/js/bootstrap.min.js"></script>
</body>

</html>