"use strict";

var path = require( "path" )
  , fs = require( "fs" )
  , clone = require( "clone" )
  , config = require( "./config" )
  , renderTwig
  , getExtensions = function ( mimosaConfig ) {
    return mimosaConfig.twig.extensions;
  };

var prefix = function ( mimosaConfig, libraryPath ) {
  var str = "var templates = {};\n";
  // IMPORTANT: need to use Twig global, so do not
  // overwrite that scope
  // https://github.com/justjohn/twig.js/issues/131
  if ( mimosaConfig.template.wrapType === "amd" ) {
    str = "define(['" + libraryPath + "'], function (){ var templates = {};\n";
  } else {
    if ( mimosaConfig.template.wrapType === "common" ) {
      str = "require('" + mimosaConfig.template.commonLibPath + "');\nvar templates = {};\n";
    }
  }

  return str;
};

var suffix = function ( mimosaConfig ) {
  if ( !renderTwig ) {
    renderTwig = fs.readFileSync(path.join(__dirname, "client", "render.js"));
  }

  var str = renderTwig + "\n";

  if ( mimosaConfig.template.wrapType === "amd" ) {
    str += "return templates; });";
  } else {
    if ( mimosaConfig.template.wrapType === "common" ) {
      str += "\nmodule.exports = templates;";
    }
  }

  return str;
};

var compile = function ( mimosaConfig, file, cb ) {
  var error, output;

  try {
    var opts = clone( mimosaConfig.twig.options );
    opts.data = file.inputFileText;
    var template = mimosaConfig.twig.lib.twig( opts );
    output = JSON.stringify(template);
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
