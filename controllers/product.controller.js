import Product from "../models/product.model.js";

//making different functions for different routes and writing the controller logic for each of them

//every function is an async function because we are using await to wait for the response from the database to
//send it back to the client

//generally async await keywords are used to wait for asynchronous operations (like database queries) to complete before continuing execution.
//note: await use garna lai tyo function lai async banaunai parcha, cause the function is waiting for sth to be completed ni,
//ani async function le chai promise return garxa, so we can use await to wait for the promise to be resolved

//every function has two parameters req and res, req is the request that the client sends to the server and res is the
//response that the server sends back to the client
//This is a standard in Express.js to handle HTTP requests and responses.
//we are using the es6 syntax for our codebase,so we are using arrow functions and directly using export while defining the function

//inside every function we are using try and catch block to handle the errors that might occur while executing the code inside the try block

//if there is an error, we are sending a response with status code 500 and the error message
//we set the status code by doing res.status(500) and send the message by doing res.json({message: error.message})
//hamile res.send("msg"), garera ni pathauna milthyo response, but, json mai response pathaunu cha bhane chai we do, res.json()...
//yaha the message that we send has to be in json format, so we are sending it as an object with a key "message" and the value as the error message
//here we are using the error.message to get the error message from the error object that is thrown by the code inside the try block
//Also we combined the two statements into one by chaining them with a dot operator i.e., res.status(500).json({message: error.message})
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    //await is used to wait for the response from the database, here we are waiting for the response from the find method
    //which is a method provided by mongoose to find all the documents in the collection
    //here, a collection is a group of documents in the database, a document is a record in the collection,
    //an instance of a model is called a document in mongoose
    //Product is the model that we created using mongoose, that represents a collection in MongoDB
    //we are using the find method on the Product model to find all the documents in the collection
    //find({}) is a Mongoose method that retrieves all documents from the collection.
    //The empty object {} as an argument means it will fetch all documents without any filtering.

    //the find method returns a promise, so we are using await to wait for the response from the database
    //once we get the response, we are storing it in the products variable
    //we are sending the response back to the client by doing res.status(200).json(products)
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    //here findById is a Mongoose method that retrieves a single document by its _id.
    //the mongoose methods are used to interact with the database, here we are using the findById method to find a single document by its id
    //other mongoose methods used in backend development are find, findOne, findByIdAndUpdate, findByIdAndDelete, etc.
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    //create is a Mongoose method that creates a new document in the collection.
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
