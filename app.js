const path = require('path');
const express = require("express");
require('dotenv').config({ path: '.env' });
app = express();

// so we can ready the form body or the json url payload
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Mailchimp add user request
mailchimpdemo = require("./mailchimpdemo.js");
app.use("/", mailchimpdemo);

// error
app.get("*", (req, res) => {
    res.send("404");
})

app.listen(3000, function(req, res) { 
    console.log("Listening....")
});