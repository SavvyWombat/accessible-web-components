---
title: Spin Selector
---
@extends('_layouts.default')

@section('content')
  <header>
    <h1>Spin Button</h1>

    <code class="html-tag">spin-button</code>

    <p>
      The spin button is a form input that can be used in place of an <code class="html-tag">input type="number"</code>.
    </p>
  </header>

  <section class="warning">
    <strong>
      Work in progress
    </strong>

    <p>
      I'm currently working on the design of the documentation and how to include demonstrations and code examples for
      the components.
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
<form id="form" method="get">
  <label id="label-for-rating">Rate this out of 5</label>
  <spin-button id="rating"
               name="rating"
               aria-labelledby="label-for-rating"
               min="0"
               max="5"
               step="0.1"
               value="5"
  ></spin-button>
</form>

      </x-torchlight-code>
    </pre>
  </section>

  <section>
    <h2>Accessibility</h2>

    <p>
      If a <code class="html-tag">label</code> has been associated to the <code class="html-tag">spin-button</code>, then clicking on the label will open the list of options for the selector.
    </p>

    <p>
      Keyboard navigation is also available. The element is focusable with
      <kbd>tab</kbd>.
    </p>

    <ul>
      <li><kbd>up</kbd> will increment the value by the step attribute</li>
      <li><kbd>down</kbd> will decrement the value by the step attribute</li>
      <li><kbd>pageUp</kbd> will increment the value by 10 times the step attribute</li>
      <li><kbd>pageDown</kbd> will decrement the value by 10 times the step attribute</li>
      <li><kbd>home</kbd> will set the value to the minimum, if it has been set</li>
      <li><kbd>end</kbd> will set the value to the maximum, if it has been set</li>
    </ul>

    <p>
      In addition to the above keyboard commands, the user is able to type a numerical input.
    </p>

    <h3>Screen readers</h3>

    <p>
      Screen reader users will be informed that they have focused on a <em>spinbutton</em>, along with the label associated with the <code class="html-tag">spin-button</code>. They will also be informed on the current value and whether it is a valid entry.
    </p>

    <p>
      As the user modifies the value, it will announce the new values accordingly.
    </p>
  </section>

  <section>
    <h2>Attributes</h2>

    <p>
      The following attributes can be used on the <code class="html-tag">spin-button</code> element:
    </p>

    <dl>
      <dt>autofocus</dt>
      <dd>When present, automatically focus this <code class="html-tag">spin-button</code> on page load.</dd>

      <dt>disabled</dt>
      <dd>When present, makes the <code class="html-tag">spin-button</code> not mutable, focusable, and prevents
        it from being submitted with the form.
      </dd>

      <dt>form</dt>
      <dd>The ID of the form that this <code class="html-tag">spin-button</code> is attached to. If it is not set,
        then the <code class="html-tag">spin-button</code> is attached to the closest form ancestor.
      </dd>

      <dt>max</dt>
      <dd>The maximum value of the <code class="html-tag">spin-button</code>.</dd>

      <dt>min</dt>
      <dd>The minimum value of the <code class="html-tag">spin-button</code>.</dd>

      <dt>name</dt>
      <dd>The name of the <code class="html-tag">spin-button</code> used when submitting.</dd>

      <dt>required</dt>
      <dd>When present, determines if the <code class="html-tag">spin-button</code> must have a value.</dd>

      <dt>readonly</dt>
      <dd>When present, determines if the value of the <code class="html-tag">spin-button</code> can be changed.</dd>

      <dt>step</dt>
      <dd>The amount the value of the <code class="html-tag">spin-button</code> can be incremented or decremented by.</dd>

      <dt>tabIndex</dt>
      <dd>Sets where the <code class="html-tag">spin-button</code> participates in sequential keyboard navigation.
      </dd>

      <dt>value</dt>
      <dd>The value of the <code class="html-tag">spin-button</code>.</dd>
    </dl>
  </section>

  <section>
    <h2>Form data</h2>

    <p>
      The <code class="html-tag">spin-button</code> can be used in forms, and its name/value pair will be included in the GET or POST data submitted by its associated form.
    </p>
  </section>

  <section>
    <h2>API</h2>

    <p>
      The following methods and properties can be called/access on the <code class="html-tag">spin-button</code>
      element:
    </p>

    <dl>
      <dt>decrement(number: times = 1)</dt>
      <dd>Decrement the value by the number of steps specifed by <code>times</code>. If the resulting value is less than the minimum, then the value won't be changed.</dd>

      <dt>increment(number: times = 1)</dt>
      <dd>Increment the value by the number of steps specifed by <code>times</code>. If the resulting value is greater than the maximum, then the value won't be changed.</dd>

      <dt>labels (readonly)</dt>
      <dd>Returns a NodeList of the <code class="html-tag">label</code> elements associated with the <code class="html-tag">spin-button</code>.</dd>
    </dl>
  </section>

  <section>
    <h2>More information</h2>

    <ul>
      <li>
        <a href="https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/">Aria Authoring Practices Guide: <wbr/>SpinButton</a>
      </li>
    </ul>
  </section>
@endsection