//required fields
var mysql = require ("mysql");
var inquirer = require ("inquirer");

//create connections
var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,

    user: "root",
    password: "password",
    database: "bamazonDB"
  });

  //establish the connection
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    showProducts()
   // call to show the products
  });
  
  
function showProducts(){

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
}

function menu(){


}

function sell(){
    // if yes you sell and update de db the new stock  (if you do the supervisor you need to update the sales (units * price))

}

function end(){

}