---
extends: _layouts.blog
category: Building
title: Spin selectors
author: Stuart Jones
date: 2022-11-11
description: Considerations when building a spin-selector component.
---

This week I've been working on a `<spin-selector>` component.

There's a couple of things about this that have needed the most thinking about:

1. Make it behave the same as an `<input type="number"/>`
2. Allow `<option>` elements to define the choices presented to the user as well.

### Make it behave the same as an `<input type="number"/>`

In addition to the regular input attributes, `<input type="number"/>` allows the author to specify minimum and maximum values for client side validation, as well as the size of the incremental step.

For example:

```html
<input type="number" min="0" max="20" step="5" value="0"/>

<spin-selector min="0" max="20" step="5" value="0"></spin-selector>
```

I quickly learnt that some I held some incorrect assumptions about `<input type="number"/>` with regards to it's incrementing behaviour.

Starting with:
```html
<input type="number" min="0" max="20" step="5" value="8"/>
```

I thought that incrementing the value would result in it updating to be 13 (the current value is 8, and the step is 5, so I naively added the two numbers to get an outcome). What actually happened was it incremented to 10.

After a bit more investigation, I realised that when you assign a minimum value to the input, along with a step value, the input will normalise along a series starting from the minimum.

The input accepts any value when authoring, and also any value when the user types, but incrementing/decrementing the value will first force the value to be on the series.

In addition, if the value begins outside the range defined by the min and max attributes, other behaviours come into play. If the user tries to step further "away" from the range, the value will not change. If they try to step "towards" the range, the value will take on the minimum/maximum values. Finally, the next movement into the range will see the value set to a multiple of the step attribute, offset by the minimum.

```html
<input type="number" min="-10" max="10" step="3" value="-11"/>
```

Trying to decrement the value (-11) will produce no change. Incrementing, however, will give us the following sequence:

```
-11 to -10 to -7 to -4 and so on
```

This introduced a bit more handling for the increment/decrement handling.

### Allow `<option>` elements to define the choices presented to the user as well

As well as the `<input type=number>` style, which allows users to increment/decrement numerical values, I saw a use case where the input is labelled with text values that can be cycled through.

For example, a list of months. While this is already available using a [`<dropdown-selector>`](/component-library/dropdown-selector/), it may be that HTML authors want to maintain a consistent interface in some forms or widgets.

One way would be to allow the `<spin-selector>` to accept `<option>` elements, which would override the attributes:

```html
<spin-selector>
    <option value="0" selected>January</option>
    ...
    <option value="11">December</option>
</spin-selector>
```

However, I'm unsure that it's a good idea to have two patterns wrapped in a single component. It will certainly make the internal logic a bit more complicated, and could be confusing for authors using the component.

On the other hand, this will mean having two spin-selector components... and I'll have to think of a name to differentiate their use cases.