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

// Hold building position in arrays
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


var map = L.map('map').setView([39.75621, -104.99404], 14);
    // Set up map box
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(map);
    
    
 
    for (i = 1; i < 500; i++){
        L.circle([LatiData[i],LongData[i]], {radius:100}).addTo(map);

        var building = {
            "Latitude": data[i].Latitude,
            "Longitude": data[i].Longitude
        }   
        console.log(building)
        

        
//        var plotBuildings = {
//            "type": "Feature",
//            "geometry": {
//                "type": "Point",
//                "coordinates": [LongData[i], LatiData[i]]
//            }
//        };
//        L.geoJSON(plotBuildings).addTo(map);
        

    }

    var testArray = [39.905974, -104.999076];
    
    L.circle([LatiData[0],LongData[0]], {radius:400}).addTo(map);
    // Inner Circle around Coors
//    L.circle([39.905974, -104.999076], {radius: 100}).addTo(map);


    // Red Circle Around Coors
//    L.circle([39.75621, -104.99404], 500, {
//		color: 'red',
//		fillColor: 'red',
//		fillOpacity: 0.5
//	}).addTo(map).bindPopup("I am a circle.");

    // Coors Field Single Point
    var Coors = {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [-104.99404, 39.75621]
        }
    };
    L.geoJSON(Coors).addTo(map);

    var circle = L.circle([-104.99404, 39.75622], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(map);
    
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
    

  

    


});














