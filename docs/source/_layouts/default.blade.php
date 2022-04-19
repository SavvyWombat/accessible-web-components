@extends ('_layouts.html')

@section ('body')
<body class="grid grid-areas-layout-default grid-cols-layout-default
            min-h-full
            text-gray-900 bg-blue-900
            font-sans antialiased"
>
    <header class="grid-in-header bg-gray-100 text-blue-500 font-bold text-3xl p-2 pb-8 shadow-inner-bottom">
        <a href="/"
           title="Home Page"
           class="rounded
                      outline-offset-0
                      focus-within:no-underline focus-within:outline focus-within:outline-4 focus-within:outline-blue-300"
        >
            <h2 class="inline-block m-0 rounded
                          hover:no-underline hover:outline hover:outline-4 hover:outline-blue-300 hover:bg-blue-300">

                <img class="inline-block h-16 w-16" src="/assets/images/logo.svg" alt="" />
                <span>Accessible Web Components</span>
            </h2>
        </a>
    </header>

    <nav class="grid-in-nav sticky top-0 flex flex-col gap-6 text-gray-100 p-4 pt-9 pr-8">
        <a href="/">Accessible Web Components</a>
        <a href="/getting-started">Getting Started</a>
        <span class="border-t-2 pt-4 border-gray-100">Component Library</span>
        <a href="/component-library/dropdown-selector">Dropdown Selector</a>
        <a href="/component-library/tab-group">Tab Group</a>
    </nav>

    <main class="grid-in-main flex flex-col gap-16 mt-8 my-16">
        @yield('content')
    </main>

    <footer class="grid-in-footer bg-gray-100 text-blue-500 p-2 pt-8 text-right shadow-inner-top">
        <p>
            <span class="font-bold">Accessible Web Components</span> created by
            <a href="https://savvywombat.com.au">Savvy Wombat</a>
            © 2022
        </p>

        <p>
            Source code available on
            <a href="https://github.com/SavvyWombat/accessible-web-components"
               class="underline text-blue-700 rounded
                          outline-offset-0
                          focus:no-underline focus:outline focus:outline-4 focus:outline-blue-300
                          hover:no-underline hover:outline hover:outline-4 hover:outline-blue-300 hover:bg-blue-300"
            >GitHub</a>
        </p>
    </footer>
</body>
@endsection