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


d3.csv("data/ZayoHackathonData_Buildings.csv", function(csvDataBuilding) {
    csvDataBuilding.map(function(d){
        if (d.State == "CO"){
        LongData.push(+d.Longitude);
        LatiData.push(+d.Latitude);
        }
    })
    console.log("Long: ", LongData);
    console.log("Lati: ", LatiData);
    
   /* data.forEach(function(d) {
    d.Longitude = +d.Longitude;
    d.Latitude = +d.Latitude;
  }); */
    
    
});