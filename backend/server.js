// connect to the database
const { query } = require('express');
const express = require('../node_modules/express');
const { Pool } = require('../node_modules/pg');
const dotenv = require('../node_modules/dotenv').config();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
// Create express app
const app = express();
const port = 5000;
const cors = require("cors");
const { json } = require('body-parser');
app.use(cors());


const { generateRequestUrl, normaliseResponse } = require('google-translate-api-browser');
const https = require('https');
// Create pool
const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

// Names for orders
firstName = ["\'Bob","\'Dylan","\'Brother","\'Bear","\'Guy","\'Ur","\'My","\'Same","\'Kim","\'Light","\'Queen","\'Waltuh"];
lastName =  ["Smith\'","Williams\'","Lopez\'","Keener\'","Petras\'","Brown\'","Ashtray\'","Asatryan\'",
            "Reitmeyer\'","Ha\'","Hak\'","Hawk\'","Mmmmmmmm\'","White\'","Mom\'"];

    // Attributes for the Order
    let orderItems = "";
    let rawPrice = 0.00;
    let tax = 0.00;
    let totalPrice = 0.00;
    let orderID;
    const customerName = getName();

// items low on stock
let lowStock = [];

// all items ordered
let allOrdered = [];


// ***************** Functions directly related to the current Order *****************
    async function addItem(itemName){
        allOrdered.push(itemName);
        if(orderItems == ""){
            orderItems += itemName;
        }else{
            orderItems += "," + itemName;
        }
    }

    // get price and tax details
    async function updatePrice(itemName) {
        // calculate item total
        let itemPrice = 0.00;
        // get new order item's price from database
        let price;
       await pool
        .query("SELECT item_price FROM menu WHERE item_name ='" + itemName + "';")
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
                price = query_res.rows[i];
                console.log(query_res.rows[i]);
            }})
        .then(()=>{
            console.log("Finished Query");
            itemPrice = price.item_price;
            rawPrice += roundTotal(itemPrice);
            // calculate tax
            //console.log("itemPrice: " + itemPrice);
            let taxPrice = roundTotal(itemPrice * 0.0825);
            // Update amount being paid in taxes
            tax += taxPrice;
            // calculate order total
            totalPrice += roundTotal(parseFloat(itemPrice) + parseFloat(taxPrice));
            roundTotal(totalPrice);
            console.log("totalPrice: " + totalPrice + "\n tax: " + tax);
        });
    }

    async function removeItem(itemID){
        // get the price of the item
        let itemPrice = 0.00;
        await pool.query("SELECT item_price FROM menu WHERE item_name ='" + allOrdered[itemID] + "';")
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
                itemPrice = query_res.rows[i].item_price;
                console.log(query_res.rows[i]);
            }})
        .then(()=>{
            let taxNum = roundTotal(parseFloat(itemPrice) * 0.0825);
            totalPrice -= roundTotal(parseFloat(itemPrice) + taxNum);
            tax -= taxNum;
            totalPrice = roundTotal(totalPrice);
            roundTotal(tax);
        })

        orderItems = "";
        // add every item back into the string
        for(let i = 0; i < allOrdered.length; i++){
            if(i != itemID && allOrdered[i] != ""){
                if(orderItems == ""){
                    orderItems += allOrdered[i];
                }else{
                    orderItems += "," + allOrdered[i];
                }
            }else{
                allOrdered[i] = "";
            }
        }
        if(orderItems == ""){
            totalPrice = 0.00;
            tax = 0.00;
        }
    }

    //reset all the prices for the itemized receipt to zero
    function resetTotal(){
        totalPrice=0.00;
        rawPrice=0.00;
        tax=0.00;
    }

    // send orders to database
    async function sendOrder(paymentType, empName){
        // get time
        let date = new Date().toLocaleDateString();
        let time = new Date().toLocaleTimeString();
        time = time.substring(0, 8);
        let updatedDate = date + " " + time;
        cardNum = cardNumberGenerator(12);
        custName = getName();
        // resets allOrdered
        allOrdered = [];

        await getID().then(()=>{
            let query = "INSERT INTO receipts values(" + orderID + ",'" + paymentType + "'," + totalPrice + ",'" + updatedDate + "','" + orderItems + "'," 
                                                    + custName + "," + cardNum + ",'" + empName + "');";
            // execute query
            let orderQuer = "INSERT INTO orders values(" + orderID + "," + totalPrice + ",'" + updatedDate +"');";
            if(orderItems != ""){
                console.log("HERE");
                console.log(query);
                pool.query(query)
                .then(()=>{
                    pool.query(orderQuer);
                })
                .then(()=>{
                    // Subtracts inventory items used up in this order
                    updateInventory(orderItems);
                    // Resets order attributes
                    totalPrice = 0.00;
                    orderItems = "";
                    tax = 0.00;
                    return 1;
                })
            }
            console.log("Uploaded Order");
        });
        return 0;
    }


    
// *************************************************************************************



function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function cardNumberGenerator(cardlen){
    cardNumber = "\'"
    for (let i = 0; i < cardlen; i++){
        cardNumber += getRandomInt(10) 
    }
    cardNumber += "\'"

    return cardNumber
}

function getName() {
    let numFirst = getRandomInt(firstName.length)
    let numLast = getRandomInt(lastName.length)
    let fullName = firstName[numFirst] + " " + lastName[numLast];

    return fullName;
}

// adding new items to menu
let itemID;
//addMenu("tomato salad", 2.00, "Tomatoes,Dressing", "www.urmom.com");
async function addMenu(itemName, itemPrice, itemIngreds, url) {
    await getItemID()
    .then(()=>{
        // send in query
        const query = "INSERT INTO menu VALUES(" +itemID + ",'" + itemName +"', " + itemPrice +", '" + itemIngreds + "', '" + url + "');";
        console.log(query);
        pool.query(query);
    })
    
    // check if each item ingredient exists in the database
    let individuals = itemIngreds.split(',');
    for(let i = 0; i < individuals.length; i++){
        let name = individuals[i];
        let exists;
        await pool.query("SELECT EXISTS(SELECT FROM ingredients where name = '" + name + "');").then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++){
                exists = query_res.rows[i];
                console.log(query_res.rows[i]);
            }
            if(!exists.exists){
                addInventoryItem(name);
            }
        });
    }
}

async function addInventoryItem(name){
    // get newID for item
    let ID;
    await pool.query("SELECT max(ingredient_id) FROM ingredients;")
    .then(query_res => {
        for(let i = 0; i < query_res.rowCount; i++){
            ID = query_res.rows[i].max;
            console.log(ID);
        }
    }).then(()=>{
        let newID = ID + 1;
        console.log("INSERT INTO ingredients VALUES(" + newID + ",'" + name + "', 150, 'servings', '2022-10-01');");
        pool.query("INSERT INTO ingredients VALUES(" + newID + ",'" + name + "', 150, 'servings', '2022-10-01');");
    });
}

function deleteMenu(item){
    pool.query("DELETE FROM menu WHERE item_name = '" + item + "';");
}

function updateMenu(item, price){
    pool.query("UPDATE menu SET item_price = " + price + " WHERE item_name = '" + item + "';");
}

async function getItemID() {
    let newID;
    await pool
    .query("SELECT max(item_id) FROM menu;")
    .then(query_res => {
        for (let i = 0; i < query_res.rowCount; i++){
            newID = query_res.rows[i];
            console.log(query_res.rows[i]);
        }})
    .then(()=>{
        itemID = newID.max+1;
    }) 
}

async function getID() {
    let newID;
    await pool
    .query("SELECT max(order_id) FROM receipts;")
    .then(query_res => {
        for (let i = 0; i < query_res.rowCount; i++){
            newID = query_res.rows[i];
            console.log(query_res.rows[i]);
        }}).then(()=>{
            orderID = newID.max + 1;
            // return orderID;
        });
}

async function checkStock(){
    lowStock = [];
    let items = await getInventory();

    for(let i = 0; i < items.length; i++){
        if(items[i].quantity <= 30){
            lowStock.push(items[i].name);
        }
    }
}

function roundTotal(num){
    num.toFixed(2);
    let newNum = "";
    let currNum = "";
    currNum += num;
    let numDigs = 0;
    let hitDeci = false;
    let big = false;
    for(let char of currNum){
        newNum += char;
        if(char == '.'){
            hitDeci = true;
        }
        if(hitDeci){
            numDigs++;
        }
        if(numDigs == 3){
            if(parseInt(char) > 4){
                big = true;
            }
            break;
        }
    }
    // Rounds if necessary
    newNum = parseFloat(newNum);
    if(big){
        newNum += 0.01;
    }
    return parseFloat(newNum);
}

async function updateInventory(orderItems){
    items = orderItems.split(",");
    console.log(items[0]);
    ingredients=[];
    for(i = 0; i < items.length; i++){
        await pool
            .query('SELECT ingredients_used FROM menu WHERE item_name = \'' +items[i] +'\';')
            .then(query_res => {
                for (let i = 0; i < query_res.rowCount; i++){
                    ingredients.push(query_res.rows[i]);
                    console.log(query_res.rows[i]);
                }});
    }
    for(i = 0; i < ingredients.length; i++){
        ingredients_str=ingredients[i].ingredients_used;
        console.log(ingredients_str);
        ingred=ingredients_str.split(",");
        for(j = 0; j < ingred.length; j++){
            // get current value of item
           quant_str = "";
           console.log("Ingredient: ", ingred[j]);
           query_str = "SELECT quantity FROM ingredients WHERE name ='" + ingred[j] +"';";
           await pool
            .query(query_str)
            .then(query_res => {
                for (let i = 0; i < query_res.rowCount; i++){
                    quant_str=query_res.rows[i];
                    console.log(query_res.rows[i]);
                }});
            quant=quant_str.quantity; //int
            quant-=1; //update
            if(quant<0){
                quant=0;
            }
            console.log("quant: "+quant);
            // Update value of that item
            query_str = "UPDATE ingredients SET quantity = " + quant+ " WHERE name = '" + ingred[j] + "';";
            console.log(query_str);
            await pool.query(query_str)
        }
    }
}

//array of bowls
async function bowlContent(){
    let item;
    let bowl ={};
    bowls =[];
    await pool
            .query("SELECT item_name,url FROM menu WHERE item_name like '%Bowl%';")
            .then(query_res => {
                for (let i = 0; i < query_res.rowCount; i++){
                    item=query_res.rows[i];
                    console.log(query_res.rows[i]);
                    bowl.name =item.item_name;
                    bowl.url =item.url;
                    bowls.push(bowl);
                }});
    //console.log(bowls[0].name)
    return bowls;
}

//array of gyros
async function gyrosContent(){
    let item;
    let gyro ={};
    gyros=[];
    await pool
            .query("SELECT item_name, url FROM menu WHERE item_name like '%Gyro%';")
            .then(query_res => {
                for (let i = 0; i < query_res.rowCount; i++){
                    item=query_res.rows[i];
                    console.log(query_res.rows[i]);
                    gyro.name =item.item_name;
                    gyro.url =item.url;
                    gyros.push(gyro);
                }});
    console.log(gyros[0].name)
    console.log(gyros[0].url)
    return gyros;
}

//array of drinks
function drinksContent(){
    let drink1={}; //water bottle
    drink1.url=  "https://www.shutterstock.com/image-photo/plastic-water-bottle-big-small-600w-1907885707.jpg"
    drink1.name = "Bottled Water"
    let drink2={};//fountain drinks
    drink2.url=  "https://www.shutterstock.com/image-photo/soda-fountain-cup-isolated-on-600w-445209874.jpg"
    drink2.name = "Fountain Drinks"
    drinks=[drink2, drink1];
    //console.log(drinks[0].url);
    return drinks;
}

//array of extras
async function extrasContent(){
    //extras=["2 Meatballs", "2 Falafels", "Fries", "Garlic Fries", "Hummus & Pita", "Extra Dressing", "Extra Hummus", "Extra Protein", "Pita Bread"];
    let item;
    let extra ={};
    extras=[];
    await pool
            .query("SELECT item_name,url FROM menu WHERE item_name not like '%Gyro%' and item_name not like '%Bowl%' and item_name not like 'Bottled Water' and item_name not like 'Fountain Drinks';")
            .then(query_res => {
                for (let i = 0; i < query_res.rowCount; i++){
                    item=query_res.rows[i];
                    console.log(query_res.rows[i]);
                    extra.name =item.item_name;
                    extra.url =item.url;
                    extras.push(extra);
                }});
    //console.log(extras[0].name)
    return extras;
}

//the quantity of times that items were ordered in a time frame for POS report
//returns the number of times it was ordered
async function reportContent(date1, date2){ //params are item name the first date and the second date all strings
    quantity_str="";
    query_str ="SELECT order_items FROM receipts where timestamp between '"+date1+" "+"00:00:00' and '"+date2+" "+"00:00:00';";
    // query_str ="SELECT count(order_items) AS quantity FROM receipts where timestamp between '"+date1+" "+"00:00:00' and '"+date2+" "+"00:00:00';";
    let data = [1]
    await new Promise((resolve,reject) =>{
        pool.query(query_str, (error, result) =>{
            data = result
            resolve()
        })
        
    })
    return data     
}

//the popular combos ordered in a time frame
async function popCombos(date1, date2) {
    let keyList = [];
    let valueList = [];
    let topTenItems = [];
    const matchCounter = new Map();
    
    await pool.query("SELECT * FROM receipts where timestamp between '" + date1 + " " +"00:00:00' and '" + date2 + " 00:00:00';")
    .then(query_res => {
        for (let row = 0; row < query_res.rowCount; ++row) {
            //create list of all ordered items in that one order
            let orderItems = [];
            if (query_res.rows[row].order_items == "") {
                continue;
            }
            orderItems = query_res.rows[row].order_items.split(",");

            //create all possible pairs and use hashmap to keep track of counts
            if (orderItems.length == 1) {
                continue;
            }

            for(let i = 0; i < orderItems.length; ++i) {
                for (let j = i + 1; j < orderItems.length; ++j) {
                    let word = orderItems[i] + "," + orderItems[j];
                    keyList.push(word);
                    if (matchCounter.has(word)) {
                        matchCounter.set(word, matchCounter.get(word) + 1);
                    } else {
                        matchCounter.set(word, 1);
                    }
                }
            }
        }
    })
    //creating list of counts for the combos
    for (let i = 0; i < keyList.length; ++i) {
        valueList.push(matchCounter.get(keyList[i]));
    }
    //sorting valueList in descending order
    valueList.sort(function(a, b){return (b - a)});
    //removing duplicates in list
    let uniqueList = [...new Set(valueList)];
    //creating top10 list of combos
    let matchingList = [];
    for (let i = 0; i < uniqueList.length; ++i) {
        //list of the pairs with value given
        for (let [key, value] of matchCounter.entries()) {
            if (value === uniqueList[i]) {
                let pair = key.split(",");
                let one = pair[0];
                let two = pair[1];
                matchingList.push({first: one, second: two, value: uniqueList[i]});
            }
        }
    }
    for (let i = 0; i < 10; ++i) {
        topTenItems.push(matchingList[i]);
        topTenItems[i].id = i
    }

    return topTenItems;
}


//all receipts
async function receipts(){
    query_str = "SELECT * FROM receipts;";
    receipts=[];
    await pool
            .query(query_str)
            .then(query_res => {
                for (let i = 0; i < query_res.rowCount; i++){
                    receipts.push(query_res.rows[i]);
                    //console.log(query_res.rows[i]);
                }});
    //console.log(receipts[1])
    return receipts;
}

//get all the ingredients in id order
async function getInventory(){
    query_str = "SELECT * FROM ingredients ORDER BY ingredient_id;";
    inventory=[];
    await pool
            .query(query_str)
            .then(query_res => {
                for (let i = 0; i < query_res.rowCount; i++){
                    inventory.push(query_res.rows[i]);
                    //console.log(query_res.rows[i]);
                }});
    //console.log(inventory[1])
    return inventory;
}

//get all the menu items in id order
async function getMenu(){
    query_str = "SELECT * FROM menu ORDER BY item_id;";
    menuItems=[];
    await pool
            .query(query_str)
            .then(query_res => {
                for (let i = 0; i < query_res.rowCount; i++){
                    menuItems.push(query_res.rows[i]);
                    //console.log(query_res.rows[i]);
                }});
    //console.log(menuItems[1])
    return menuItems;
}

//get all the receipts between two dates
async function combosData(date1, date2){
    query_str = "SELECT * FROM receipts where timestamp between '"+date1+" "+"00:00:00' and '"+date2+" "+"00:00:00';";
    combosReceipts=[];
    await pool
            .query(query_str)
            .then(query_res => {
                for (let i = 0; i < query_res.rowCount; i++){
                    combosReceipts.push(query_res.rows[i]);
                    //console.log(query_res.rows[i]);
                }});
    //console.log(combosReceipts[1])
    return combosReceipts;
}

//gets the quantity in the inventory of a particular item
async function inventoryQuantity(item){
    quantity_str="";
    query_str ="SELECT quantity as quan FROM ingredients where name = '"+item+"';";
    await pool
            .query(query_str)
            .then(query_res => {
                for (let i = 0; i < query_res.rowCount; i++){
                    quantity_str=query_res.rows[i];
                    console.log(query_res.rows[i]);
                }});
    quantity=quantity_str.quan;
    console.log(quantity)
    return quantity;
}

//get the ingredients used of a specific item
async function ingredientsUsed(item){
    ingredients_str="";
    query_str ="SELECT ingredients_used FROM menu WHERE item_name ='" + item +"';";
    await pool
            .query(query_str)
            .then(query_res => {
                for (let i = 0; i < query_res.rowCount; i++){
                    ingredients_str=query_res.rows[i];
                    //console.log(query_res.rows[i]);
                }});
    ingredients=ingredients_str.ingredients_used;
   // console.log(ingredients)
    return ingredients;
}

//get the price of an item, returns price as an int
async function getPrice(item){
    query_str = "select item_price AS price from menu where item_name= '"+item+"';";
    price_str="";
    await pool
            .query(query_str)
            .then(query_res => {
                for (let i = 0; i < query_res.rowCount; i++){
                    price_str=query_res.rows[i];
                    console.log(query_res.rows[i]);
                }});
    price=price_str.price;
    //console.log(price)
    return price;
}

//get the quantity of an item from ingredients, returns quantity as an int
async function getQuantity(item){
    query_str = "SELECT quantity as quan FROM ingredients where name = '"+item+"';";
    quantity_str="";
    query_str ="SELECT count(order_items) AS quantity FROM receipts where order_items like'%"+item +"%'and timestamp between '"+date1+" "+"00:00:00' and '"+date2+" "+"00:00:00'";
    await pool
            .query(query_str)
            .then(query_res => {
                for (let i = 0; i < query_res.rowCount; i++){
                    quantity_str=query_res.rows[i];
                    console.log(query_res.rows[i]);
                }});
    quantity=quantity_str.quan;
    //console.log(quantity)
    return quantity;
}

//gets the pinpad entry and returns a person with its name, id(pinpad), and role(manager or employee)
// manager IDs: 45678, 67890
async function employeeType(id){
    let person ={};
    employee_name="";
    query_str="SELECT * from employees where employee_id = '"+ email +"';";
    person.role = 'Customer'

    await pool
            .query(query_str)
            .then(query_res => {
                
                if (query_res.rows.length > 0){
                    let sqlPerson = query_res.rows[0]
                    person = sqlPerson
                    console.log("person is ", person)
                }

            });
    // if(person. =="Reagan R" || person.name =="David A" ){
    //     person.role="Manager";
    // }else{
    //     person.role="Employee";
    // }
    //  console.log(person.name);
    //  console.log(person.email);
    //  console.log(person.role);
    return person;
}

//function for the statistics table takes in 2 dates and returns an object with the attributes
//orders for the number of orders, credit for the sales made in credit band debit cards, 
//dining for the revenue in meal swipes and grossRevenue for the total revenue for those dates
statisticsTable("09-15-2022", "09-17-2022"); //example test run
async function statisticsTable(date1, date2){
    let stats={};
    totalRevenue = 0.0;
    creditRevenue = 0.0;
    diningRevenue = 0.0;
    orders = 0;

    query_str = "SELECT * FROM receipts where timestamp between '"+date1+" "+"00:00:00' and '"+date2+" "+"00:00:00'";
    receiptsStats=[];
    await pool
            .query(query_str)
            .then(query_res => {
                for (let i = 0; i < query_res.rowCount; i++){
                    receiptsStats.push(query_res.rows[i]);
                    //console.log(query_res.rows[i]);
                }});

    for (let i = 0; i < receiptsStats.length; i++){
        if(receiptsStats[i].payment_type == "Debit Card" || receiptsStats[i].payment_type == "Credit Card"){
            creditRevenue+=receiptsStats[i].total;
            totalRevenue+=receiptsStats[i].total;
        }else if(receiptsStats[i].payment_type == "Meal Swipes"){
            diningRevenue+=receiptsStats[i].total;
            totalRevenue+=receiptsStats[i].total;
        }
    }
    console.log(receiptsStats[3]);
    orders=receiptsStats.length;
    stats.orders=orders;
    stats.credit=roundTotal(creditRevenue);
    stats.grossRevenue=roundTotal(totalRevenue);
    stats.dining=roundTotal(diningRevenue);
    console.log(stats.orders);
   // console.log(stats.credit);
   // console.log(stats.dining);
    //console.log(stats.grossRevenue);
    return stats;
}

//returns array of the receipts in a specified timeframe
//use receipts[index].total to get the revenue of each order
statisticsGraph("09-15-2022", "09-17-2022"); //example test run
async function statisticsGraph(date1,date2){
    query_str = "SELECT * FROM receipts where timestamp between '"+date1+" "+"00:00:00' and '"+date2+" "+"00:00:00'";
    receiptsForGraph=[];
    await pool
            .query(query_str)
            .then(query_res => {
                for (let i = 0; i < query_res.rowCount; i++){
                    receiptsForGraph.push(query_res.rows[i]);
                    //console.log(query_res.rows[i]);
                }});
    console.log(receiptsForGraph.length); //use receipts[index].total to get the revenue of the order
    return receiptsForGraph;
}

async function excessReport(dateOne, dateTwo){
    // get a list of all the menu items
    let menuItems = [];
    menuItems = await getMenu();
    // will keep count of each item sold between the dates
    let counts = [];

    let returnItems = [];

    // get the total sold for each menu item
    for(let i = 0; i < menuItems.length; i++){
        let count = 0;
        await pool.query("SELECT count(order_items) AS quantity FROM receipts where order_items like'%"+ menuItems[i].item_name +"%'and timestamp between '"+ dateOne +" "+"00:00:00' and '" + dateTwo +" 00:00:00';")
        .then(query_res => {
            for(let i = 0; i < query_res.rowCount; i++){
                counts.push(query_res.rows[i].quantity);
            }
        })
    }
    let invItems = [];
    invItems = await getInventory();
    // Populate hashmap for each inventory item
    const invCount = new Map();
    for(let i = 0; i < invItems.length; i++){
        invCount.set(invItems[i].name,0);
    }
    // iterate through each menu item, add the count num to the correct position in hashmap
    for(let i = 0; i < menuItems.length; i++){
        let ingredients = "";
        // get ingredients involved in the menu item
        await pool.query("SELECT ingredients_used FROM menu WHERE item_name = '" + menuItems[i].item_name + "';")
        .then(query_res => {
            for(let i = 0; i < query_res.rowCount; i++){
                ingredients = query_res.rows[i].ingredients_used;
            }
        })
        // iterate through those ingredients
        let ingredList = ingredients.split(",");
        for(let j = 0; j < ingredList.length; j++){
            let num = invCount.get(ingredList[j]);
            invCount.set(ingredList[j], parseInt(num) + parseInt(counts[i]));
        }
    }
    // compare counts in hashmap to total items, add items that are less than 10% to a list
    for(let i = 0; i < invItems.length; i++){
        let numSold = invCount.get(invItems[i].name);
        let numLeft;
        // get current inventory
        await pool.query("SELECT quantity FROM ingredients WHERE name = '" + invItems[i].name + "';")
        .then(query_res => {
            for(let i = 0; i < query_res.rowCount; i++){
                numLeft = query_res.rows[i].quantity;

            }
        })
        let percentage = numSold / (numSold + numLeft);
        if(percentage <= 0.10){
            returnItems.push(invItems[i].name);
        }
    }
    // return the list
    return returnItems;
}

async function main(){
    // updates price and orderitems
    app.post("/addItem",jsonParser,(req,res)=>{
        console.log("Price Before: " + totalPrice);
        (async() => {
            addItem(req.body.itemName);
            await updatePrice(req.body.itemName);
            console.log("totalPrice: " + totalPrice)
            res.json({"totalPrice" : totalPrice});
        })();
    })

    app.post("/removeItem",jsonParser,(req,res)=>{
        (async() => {
            console.log("totalPrice b4: " + totalPrice);
            console.log("orderItems b4: " + orderItems);
            await removeItem(req.body.itemID);
            console.log("totalPrice after: " + totalPrice);
            console.log("orderItems after: " + orderItems);
            res.json({"totalPrice" : totalPrice})
        })();
    })

    // sends final order in to database
    app.post("/sendOrder",jsonParser,(req,res)=> {
        sendOrder(req.body.paymentType, req.body.empName)
        .then(() => {
            res.send("Order has been sent to the database");
        })
    })

    // Adds new menu items
    app.post("/newItem",jsonParser,(req,res)=>{
        addMenu(req.body.itemName,req.body.itemPrice,req.body.itemIngreds)
        .then(()=>{
            res.send("Successfully added new menu item");
        })
    })

    // Deletes menu item
    app.post("/deleteItem",jsonParser,(req,res)=>{
        deleteMenu(req.body.item);
        res.send("Deleted " + req.body.item);
    })

    // Updates menu item price
    app.post("/updateItem",jsonParser,(req,res)=>{
        updateMenu(req.body.item, req.body.price);
        res.send("Updated price of " + req.body.item + " to " + req.body.price);
    })


    // Returns type of employee
    app.post("/employeeType",jsonParser,(req,res)=>{
        console.log(req.body.pin)
        employeeType(req.body.pin).then( data => {
            res.send(data)
            console.log("data sent", data)
        }) 
        // res.send(employeeType(req.body.pin) );  
    })

    app.get("/getInventory",jsonParser,(req,res)=>{
        getInventory().then( data => {
            res.send(data)
            console.log("data sent", data)
        }) 
        // res.send(employeeType(req.body.pin) );  
    })

    // checks for low stock of current inventory
    app.get("/lowStock",jsonParser,(req,res)=>{
        (async() => {
            await checkStock();
            res.send(lowStock);
        })();
        
    })

    app.post("/getBowls", jsonParser,(req,res)=>{
        (async() =>{
            let bowls = await bowlContent();
            res.send(bowls);
        })();
    })

    app.post("/getGyros", jsonParser,(req,res)=>{
        (async() =>{
            let gyros = await gyrosContent();
            res.send(gyros);
        })();
    })

    app.post("/getDrinks", jsonParser,(req,res)=>{
        (async() =>{
            let drinks = await drinksContent();
            res.send(drinks);
        })();
    })

    app.post("/getExtras", jsonParser,(req,res)=>{
        (async() =>{
            let bowls = await extrasContent();
            res.send(extras);
        })();
    })

    app.post("/posreport",jsonParser,(req,res)=>{
            
        let returnData = []
        console.log(req.body)
        
        reportContent(req.body.startDate, req.body.endDate).then( data =>{
            getMenu().then( menuData =>{ 
                const itemMap = new Map()
                data = data.rows
                for (let i = 0 ; i < data.length ; i++){
                    let items = data[i].order_items.split(',')
                

                    for (let j = 0 ; j < items.length ; j++){
                        items[j] = items[j].trim()
                        if (itemMap.get(items[j]) === undefined){
                            itemMap.set(items[j], 0)
                        }
                        let amt = itemMap.get(items[j])
                        itemMap.set(items[j], amt + 1)
                    }
                }

                console.log(menuData)


                let counterPOS = 0
                for (let [key, value] of itemMap){
                    console.log(key,value)

                    let price = 0

                    for (let j = 0 ; j < menuData.length ; j++){
                        console.log(menuData[j])
                        if (menuData[j].item_name === key){
                            console.log("item found")
                            price = Math.floor(menuData[j].item_price * value * 100) / 100
                        }
                    }
                    returnData.push({id: counterPOS, itemName: key, quantity: value, sales: price})
                    counterPOS += 1
                }

                res.send(returnData)
                })
        })

    })

    //popular combos information
    app.post("/popCombos", jsonParser, (req, res)=> {
        popCombos(req.body.startDate, req.body.endDate).then( data => {
            res.send(data)
            console.log("data sent", data)
        })
    })

    // sends information for statistics table
    app.post("/statsTable",jsonParser,(req,res)=>{
        statisticsTable(req.body.startDate, req.body.endDate).then( data => {
            res.send(data)
            console.log("data sent", data)
        }) 
    })

    // sends information for statistics graph
    app.post("/statsGraph",jsonParser,(req,res)=>{
        statisticsGraph(req.body.startDate, req.body.endDate).then( data => {
            res.send(data)
            console.log("data sent", data)
        }) 
    })

    app.post("/excessReport",jsonParser,(req,res)=>{
        (async ()=>{
            let results = await excessReport(req.body.dateOne, req.body.dateTwo);
            res.send(results);
        })();
    })

    app.post("/translateText",jsonParser,(req,res)=>{
        console.log(req.body.lang)
        console.log(req.body.text)

        const url = generateRequestUrl(req.body.text, { to: req.body.lang });

        https.get(url, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            res.send(normaliseResponse(JSON.parse(data)).text);
        });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
        // res.send(employeeType(req.body.pin) );  
    })

    app.listen(port,()=> console.log(`Listening to port ${port}`));
}
console.log("TESTING");
main();