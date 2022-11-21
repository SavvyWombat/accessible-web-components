---
extends: _layouts.blog
category: Building
title: Making Web Components stylable
author: Stuart Jones
date: 2022-11-22
description: What I learnt when trying to make an accessible Web Component.
canonical:
  url: https://www.horuskol.net/blog/2022-03-09/making-web-components-stylable/
  title: "HorusKol: Making Web Components stylable"
series:
  title: Working with Web Components
  posts:
    - post:
      title: Making Web Components accessible
      url: /blog/2022-11-14/making-web-components-accessible/
    - post:
      title: Making Web Components stylable
      url: /blog/2022-11-22/making-web-components-stylable/
---

In my last article I wrote about working on building [accessible Web Components](/blog/2022-02-08/making-web-components-accessible/).

Now, lets looking at the current state of styling Web Components, and how we might allow developers to style a Web Component they're reusing from a library or package.

The problem of styling is actually caused by one of the features of working with Web Components, which use the [Shadow DOM][MDN - Shadow DOM]. This acts like a container which limits scripting and styling crossing over between the regular DOM and the Web Component - allowing Web Components to be discrete units that can be placed in any project. Unfortunately, this means that the ability for developers trying to include Web Components into their project have very limited style control.

On the other hand, while we want to allow developers using Web Components to have style control, we need to be careful to let that kind of control be deliberate and not just have an external stylesheet run roughshod over the considered design of the component.

So, what is the current state of styling Web Components, and how can it be done?

## The reading

Web Components were introduced in 2011, but general support for them took a while. Over time, the approaches available to style them has shifted and evolved.

[Smashing Magazine] wrote about the various approaches available in 2016.

[CSS Tricks] have written a couple of articles, too, with the most recent in January 2021 (although it was updated in December).

Some other good reads are this [explainer on CSS Shadow ::part and ::theme] and a [blog post by Nolan Lawson].

## The first simple/naive attempt - failure

One of my objectives was to create the least amount of friction for developers using Web Components.

In my earlier blog post, I wrote about how I designed the `<dropdown-selector>` to work similar to a native `<select>`, particularly with how options were added to the element.

```html
<dropdown-selector>
    <option>First choice</option>
</dropdown-selector>
```

Because I discovered that the contents of `<dropdown-selector>` were replaced by the component's own HTML and therefore weren't rendered, I thought that I could maybe do a similar thing with the `<style>` element and pull it in like I had with the `<option>` elements:

```html
<dropdown-selector>
    <option>First choice</option>
    
    <style>
        * {
          background-color: #ccffcc;  
        }
    </style>
</dropdown-selector>
```

Unfortunately, the styles were applied to everything outside of the Web Component.

## (Ab)using the media selector for success

After spending quite a big longer reading, thinking, working on other stuff, and just avoiding coming back to the problem, I suddenly had an idea. There is a way to create styles that are not applied, except in specific circumstances, and developers and designers use it all the time.

The media selector - `<style media="print">` or `@media print`, for example. I freshened up on the [@media rule][MDN - @media] and, while I wasn't sure it was a good idea, it didn't seem that there was anything specifically saying I couldn't do what I had thought of.

Basically, the idea came to me that I could do something like:

```html
<style media="dropdown-selector">
    * {
        background-color: #ccffcc;
    }
</style>
```

Or:

```css
@media dropdown-selector {
  * {
    background-color: #ccffcc;
  }
}
```

The tricky bit was then how to inject those styles into the element.

### CSSOM - the CSS Object Model

Just as there is a DOM api which lets us access and modify the HTML in a document through JavaScript, there is something known as the [CSSOM][MDN - CSSOM].

When working with Web Components that are using an open Shadow DOM, we can access the parent document's CSSOM in much the same way I had already accessed its DOM to pull in the dropdown's options.

```javascript
Array.from(document.styleSheets).forEach((outerStyleSheet) => {
  if (Array.from(outerStyleSheet.media).includes('dropdown-selector')) {
    const styleSheet = document.createElement('style');
    this.shadowRoot.appendChild(styleSheet);

    Array.from(outerStyleSheet.cssRules).forEach((cssRule) => {
      styleSheet.sheet.insertRule(cssRule.cssText);
    });

    return;
  }

  if (Array.from(outerStyleSheet.cssRules).find((cssRule) => {
    return cssRule.media && Array.from(cssRule.media).includes('dropdown-selector');
  })) {
    const styleSheet = document.createElement('style');
    this.shadowRoot.appendChild(styleSheet);

    Array.from(outerStyleSheet.cssRules).forEach((cssRule) => {
      if (cssRule.media && Array.from(cssRule.media).includes('dropdown-selector')) {
        Array.from(cssRule.cssRules).forEach((cssRule) => {
          styleSheet.sheet.insertRule(cssRule.cssText);
        });
      }
    });
  }
});
```

Every `<style>` element in the document is accessible in the list under `document.styleSheets`, and each of those stylesheets has a `media` property which itself is a list which we can then look at to see if we are applying the styles to our dropdown.

When we find a stylesheet with the correct `media` property, we copy the rules from the original stylesheet into a new `<style>` element which we append to our component's Shadow DOM.

I also put in code to search for whenever an `@media` rule had been used within any stylesheet and copy the rules wrapped within.

This was working - I could now apply any styles to override the original built-in styles of the component. However, I wasn't particular keen on this use of the media selector - the browser itself wasn't complaining, and it was working, but it just didn't sit right.

On the other hand, the day was ending and it was time for dinner. So I committed the code as a proof of concept, and left it there.

## The obvious in hindsight solution

Taking a step back and doing something else is a super-power for developers. Because, even if you're not actively thinking about the problem, your brain can put it into some kind of background process. Later, under the right conditions, a new perspective can bubble up.

So at about midnight, just as I'd laid my bedside book down and turned out the lamp, I realised that I didn't need the media selector at all. There was another perfectly acceptable solution that didn't require developers to use any tricky syntax, and didn't require the abuse of existing HTML/CSS attributes.

We are adding a new custom element, named 'dropdown-selector'. CSS could use that as a selector:

```css
dropdown-selector * {
  background-color: #ccffcc;
}
```

We could then look for CSS rules that include that as a selector:

```javascript
Array.from(document.styleSheets).forEach((outerStyleSheet) => {
  Array.from(outerStyleSheet.cssRules).forEach((cssRule) => {
    if (cssRule.selectorText && cssRule.selectorText.startsWith('dropdown-selector')) {
      const rule = cssRule.cssText.replace('dropdown-selector ', '');

      styleSheet.sheet.insertRule(rule);
    }
  });
});
```

This has the advantage of simplifying what we were doing before.

## Specific styling with class and ID selectors

The above solution works fine if developers/designers want to apply general styles to all dropdown-selectors. But what if they want to target specific styles with a class or ID selector?

```html
<dropdown-selector id="months" class="groovy funky">

</dropdown-selector>
```

### ID selector

This is the easier of the two.

Given the element has an ID of `months`, we can pull out any rules that use `#months` in the selector. The only thing we have to do is replace `#months` with a selector that matches the root element in our component's Shadow DOM:

```javascript
Array.from(document.styleSheets).forEach((outerStyleSheet) => {
  Array.from(outerStyleSheet.cssRules).forEach((cssRule) => {
    // ...

    if (this.id && cssRule.selectorText.startsWith(`#${this.id}`)) {
      const rule = cssRule.cssText.replace(`#${this.id} `, '#root ');

      styleSheet.sheet.insertRule(rule);
    }
  });
});
```

So, styles that select the dropdown by ID will apply, and in a way that maintains specificity:

```css
#months {
  background-color: #ccccff;
}
```

### Class selector

While the ID selector is relatively simple to implement, because it is a single and (hopefully) unique value, class selectors are going to be trickier. Elements can belong to multiple classes. Class selectors can also stack `.this.that`.

First, we'll copy the classes across from the dropdown-selector element:

```javascript
Array.from(this.classList).forEach((cssClass) => {
  this.__root.classList.add(cssClass);
});
```

Then we just pull any applicable rules:

```javascript
Array.from(document.styleSheets).forEach((outerStyleSheet) => {
  Array.from(outerStyleSheet.cssRules).forEach((cssRule) => {
    // ...

    Array.from(this.classList).forEach((cssClass) => {
      console.log(cssClass);
      if (cssRule.selectorText.includes(`.${cssClass}`)) {
        styleSheet.sheet.insertRule(cssRule.cssText);
      }
    });
  });
});
```

Again, this means when developers/designers put in a CSS rule like below, the same specificity applies:

```css
.groovy.funky {
  background-color: #ffccff;
}
```

## Further work to do

So, as a proof of concept, this certainly works. I don't think it's a done job though, and I'm sure there'll be edge cases on the way.

For example, more complex selectors like `#some-form dropdown-selector .option` won't necessarily work with the current solution.

There's also the matter of media selectors and the new layer feature coming into CSS. I need to be able to pick out rules like this and appropriately apply them:

```css
@media (prefers-color-sceme: dark) {
  dropdown-selector {
    background-color: #003300;
  }
}
```

I also use a lot of Tailwind CSS in my projects - but so far I've limited myself to using vanilla CSS. So, I'll need to come up with a solution that works well with Tailwind CSS. There's also a lot of other CSS frameworks, not to mention CSS-in-JS and so on.

One more thing: having this code pull in the styles every time the Web Component is used in a document is inefficient, so it looks like I'm going to have to get working on some kind of core enabling code to handle this.

The journey continues...

[MDN - Shadow DOM]: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM
[Smashing Magazine]: https://www.smashingmagazine.com/2016/12/styling-web-components-using-a-shared-style-sheet/
[CSS Tricks]: https://css-tricks.com/styling-web-components/
[explainer on CSS Shadow ::part and ::theme]: https://github.com/fergald/docs/blob/master/explainers/css-shadow-parts-1.md
[blog post by Nolan Lawson]: https://nolanlawson.com/2021/01/03/options-for-styling-web-components/
[MDN - @media]: https://developer.mozilla.org/en-US/docs/Web/CSS/@media
[MDN - CSSOM]: https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model