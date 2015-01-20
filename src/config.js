"use strict";

exports.defaults = function() {
  return {
    twig: {
      extensions: [ "twig", "twg" ]
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
  }

  return errors;
};
