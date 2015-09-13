var terms = decodeURIComponent(location.search.replace('?terms=',''))
  .split(/\W+/).filter(function(s){return s.length > 0});
  // TODO: split on comma; see if we can handle multi-word queries.
  
d3.select('input').attr('value',terms.join(', '));



var radius = 100

var color = d3.scale.ordinal()
    .range(["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf"]);

var arc = d3.svg.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.population; });

var svg = d3.select("svg")
  .append("g")
    .attr("transform", "translate(" + window.innerWidth / 2 + "," + innerHeight / 2 + ")");

data = [{'population': 3, 'age': 1},{'population': 5, 'age': 2},{'population': 7, 'age': 3},{'population': 9, 'age': 4}];

  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

  g.append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color(d.data.age); });

