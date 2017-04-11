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

d3.csv( 'data/ZayoHackathonData_CPQs.csv', function( csvDataCPQ ){
  var dataCPQ = csvDataCPQ

  var width = 1200;
  var height = 650;
  var xOffset = 150;
  var yOffset = 20;
  var margin = 10;

  // Filtered By
  // State: CO
  // On Zayo Network Status: Not on Zayo Network
  dataCPQ = _.filter( dataCPQ, function( d ){
    return d['State'] === 'CO' && d['X36 NPV List'] !== ' $-   ';
  } );

  // TODO: remove this line once data is properly filtered
  dataCPQ = _.sampleSize( dataCPQ, 10 );

  dataCPQArr = _.map( dataCPQ, function( d ){
    return d['Building ID']
  } );

  // Create svg to contain vis
  var svg = d3.select( '#nonspatial' ).append( 'svg:svg' )
                                      .attr( 'width', width )
                                      .attr( 'height', height );

  // Define axes scale
  var xScale = d3.scale.linear()
                 .domain( [0, d3.max( dataCPQ, function( d ){
                          return parseFloat( d['X36 NPV List'] );
                        } )+1] )
                 .range( [xOffset, width] );
  var yScale = d3.scale.ordinal()
                .domain( dataCPQArr )
                .rangeRoundBands([0, height], 0.7);

  // Create axes
  var xAxis = d3.svg.axis()
                    .scale( xScale )
                    .orient( 'bottom' )
                    .ticks( 5 );
  var xAxisG = svg.append( 'g' )
                  .attr( 'class', 'axis' )
                  .attr( 'transform', 'translate(0, ' + (height - yOffset) + ')' )
                  .call( xAxis );

  var yAxis = d3.svg.axis()
                    .scale( yScale )
                    .orient( 'left' );
  var yAxisG = svg.append( 'g' )
                  .attr( 'class', 'axis' )
                  .attr( 'transform', 'translate(' + (xOffset) + ')' )
                  .call( yAxis );

  // Create bar elements & bind data to elements
  var bar = svg.selectAll( '.bar' )
               .data( dataCPQ );
  bar.enter().append( 'svg:rect' );
  bar.attr( 'class', function( d ){
        if( d['On Zayo Network Status'] === 'On Zayo Network' ){
          return 'barOn'
        }
        else if( d['On Zayo Network Status'] === 'Not on Zayo Network' ){
          return 'barOff';
        }
        else {
          return 'barBuild';
        }
      })
     .attr( 'height', yScale.rangeBand )
     .attr( 'width', function( d ){ return xScale(d['X36 NPV List']) - xOffset; } )
     .attr( 'x', function(){ return xOffset; } )
     .attr( 'y', function( d ){ return yScale(d['Building ID']); } )
  bar.append( 'svg:title' )
      .text(function( d ){ return d['X36 NPV List'] });
} );
