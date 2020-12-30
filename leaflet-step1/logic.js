// earthquake data url
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakes) {

   // Give each feature a popup describing the place and time of the earthquake
   function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

  // marker size based on earthquake magnitude
function markerSize(magnitude) {
  return magnitude * 5;
}

// colors used for earthquake magnitudes
function markerColor(magnitude) {
  if (magnitude > 4) {
      return 'orange'
  } else if (magnitude > 3) {
      return 'yellow'
  } else if (magnitude > 2) {
      return 'green'
  } else {
      return 'blue'
  }
}

// opacity in relation to magnitude

function markerOpacity(magnitude)  {
  if (magnitude > 6) {
      return .95
  } else if (magnitude > 5)  {
      return .75
  } else if (magnitude > 4) {
      return .60
  } else if (magnitude > 3) {
      return .45
  }  else if (magnitude > 2) {
      return .30
  } else if (magnitude > 1) {
      return .20
  } else {
      return .10
  }
};

 var earthquake = L.geoJSON(earthquakes,  {
      onEachFeature: onEachFeature 
  });

  
 // Sending our earthquakes layer to the createMap function
 createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes
  };


// Create our map, giving it the streetmap and earthquakes layers to display on load
var myMap = L.map("map", {
  center: [
    37.09, -95.71
  ],
  zoom: 5,
  layers: [streetmap, earthquakes]
});

// Add the layer control to the map
 L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);
}










