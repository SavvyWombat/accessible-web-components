---
extends: _layouts.blog
category: Building
title: Finding the balance between minimal and opinionated styling
author: Stuart Jones
date: 2022-11-18
description: 
---

This week I've been working a bit on documentation, and thanks to some user feedback I realised I need to spend a bit on making interactive demos work.

As I've been doing this, I realised that I haven't settled on exactly how styled Accessible Web Components should be out of the box.

The motivation behind this library is to make it as simple and smooth as possible for developers to have accessible interactions that are also easy to re-style and fit into their own design.

This ends up pulling in two directions - towards minimal styling, but also towards some opinions in styling.

## No styling is not an option

Having unstyled components isn't really an option. True, it means that developers using the components do not have to override or remove any styles, but it also means that they have to do more work to ensure the component isn't made inaccessible by certain style decisions.

Given the core motivation behind this library, I don't see how completely unstyled components would help.

Besides, I'd like these components to look good out of the box.

## Too strong an opinion?

However, going the other direction and having strictly applied styles that cannot (easily) be overridden would also limit the adoption of this library. I started working on my own web components when I couldn't find others that fulfilled my needs for accessibility and stylability - we all want something that fits in with our existing design and style, or something that can easily be dropped in and readily adapted without breaking our design, or rewriting a whole lot of code.

So, accessible web components need to provide a good base style that can be adapted easily.

## Finding balance

I think finding the right balance is going to need a bit of experimentation. I also think that the right balance will be different for various components, so testing and feedback will be key as this project moves forward.

I've already been working on ways to make it easier to get styles into the shadow DOM for components that use it. There have also been some developments with CSS and support for layers that might be helpful going forward, but I think there's still plenty of room for improvement.