var terms = decodeURIComponent(location.search.replace('?terms=',''))
  .split(/\W+/).filter(function(s){return s.length > 0});
  // TODO: split on comma; see if we can handle multi-word queries.
  
d3.select('input').attr('value',terms.join(', '));

var pairs = [];

for (var a=0; a<terms.length; a++) {
  for (var b=0; b<a; b++) {
    pairs.push([terms[a], terms[b]].sort().join("-"));
  }
}

var base = 'http://americanarchive.org/api.js?facet=true';
var fqs = pairs.map(function(pair){
  var q = pair.split('-').join('+AND+');
  return 'facet.query[]={!key='+pair+'}'+q;
}).join('&');

d3.jsonp(base+'&'+fqs);
function callback(response){
  var counts = response.facet_counts.facet_queries;
  var max = Math.max.apply(null,Object.keys(counts).map(function(key){return counts[key]}));

  d3.select("body").append("svg")
      .attr("width", window.innerWidth)
      .attr("height", window.innerHeight)
      .attr("viewBox", "-105 -115 215 225");

  var svg = d3.select("svg");

  var n = terms.length;
  var rotation = Math.PI/2 + Math.PI/n;
  for (var a=0; a<n; a++) {
    var ax = 80 * Math.cos(2*Math.PI*a/n + rotation);
    var ay = 100 * Math.sin(2*Math.PI*a/n + rotation);
    svg.append("text")
       .attr({"x": ax + 20 * Math.sign(ax), "y": ay, "text-anchor": ax > 0 ? "start" : "end" })
       .text(terms[a]);
    for (var b=0; b<a; b++) {
      var bx = 80 * Math.cos(2*Math.PI*b/n + rotation);
      var by = 100 * Math.sin(2*Math.PI*b/n + rotation);
      var sweep = 0;
      var ab = [terms[a],terms[b]].sort();
      var key = ab.join('-');
      var q = ab.join('+AND+');
      var title = ab.join(' + ')+': '+counts[key];
      svg.append("a")
        .attr("xlink:href", "http://americanarchive.org/catalog?q=" + q)
        .attr("title", title)
      .append("path")
        .attr("d", "M "+ax+" "+ay+" A 150 200, 0, 0, "+sweep+", "+bx+" "+by)
        .attr("style", "stroke-width: "+10*(counts[key])/max);
    }
  }
}