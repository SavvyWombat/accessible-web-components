---
title: Dropdown Selector
---

@extends('_layouts.default');

@section('content')
    <div class="flex flex-col gap-16 mt-8 my-16">
        <section class="p-8 pb-8 bg-gray-100 shadow-inner rounded-2xl border-2 border-gray-300">
            <h1 class="text-3xl font-bold text-blue-500">Dropdown Selector</h1>

            <pre class="mt-4"><code>&lt;dropdown-selector></code></pre>
        </section>

        <section class="p-8 pb-12 bg-gray-100 shadow-inner shadow-red-300 rounded-2xl border-2 bg-red-100">
            <p class="text-red-600 font-bold">
                Work in progress
            </p>

            <p class="mt-4">
                I'm currently working on the design of the documentation and how to include demonstrations and code examples for the components.
            </p>
        </section>

        <section class="p-8 pb-12 bg-gray-100 shadow-inner rounded-2xl border-2 border-gray-300">
            <h2 class="text-3xl font-bold text-blue-500">Demonstration</h2>
        </section>

        <section class="p-8 pb-12 bg-gray-100 shadow-inner rounded-2xl border-2 border-gray-300">
            <h2 class="text-3xl font-bold text-blue-500">Accessibility</h2>

            <p class="mt-4">
                If a <code>&lt;label></code> has been associated to the <code>&lt;dropdown-selector></code>, then clicking on the label will open the list of options for the selector.
            </p>

            <p class="mt-4">
                Users can also use keyboard navigation to reach the element and use it.
            </p>
        </section>

        <section class="p-8 pb-12 bg-gray-100 shadow-inner rounded-2xl border-2 border-gray-300">
            <h2 class="text-3xl font-bold text-blue-500">Example code</h2>
        </section>

        <section class="p-8 pb-12 bg-gray-100 shadow-inner rounded-2xl border-2 border-gray-300">
            <h2 class="text-3xl font-bold text-blue-500">API</h2>
        </section>
    </div>
@endsection