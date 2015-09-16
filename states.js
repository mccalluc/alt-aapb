var terms = decodeURIComponent(location.search.replace('?terms=',''))
  .split(/\W+/).filter(function(s){return s.length > 0});
  // TODO: split on comma; see if we can handle multi-word queries.
  
d3.select('input').attr('value',terms.join(', '));




var color = d3.scale.ordinal()
    .range(["#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf","#e41a1c"]);

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.count; });
    
var mock_data = [{'count': 3, 'term': 'dog'},{'count': 4, 'term': 'cat'}];

var states = [
  {'name': 'California', 'x': 80, 'y': 300, 'data': mock_data},
  {'name': 'Nevada', 'x': 140, 'y': 240, 'data': mock_data},
  {'name': 'Oregon', 'x': 100, 'y': 120, 'data': mock_data},
  {'name': 'Washington','x': 120, 'y': 55, 'data': mock_data},
  {'name': 'Alaska', 'x': 120, 'y': 500, 'data': mock_data},
  {'name': 'Hawaii', 'x': 300, 'y': 540, 'data': mock_data},
  {'name': 'New Mexico', 'x': 300, 'y': 360, 'data': mock_data},
  {'name': 'Arizona', 'x': 200, 'y': 360, 'data': mock_data},
  {'name': 'Utah', 'x': 220, 'y': 260, 'data': mock_data},
  {'name': 'Oklahoma', 'x': 470, 'y': 360, 'data': mock_data},
  {'name': 'Texas', 'x': 420, 'y': 460, 'data': mock_data},
  {'name': 'Arkansas', 'x': 550, 'y': 370, 'data': mock_data},
  {'name': 'Louisiana', 'x': 560, 'y': 460, 'data': mock_data},
  {'name': 'Kansas', 'x': 450, 'y': 295, 'data': mock_data},
  {'name': 'Nebraska', 'x': 440, 'y': 230, 'data': mock_data},
  {'name': 'South Dakota', 'x': 430, 'y': 160, 'data': mock_data},
  {'name': 'North Dakota', 'x': 420, 'y': 90, 'data': mock_data},
  {'name': 'Montana', 'x': 290, 'y': 90, 'data': mock_data},
  {'name': 'Idaho', 'x': 200, 'y': 140, 'data': mock_data},
  {'name': 'Wyoming', 'x': 300, 'y': 180, 'data': mock_data},
  {'name': 'Colorado', 'x': 320, 'y': 270, 'data': mock_data},
  {'name': 'Illinois', 'x': 600, 'y': 250, 'data': mock_data},
  {'name': 'Indiana', 'x': 650, 'y': 250, 'data': mock_data},
  {'name': 'Ohio', 'x': 700, 'y': 240, 'data': mock_data},
  {'name': 'Mississippi', 'x': 600, 'y': 400, 'data': mock_data},
  {'name': 'Alabama', 'x': 660, 'y': 400, 'data': mock_data},
  {'name': 'Georgia', 'x': 720, 'y': 400, 'data': mock_data},
  {'name': 'South Carolina', 'x': 760, 'y': 370, 'data': mock_data},
  {'name': 'Missouri', 'x': 540, 'y': 295, 'data': mock_data},
  {'name': 'Iowa', 'x': 525, 'y': 215, 'data': mock_data},
  {'name': 'Minnesota', 'x': 510, 'y': 140, 'data': mock_data},
  {'name': 'Wisconsin', 'x': 580, 'y': 150, 'data': mock_data},
  {'name': 'Michigan', 'x': 660, 'y': 170, 'data': mock_data},
  {'name': 'Virginia', 'x': 770, 'y': 285, 'data': mock_data},
  {'name': 'DC', 'x': 820, 'y': 265, 'data': mock_data},
  {'name': 'Pennsylvania', 'x': 785, 'y': 215, 'data': mock_data},
  {'name': 'New York', 'x': 810, 'y': 150, 'data': mock_data},
  {'name': 'New Jersey', 'x': 845, 'y': 215, 'data': mock_data},
  {'name': 'Maryland', 'x': 870, 'y': 255, 'data': mock_data},
  {'name': 'Connecticut', 'x': 895, 'y': 205, 'data': mock_data},
  {'name': 'Rhode Island', 'x': 920, 'y': 155, 'data': mock_data},
  {'name': 'Massachusetts', 'x': 870, 'y': 165, 'data': mock_data},
  {'name': 'Maine', 'x': 920, 'y': 85, 'data': mock_data},
  {'name': 'Vermont', 'x': 870, 'y': 95, 'data': mock_data},
  {'name': 'New Hampshire', 'x': 830, 'y': 105, 'data': mock_data},
  
  {'name': 'Kentucky', 'x': 680, 'y': 300, 'data': mock_data},
  {'name': 'Tennessee', 'x': 645, 'y': 340, 'data': mock_data},
  {'name': 'North Carolina', 'x': 800, 'y': 330, 'data': mock_data},
  {'name': 'Florida', 'x': 760, 'y': 490, 'data': mock_data},
  
];

for (var i=0; i<states.length; i++) {
  var state = states[i];
  var g = d3.select("svg")
    .append("g")
      .attr("transform", "translate(" + state.x + "," + state.y + ")")
      .attr("title", state.name);

  g.selectAll(".slice")
      .data(pie(state.data))
    .enter().append("g")
      .attr("class", "slice")
    .append("path")
      .attr("d", d3.svg.arc().outerRadius(30))
      .style("fill", function(state) { return color(state.data.term); });
}
