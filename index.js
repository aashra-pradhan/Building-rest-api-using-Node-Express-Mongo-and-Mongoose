//brain of our backend

import express from "express";

//initializing the app
const app = express();

//euta port allocate gareko server lai
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello from Node API!");
});

//whatever client side sends is req and whatever server on port 3000(as of now) sends is res

//home route is /, default page ho basically....aile ko lai localhost:3000 is our default page,
// so you can go and check there, tyo res dekhiyeko cha ki chaina, because server is port 3000 aile ko lagi
//or vscode ko thunderclient extension or postman ma http://localhost:3000 esma get request send garyau bhane ,
// you can see the response.....Postman
//is a tool that helps you test your APIs, you can send requests to your server and see the response
//without having to build the frontend.

//app.listen is a method in Express.js used to start a server and listen for incoming connections on a specified port.
// It is typically used at the end of your Express application to start the server.

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
