//required the node modules
var mysql = require("mysql");
var inquirer = require("inquirer");

//create connections
var connection = mysql.createConnection({
  host: "localhost",

  //the port
  port: 3306,

  //credentials 
  user: "root",
  password: "password",
  database: "bamazonDB"
});

//when connection doesn't work, need to throw error
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");

  // call to show the products
  showProducts()

});

//function to show all products
function showProducts() {
  var query = "SELECT * FROM products";
  connection.query(query, function (err, res) {
    //throw error 
    if (err) throw err;

    //iterate through the results list of products
    for (var i = 0; i < res.length; i++) {
      console.log("ID:" + res[i].item.id + " || Product Name: " + res[i].product.name + " || Price: " + res[i].price);
    }
    //call on the requestedProduct
    requestedProduct();

  });
};


//query select products table
// show the results
// you ask to the customer what product want and how many units (inquiere)

// with the response
// you need to verify if you have enough stock
// if yes you sell and update de db the new stock
// if not tell the user
// you ask if they want to buy other thins
// if yes showProdcuts
// if no you finish

function requestedProduct() {

  //use inquirer to ask prompts to the user
  inquirer.prompt([{
    name: "ID",
    type: "input",
    message: "What is the ID of the item that you would like to purchase?"

  }, {
    name: "units",
    type: "input",
    message: "How many would you like?"
  }]).then(function (wanted) {
    var query = "SELECT stock_quantity, price, product_sales, department_name FROM products WHERE?";
    connection.query(query, { item_id: wanted.ID }, function (err, res) {

      //throw error
      if (err) throw err;

      //create var for each sql table category used in this function
      var current_stock = res[0].stock_quantity;
      var price_per_unit = res[0].price;
      var productSales = res[0].product_sales;
      var productDepartment = res[0].department_name;

      //check to see if enough stock of the item requested
      if (current_stock >= wanted.units) {
        finishPurchase(current_stock, price_per_unit, productSales, productDepartment, wanted.ID, wanted.units);
      } else {
        console.log(" There is not enough stock of this product!");

        requestedProduct();
      }
    });
  });
};

function finishPurchase(currentStock, price, productSales, productDepartment, selectedID, selectedUnits) {

  //updated stock amounts after item is bought
  var updatedStock = currentStock - selectedUnits;

  //calculated prices
  var totalPrice = price * selectedUnits;

  //updates the total product sales after user purchase
  var updatedSales = parseInt(productSales) + parseInt(totalPrice);

  //updates the DB with new stock amounts
  var query = "UPDATE products SET ? WHERE ?";
  connection.query(query, [{
    stock_quantity: updatedStock,
    product_sales: updatedSales
  }, {
    item_id: selectedID
  }], function (err, res) {
    //throw err
    if (err) throw err;

    //purchase completed
    console.log("Purchase completed.")

    //total user spent
    console.log("You're payment has been recieved : " + totalPrice);

    //revenue the department made from sale
    updateDepartmentRevenue(updatedSales, productDepartment);
  });
};

function updateDepartmentRevenue(updatedSales, productSales) {

  //query from the db for department total sales
  var query = "SELECT total_sales FROm departments WHERE ?";
  connection.query(query, { department_name: productDepartment}, function (err, res)  {

    //throw error
    if (err) throw err;

    //var for department sales and updated department sales

    var departmentSales = res[0].total_sales;

    var updatedDepartmentSales = parseInt(departmentSales) + parseInt(updatedDepartmentSales);

    //the final updated total sales for the department
    finalDepartmentSalesUpdate(updatedDepartmentSales, productDepartment);
  });
};

