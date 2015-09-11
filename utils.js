// For facets, solr returns a list of pairs, where a hash would be more useful.
function to_hash(a) {
  var temp = a.slice();
  var hash = {};
  while (temp.length) {
    var key = temp.shift();
    var val = temp.shift();
    hash[key] = val
  }
  return hash;
}

// https://github.com/d3/d3-plugins/blob/master/jsonp/jsonp.js
// CORS is prefered, but this still works
d3.jsonp = function (url, callback) {
  function rand() {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
      c = '', i = -1;
    while (++i < 15) c += chars.charAt(Math.floor(Math.random() * 52));
    return c;
  }

  function create(url) {
    var e = url.match(/callback=d3.jsonp.(\w+)/),
      c = e ? e[1] : rand();
    d3.jsonp[c] = function(data) {
      callback(data);
      delete d3.jsonp[c];
      script.remove();
    };
    return 'd3.jsonp.' + c;
  }

  var cb = create(url),
    script = d3.select('head')
    .append('script')
    .attr('type', 'text/javascript')
    .attr('src', url.replace(/(\{|%7B)callback(\}|%7D)/, cb));
};