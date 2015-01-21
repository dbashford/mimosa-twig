var importBlocks = function(file) {
  var that = this;
  var sub_template = templates[file] || templates[file.split('.').shift()];
  sub_template.render(this.context);

  // Mixin blocks
  Twig.forEach(Object.keys(sub_template.blocks), function(key) {
    if (that.blocks[key] === undefined) {
      that.blocks[key] = sub_template.blocks[key];
      that.importedBlocks.push(key);
    }
  });
};

var importFile = function( name ) {
  return templates[name];
}

var render = function (context, params) {
  params = params || {};

  var output,
  url;

  this.context = context || {};

  // Clear any previous state
  // except don't, no previous state issues on client
  // pasted in from reset function
  this.blocks = {};
  this.importedBlocks = [];
  this.child = {
    blocks: {}
  };
  this.extend = null;

  if (params.blocks) {
    this.blocks = params.blocks;
  }
  if (params.macros) {
    this.macros = params.macros;
  }

  output = Twig.parse.apply(this, [this.tokens, this.context]);

  // Does this template extend another
  if (this.extend) {
    var ext_template;

    // check if the template is provided inline
    if ( this.options.allowInlineIncludes ) {
      ext_template = Twig.Templates.load(this.extend);
      if ( ext_template ) {
        ext_template.options = this.options;
      }
    }

    // check for the template file via include
    if (!ext_template) {
      url = relativePath(this, this.extend);

      ext_template = Twig.Templates.loadRemote(url, {
        method: this.url?'ajax':'fs',
        base: this.base,
        async:  false,
        id:     url,
        options: this.options
      });
    }

    this.parent = ext_template;

    return this.parent.render(this.context, {
      blocks: this.blocks
    });
  }

  if (params.output == 'blocks') {
    return this.blocks;
  } else if (params.output == 'macros') {
    return this.macros;
  } else {
    return output;
  }
};

Object.keys(templates).forEach( function(key) {
  templates[key].render = render;
  templates[key].importFile = importFile;
  templates[key].importBlocks = importBlocks;
});