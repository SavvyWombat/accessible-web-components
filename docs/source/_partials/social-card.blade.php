<meta property="og:type" content="website"/>

<meta name="twitter:card" content="summary"/>
<meta name="twitter:site" content="https://accessible-web-components.dev"/>
<meta name="twitter:site:id" content="@SavvyWombat"/>

<meta property="og:url" content="{{ $page->getUrl() }}"/>
<meta property="og:locale" content="en_AU"/>

@if ($page->title)
    <meta property="og:title" content="{{ $page->title }}"/>
@else
    <meta property="og:title" content="Accessible Web Components"/>
@endif

<meta property="og:description" content="{{ $page->description }}"/>
<meta property="og:image" content="https://accessible-web-components.dev/assets/images/accessible-web-components.png"/>