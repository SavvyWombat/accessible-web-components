---
description: A free and open source library of Web Components built for accessibility and stylability.
---

@extends('_layouts.default')

@section('content')
    <div class="flex flex-col gap-16 mt-8 my-16">
        <section class="p-8 pb-12 bg-gray-100 shadow-inner rounded-2xl border-2 border-gray-300">
            <h1 class="text-3xl font-bold text-blue-500">Accessible Web Components</h1>

            <p class="mt-4">
                Web Components is a powerful toolset available in all modern browsers without the need for frameworks.
                They provide developers the ability to create complex and reusable custom elements.
            </p>

            <p class="mt-4">
                Accessible Web Components is a free and open source library of Web Components that have been built for accessibility and stylability.
            </p>

            <p class="mt-4">
                The classic example is to replace the native HTML Select element.
                Notoriously difficult to style, there have been many attempts to replace this extremely useful and accessible element.
                Unfortunately, far too many solutions are themselves difficult to restyle, or have a severe lack in accessibility.
            </p>
        </section>

        <section class="p-8 pb-12 bg-gray-100 shadow-inner rounded-2xl border-2 border-gray-300">
            <h2 class="text-3xl font-bold text-blue-500">Accessibility</h2>

            <p class="mt-4">
                <a href="https://www.gov.uk/government/statistics/family-resources-survey-financial-year-2019-to-2020/family-resources-survey-financial-year-2019-to-2020?s=03#disability-1"
                   class="underline text-blue-700 rounded
                          outline-offset-0
                          focus:no-underline focus:outline focus:outline-2 focus:outline-blue-700
                          hover:no-underline hover:outline hover:outline-2 hover:outline-blue-300 hover:bg-blue-300"
                >Around one in five users have a disability</a>
                (and if you include people requiring glasses or contact lenses, that goes up to three in four).
                Then there are people using your website in non-optimal situations - they have an injury like a broken arm, or in a poorly-lit environment.
            </p>

            <p class="mt-4">
                Accessibility shouldn't be an option.
            </p>

            <p class="mt-4">
                In fact, if you actually stop to think about it, a website without accessibility is also a website without usability.
                Anything that makes a website more accessible will make it more usable.
            </p>
        </section>

        <section class="p-8 pb-12 bg-gray-100 shadow-inner rounded-2xl border-2 border-gray-300">
            <h2 class="text-3xl font-bold text-blue-500">Stylability</h2>

            <p class="mt-4">
                While each component has been built with some default styling, the library is composed to allow easy restyling, using the same CSS that you use for the rest of your web site.
            </p>
        </section>

        <section class="p-8 pb-12 bg-gray-100 shadow-inner rounded-2xl border-2 border-gray-300">
            <h2 class="text-3xl font-bold text-blue-500">No special tooling required</h2>

            <p class="mt-4">
                The library is built using JavaScript which can be run in browsers without needing to be transpiled or otherwise processed.
            </p>

            <p class="mt-4">
                Download the library, use a <code>&lt;script&gt;</code> tag to load it into you page and you should be good to go.
            </p>
        </section>

        <section class="p-8 pb-12 bg-gray-100 shadow-inner rounded-2xl border-2 border-gray-300">
            <h2 class="text-3xl font-bold text-blue-500">Framework friendly</h2>

            <p class="mt-4">
                Just because the library works without needing a framework, it doesn't mean that you can't use one.
            </p>

            <p class="mt-4">
                Accessible Web Components are built to be reactive and communicate changes to their internal state via events.
            </p>
        </section>
    </div>
@endsection
