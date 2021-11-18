<?php /* Smarty version Smarty-3.1.13, created on 2021-11-18 03:35:13
         compiled from "/opt/lampp/htdocs/app-esp/php-playground/pizzaria-mvc/view/login.tpl" */ ?>
<?php /*%%SmartyHeaderCode:674324396195bbab4ffe58-56160236%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'cdd4a14c533b4ffb7db55ed1d4b5f6a53c8b5cd1' => 
    array (
      0 => '/opt/lampp/htdocs/app-esp/php-playground/pizzaria-mvc/view/login.tpl',
      1 => 1637202911,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '674324396195bbab4ffe58-56160236',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.13',
  'unifunc' => 'content_6195bbab53d760_67846700',
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_6195bbab53d760_67846700')) {function content_6195bbab53d760_67846700($_smarty_tpl) {?><html lang="pt-BR">
<?php echo $_smarty_tpl->getSubTemplate ("head.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>


<body>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6 text-center mb-5">
        <h2 class="heading-section">Login #07</h2>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-12 col-lg-10">
        <div class="wrap d-md-flex">
          <div class="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
            <div class="text w-100">
              <h2>Welcome to login</h2>
              <p>Don't have an account?</p>
              <a href="#" class="btn btn-white btn-outline-white">Sign Up</a>
            </div>
          </div>
          <div class="login-wrap p-4 p-lg-5">
            <div class="d-flex">
              <div class="w-100">
                <h3 class="mb-4">Sign In</h3>
              </div>
              <div class="w-100">
                <p class="social-media d-flex justify-content-end">
                  <a href="#" class="social-icon d-flex align-items-center justify-content-center"><span
                      class="fa fa-facebook"></span></a>
                  <a href="#" class="social-icon d-flex align-items-center justify-content-center"><span
                      class="fa fa-twitter"></span></a>
                </p>
              </div>
            </div>
            <form action="#" class="signin-form">
              <div class="form-group mb-3">
                <label class="label" for="name">Username</label>
                <input type="text" class="form-control" required>
              </div>
              <div class="form-group mb-3">
                <label class="label" for="password">Password</label>
                <input type="password" class="form-control" required>
              </div>
              <div class="form-group">
                <button type="submit" class="form-control btn btn-primary submit px-3">Sign In</button>
              </div>
              <div class="form-group d-md-flex">
                <div class="w-50 text-left">
                  <label class="checkbox-wrap checkbox-primary mb-0">Remember Me
                    <input type="checkbox" checked>
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div class="w-50 text-md-right">
                  <a href="#">Forgot Password</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <?php echo $_smarty_tpl->getSubTemplate ("scripts.tpl", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>

</body>

</html><?php }} ?>