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
   
  });
  
  
