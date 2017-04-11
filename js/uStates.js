//Reading in the data
var data;
d3.csv( 'data/ZayoHackathonData_Buildings.csv', function( csvData ){
  data = csvData;
  checkDataset( data );
});
d3.csv( 'data/ZayoHackathonData_Accounts.csv', function( csvData ){
  data = csvData;
  checkDataset( data );
});
function checkDataset(dataset) {
    if (dataset.length > 0)
        $("#dataCheck").append("<p>Data loaded correctly!</p>");
    else
        $("#dataCheck").append("<p>Data loaded incorrectly. Try using the debugger to help you find the bug!</p>");
}
var LongData = [];
var LatiData = [];


d3.csv("data/ZayoHackathonData_Buildings.csv", function(error, data) {
    data.map(function(d){
        if (d.State == "CO"){
        LongData.push(+d.Longitude);
        LatiData.push(+d.Latitude);
        }
    })
    console.log("Long: ", LongData);
    console.log("Lati: ", LatiData);

////////////////////////////


var map = L.map('map').setView([39.74739, -105], 8);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.light'
    }).addTo(map);

    var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
};
    L.geoJSON(geojsonFeature).addTo(map);

    var zayo = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [LongData[2], LatiData[2]]
    }
};
    L.geoJSON(zayo).addTo(map);    


    var hayo = {
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": [data[4].Longitude, data[4].Latitude]
    }
};
    L.geoJSON(hayo).addTo(map);        


});














