<!DOCTYPE html>
<html lang="{{ $page->language ?? 'en' }}" class="h-full">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="canonical" href="{{ $page->getUrl() }}">

        @if ($page->description)
            <meta name="description" content="{{ $page->description }}">
        @endif

        @if ($page->title)
            <title>{{ $page->title }} / Accessible Web Components</title>
        @else
            <title>Accessible Web Components</title>
        @endif

        <link rel="stylesheet" href="{{ mix('css/main.css', 'assets/build') }}">
        <script defer src="{{ mix('js/main.js', 'assets/build') }}"></script>

        <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">
        <link rel="mask-icon" href="/assets/images/safari-pinned-tab.svg" color="#4878d2">
        <meta name="apple-mobile-web-app-title" content="Accessible Web Components">
        <meta name="application-name" content="Accessible Web Components">
        <meta name="msapplication-TileColor" content="#13264b">
        <meta name="theme-color" content="#13264b">
    </head>
    <body class="grid grid-areas-layout-default grid-cols-layout-default grid-rows-layout-default
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

        <nav class="grid-in-nav sticky top-0 flex flex-col gap-6 text-gray-100 p-4 pt-8">
            <a href="/">Accessible Web Components</a>
            <a href="/getting-started">Getting Started</a>
        </nav>

        <main class="grid-in-main">
            @yield('body')
        </main>

        <footer class="grid-in-footer bg-gray-100 text-blue-500 p-2 pt-8 text-right shadow-inner-top">
            <p>
                <span class="font-bold">Accessible Web Components</span> created by
                <a href="https://savvywombat.com.au"
                   class="underline text-blue-700 rounded
                          outline-offset-0
                          focus:no-underline focus:outline focus:outline-4 focus:outline-blue-300
                          hover:no-underline hover:outline hover:outline-4 hover:outline-blue-300 hover:bg-blue-300"
                >Savvy Wombat</a>
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
</html>
