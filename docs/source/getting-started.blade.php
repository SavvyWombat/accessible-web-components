---
title: Getting Started
---

@extends('_layouts.default')

@section('content')
    <div class="flex flex-col gap-16 mt-8 my-16">
        <section class="p-8 pb-8 bg-gray-100 shadow-inner rounded-2xl">
            <h1 class="text-3xl font-bold text-blue-500">Getting Started</h1>
        </section>

        <section class="p-6 bg-gray-100 shadow-inner shadow-red-300 rounded-2xl bg-red-100">
            <p class="font-bold">
                Work in progress
            </p>

            <p class="mt-4">
                This library is currently in development, and has not yet been released as a package.
            </p>

            <p class="mt-4">
                This page is a placeholder.
            </p>
        </section>

        <section class="p-6 bg-gray-100 shadow-inner rounded-2xl">
            <h2 class="text-3xl font-bold text-blue-500">Installation as a package</h2>

            <p class="mt-4">
                To install as a package from NPM, use the appropriate command for your package management tool:
            </p>

            <code class="block mt-4 p-4 shadow-code rounded-2xl">
                <pre>npm require @savvywombat/accessible-web-components</pre>
            </code>

            <code class="block mt-4 p-4 shadow-code rounded-2xl">
                <pre>yarn add @savvywombat/accessible-web-components</pre>
            </code>
        </section>

        <section class="p-6 bg-gray-100 shadow-inner rounded-2xl">
            <h2 class="text-3xl font-bold text-blue-500">Vanilla JavaScript</h2>
        </section>

        <section class="p-6 bg-gray-100 shadow-inner rounded-2xl">
            <h2 class="text-3xl font-bold text-blue-500">Vue.js</h2>
        </section>

        <section class="p-6 bg-gray-100 shadow-inner rounded-2xl">
            <h2 class="text-3xl font-bold text-blue-500">React</h2>
        </section>

         bg-gray-100 shadow-inner rounded-2xl">
            <h2 class="text-3xl font-bold text-blue-500">Other Frameworks</h2>
        </section>
    </div>
@endsection