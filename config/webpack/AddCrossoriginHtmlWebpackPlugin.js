
class AddCrossOriginPlugin {

  filterTag(tag) {
    // Process only script and link tags with a url
    return (
      (tag.tagName === 'script' || tag.tagName === 'link')
      && (tag.attributes.href || tag.attributes.src)
    );
  }

  processTag(tag) {
    tag.attributes.crossorigin = 'anonymous';
  }

  apply(compiler) {
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('html-webpack-plugin-alter-asset-tags', (pluginArgs, callback) => {
        pluginArgs.head.filter(this.filterTag).forEach(this.processTag);
        pluginArgs.body.filter(this.filterTag).forEach(this.processTag);
        callback(null, pluginArgs);
      });
    });
  }
}

module.exports = AddCrossOriginPlugin;
