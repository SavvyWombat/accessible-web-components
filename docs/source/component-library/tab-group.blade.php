---
title: Tab Group
---
@extends('_layouts.default');

@section('content')
    <header>
        <h1>Tab Group</h1>

        <code class="html-tag">tab-group</code>

        <p>
            Tab groups are used to collect content into a series of tabbed views.
            Tabs are generated from the highest level headings found within the <code class="html-tag">tab-group</code>.
            Activating a tab will show the content associated to that tab.
        </p>
    </header>

    <section>
        <h2>Demonstration</h2>

        <tab-group>
            <h3>Wombats</h3>

            <p>
                There are three living species of wombat, and several others
                that are now extinct.
            </p>

            <h4>Common wombat</h4>
            <h4>Northern hairy-nosed wombat</h4>
            <h4>Southern hairy-nosed wombat</h4>

            <h3>Quokkas</h3>

            <p>
                Quokkas are a small marsupial closely related to wallabies.
            </p>

            <h3>Wallabies</h3>

            <p>
                Wallaby is sometimes used as a generic name for marsupials
                that are a bit smaller than kangaroos and a bit bigger
                than rats, so there are a lot of different species of wallaby.
            </p>

            <p>
                The main groups are true wallabies, the swamp wallaby,
                rock-wallabies, hare-wallabies, nail-tails, dorcopsis,
                padmelons, and the quokka.
            </p>
        </tab-group>
    </section>

    <section>
        <h2>Accessibility</h2>
    </section>

    <section>
        <h2>Example code</h2>

        <pre>
            <x-torchlight-code language="html">
<tab-group>
    <h3>Wombats</h3>

    <p>
        There are three living species of wombat, and several others
        that are now extinct.
    </p>

    <h4>Common wombat</h4>
    <h4>Northern hairy-nosed wombat</h4>
    <h4>Southern hairy-nosed wombat</h4>

    <h3>Quokkas</h3>

    <p>
        Quokkas are a small marsupial closely related to wallabies.
    </p>

    <h3>Wallabies</h3>

    <p>
        Wallaby is sometimes used as a generic name for marsupials
        that are a bit smaller than kangaroos and a bit bigger
        than rats, so there are a lot of different species of
        wallaby.
    </p>

    <p>
        The main groups are true wallabies, the swamp wallaby,
        rock-wallabies, hare-wallabies, nail-tails, dorcopsis,
        padmelons, and the quokka.
    </p>
</tab-group>
            </x-torchlight-code>
        </pre>
    </section>

    <section>
        <h2>API</h2>
    </section>

    <section>
        <h2>More information</h2>

        <ul>
            <li>
                <a href="https://w3c.github.io/aria-practices/#tabpanel">WAI-ARIA Authoring Practices 1.2: <wbr/>Tabs</a>
            </li>
            <li>
                <a href="https://w3c.github.io/aria-practices/#accordion">WAI-ARIA Authoring Practices 1.2: <wbr/>Accordion</a>
            </li>
        </ul>
    </section>
@endsection