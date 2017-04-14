//for each product group aggregate all the NPV values in order to see the amount of money that could be added to zayo's revenue
//then when clicked on certain product group in the bar graph, show the account ID with the highest outstanding NPV value (CPQ file)
//then, show zayo what they are already making using the data_services file
//THEN make a graph combining the two with a sort of "you could be making this if you close all your deals"

var height = 700;
var width = 1000;
var xOffset = 15;
var yOffset = 20;

d3.csv('data/ZayoHackathonData_CPQs.csv', function(data) {
	var CPQdata = data
	var ethernetCPQData = data
	var waveMetroCPQData = data
	var IPCPQData = data
	var zColoCPQData = data
	var waveLongCPQData = data
	var darkCPQData = data
	var SONETCPQData = data
	var videoCPQData = data
	var cloudCPQData = data

	//I have to do this for every product because I need to keep track of the account with the highest NPV value.

	//Filtered by:
	//ethernet
	//CO
	//non-empty NPV value
	ethernetCPQData = _.filter(ethernetCPQData, function(d){
		return d['State'] === 'CO' && d['X36 NPV List'] !== ' $-   ' && d['Product Group'] === 'Ethernet';
	});

	ethernetCPQData = _.map( ethernetCPQData, function(d){
      return {
        'Account ID': d['Account ID'],
        'Product Group': d['Product Group'],
        'X36 NPV List': parseFloat( d['X36 NPV List'] )
      }
    });

    //Filtered by:
    //wavelengths - metro
    //CO
    //non-empty NPV value
    waveMetroCPQData = _.filter(waveMetroCPQData, function(d){
		return d['State'] === 'CO' && d['X36 NPV List'] !== ' $-   ' && d['Product Group'] === 'Wavelengths - Metro';
	});

	waveMetroCPQData = _.map( waveMetroCPQData, function(d){
      return {
        'Account ID': d['Account ID'],
        'Product Group': d['Product Group'],
        'X36 NPV List': parseFloat( d['X36 NPV List'] )
      }
    });

    //filtered by:
    //IP
    //CO
    //non-empty NPV value
    IPCPQData = _.filter(IPCPQData, function(d){
		return d['State'] === 'CO' && d['X36 NPV List'] !== ' $-   ' && d['Product Group'] === 'IP Services';
	});

	IPCPQData = _.map( IPCPQData, function(d){
      return {
        'Account ID': d['Account ID'],
        'Product Group': d['Product Group'],
        'X36 NPV List': parseFloat( d['X36 NPV List'] )
      }
    });

    //filtered by:
    //zColo
    //CO
    //non-empty NPV value
    zColoCPQData = _.filter(zColoCPQData, function(d){
		return d['State'] === 'CO' && d['X36 NPV List'] !== ' $-   ' && d['Product Group'] === 'zColo';
	});

	zColoCPQData = _.map( zColoCPQData, function(d){
      return {
        'Account ID': d['Account ID'],
        'Product Group': d['Product Group'],
        'X36 NPV List': parseFloat( d['X36 NPV List'] )
      }
    });

    //filtered by:
    //wavelengths - long haul
    //CO
    //non-empty NPV value
    waveLongCPQData = _.filter(waveLongCPQData, function(d){
		return d['State'] === 'CO' && d['X36 NPV List'] !== ' $-   ' && d['Product Group'] === 'Wavelengths - Long Haul';
	});

	waveLongCPQData = _.map( waveLongCPQData, function(d){
      return {
        'Account ID': d['Account ID'],
        'Product Group': d['Product Group'],
        'X36 NPV List': parseFloat( d['X36 NPV List'] )
      }
    });

    //filtered by:
    //dark fiber
    //CO
    //non-empty NPV value
    darkCPQData = _.filter(darkCPQData, function(d){
		return d['State'] === 'CO' && d['X36 NPV List'] !== ' $-   ' && d['Product Group'] === 'Dark Fiber - Metro';
	});

	darkCPQData = _.map( darkCPQData, function(d){
      return {
        'Account ID': d['Account ID'],
        'Product Group': d['Product Group'],
        'X36 NPV List': parseFloat( d['X36 NPV List'] )
      }
    });

    //filtered by:
    //sonet
    //CO
    //non-empty NPV value
    SONETCPQData = _.filter(SONETCPQData, function(d){
		return d['State'] === 'CO' && d['X36 NPV List'] !== ' $-   ' && d['Product Group'] === 'SONET';
	});

	SONETCPQData = _.map( SONETCPQData, function(d){
      return {
        'Account ID': d['Account ID'],
        'Product Group': d['Product Group'],
        'X36 NPV List': parseFloat( d['X36 NPV List'] )
      }
    });

    //filtered by:
    //live video
    //CO
    //non-empty NPV value
    videoCPQData = _.filter(videoCPQData, function(d){
		return d['State'] === 'CO' && d['X36 NPV List'] !== ' $-   ' && d['Product Group'] === 'Live Video';
	});

	videoCPQData = _.map( videoCPQData, function(d){
      return {
        'Account ID': d['Account ID'],
        'Product Group': d['Product Group'],
        'X36 NPV List': parseFloat( d['X36 NPV List'] )
      }
    });

    //filtered by:
    //cloud
    //CO
    //non-empty NPV value
    cloudCPQData = _.filter(cloudCPQData, function(d){
		return d['State'] === 'CO' && d['X36 NPV List'] !== ' $-   ' && d['Product Group'] === 'Cloud';
	});

	cloudCPQData = _.map( cloudCPQData, function(d){
      return {
        'Account ID': d['Account ID'],
        'Product Group': d['Product Group'],
        'X36 NPV List': parseFloat( d['X36 NPV List'] )
      }
    });

    //generic to build the graph

    CPQdata = _.filter(CPQdata, function(d){
		return d['State'] === 'CO' && d['X36 NPV List'] !== ' $-   ';
	});

	CPQdata = _.map( CPQdata, function(d){
      return {
        'Account ID': d['Account ID'],
        'Product Group': d['Product Group'],
        'X36 NPV List': parseFloat( d['X36 NPV List'] )
      }
    });

    CPQdata = _.mapKeys( CPQdata, function( d ){
      return d['Product Group'];
    });

    productNPVs = _(CPQdata)
    	.groupBy('Product Group')
    	.map((val, key) => ({
    		'Product Group': key,
    		'X36 NPV List': _.sumBy(val, 'X36 NPV List'),
    	})).value();

    var svg = d3.select( '#nonspatial2' ).append('svg:svg')
    			.attr('width', width)
    			.attr('height', height);

    productArray = _.map(productNPVs, function(d){
    	return d['Product Group']
    });

    var xScale = d3.scale.ordinal()
    					 .domain(productArray)
    					 .rangeRoundBands([0, width]);

    var yScale = d3.scale.linear()
				    	 .domain([0, d3.max(productNPVs, function(d){
				    	 	return parseFloat(d['X36 NPV List']);
				    	 })+1])
				    	 .range([yOffset, height]);

    var xAxis = d3.svg.axis()
			    	  .scale(xScale)
			    	  .orient('bottom');
    var xAxisG = svg.append('g')
			    	.attr('class','axis')
			    	.attr('transform','translate(0, '+ ( height - yOffset - 1 ) +')')
			    	.call(xAxis);

    var yAxis = d3.svg.axis()
			    	  .scale(yScale)
			    	  .orient('left')
			    	  .ticks(5);
    var yAxisG = svg.append('g')
			    	.attr('class', 'axis')
			    	.attr('transform', 'translate(' + (xOffset) + ')')
			    	.call(yAxis);

    var bar = svg.selectAll( '.bar' )
                 .data( productNPVs );
    bar.enter().append( 'svg:rect' )
       .attr( 'height', function( d ){ return yScale(d['X36 NPV List']) - yOffset; } )
       .attr( 'width', 100)
       .attr( 'y', function(){ return yOffset; } )
       .attr( 'x', function( d ){ return xScale(d['Product Group']); } )
       .style('fill', 'green');
});