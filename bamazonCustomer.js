//required the node modules
var mysql = require ("mysql");
var inquirer = require ("inquirer");

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
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
       
    // call to show the products
    showProducts()

  });
  
//function to show all products
function showProducts(){
  var query = "SELECT * FROM products";
  connection.query(query, function(err, res)  {
    if (err) throw err;
    
  })

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