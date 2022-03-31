@extends('_layouts.default')

@section('content')
    <div class="flex flex-col gap-16 mt-8 my-16">
        <section class="p-8 pb-8 bg-gray-100 shadow-inner rounded-2xl border-2 border-gray-300">
            <h1 class="text-3xl font-bold text-blue-500">Getting Started</h1>
        </section>

        <section class="p-8 pb-12 bg-gray-100 shadow-inner rounded-2xl border-2 border-gray-300">
            <h2 class="text-3xl font-bold text-blue-500">Installation as a package</h2>

            <p class="mt-4">
                To install as a package from NPM, use the appropriate command for your package management tool:
            </p>

            <code class="block mt-4 p-4 border-4 shadow-code rounded-2xl border-gray-300">
                <pre>npm require @savvywombat/accessible-web-components</pre>
            </code>

            <code class="block mt-4 p-4 border-4 shadow-code rounded-2xl border-gray-300">
                <pre>yarn add @savvywombat/accessible-web-components</pre>
            </code>
        </section>

        <section class="p-8 pb-12 bg-gray-100 shadow-inner rounded-2xl border-2 border-gray-300">
            <h2 class="text-3xl font-bold text-blue-500">Vanilla JavaScript</h2>


            <section class="pt-8">
                <h3 class="text-2xl font-bold text-blue-500">Usage Without any Tooling</h3>

                <p class="mt-4">
                    Download as a zip?
                </p>

                <p class="mt-4">
                    It is possible to use Accessible Web Components with any JavaScript tooling at all.
                </p>

                <p class="mt-4">
                    Download the zip from _download_link_ and extract the files to a directory that can be accessed using a <code>&lt;script></code> tag in your HTML.
                </p>
            </section>

            <section class="pt-8">
                <h3 class="text-2xl font-bold text-blue-500">Vite</h3>
            </section>
        </section>

        <section class="p-8 pb-12 bg-gray-100 shadow-inner rounded-2xl border-2 border-gray-300">
            <h2 class="text-3xl font-bold text-blue-500">Vue.js</h2>
        </section>

        <section class="p-8 pb-12 bg-gray-100 shadow-inner rounded-2xl border-2 border-gray-300">
            <h2 class="text-3xl font-bold text-blue-500">Other Frameworks</h2>

            <p class="mt-4">
                If we haven't covered your framework of choice, let us know at _discussion_link_.
            </p>
        </section>
    </div>
@endsection