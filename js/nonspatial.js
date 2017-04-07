// Constants

// Load CSV
var data;
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
