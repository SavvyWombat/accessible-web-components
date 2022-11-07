---
title: Vertical Menu
---
@extends('_layouts.default')

@section('content')
  <header>
    <h1>Vertical Menu</h1>

    <code class="html-tag">vertical-menu</code>

    <p>
      A vertical menu provides additional interactivity, be allowing uses to move up and down the menu with arrow keys as well as using the tab key.
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
  </section>

  <section>
    <h2>Accessibility</h2>

    <p>
      This component provides additional keyboard navigation within the menu:
    </p>

    <ul>
      <li>Links in the menu will gain focus with the <kbd>tab</kbd> and <kbd>meta</kbd>+<kbd>tab</kbd></li>
      <li>If at the start or end of the menu, pressing <kbd>tab</kbd> or <kbd>meta</kbd>+<kbd>tab</kbd> will move focus to the previous or next focusable element, as appropriate</li>
      <li><kbd>up</kbd> and <kbd>down</kbd> will move focus to the previous/next link in the menu - up and down navigation is constrained within the menu</li>
      <li><kbd>home</kbd> will move focus to the first link in the menu</li>
      <li><kbd>end</kbd> will move focus to the last link in the menu</li>
    </ul>
  </section>
@endsection