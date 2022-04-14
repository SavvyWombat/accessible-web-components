<!DOCTYPE html>
<html lang="{{ $page->language ?? 'en' }}" class="h-full">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="canonical" href="{{ $page->getUrl() }}">

        <meta name="description" content="{{ $page->description }}">

        @if ($page->title)
            <title>{{ $page->title }} / Accessible Web Components</title>
        @else
            <title>Accessible Web Components</title>
        @endif

        <link rel="stylesheet" href="{{ mix('css/base.css', 'assets/build') }}">
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

        @include('_partials.social-card')
    </head>

    @yield('body')
</html>
