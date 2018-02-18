//Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");


//Connect to Database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    //Your username
    user: "root",
    //your password
    password: "Clau58tice",
    database: "Bamazon"
});

function displayProducts() {
	connection.query('SELECT * FROM Products', function(err, res) {
		if (err) throw err;
		//New table constructor
		var displayTable = new Table({
			//Set table columns
			head: ["Item ID", "Product Name", "Department", "Price", "Stock"],
			//Set Column widths
			colWidths: [10, 20, 20, 10, 20]
		});
		//Loop through sql table
		for (i = 0; i < res.length; i++) {
			//And push to new table
			displayTable.push([
					res[i].item_id,
					res[i].product_name,
					res[i].department_name,
					res[i].price,
					res[i].stock_quantity
				]);
		}
		//Log the table to console
		console.log(displayTable.toString());
		attemptPurchase();
	});
};

function attemptPurchase() {
	//Get desired product from user
	inquirer.prompt([
			{
				name: "productID",
				type: "input",
				message: "What is the Item ID of the product you want to purchase?"
			},
			{
				name: "amount",
				type: "input",
				message: "How many would you like?"
			},
		]).then(function(answer){
			//Set answers as variables to pass into purchase function
			var purchaseID = answer.productID;
			var purchaseAmount = answer.amount;
			purchase(purchaseID, purchaseAmount);
		});
};

function purchase(id, amountNeeded) {
	//Check purchaseAmount to see if possible to fill order
	connection.query("SELECT * FROM Products WHERE item_id = ?", [id], function(err, res){
		if (err) throw err;
		if (amountNeeded <= res[0].stock_quantity) {
			//Get cost
			var purchaseCost = res[0].price * amountNeeded;
			//Display confirmation to user
			console.log("Thank you for your purchase!");
			console.log("Your total for " + amountNeeded + " of " + res[0].product_name + " is " + purchaseCost + ". Thank you, come again!");
			//Update database to reflect purchase
			connection.query("UPDATE Products SET stock_quantity = stock_quantity - " + amountNeeded + " WHERE item_id = " + id);
		} else {
			console.log("Sorry, we don't have enough! Check back later");
		};
		//Recursively function call
		displayProducts();
	});
};

displayProducts();


