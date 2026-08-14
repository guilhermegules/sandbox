<div class="wrapper">
  <div class="sidebar" data-color="purple" data-background-color="white" data-image="assets/img/sidebar-1.jpg">
    {if !!$name}
      <div class="logo">
        <a class="simple-text logo-normal">
          Bem vindo(a) {$name|truncate:15}
        </a>
      </div>

    {else}
      <div class="logo">
        <a class="simple-text logo-normal">
          {$action}
        </a>
      </div>

    {/if}

    <div class="sidebar-wrapper">
      <ul class="nav">
        <li class="nav-item">
          <a class="nav-link" href="{$menuActionFile}">
            <i class="material-icons">
              local_pizza
            </i>
            <p>{$menuAction}</p>
          </a>
    </div>
</div>