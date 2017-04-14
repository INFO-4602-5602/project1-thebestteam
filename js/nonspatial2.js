//for each product group aggregate all the NPV values in order to see the amount of money that could be added to zayo's revenue
//then when clicked on certain product group in the bar graph, show the account ID with the highest outstanding NPV value (CPQ file)
//then, show zayo what they are already making using the data_services file
//THEN make a graph combining the two with a sort of "you could be making this if you close all your deals"

d3.csv('data/ZayoHackathonData_CPQs.csv', function(data) {
	var ethernetCPQData = data
	var waveMetroCPQData = data
	var IPCPQData = data
	var zColoCPQData = data
	var waveLongCPQData = data
	var darkCPQData = data
	var SONETCPQData = data
	var videoCPQData = data
	var cloudCPQData = data

	//Filtered by:
	//ethernet
	//CO
	//non-empty NPV value
	ethernetCPQData = _.filter(ethernetCPQData, function(d){
		return d['State'] === 'CO' && d['X36 NPV List'] !== ' $-   ' && d['Product Group'] === 'Ethernet';
	});

	ethernetCPQData = _.map( dataCPQ, function(d){
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
    waveMetroCPQData = _.filter(ethernetCPQData, function(d){
		return d['State'] === 'CO' && d['X36 NPV List'] !== ' $-   ' && d['Product Group'] === 'Wavelengths - Metro';
	});

	waveMetroCPQData = _.map( dataCPQ, function(d){
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
    IPCPQData = _.filter(ethernetCPQData, function(d){
		return d['State'] === 'CO' && d['X36 NPV List'] !== ' $-   ' && d['Product Group'] === 'IP Services';
	});

	IPCPQData = _.map( dataCPQ, function(d){
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
    zColoCPQData = _.filter(ethernetCPQData, function(d){
		return d['State'] === 'CO' && d['X36 NPV List'] !== ' $-   ' && d['Product Group'] === 'zColo';
	});

	zColoCPQData = _.map( dataCPQ, function(d){
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
    waveLongCPQData = _.filter(ethernetCPQData, function(d){
		return d['State'] === 'CO' && d['X36 NPV List'] !== ' $-   ' && d['Product Group'] === 'Wavelengths - Long Haul';
	});

	waveLongCPQData = _.map( dataCPQ, function(d){
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
    darkCPQData = _.filter(ethernetCPQData, function(d){
		return d['State'] === 'CO' && d['X36 NPV List'] !== ' $-   ' && d['Product Group'] === 'Dark Fiber - Metro';
	});

	darkCPQData = _.map( dataCPQ, function(d){
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
    SONETCPQData = _.filter(ethernetCPQData, function(d){
		return d['State'] === 'CO' && d['X36 NPV List'] !== ' $-   ' && d['Product Group'] === 'SONET';
	});

	SONETCPQData = _.map( dataCPQ, function(d){
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
    videoCPQData = _.filter(ethernetCPQData, function(d){
		return d['State'] === 'CO' && d['X36 NPV List'] !== ' $-   ' && d['Product Group'] === 'Live Video';
	});

	videoCPQData = _.map( dataCPQ, function(d){
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
    cloudCPQData = _.filter(ethernetCPQData, function(d){
		return d['State'] === 'CO' && d['X36 NPV List'] !== ' $-   ' && d['Product Group'] === 'Cloud';
	});

	cloudCPQData = _.map( dataCPQ, function(d){
      return {
        'Account ID': d['Account ID'],
        'Product Group': d['Product Group'],
        'X36 NPV List': parseFloat( d['X36 NPV List'] )
      }
    });
});