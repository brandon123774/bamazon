// the same customer 

// requiere
// conection  // call menu

require (console.table)

function menu() {

    // inquiere ask for the choices [View Products for Sale,View Low Inventory,Add to Inventory, Add New Produc]

    //response a switch 
}




function viewProdcuts() {
    // same than customer (select and show the list of products)
   var query = " SELECT * FROM products"
   connection.query(query,function(err,res){
       if (err) throw err;
       console.table(res)

    menu()
   })


}


function viewLowInvetory() {

    // same than customer (select and show the list of products) select is having a WHERE sotck-quantity < 50
    menu()

}


function addInvetory() {

    // inquiere product id and the quantity 
    // UPDATE products set stock where the id = id and 
    menu()


}


function addNewProduct() {
    // INQUERE ask for product name, dpartment name, stock, price
    // INSERT
    menu()
}