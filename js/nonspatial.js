// Constants
var width = 1000;
var height = 750;
var xOffset = 195;
var yOffset = 50;
var padding =10;

// Load CSV
d3.csv( 'data/ZayoHackathonData_CPQs.csv', function( csvDataCPQ ){
  d3.csv( 'data/ZayoHackathonData_Accounts.csv', function( csvDataAccounts ){
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

    // creates a list of accounts by building id
    function mergeAccounts( arr ){
      var merged = _.groupBy( arr, 'Building ID' );
      return merged = _.mapValues( merged, function( v ){
        merged = _.map( v, 'Account ID' );
        return _.uniq( merged );
      } )
    }
    mergedCPQAccounts = mergeAccounts( dataCPQ );
    mergedCPQAccountsCount = _.mapValues( mergedCPQAccounts, function( val, key ){
      return { 'Accounts': _.size( val ) };
    } );

    dataCPQ = _.mapKeys( dataCPQ, function( d ){
      return d['Building ID'];
    } );

    dataCPQ = _.merge( dataCPQ, mergedCPQAccountsCount);

    // sums NPVs across unique buildings
    uniqueBuildingNPVs = _(dataCPQ)
              .groupBy('Building ID')
              .map( (val, key) => ({
                'Building ID': key,
                'On Zayo Network Status': _.result(val[0], 'On Zayo Network Status'),
                'Accounts': _.result(val[0], 'Accounts'),
                'Product Group': _.result(val[0], 'Product Group'),
                'City': _.result(val[0], 'City'),
                'X36 NPV List': _.sumBy( val, 'X36 NPV List'),
              })).value();

    // sort data by highest NPV
    uniqueBuildingNPVs = _.sortBy( uniqueBuildingNPVs, function( d ){
      return d['X36 NPV List'];
    } ).reverse();

    // TODO: remove this line once data is properly filtered
    uniqueBuildingNPVs = _.take( uniqueBuildingNPVs, 20 );


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

    var yScale = d3.scale.ordinal()
                  .domain( uniqueBuildingArr )
                  .rangeRoundBands([0, height-yOffset-1], .1, .6);

    // Create axes
    var xAxis = d3.svg.axis()
                      .scale( xScale )
                      .orient( 'bottom' )
                      .ticks( 5 );
    var xAxisG = svg.append( 'g' )
                    .attr( 'class', 'axis' )
                    .attr( 'transform', 'translate(0, ' + (height-yOffset-1) + ')' )
                    .call( xAxis );
    var xLabel = svg.append("text")
                    .attr('class', 'label')
                    .attr('x', width/2)
                    .attr( 'transform', 'translate(0, ' + (height) + ')' )
                    .style("font-size", "18px")
                    .text("36 Month NPV");

    var yAxis = d3.svg.axis()
                      .scale( yScale )
                      .orient( 'left' );
    var yAxisG = svg.append( 'g' )
                    .attr( 'class', 'axis' )
                    .attr( 'transform', 'translate(' + (xOffset-1) + ')' )
                    .call( yAxis );

    var yLabel = svg.append("text")
                    .attr('class', 'label')
                    .attr( 'transform', 'translate(' + (xOffset/2-90) + ')')
                    .attr('y', height/2)
                    .style("font-size", "18px")
                    .text("Building ID");

    var tooltip = d3.tip()
                    .attr( 'class', 'tooltip' )
                    .offset([-10, 0])
                    .html( function( d ){
                      var npv = d['X36 NPV List'];
                      npv = npv.toLocaleString('en-US', {minimumFractionDigits: 2});

                      var numAccounts = d['Accounts'];
                      return (
                        "<strong>NPV:</strong> <span>$" + npv +
                        "</span><br/><strong>Number of Accounts:</strong> <span>" + numAccounts +
                        "</span>"
                      );
                    } );
    svg.call( tooltip );

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
       .on( 'mouseover', tooltip.show )
       .on( 'mouseout', tooltip.hide )
       .on( 'click', function( d ){
            d3.select( '#building' )
              .text( d['Building ID'] )
            d3.select( '#npv' )
              .text( d['X36 NPV List'] )
            d3.select( '#accounts')
              .text( d['Accounts'] )
            d3.select( '#productgroup')
              .text( d['Product Group'] )
            d3.select( '#city')
              .text( d['City'] )
        })

    bar.append( 'svg:title' )
        .text(function( d ){ return d['On Zayo Network Status'] });
    } );
 } );

// Legend
legend = d3.select('#legend')
svg = legend.append('svg').attr('height', 200).attr('width', 350)
rect = svg.append('rect')
                .attr('width', 300)
                .attr('height', 150)
                .attr('x', 40)
                .attr('y', 0)
                .style('fill', 'white')
                .attr('stroke', 'rgba(0, 0, 0, 0.3)')
text = svg.append('text').text('Legend')
                .attr('x', 150)
                .attr('y', 30)
                .attr('fill', 'rgba(0, 0, 0, 0.85)')
                .style('font-size', '24px')
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
                .attr('fill', 'rgba(0, 0, 0, 0.85)')
                .style("font-size", "18px")
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
                .attr('fill', 'rgba(0, 0, 0, 0.85)')
                .style("font-size", "18px")
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
                .attr('fill', 'rgba(0, 0, 0, 0.85)')
                .style("font-size", "18px")
