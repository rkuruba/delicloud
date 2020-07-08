// Create a map object
// var myMap = L.map("map", {
//     center: [37.09, -95.71],
//     zoom: 5
//   });
  

// Create a map object
var myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 3
}); 
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 20,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // Define a markerSize function that will give each city a different radius based on its population
  function markerSize(orders) {
    return orders / 40;
  }
 
  // var spendDataRecord = {Name: '{{product.UpdatedAt}}', Spent: '{{product.SKU}}', Year: '{{product.VPCRegion}}'}

  // Each city object contains the city's name, location and population
  var cities = []
  {% for product in productlist %} 
  var city = 
    {
      name: '{{product.VPCRegion}}',
      location: ['{{product.latitude}}','{{product.longitude}}'],
      orders: 8550405
    }
    

// end loop
cities.push(city)
  {%endfor%}

  // Loop through the cities array and create one marker for each city object
  for (var i = 0; i < cities.length; i++) {
    L.circle(cities[i].location, {
      fillOpacity: 0.40,
      color: "white",
      fillColor: "purple",
      // Setting our circle's radius equal to the output of our markerSize function
      // This will make our marker's size proportionate to its population
      radius: markerSize(cities[i].orders)
    }).bindPopup("<h1>" + cities[i].name + "</h1> <hr> <h3>Population: " + cities[i].orders + "</h3>").addTo(myMap);
  }
  