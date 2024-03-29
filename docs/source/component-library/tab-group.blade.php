---
title: Tab Group
---
@extends('_layouts.default')

@section('content')
  <header>
    <h1>Tab Group</h1>

    <code class="html-tag">tab-group</code>

    <p>
      Tab groups are used to collect content into a series of tabbed views, which are organised using <code class="html-tag">tab-card</code>.
      Tabs are generated from the highest level headings found within the <code class="html-tag">tab-group</code>.
      Activating a tab will show the content associated to that tab.
    </p>
  </header>

  <section class="warning">
    <strong>
      Work in progress
    </strong>

    <p>
      I'm currently working on the design of the documentation and how to include demonstrations and code examples
      for the components.
    </p>
  </section>

  <section>
    <h2>Demonstration</h2>

    <p>
      Under construction
    </p>

    <h3>Example usage</h3>

    <pre>
      <x-torchlight-code language="html">
<tab-group>
    <tab-card>
      <h3>Wombats</h3>

      <p>
        There are three living species of wombat, and several others
        that are now extinct.
      </p>

      <ul>
        <li>Common wombat</li>
        <li>Northern hairy-nosed wombat</li>
        <li>Southern hairy-nosed wombat</li>
      </ul>
    </tab-card>

    <tab-card>
      <h3>Quokkas</h3>

      <p>
        Quokkas are a small marsupial closely related to wallabies.
      </p>
    </tab-card>

    <tab-card>
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
    </tab-card>
</tab-group>

      </x-torchlight-code>
    </pre>
  </section>

  <section>
    <h2>Accessibility</h2>

    <p>
      Keyboard navigation is available. The element is focusable with
      <kbd>tab</kbd>.
    </p>

    <h3>When focused</h3>

    <ul>
      <li><kbd>tab</kbd> will focus the next focusable element</li>
      <li><kbd>left</kbd> will highlight the previous tab</li>
      <li><kbd>right</kbd> will highlight the next tab</li>
      <li><kbd>home</kbd> will highlight the first tab</li>
      <li><kbd>end</kbd> will highlight the last tab</li>
      <li><kbd>space</kbd> and <kbd>enter</kbd> will open the highlighted tab</li>
    </ul>

    <h3>Screen readers</h3>

    <p>
      Screen reader users will be informed that they have focused a <em>page tab</em>.
    </p>

    <p>
      When activating a tab, the user will be informed that they have selected that tab.
    </p>
  </section>

  <section>
    <h2>More information</h2>

    <ul>
      <li>
        <a href="https://w3c.github.io/aria-practices/#tabpanel">WAI-ARIA Authoring Practices 1.2:
          <wbr/>
          Tabs</a>
      </li>
      <li>
        <a href="https://w3c.github.io/aria-practices/#accordion">WAI-ARIA Authoring Practices 1.2:
          <wbr/>
          Accordion</a>
      </li>
    </ul>
  </section>
@endsection