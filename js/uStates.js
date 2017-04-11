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
        LongData.push(+d.Longitude);
        LatiData.push(+d.Latitude);
    })
    console.log("Long: ", LongData);
    console.log("Lati: ", LatiData);
    
   /* data.forEach(function(d) {
    d.Longitude = +d.Longitude;
    d.Latitude = +d.Latitude;
  }); */
    
    
});



(function(){
	var uStatePaths=[

{id:"CO",n:"Colorado",d:"M380.03242,320.96457L384.93566,234.63961L271.5471,221.99565L259.33328,309.93481L380.03242,320.96457Z"},



	];
	var uStates={};
		
	uStates.draw = function(id, data, toolTip){		
		function mouseOver(d){
			d3.select("#tooltip").transition().duration(200).style("opacity", .9);      
			
			d3.select("#tooltip").html(toolTip(d.n, data[d.id]))  
				.style("left", (d3.event.pageX) + "px")     
				.style("top", (d3.event.pageY - 28) + "px");
		}
		
		function mouseOut(){
			d3.select("#tooltip").transition().duration(500).style("opacity", 0);      
		}
		
		d3.select(id).selectAll(".state")
			.data(uStatePaths).enter().append("path").attr("class","state").attr("d",function(d){ return d.d;})
			.style("fill",function(d){ return data[d.id].color; })
			.on("mouseover", mouseOver).on("mouseout", mouseOut);
	}
	this.uStates=uStates;
})();