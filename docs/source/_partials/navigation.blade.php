<vertical-menu class="grid-in-nav sticky top-0 overscroll-none text-gray-100 bg-blue-900 p-4 pr-8 medium:p-0">
    <nav>
        <span id="site-navigation-control"
              class="wide:hidden block no-underline text-gray-100 rounded bg-blue-900
                  medium:px-3 medium:py-2
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

        <ul id="site-navigation" class="gap-6 pt-9 medium:hidden list-none bg-blue-900 m-0 p-4">
            <li><a href="/">Accessible Web Components</a></li>
            <li><a href="/getting-started/">Getting Started</a></li>

            <li class="block pt-6 border-t-2 border-gray-100"><a href="/blog">Blog</a></li>

            <li class="block pt-6 border-t-2 border-gray-100 font-bold"><a href="/component-mixins/">Component Mixins</a></li>
            <li><a href="/component-mixins/labelled-component/">LabelledComponent</a></li>
            <li><a href="/component-mixins/styled-component/">StyledComponent</a></li>

            <li class="block pt-6 border-t-2 border-gray-100 font-bold"><a href="/component-library/">Component Library</a></li>
            <li><a href="/component-library/dropdown-selector/">Dropdown Selector</a></li>
            <li><a href="/component-library/spin-button/">Spin Button</a></li>
            <li><a href="/component-library/tab-card/">Tab Card</a></li>
            <li><a href="/component-library/tab-group/">Tab Group</a></li>
            <li><a href="/component-library/vertical-menu/">Vertical Menu</a></li>
        </ul>
    </nav>
</vertical-menu>

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