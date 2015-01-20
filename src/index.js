"use strict";

var path = require( "path" )
  , config = require( "./config" )
  , getExtensions = function ( mimosaConfig ) {
    return mimosaConfig.twig.extensions;
  };

var prefix = function ( mimosaConfig, libraryPath ) {
  if ( mimosaConfig.template.wrapType === "amd" ) {
    return "define(['" + libraryPath + "'], function (Twig){ var templates = {};\n";
  } else {
    if ( mimosaConfig.template.wrapType === "common" ) {
      return "var Twig = require('" + mimosaConfig.template.commonLibPath + "');\nvar templates = {};\n";
    }
  }

  return "var templates = {};\n";
};

var suffix = function ( mimosaConfig ) {
  if ( mimosaConfig.template.wrapType === "amd" ) {
    return "return templates; });";
  } else {
    if ( mimosaConfig.template.wrapType === "common" ) {
      return "\nmodule.exports = templates;";
    }
  }

  return "";
};

var compile = function ( mimosaConfig, file, cb ) {
  var error, output;

  try {
    output = "templates['" + file.templateName + "']";
  } catch ( err ) {
    error = err;
  }

  cb( error, output );
};

module.exports = {
  name: "twig",
  compilerType: "template",
  clientLibrary: path.join( __dirname, "client", "twig.js" ),
  compile: compile,
  suffix: suffix,
  prefix: prefix,
  extensions: getExtensions,
  defaults: config.defaults,
  placeholder: config.placeholder,
  validate: config.validate
};
