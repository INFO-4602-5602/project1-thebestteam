// Constants
 


  var width = 1200;
  var height = 650;
  var xOffset = 150;
  var yOffset = 20;
  var margin = 20;
  var padding =10;
    
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


 
  // Filtered By
  // State: CO
  // On Zayo Network Status: Not on Zayo Network
  dataCPQ = _.filter( dataCPQ, function( d ){
    return d['State'] === 'CO' && d['X36 NPV List'] !== ' $-   ';
  } );

  // maps back the data we care about, parsed correctly
  dataCPQ = _.map( dataCPQ, function( d ){
    return {
      'Account ID': d['Account ID'],
      'Building ID': d['Building ID'],
      'Product Group': d['Product Group'],
      'City': d['City'],
      'On Zayo Network Status': d['On Zayo Network Status'],
      'X36 NPV List': parseFloat( d['X36 NPV List'] )
    }
  } );
  dataCPQ = _.mapKeys( dataCPQ, function( d ){
    return d['Building ID'];
  } );
  
  // sums NPVs across unique buildings
  uniqueBuildingNPVs = _(dataCPQ)
            .groupBy('Building ID')
            .map( (val, key) => ({

              'Building ID': key,
              'On Zayo Network Status': _.result(val[0], 'On Zayo Network Status'),
              'X36 NPV List': _.sumBy( val, 'X36 NPV List'),
              'Account': _.countBy(val, 'Account ID')
            })).value();

  // TODO: remove this line once data is properly filtered
  uniqueBuildingNPVs = _.sampleSize( uniqueBuildingNPVs, 20 );
console.log(uniqueBuildingNPVs);
  // Create svg to contain vis
  var svg = d3.select( '#nonspatial' ).append( 'svg:svg' )
                                      .attr( 'width', width )
                                      .attr( 'height', height );

  // Define axes scale
  var xScale = d3.scale.linear()
                 .domain( [0, d3.max( uniqueBuildingNPVs, function( d ){
                          return parseFloat( d['X36 NPV List'] );
                        } )+1] )
                 .range( [xOffset, width] );


   // generate array of Building IDs to build y axis
  uniqueBuildingArr = _.map( uniqueBuildingNPVs, function( d ){
   return d['Building ID']
  } );
  console.log(uniqueBuildingArr);
  var yScale = d3.scale.ordinal()
                .domain( uniqueBuildingArr )
                .rangeRoundBands([0, height], .1, .6);

  // Create axes
  var xAxis = d3.svg.axis()
                    .scale( xScale )
                    .orient( 'bottom' )
                    .ticks( 5 );
  var xAxisG = svg.append( 'g' )
                  .attr( 'class', 'axis' )
                  .attr( 'transform', 'translate(0, ' + (height-yOffset-1) + ')' )
                  .call( xAxis );

  var yAxis = d3.svg.axis()
                    .scale( yScale )
                    .orient( 'left' );
  var yAxisG = svg.append( 'g' )
                  .attr( 'class', 'axis' )
                  .attr( 'transform', 'translate(' + (xOffset) + ')' )
                  .call( yAxis );

  var title = d3.select("#title").append("text")
                .style("font-size", "40px")
                .text("Possible Revenue per Building");


  
  // Create bar elements & bind data to elements
  var bar = svg.selectAll( '.bar' )
               .data( uniqueBuildingNPVs );
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
     .on("click", function(d) {d3.select("#info")
        .text(" Building ID: "+d['Building ID']+", Possible Revenue According to CPQ NPV: $"+ d['X36 NPV List']).style("font-size", "30px");
        })
    
  bar.append( 'svg:title' )
      .text(function( d ){ return d['On Zayo Network Status'] });

 } );

//Legent
legend = d3.select('#legend')
svg = legend.append('svg').attr('height', 200).attr('width', 350)
rect = svg.append('rect')
                .attr('width', 300)
                .attr('height', 150)
                .attr('x', 40)
                .attr('y', 0)
                .style('fill', 'white')
                .attr('stroke', 'black')
text = svg.append('text').text('Legend')
                .attr('x', 50)
                .attr('y', 30)
                .attr('fill', 'black')
                .style("font-size", "30px")
      svg.append('rect')
                .attr('width', 20)
                .attr('height', 20)
                .attr('x', 50)
                .attr('y', 50)
                .style('fill', '#66de9a')
                .attr('stroke', '#66de9a')
text = svg.append('text').text('On Zayo Network')
                .attr('x', 75)
                .attr('y', 67)
                .attr('fill', 'black')
                .style("font-size", "20px")
      svg.append('rect')
                .attr('width', 20)
                .attr('height', 20)
                .attr('x', 50)
                .attr('y', 80)
                .style('fill', '#ff8c69')
                .attr('stroke', '#ff8c69')
      text = svg.append('text').text('Not on Zayo Network')
                .attr('x', 75)
                .attr('y', 97)
                .attr('fill', 'black')
                .style("font-size", "20px")
      svg.append('rect')
                .attr('width', 20)
                .attr('height', 20)
                .attr('x', 50)
                .attr('y', 110)
                .style('fill', '#fef65b')
                .attr('stroke', '#fef65b')
      text = svg.append('text').text('Build in Progress')
                .attr('x', 75)
                .attr('y', 127)
                .attr('fill', 'black')
                .style("font-size", "20px")