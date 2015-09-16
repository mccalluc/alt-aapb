var terms = decodeURIComponent(location.search.replace('?terms=',''))
  .split(/\W+/).filter(function(s){return s.length > 0});
  // TODO: split on comma; see if we can handle multi-word queries.
  
d3.select('input').attr('value',terms.join(', '));

var base = 'http://americanarchive.org/api.js?facet=true';
var fqs = terms.map(function(term){
  return 'fq[]={!tag=' + term + '}' + term;
}).join('&');
var fields = terms.map(function(key){
  var ex = terms.filter(function(other){
    return other !== key
  }).join(',');
  return 'facet.field[]={!key=' + key + '%20ex=' + ex + '}year';
}).join('&');

var url = [base, fqs, fields].join('&');

d3.jsonp(url);
function callback(response) {
  var facet_fields = response.facet_counts.facet_fields;
  var facet_maps = {};
  var facet_keys = [];
  var facet_values = [];
  Object.keys(facet_fields).forEach(function(term){
    var hash = to_hash(facet_fields[term]);
    facet_maps[term] = hash;
    facet_keys = facet_keys.concat(Object.keys(hash));
    facet_values = facet_values.concat(Object.keys(hash).map(function(key){
      return hash[key];
    }));
  });
  
  var year_min = Math.min.apply(null, facet_keys);
  var year_max = Math.max.apply(null, facet_keys);
  var count_max = Math.max.apply(null, facet_values);
  
  // **************************
  
  var margin = {top: 20, right: 20, bottom: 30, left: 50};
  var width = window.innerWidth - margin.left - margin.right - 20;
  var height = window.innerHeight - margin.top - margin.bottom - 70;
  
  d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

  var x = d3.scale.linear()
      .domain([year_min,year_max])
      .range([0, width]);

  var y = d3.scale.linear()
      .domain([0,count_max])
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .tickFormat(d3.format("d"))
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

   // TODO: Does the margin math belong in here?
   var line = d3.svg.line()
       .x(function(d) { return x(d.year) + margin.left; })
       .y(function(d) { return y(d.count) + margin.top; });

  var svg = d3.select("svg");

  var colors = ["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf"];
  var years = [];
  for(var year = year_min; year <= year_max; year++){
    years.push(year);
  }
  var key_y = 50;
  Object.keys(facet_maps).forEach(function(term){
    var datum = years.map(function(year){
      return {year: year, count: facet_maps[term][year] || 0}
    });
    var color = colors.shift();
    colors.push(color); // Rotate
    
    var link = svg.append("a")
      .attr("xlink:href", "http://americanarchive.org/catalog?q=" + term)
      .attr("title", term);
    link.append("path")
      .datum(datum)
      .attr("class", "line")
      .attr("d", line)
      .attr("style", "stroke: " + color);
    link.append("rect")
       .attr({"width": 50, "height": 20, "x": 100, "y": key_y, "style": "fill: " + color});
    link.append("text")
       .attr({"x": 170, "y": key_y + 15})
       .text(term);
     key_y += 30;
  });
  
  // Axes layered above graphs.
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" + margin.left + "," + (margin.top + height) + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(yAxis);

};