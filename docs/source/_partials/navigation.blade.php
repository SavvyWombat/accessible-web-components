<nav class="grid-in-nav sticky top-0 overscroll-none text-gray-100 bg-blue-900 p-4 pr-8">
    <span id="site-navigation-control"
          class="wide:hidden block no-underline text-gray-100 rounded
              outline-offset-0
              focus:no-underline focus:outline focus:outline-4 focus:outline-blue-300
              hover:no-underline hover:outline hover:outline-4 hover:outline-blue-300 hover:bg-blue-300 hover:text-blue-900
              cursor-pointer
              text-3xl font-bold"
          tabindex="0"
          aria-controls="site-navigation"
          aria-haspopup="true"
    >
        Site Navigation
    </span>

    <div id="site-navigation" class="flex flex-col gap-6 pt-9 medium:hidden">
        <a href="/">Accessible Web Components</a>
        <a href="/getting-started/">Getting Started</a>

        <span class="block pt-4 border-t-2 border-gray-100 font-bold"><a href="/component-mixins/">Component Mixins</a></span>
        <a href="/component-mixins/labelled-component/">LabelledComponent</a>
        <a href="/component-mixins/styled-component/">StyledComponent</a>

        <span class="block pt-4 border-t-2 border-gray-100 font-bold"><a
                    href="/component-library/">Component Library</a></span>
        <a href="/component-library/dropdown-selector/">Dropdown Selector</a>
        <a href="/component-library/tab-group/">Tab Group</a>
    </div>
</nav>

<script>
  const control = document.getElementById('site-navigation-control');
  const menu = document.getElementById('site-navigation');

  const toggleMenu = () => {
    if (menu.clientHeight) {
      menu.style.display = 'none';
      menu.setAttribute('aria-expanded', 'false');
    } else {
      menu.style.display = 'flex';
      menu.setAttribute('aria-expanded', 'true');
    }
  }

  const closeMenu = () => {
    if (control.clientHeight) {
      menu.style.display = 'none';
      menu.setAttribute('aria-expanded', 'false');
    }
  }

  control.addEventListener('click', toggleMenu);

  control.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      toggleMenu();
    }

    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  menu.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  })

  const resizeObserver = new ResizeObserver(entries => {
    if (entries[0].target.clientHeight === 0) {
      menu.style.display = '';
      menu.removeAttribute('aria-expanded');
    } else {
      if (! menu.hasAttribute('aria-expanded')) {
        menu.setAttribute('aria-expanded', 'false');
      }
    }
  });

  resizeObserver.observe(control);
</script>