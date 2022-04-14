@extends('_layouts.default')

@section('content')
    <section>
        <h1>Accessible Web Components</h1>

        <p>
            The Web Components API is a powerful toolset built into all modern browsers, and is available without the need for frameworks.
            It provides developers the ability to create complex and reusable custom elements, which can be used in HTML much like any standard element.
        </p>

        <p>
            The classic example is to replace the native HTML Select element.
            Notoriously difficult to style, there have been many attempts to replace this extremely useful and accessible element.
            Unfortunately, far too many solutions are themselves difficult to restyle, or have a severe lack in accessibility.
        </p>

        <p>
            Accessible Web Components is a free and open source library of Web Components that have been built specifically for accessibility, stylability, and reusability, whether you are using a front–end framework or not.
        </p>
    </section>

    <section>
        <h2>Accessibility</h2>

        <p>
            <a href="https://www.gov.uk/government/statistics/family-resources-survey-financial-year-2019-to-2020/family-resources-survey-financial-year-2019-to-2020?s=03#disability-1">Around one in five users have a disability</a>
            (and if you include people requiring glasses or contact lenses, that goes up to three in four).
            Then there are people using your website in non-optimal situations - they have an injury like a broken arm, or in a poorly-lit environment.
        </p>

        <p>
            Accessibility shouldn't be an option.
        </p>

        <p>
            In fact, if you actually stop to think about it, a website without accessibility is also a website without usability.
            Anything that makes a website more accessible will make it more usable.
        </p>
    </section>

    <section>
        <h2>Stylability</h2>

        <p>
            While each component has been built with some default styling, the library is composed to allow easy restyling, using the same CSS that you use for the rest of your web site.
        </p>
    </section>

    <section>
        <h2>No special tooling required</h2>

        <p>
            The library is built using JavaScript which can be run in browsers without needing to be transpiled or otherwise processed.
        </p>

        <p>
            Download the library, use a <code>&lt;script&gt;</code> tag to load it into you page and you should be good to go.
        </p>
    </section>

    <section>
        <h2>Framework friendly</h2>

        <p>
            Just because the library works without needing a framework, it doesn't mean that you can't use one.
        </p>

        <p>
            Accessible Web Components are built to be reactive and communicate changes to their internal state via events.
        </p>
    </section>
@endsection
