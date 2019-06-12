// Start with API endpoint
var queryUrl = "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=" +
  "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

  // Use D3 to get the JSON request
d3.json(queryUrl, function(data){
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {

function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
       "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }

var earthquakes = L.geoJSON(earthquakeData, {
       onEachFeature: onEachFeature
    });

    createMap(earthquakes);
}


function createMap(earthquakes){

// Define the topology layers
var Streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
});

//Define the BaseMaps
var baseMaps = {
    "Street Map": streetmap
};

var overlayMaps = {
    Earthquakes: earthquakes
  };

var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
});

L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}
