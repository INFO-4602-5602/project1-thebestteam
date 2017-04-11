// Constants

// Load CSV
var data;
d3.csv( 'data/ZayoHackathonData_Buildings.csv', function( csvData ){
  data = csvData;
  checkDataset( data );
});

function checkDataset(dataset) {
    if (dataset.length > 0)
        $("#dataCheck").append("<p>Data loaded correctly!</p>");
    else
        $("#dataCheck").append("<p>Data loaded incorrectly. Try using the debugger to help you find the bug!</p>");
}

d3.csv( 'data/ZayoHackathonData_Buildings.csv', function( csvDataBuilding ){
  var dataBuilding = csvDataBuilding

  // TODO: remove this line once data is properly filtered
  dataBuilding = _.sampleSize( dataBuilding, 10 );

  var width = 1000;
  var height = 650;
  var xOffset = 150;
  var yOffset = 30;
  var margin = 10;

  // Filtered By
  // Is Closed: false
  // Is Won:    false
  // Stage Name:: 1 & 2
  var buildingArr = _.map( dataBuilding, function( d ){
    return d['Building ID'];
  } );

  // Create svg to contain vis
  var svg = d3.select( '#nonspatial' ).append( 'svg:svg' )
                                      .attr( 'width', width )
                                      .attr( 'height', height );

  // Define axes scale
  var xScale = d3.scale.linear()
                 .domain( [d3.min( dataBuilding, function( d ){
                          return parseFloat( d['Estimated Build Cost'] );
                        } )-1, d3.max( dataBuilding, function( d ){
                          return parseFloat( d['Estimated Build Cost'] );
                        } )+1] )
                 .range( [xOffset, width - margin] );


  var yScale = d3.scale.ordinal()
                .domain( buildingArr )
                .rangeRoundBands([0, height - yOffset], .5);

  // Create axes
  var xAxis = d3.svg.axis()
                    .scale( xScale )
                    .orient( 'bottom' )
                    .ticks( 5 );
  var xAxisG = svg.append( 'g' )
                  .attr( 'class', 'axis' )
                  .attr( 'transform', 'translate(0, ' + (height - yOffset - 6) + ')' )
                  .call( xAxis );

  var yAxis = d3.svg.axis()
                    .scale( yScale )
                    .orient( 'left' )
                    .ticks( buildingArr.length );
  var yAxisG = svg.append( 'g' )
                  .attr( 'class', 'axis' )
                  .attr( 'transform', 'translate(' + (xOffset) + ')' )
                  .call( yAxis );

  // Create bar elements & bind data to elements
  var bar = svg.selectAll( '.bar' )
               .data( dataBuilding );
  bar.enter().append( 'svg:rect' );
  bar.attr( 'class', 'bar' )
     .attr( 'height', yScale.rangeBand )
     .attr( 'width', function( d ){ return xScale(d['Estimated Build Cost']); } )
     .attr( 'x', function(){ return xOffset; } )
     .attr( 'y', function( d ){ return yScale(d['Building ID']); } )
  bar.append( 'svg:title' )
      .text(function( d ){ return d['Building ID'] });
} );
