"use strict";

exports.defaults = function() {
  return {
    twig: {
      extensions: [ "twig", "twg" ],
      options: {
        debug: false,
        trace: false,
        extendTags: null,
        functions: [],
        cache: false
      }
    }
  };
};

exports.placeholder = function() {
  return "\t\n\n" +
         "  twig:               # config settings for the Twig compiler module\n" +
         "    lib: undefined    # use this property to provide a specific version of Twig\n" +
         "    extensions: [\"twig\", \"twg\", \"hjs\"]  # default extensions for Twig files\n";
};

exports.validate = function( config, validators ) {
  var errors = [];

  if ( validators.ifExistsIsObject( errors, "twig config", config.twig ) ) {

    if ( !config.twig.lib ) {
      config.twig.lib = require( "twig" );
    }

    if ( validators.isArrayOfStringsMustExist( errors, "twig.extensions", config.twig.extensions ) ) {
      if (config.twig.extensions.length === 0) {
        errors.push( "twig.extensions cannot be an empty array");
      }
    }

    // extend tag types
    // https://github.com/justjohn/twig.js/wiki/Extending-twig.js-With-Custom-Tags
    if( config.twig.options && config.twig.options.extendTags ) {
      config.twig.lib.extend(config.twig.options.extendTags);
    }

    // extend functions
    // extends Twig with given function objects.
    // Should have
    // {
    //   name: "nameOfFunction",
    //   func: function (args) { return "the function"; }
    // }
    if ( config.twig.options && config.twig.options.functions ) {
      config.twig.options.functions.forEach( function ( func ) {
        config.twig.lib.extendFunction( func.name, func.func );
      });
    }

  }

  return errors;
};
