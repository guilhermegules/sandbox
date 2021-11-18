<?php /* Smarty version Smarty-3.1.13, created on 2021-11-18 01:23:47
         compiled from "view/login.tpl" */ ?>
<?php /*%%SmartyHeaderCode:2135119656618c671834e471-13342641%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'da8a4b848c32e8200e6786794324d5335bfd0771' => 
    array (
      0 => 'view/login.tpl',
      1 => 1637195024,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '2135119656618c671834e471-13342641',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.13',
  'unifunc' => 'content_618c671837f484_21006217',
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_618c671837f484_21006217')) {function content_618c671837f484_21006217($_smarty_tpl) {?><html lang="pt-BR">
<?php echo $_smarty_tpl->getSubTemplate ("head.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>


<body class="off-canvas-sidebar">
  <nav class="navbar navbar-primary navbar-transparent navbar-absolute">
    <div class="container">
      <div class="navbar-header">
      </div>
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a href="../dashboard.html">
              <i class="material-icons">dashboard</i>
              Dashboard
            </a>
          </li>
          <li class="">
            <a href="register.html">
              <i class="material-icons">person_add</i>
              Register
            </a>
          </li>
          <li class=" active ">
            <a href="login.html">
              <i class="material-icons">fingerprint</i>
              Login
            </a>
          </li>
          <li class="">
            <a href="lock.html">
              <i class="material-icons">lock_open</i>
              Lock
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="wrapper wrapper-full-page">
    <div class="full-page login-page" filter-color="black" data-color="blue">
      <!--   you can change the color of the filter page using: data-color="blue | purple | green | orange | red | rose " -->
      <div class="content">
        <div class="container">
          <div class="row">
            <div class="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
              <form action="acesso.php" method="POST">
                <div class="card card-login card-hidden">
                  <div class="card-header text-center" data-background-color="rose">
                    <h4 class="card-title">Login</h4>
                    <div class="social-line">
                      <a href="#btn" class="btn btn-just-icon btn-simple">
                        <i class="fa fa-facebook-square"></i>
                      </a>
                      <a href="#pablo" class="btn btn-just-icon btn-simple">
                        <i class="fa fa-twitter"></i>
                      </a>
                      <a href="#eugen" class="btn btn-just-icon btn-simple">
                        <i class="fa fa-google-plus"></i>
                      </a>
                    </div>
                  </div>
                  <p class="category text-center">

                  </p>
                  <div class="card-content">

                    <div class="input-group">
                      <span class="input-group-addon">
                        <i class="material-icons">email</i>
                      </span>

                      <div class="form-group label-floating">
                        <label class="control-label">Email address</label>
                        <input type="text" class="form-control" name="email">
                      </div>
                    </div>

                    <div class="input-group">
                      <span class="input-group-addon">
                        <i class="material-icons">lock_outline</i>
                      </span>
                      <div class="form-group label-floating">
                        <label class="control-label">Password</label>
                        <input type="password" class="form-control" name="password">
                      </div>
                    </div>
                  </div>

                  <button type="submit" class="btn btn-rose btn-simple btn-wd btn-lg">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <?php echo $_smarty_tpl->getSubTemplate ("scripts.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>

</body>

</html><?php }} ?>