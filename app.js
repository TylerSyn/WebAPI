const express = require("express");
const {request} = require ("http");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname,"public")));

let message = "Tyler was here";

function sendMessage(){
    console.log(msg);
}


app.get("/", function(req,res){
    res.sendFile(path.join(__dirname,"Public/Index.html"));
})



app.listen(port,function(){
    console.log(`Server os running on port ${port}`)
})