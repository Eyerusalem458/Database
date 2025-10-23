// using async await method
import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
// middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
async function databse() {
  try {
    const myConnection = await mysql.createConnection({
      user: "myDBuser",
      password: "12345",
      host: "localhost",
      database: "myDB",
    });

    console.log("connected to successfully!");
    return myConnection;
  } catch (err) {
    console.log("error connecting to mysql:", err.message);
  }
}
const myConnection = await databse();
// question 2**********************
//a. method 1

// //   create product table
// let products = `CREATE TABLE if not exists Products(
//     product_id int auto_increment PRIMARY KEY,
//     product_url varchar(255) not null,
//     product_name varchar(255) not null
// )`;
// //   create user table
// let User = `CREATE TABLE if not exists Users(
//       user_id int auto_increment PRIMARY KEY,
//       user_name  VARCHAR(255),
//       user_password  VARCHAR(255)
// )`;
// //   create product description table******************

// let productDescription = `CREATE TABLE if not exists Product_Description(
//       description_id int auto_increment PRIMARY KEY,
//           product_id int not null,
//           product_brief_description varchar(255) not null,
//           product_description varchar(255) not null,
//           product_img varchar(255) not null,
//           product_link varchar(255) not null,

//           FOREIGN KEY (product_id) REFERENCES Products(product_id )
//     )`;

// //   create product price table*****************

// let productPrice = `CREATE TABLE if not exists Product_Price(
//       price_id int auto_increment PRIMARY KEY,
//           product_id int not null,
//           starting_price varchar(255) not null,
//           price_range varchar(255) not null,
//           FOREIGN KEY (product_id) REFERENCES Products(product_id)
//     )`;

// //   create Orders table********

// let Orders = `CREATE TABLE if not exists Orders(
//      order_id int auto_increment PRIMARY KEY,
//           product_id int not null,
//            user_id int not null,
//           FOREIGN KEY (product_id) REFERENCES Products(product_id),
//           FOREIGN KEY (user_id) REFERENCES Users( user_id)
//     )`;

// // execute  product the query**************

// myConnection.query(products, (err, result) => {
//   if (err) {
//     console.log("error in creating product table:", err.message);
//   } else {
//     console.log("products table created successfully!");
//   }
// });

// //************ */ execute  users the query

// myConnection.query(User, (err) => {
//   if (err) {
//     console.log("error in creating users table:", err.message);
//   } else {
//     console.log("user table created successfully!");
//   }
// });

// // ************execute  product description the query

// myConnection.query(productDescription, (err) => {
//   if (err) {
//     console.log("error in creating productDescription table:", err.message);
//   } else {
//     console.log("productsDescription  table created successfully!");
//   }
// });

// //**************** */ execute  product price the query

// myConnection.query(productPrice, (err) => {
//   if (err) {
//     console.log("error in creating productPrice table:", err.message);
//   } else {
//     console.log("productprice  table created successfully!");
//   }
// });

// //***************8 */ execute  order the query
// myConnection.query(Orders, (err) => {
//   if (err) {
//     console.log("error in creating order table:", err.message);
//   } else {
//     console.log("order table created successfully!");
//   }
// });

// b.method 2
app.get("/install", async (req, res) => {
  //   create product table
  let products = `CREATE TABLE if not exists Products(
    product_id int auto_increment PRIMARY KEY,
    product_url varchar(255) not null,
    product_name varchar(255) not null
)`;
  //   create user table
  let User = `CREATE TABLE if not exists Users(
      user_id int auto_increment PRIMARY KEY,
      user_name  VARCHAR(255),
      user_password  VARCHAR(255)
)`;
  //   create product description table******************

  let productDescription = `CREATE TABLE if not exists Product_Description(
      description_id int auto_increment PRIMARY KEY,
          product_id int not null,
          product_brief_description varchar(255) not null,
          product_description varchar(255) not null,
          product_img varchar(255) not null,
          product_link varchar(255) not null,

          FOREIGN KEY (product_id) REFERENCES Products(product_id )
    )`;

  //   create product price table*****************

  let productPrice = `CREATE TABLE if not exists Product_Price(
      price_id int auto_increment PRIMARY KEY,
          product_id int not null,
          starting_price varchar(255) not null,
          price_range varchar(255) not null,
          FOREIGN KEY (product_id) REFERENCES Products(product_id)
    )`;

  //   create Orders table********

  let Orders = `CREATE TABLE if not exists Orders(
     order_id int auto_increment PRIMARY KEY,
          product_id int not null,
           user_id int not null,
          FOREIGN KEY (product_id) REFERENCES Products(product_id),
          FOREIGN KEY (user_id) REFERENCES Users( user_id)
    )`;

  // execute  product the query**************
  try {
    await myConnection.query(products);
    console.log("product table created");
    //************ */ execute  users the query

    await myConnection.query(User);
    console.log("user table created");
    // ************execute  product description the query
    await myConnection.query(productDescription);
    console.log("description table created");
    //**************** */ execute  product price the query

    await myConnection.query(productPrice);
    console.log("price table created");
    //***************8 */ execute  order the query
    await myConnection.query(Orders);
    console.log("order table created");
    res.send("all 5 tables created successfully!");
  } catch (err) {
    console.log("error", err.message);
    res.send("server error");
  }
});
// // listening to the port
app.listen(3001, () => {
  console.log("server running on http://localhost:3001");
});

// question 3
app.post("/add-product", async (req, res) => {
  // products table
  const {
    product_url,
    product_name,
    product_brief_description,
    product_description,
    product_img,
    product_link,
    starting_price,
    price_range,
    user_name,
    user_password,
  } = req.body;
  const productInsert = `
    INSERT INTO Products (product_url, product_name)
    VALUES (?, ?)
  `;
  // product description table
  const userInsert = `INSERT INTO Users(user_name,user_password) VALUES (?,?)`;
  const descriptionInsert = `INSERT INTO Product_Description( product_id,product_brief_description, product_description,product_img,product_link) VALUES(?,?,?,?,?)`;
  const priceInsert = `INSERT INTO  Product_Price(product_id,starting_price,price_range) VALUES(?,?,?)`;
  const orderInsert = `INSERT INTO Orders(product_id,user_id) VALUES (?,?)`;
  try {
    // product query
    const [result] = await myConnection.query(productInsert, [
      product_url,
      product_name,
    ]);

    let productId = result.insertId;

    // // desction query
    await myConnection.query(descriptionInsert, [
      productId,
      product_brief_description,
      product_description,
      product_img,
      product_link,
    ]);

    // // price query
    await myConnection.query(priceInsert, [
      productId,
      starting_price,
      price_range,
    ]);

    // // user query
    const [result2] = await myConnection.query(userInsert, [
      user_name,
      user_password,
    ]);

    let userId = result.insertId;
    // // order query
    await myConnection.query(orderInsert, [productId, userId]);

    res.send("table inserted successfully!");
  } catch (err) {
    console.log(err.message);
    res.send("error");
  }
});
app.get("/", async (req, res) => {
  const query = `SELECT 
    Products.product_id,
    product_url,
    product_name,
    description_id,
    product_brief_description,
    product_description,
    product_img,
    product_link,
    price_id,
    starting_price,
    price_range,
    Users.user_id,
    user_name,
    user_password 
    FROM Products LEFT JOIN Product_Description ON  Products.product_id= Product_Description.product_id
    LEFT JOIN Product_Price ON Products.product_id= Product_Price.product_id
    LEFT JOIN Orders ON Products.product_id= Orders.product_id
    LEFT JOIN Users ON orders.user_id= Users.user_id 
    `;
  try {
    const [result] = await myConnection.query(query);
    res.send(result);
  } catch (err) {
    console.log(err.message);
    res.send("error");
  }
});
