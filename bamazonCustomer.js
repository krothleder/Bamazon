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




// validateInput makes sure that the user is supplying only positive integers for their inputs
function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole non-zero number.';
	}
}


// promptPurchase will prompt the user for the item/quantity they would like to purchase
function promptPurchase(){
	var questions = [
		  {
		    type: 'input',
		    name: 'product_id',
		    message: 'What\'s the id of the product you would like to purchase?',
		    validate: validateInput,
		    filter: Number
		  },
		  {
		    type: 'input',
		    name: 'units',
		    message: 'How many units would you like to buy?',
		    validate: validateInput,
		    filter: Number
		  },
		];

		inquirer.prompt(questions).then(function (answers) {
		  var product = answers.product_id
		  var unitQuantity = answers.units


		  // console.log(product);
		  // console.log(unitQuantity);

		  updateInventory(product,unitQuantity);

		});
}

function updateInventory(item,quantity){
	// Query db to confirm that the given item ID exists in the desired quantity
	var queryStr = 'SELECT * FROM products WHERE ?';

	connection.query(queryStr, {item_id: item}, function(err, data) {
				if (err) throw err;

				// If the user has selected an invalid item ID, data attay will be empty
				// console.log('data = ' + JSON.stringify(data));

				if (data.length === 0) {
					console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
					displayInventory();

				} else {
					var productData = data[0];

					// console.log('productData = ' + JSON.stringify(productData));
					// console.log('productData.stock_quantity = ' + productData.stock_quantity);

					// If the quantity requested by the user is in stock
					if (quantity <= productData.stock_quantity) {
						console.log('Congratulations, the product you requested is in stock! Placing order!');

						// Construct the updating query string
						var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
						// console.log('updateQueryStr = ' + updateQueryStr);

						// Update the inventory
						connection.query(updateQueryStr, function(err, data) {
							if (err) throw err;

							console.log('Your oder has been placed! Your total is $' + productData.price * quantity);
							console.log('Thank you for shopping with us!');
							console.log("\n---------------------------------------------------------------------\n");

							// End the database connection
							connection.end();
						})
					} else {
						console.log('Sorry, there is an insufficient quantity, your order can not be placed as is.');
						console.log('Please modify your order.');
						console.log("\n---------------------------------------------------------------------\n");

						displayInventory();
					}
				}
			})
}


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
	  	promptPurchase();
  });
 }



 function runBamazon() {
	// console.log('___ENTER runBamazon___');

	// Display the available inventory
	displayInventory();
}


runBamazon();