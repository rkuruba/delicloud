// var csv = require('fast-csv');

// csv.fromPath('SampleData100.csv')
//   .on('data', function(data) {

//     // `data` is an array containing the values
//     // of the current line in the file
//     console.log(data);
//   })
//   .on('end', function() {
//     console.log('Parsing complete!');
//   });

var url = "https://github.com/rkuruba/delicloud/tree/Gio/SampleData100.csv";

var request = new XMLHttpRequest();  
request.open("GET", url, false);   
request.send(null);  

var csvData = new Array();
var jsonObject = request.responseText.split(/\r?\n|\r/);
for (var i = 0; i < jsonObject.length; i++) {
  csvData.push(jsonObject[i].split(','));
}
// Retrived data from csv file content
console.log(csvData);