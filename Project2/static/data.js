var yearRingChart   = new dc.PieChart("#chart-ring-year"),
    spendHistChart  = new dc.BarChart("#chart-hist-spend"),
    spenderRowChart = new dc.RowChart("#chart-row-spenders");

var table = new dc.DataTable('#table');
var i = 0;
console.log(i);
var someJavaScriptVarDate = '{{productlist[0].UpdatedAt}}';
var someJavaScriptVarRegion = '{{productlist[0].VPCRegion}}';
console.log('{{productlist|length}}')
console.log(someJavaScriptVarDate);
console.log(someJavaScriptVarRegion);
var spendData = []

{% for product in productlist %} 

console.log('{{product}}');
var spendDataRecord = {Name: '{{product.UpdatedAt}}', Spent: '{{product.SKU}}', Year: '{{product.VPCRegion}}'}
console.log(spendDataRecord);
spendData.push(spendDataRecord);
{%endfor%}
console.log(spendData);


var spendData = [
    {Name: someJavaScriptVarDate, Spent: '$40', Year: 'us-east-1'},
    {Name: 'Feb', Spent: '$10', Year: 'us-east-1'},
    {Name: 'Mar', Spent: '$40', Year: 'us-east-1'},
    {Name: someJavaScriptVarDate, Spent: '$70', Year: 'ap-southeast-1'},
    {Name: 'Feb', Spent: '$20', Year: 'ap-southeast-1'},
    {Name: 'Feb', Spent: '$50', Year: 'us-gov-east-1'},
    {Name: 'Mar', Spent: '$30', Year: 'us-gov-east-1'}
];

// normalize/parse data
spendData.forEach(function(d) {
    d.Spent = d.Spent.match(/\d+/)[0];
});

// set crossfilter
var ndx = crossfilter(spendData),
    yearDim  = ndx.dimension(function(d) {return d.Year;}),
    spendDim = ndx.dimension(function(d) {return Math.floor(d.Spent/10);}),
    nameDim  = ndx.dimension(function(d) {return d.Name;}),
    spendPerYear = yearDim.group().reduceSum(function(d) {return +d.Spent;}),
    spendPerName = nameDim.group().reduceSum(function(d) {return +d.Spent;}),
    spendHist    = spendDim.group().reduceCount();

  yearRingChart
    .width(300)
    .height(300)
    .dimension(yearDim)
    .group(spendPerYear)
    .innerRadius(50)
    .controlsUseVisibility(true);

  spendHistChart
    .dimension(spendDim)
    .group(spendHist)
    .x(d3.scaleLinear().domain([0,10]))
    .elasticY(true)
    .controlsUseVisibility(true);

spendHistChart.xAxis().tickFormat(function(d) {return d*10}); // convert back to base unit
spendHistChart.yAxis().ticks(2);

spenderRowChart
    .dimension(nameDim)
    .group(spendPerName)
    .elasticX(true)
    .controlsUseVisibility(true);

var allDollars = ndx.groupAll().reduceSum(function(d) { return +d.Spent; });

table
    .dimension(spendDim)
    .sortBy(function(d) { return +d.Spent; })
    .showSections(false)
    .columns(['Name',
              {
                  label: 'Spent',
                  format: function(d) {
                      return d.Spent;
                  }
              },
              'Year',
              {
                  label: 'Percent of Total',
                  format: function(d) {
                      return Math.floor((d.Spent / allDollars.value()) * 100) + '%';
                  }
              }]);

// d3.select('#download')
//     .on('click', function() {
//         var data = nameDim.top(Infinity);
//         if(d3.select('#download-type input:checked').node().value==='table') {
//             data = data.sort(function(a, b) {
//                 return table.order()(table.sortBy()(a), table.sortBy()(b));
//             });
//             data = data.map(function(d) {
//                 var row = {};
//                 table.columns().forEach(function(c) {
//                     row[table._doColumnHeaderFormat(c)] = table._doColumnValueFormat(c, d);
//                 });
//                 return row;
//             });
//         }
//         var blob = new Blob([d3.csvFormat(data)], {type: "text/csv;charset=utf-8"});
//         saveAs(blob, 'data.csv');
//     });

dc.renderAll();