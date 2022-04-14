# Accessible Web Components documentation

The Accessible Web Components is built using [Jigsaw](https://jigsaw.tighten.com/).

## Building the documentation

Install dependencies:

```
> composer install
> npm install
```

Build for release:

```
> npm run prod
```

The documentation will build into a `build_production` directory.

## Running the documentation site for local development

```
> npm run watch
```

This will run a server on localhost and watch for changes in the source directory and configuration files.