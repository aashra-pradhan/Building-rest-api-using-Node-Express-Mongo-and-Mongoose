//brain of our backend

import express from "express";
import mongoose from "mongoose";
// import Product from "./models/product.model.js";
import productRoute from "./routes/product.route.js";
import dotenv from "dotenv";
import cors from "cors";

//euta port allocate gareko server lai
const port = process.env.PORT || 3000;

//initializing the app
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enabling CORS for all origins, allowing all origins
app.use(
  cors({
    origin: "*",
  })
);

//dotenv configuration to use it in our application
dotenv.config();

// routes
app.use("/api/products", productRoute);

//initial test
// app.get("/", (req, res) => {
//   res.send("Hello from Node API!");
// });

//whatever client side sends is req and whatever server on port 3000(as of now) sends is res

//home route is /, default page ho basically....aile ko lai localhost:3000 is our default page,
// so you can go and check there, tyo res dekhiyeko cha ki chaina, because server is port 3000 aile ko lagi
//or vscode ko thunderclient extension or postman ma http://localhost:3000 esma get request send garyau bhane ,
// you can see the response.....Postman
//is a tool that helps you test your APIs, you can send requests to your server and see the response
//without having to build the frontend.

//mongoose is a library that helps us connect to MongoDB database
//connecting to the database

const MONGODB_URL = process.env.MONGODB_URL;

mongoose
  .connect(MONGODB_URL)
  //yo .env file ma store gareko MONGODB_URL ma bhayeko, (for eg.:) mongodb+srv://johnsmith123:password123@johndb.pkpjox1.mongodb.net/NodeAPI?retryWrites=true&w=majority&appName=JOHNDB is mongodb connection string, it is a URI that is used to connect to the database
  //here johnsmith123 is the username and password123 is the password of my mongodb account, ani johndb is the name of the database
  //ani NodeAPI is the collection name jun maile afaile random name deko etai...

  //URI is a string of characters that unambiguously identifies a particular resource. To guarantee uniqueness,
  //each resource must have a unique identifier.

  //DIFFERENCE between URI and URL is that URL is a subset of URI, URL is a type of URI that identifies a resource via a network connection.
  //And URI is a string of characters used to identify a resource. URL is a type of URI, but a URI is not always a URL because a URI can be a name,
  // locator, or both.But, a URL is always a locator.

  .then(() => {
    console.log("Connected TO THE DB!");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
    //app.listen is a method in Express.js used to start a server and listen for incoming connections on a specified port.
    // It is typically used at the end of your Express application to start the server.
  })
  .catch((err) => console.log("Connection failed"));
