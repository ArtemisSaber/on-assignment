const config = require('../../config'),
    hljs = require('./highlight');
// config.highlight.forEach(item => {
//     hljs.registerLanguage(item, require(`./languages/${item}`).default);
// });
hljs.registerLanguage('javascript', require('./languages/javascript').default);hljs.registerLanguage('json', require('./languages/json').default);hljs.registerLanguage('less', require('./languages/less').default);hljs.registerLanguage('scss', require('./languages/scss').default);hljs.registerLanguage('typescript', require('./languages/typescript').default);

module.exports = hljs;