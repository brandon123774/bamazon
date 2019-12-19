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
  database: "bamazon_DB"
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
    console.log("----------------------------------------------------------------------------------");  

    //iterate through the results list of products
    for (var i = 0; i < res.length; i++) {
      
      console.log("ID:" + res[i].item_id + " || Product Name: " + res[i].product_name + " || Price: " + res[i].price);
      console.log("----------------------------------------------------------------------------------");   
     }
    //call on the requestedProduct
    requestedProduct();

  });
};

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
    var query = "SELECT stock_quantity, price, product_sales, department_name FROM products WHERE ?";
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

function updateDepartmentRevenue(updatedSales, productDepartment) {

  //query from the db for department total sales
  var query = "SELECT total_sales FROM departments WHERE ?";
  connection.query(query, { department_name: productDepartment}, function (err, res) {

    //throw error
    if (err) throw err;

    //var for department sales and updated department sales

    var departmentSales = res[0].total_sales;

    var updatedDepartmentSales = parseInt(departmentSales) + parseInt(updatedSales);

    //the final updated total sales for the department
    finalDepartmentSalesUpdate(updatedDepartmentSales, productDepartment);
  });
};

//add the final department sales to the db
function finalDepartmentSalesUpdate(updatedDepartmentSales, productDepartment) {
  //create a query for this
  var query = "UPDATE departments SET ? WHERE ?";
  connection.query(query, [{
    total_sales: updatedDepartmentSales
  }, {
    department_name: productDepartment
  }], function (err, res) {
    if (err) throw err;

    //go back and display the products again so that user can buy more stuff
    showProducts();
  });
};



