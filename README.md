mimosa-twig
===========

## Overview

This is a Twig compiler for the Mimosa build tool. It will pre-compile your twig templates for use in the browser.

Some useful links for more information on this module:

- [Mimosa](http://mimosa.io)
- [Twig Compiler](https://github.com/justjohn/twig.js)
- [Twig](http://twig.sensiolabs.org/)

## Usage

Add `'twig'` to your list of modules.  That's all!  Mimosa will install the module for you when you start `mimosa watch` or `mimosa build`.

## Functionality

This module will compile Twig files during `mimosa watch` and `mimosa build`. This module utilizes all of the built-in template behavior that comes with Mimosa's basic template compiler.  See the [mimosa website](http://mimosa.io/modules.html#mt) for more information about how templates are treated or check out the various [`template` configuration options](http://mimosa.io/configuration.html#templates).

## Default Config

```javascript
twig: {
  lib: undefined
  extensions: [ "twig", "twg" ]
  options: {
    debug: false,
    trace: false
  }
}
```

#### `lib` require'd compiler library
You may want to use this module but may not be ready to use the latest version of Twig. Using the `lib` property you can provide a specific version of Twig if the one being used by this module isn't to your liking. To provide a specific version, you must have it `npm install`ed into your project and then provide it to `lib`. For instance: `lib: require('twig')`.

#### `extensions` an array of strings
The extensions of your Twig files.

#### `options` object
Pass-through compiler options to the [compiler library](https://github.com/justjohn/twig.js)

#### `debug`, `trace`, booleans
Debug flags for twig compiler