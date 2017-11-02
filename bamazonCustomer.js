// Pull in required dependencies
var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
   host: "localhost",
   port: 3306,
   user: 'root',
   password: '',
   database: 'bamazon'
});


displayInventory();

function displayInventory() {
  console.log("Finding all items...\n");
  connection.query("SELECT * FROM products",   {
  
    },
    function(err, res) {
	    if (err) throw err;

	    // Log all results of the SELECT statement
	    console.log('Existing Inventory: ');
		console.log('...................\n');

		var strOut = '';
		for (var i = 0; i < res.length; i++) {
			strOut = '';
			strOut += 'Item ID: ' + res[i].item_id + '  //  ';
			strOut += 'Product Name: ' + res[i].product_name + '  //  ';
			strOut += 'Department: ' + res[i].department_name + '  //  ';
			strOut += 'Price: $' + res[i].price + '\n';

			console.log(strOut);
		}

	  	console.log("---------------------------------------------------------------------\n"); 
  });
 }