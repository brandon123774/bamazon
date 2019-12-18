/// requeire

// connectioin // menu()



function menu(){

// inquiere //view Product Sales by Department //Create New Departmen

// switch
}


function viewProducts(){
// this is product by department t means you need to summarize 

//JOIN both tables (based on the depatment_name)  // depatmentid / department-name over-head (all of this is comming for department) / sum all the product for the department(produt sales) / total_profic (total_seales - over_head)
var query=
 "SELECT " +
    "   d.department_id, " +
    "   d.department_name, " +
    "   d.over_head_costs, " +
    "   SUM(IFNULL(p.product_sales, 0)) as product_sales, " +
    "   SUM(IFNULL(p.product_sales, 0)) - d.over_head_costs as total_profit " +
    "FROM products p " +
    "   RIGHT JOIN departments d ON p.department_name = d.department_name " +
    "GROUP BY " +
    "   d.department_id, " +
    "   d.department_name, " +
    "   d.over_head_costs"

}



function  newDepartment(){

// inquiere departmente name   / over_head_costs
    // INSERT

    menu()
}





    // testing
    
    var query=
    "SELECT " +
       "   d.department_id, " +
       "   d.department_name, " +
       "   d.over_head_costs, " +
    "p.name," +
    "p.product_sales" +
       "FROM products p " +
       "   RIGHT JOIN departments d ON p.department_name = d.department_name " 
   

       // count products
       var query=
       "SELECT " +
          "   d.department_id, " +
          "   d.department_name, " +
          "   d.over_head_costs, " +
       "p.name," +
       "p.product_sales" +
          "FROM products p " +
          "   RIGHT JOIN departments d ON p.department_name = d.department_name " +
          "GROUP BY " +
          "   d.department_id, " +
          "   d.department_name, " +
          "   d.over_head_costs"
      












