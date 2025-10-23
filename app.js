const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const myConnection = mysql.createConnection({
  user: "myDBuser",
  password: "12345",
  host: "localhost",
  database: "myDB",
});
myConnection.connect((err) => {
  if (err) {
    console.log("error connecting to mysql:", err.message);
  } else {
    console.log("connected to successfully!");
  }
});
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
// app.get("/install", (req, res) => {
//   //   create product table
//   let products = `CREATE TABLE if not exists Products(
//     product_id int auto_increment PRIMARY KEY,
//     product_url varchar(255) not null,
//     product_name varchar(255) not null
// )`;
//   //   create user table
//   let User = `CREATE TABLE if not exists Users(
//       user_id int auto_increment PRIMARY KEY,
//       user_name  VARCHAR(255),
//       user_password  VARCHAR(255)
// )`;
//   //   create product description table******************

//   let productDescription = `CREATE TABLE if not exists Product_Description(
//       description_id int auto_increment PRIMARY KEY,
//           product_id int not null,
//           product_brief_description varchar(255) not null,
//           product_description varchar(255) not null,
//           product_img varchar(255) not null,
//           product_link varchar(255) not null,

//           FOREIGN KEY (product_id) REFERENCES Products(product_id )
//     )`;

//   //   create product price table*****************

//   let productPrice = `CREATE TABLE if not exists Product_Price(
//       price_id int auto_increment PRIMARY KEY,
//           product_id int not null,
//           starting_price varchar(255) not null,
//           price_range varchar(255) not null,
//           FOREIGN KEY (product_id) REFERENCES Products(product_id)
//     )`;

//   //   create Orders table********

//   let Orders = `CREATE TABLE if not exists Orders(
//      order_id int auto_increment PRIMARY KEY,
//           product_id int not null,
//            user_id int not null,
//           FOREIGN KEY (product_id) REFERENCES Products(product_id),
//           FOREIGN KEY (user_id) REFERENCES Users( user_id)
//     )`;

//   // execute  product the query**************

//   myConnection.query(products, (err, result) => {
//     if (err) {
//       console.log("error in creating product table:", err.message);
//     } else {
//       console.log("products table created successfully!");
//     }
//   });

//   //************ */ execute  users the query

//   myConnection.query(User, (err) => {
//     if (err) {
//       console.log("error in creating users table:", err.message);
//     } else {
//       console.log("user table created successfully!");
//     }
//   });

//   // ************execute  product description the query

//   myConnection.query(productDescription, (err) => {
//     if (err) {
//       console.log("error in creating productDescription table:", err.message);
//     } else {
//       console.log("productsDescription  table created successfully!");
//     }
//   });

//   //**************** */ execute  product price the query

//   myConnection.query(productPrice, (err) => {
//     if (err) {
//       console.log("error in creating productPrice table:", err.message);
//     } else {
//       console.log("productprice  table created successfully!");
//     }
//   });

//   //***************8 */ execute  order the query
//   myConnection.query(Orders, (err) => {
//     if (err) {
//       console.log("error in creating order table:", err.message);
//     } else {
//       console.log("order table created successfully!");
//     }
//   });
//   res.send("all 5 tables created successfully!");
// });
// // listening to the port
app.listen(3001, () => {
  console.log("server running on http://localhost:3001");
});

// question 3
app.post("/add-product", (req, res) => {
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
  if (
    !product_url ||
    !product_name ||
    !product_brief_description ||
    !product_description ||
    !product_img ||
    !product_link ||
    !starting_price ||
    !price_range ||
    !user_name ||
    !user_password
  ) {
    return res.status(400).send("All fields are required!");
  }
  const productInsert = `
    INSERT INTO Products (product_url, product_name)
    VALUES (?, ?)
  `;
  // product description table
  const userInsert = `INSERT INTO Users(user_name,user_password) VALUES (?,?)`;
  const descriptionInsert = `INSERT INTO Product_Description( product_id,product_brief_description, product_description,product_img,product_link) VALUES(?,?,?,?,?)`;
  const priceInsert = `INSERT INTO  Product_Price(product_id,starting_price,price_range) VALUES(?,?,?)`;
  const orderInsert = `INSERT INTO Orders(product_id,user_id) VALUES (?,?)`;
  // product query
  myConnection.query(
    productInsert,
    [product_url, product_name],
    (err, result) => {
      if (err) {
        console.log(" Error inserting product:", err);
      } else {
        console.log(" Product inserted successfully!");
        let productId = result.insertId;

        // // description query
        myConnection.query(
          descriptionInsert,
          [
            productId,
            product_brief_description,
            product_description,
            product_img,
            product_link,
          ],
          (err) => {
            if (err) {
              console.log(" Error inserting product:", err);
            } else {
              console.log(" Productdescription inserted successfully!");
              // // price query
              myConnection.query(
                priceInsert,
                [productId, starting_price, price_range],
                (err) => {
                  if (err) {
                    console.log(" Error inserting product:", err);
                  } else {
                    console.log(" price inserted successfully!");

                    // // user query
                    myConnection.query(
                      userInsert,
                      [user_name, user_password],
                      (err, result) => {
                        if (err) {
                          console.log(" Error inserting product:", err);
                        } else {
                          console.log(" user inserted successfully!");
                          let userId = result.insertId;
                          // // order query
                          myConnection.query(
                            orderInsert,
                            [productId, userId],
                            (err, result) => {
                              if (err) {
                                console.log(" Error inserting product:", err);
                              } else {
                                console.log(" order inserted successfully!");
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
  res.send("data inserted successfully!")
});
// selection method 
app.get("/", (req, res) => {
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
  myConnection.query(query, (err, result) => {
    if (err) {
      console.log(err.message);
      res.send("error");
    } else {
      res.send(result);
    }
  });
});
