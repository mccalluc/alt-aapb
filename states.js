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
  return 'facet.field[]={!key=' + key + '%20ex=' + ex + '}state';
}).join('&');

var url = [base, fqs, fields].join('&');

d3.jsonp(url);
function callback(response) {
  var facet_fields = response.facet_counts.facet_fields;
  var facet_maps = {};
  var states_list = [];
  Object.keys(facet_fields).forEach(function(term){
    var hash = to_hash(facet_fields[term]);
    facet_maps[term] = hash;
    states_list = states_list.concat(Object.keys(hash));
  });
  states = {};
  var sums = [];
  states_list.forEach(function(state){
    var sum = 0
    states[state] = terms.map(function(term){
      var count = facet_maps[term][state];
      sum += count
      return {'term': term, 'count': count};
    });
    sums.push[sum];
  });
  var max_sum =  Math.max.apply(null, sums);
  
  var color = d3.scale.ordinal()
      .range(["#377eb8","#4daf4a","#984ea3","#ff7f00","#ffff33","#a65628","#f781bf","#e41a1c"]);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.count; });
  
  var states_data = [
    {'name': 'California', 'x': 80, 'y': 300, 'data': states['California']},
    {'name': 'Nevada', 'x': 140, 'y': 240, 'data': states["Nevada"]},
    {'name': 'Oregon', 'x': 100, 'y': 120, 'data': states["Oregon"]},
    {'name': 'Washington','x': 120, 'y': 55, 'data': states["Washington"]},
    {'name': 'Alaska', 'x': 120, 'y': 500, 'data': states["Alaska"]},
    {'name': 'Hawaii', 'x': 300, 'y': 540, 'data': states["Hawaii"]},
    {'name': 'New Mexico', 'x': 300, 'y': 360, 'data': states["New Mexico"]},
    {'name': 'Arizona', 'x': 200, 'y': 360, 'data': states["Arizona"]},
    {'name': 'Utah', 'x': 220, 'y': 260, 'data': states["Utah"]},
    {'name': 'Oklahoma', 'x': 470, 'y': 360, 'data': states["Oklahoma"]},
    {'name': 'Texas', 'x': 420, 'y': 460, 'data': states["Texas"]},
    {'name': 'Arkansas', 'x': 550, 'y': 370, 'data': states["Arkansas"]},
    {'name': 'Louisiana', 'x': 560, 'y': 460, 'data': states["Louisiana"]},
    {'name': 'Kansas', 'x': 450, 'y': 295, 'data': states["Kansas"]},
    {'name': 'Nebraska', 'x': 440, 'y': 230, 'data': states["Nebraska"]},
    {'name': 'South Dakota', 'x': 430, 'y': 160, 'data': states["South Dakota"]},
    {'name': 'North Dakota', 'x': 420, 'y': 90, 'data': states["North Dakota"]},
    {'name': 'Montana', 'x': 290, 'y': 90, 'data': states["Montana"]},
    {'name': 'Idaho', 'x': 200, 'y': 140, 'data': states["Idaho"]},
    {'name': 'Wyoming', 'x': 300, 'y': 180, 'data': states["Wyoming"]},
    {'name': 'Colorado', 'x': 320, 'y': 270, 'data': states["Colorado"]},
    {'name': 'Illinois', 'x': 600, 'y': 250, 'data': states["Illinois"]},
    {'name': 'Indiana', 'x': 650, 'y': 250, 'data': states["Indiana"]},
    {'name': 'Ohio', 'x': 700, 'y': 240, 'data': states["Ohio"]},
    {'name': 'Mississippi', 'x': 600, 'y': 400, 'data': states["Mississippi"]},
    {'name': 'Alabama', 'x': 660, 'y': 400, 'data': states["Alabama"]},
    {'name': 'Georgia', 'x': 720, 'y': 400, 'data': states["Georgia"]},
    {'name': 'South Carolina', 'x': 760, 'y': 370, 'data': states["South Carolina"]},
    {'name': 'Missouri', 'x': 540, 'y': 295, 'data': states["Missouri"]},
    {'name': 'Iowa', 'x': 525, 'y': 215, 'data': states["Iowa"]},
    {'name': 'Minnesota', 'x': 510, 'y': 140, 'data': states["Minnesota"]},
    {'name': 'Wisconsin', 'x': 580, 'y': 150, 'data': states["Wisconsin"]},
    {'name': 'Michigan', 'x': 660, 'y': 170, 'data': states["Michigan"]},
    {'name': 'Virginia', 'x': 770, 'y': 285, 'data': states["Virginia"]},
    {'name': 'DC', 'x': 820, 'y': 265, 'data': states["DC"]},
    {'name': 'Pennsylvania', 'x': 785, 'y': 215, 'data': states["Pennsylvania"]},
    {'name': 'New York', 'x': 810, 'y': 150, 'data': states["New York"]},
    {'name': 'New Jersey', 'x': 845, 'y': 215, 'data': states["New Jersey"]},
    {'name': 'Maryland', 'x': 870, 'y': 255, 'data': states["Maryland"]},
    {'name': 'Connecticut', 'x': 895, 'y': 205, 'data': states["Connecticut"]},
    {'name': 'Rhode Island', 'x': 920, 'y': 155, 'data': states["Rhode Island"]},
    {'name': 'Massachusetts', 'x': 870, 'y': 165, 'data': states["Massachusetts"]},
    {'name': 'Maine', 'x': 920, 'y': 85, 'data': states["Maine"]},
    {'name': 'Vermont', 'x': 870, 'y': 95, 'data': states["Vermont"]},
    {'name': 'New Hampshire', 'x': 830, 'y': 105, 'data': states["New Hampshire"]},
    {'name': 'Kentucky', 'x': 680, 'y': 300, 'data': states["Kentucky"]},
    {'name': 'Tennessee', 'x': 645, 'y': 340, 'data': states["Tennessee"]},
    {'name': 'North Carolina', 'x': 800, 'y': 330, 'data': states["North Carolina"]},
    {'name': 'Florida', 'x': 760, 'y': 490, 'data': states["Florida"]},
  ];

  states_data
    .filter(function(data){return data.data})
    .forEach(function(state_data){
      var g = d3.select("svg")
        .append("g")
          .attr("transform", "translate(" + state_data.x + "," + state_data.y + ")")
          .attr("title", state_data.name);

      g.selectAll(".slice")
          .data(pie(state_data.data))
        .enter().append("g")
          .attr("class", "slice")
        .append("path")
          .attr("d", d3.svg.arc().outerRadius(30))
          .style("fill", function(state) { return color(state.data.term); });
  });
}