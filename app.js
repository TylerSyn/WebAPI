const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const app = express();
const port = process.env.port||3000;

app.use(express.static(path.join(__dirname,"public")));

//middleware for parsing json requests
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));

let message = "Tyler was here";

//mongoDB connection setup
const mongoURI = "mongodb://localhost:27017/GamesList";
mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on("error",console.error.bind(console,"MonogDB connection error"));
db.once("open",()=>{
    console.log("connected to monogDB database");
})

const gameSchema = new mongoose.Schema({
    gameRank:Number,
    gameName:String
});

const Game = mongoose.model("Game",gameSchema,"GamesList");

function sendMessage(){
    console.log(msg);
};


app.get("/", function(req,res){
    res.sendFile(path.join(__dirname,"Public/Index.html"));
});

app.get("/games",async (req,res)=>{
    try{
        const game = await Game.find();
        res.json(game);
        console.log(game);
    }catch(error){
        res.status(500).json({error:"failed to get game"});
    }
})

app.post("/addGame",async (req,res)=>{
    try{
        const newGame = new Game(req.body)
        const saveGame = await newGame.save();
        res.redirect("/");
        console.log(saveGame);
    }catch(err)
    {
        res.status(501).json({error:"failed to add new game"});
    }

});

app.put("/updateGame/gameRank", (req,res)=>{
    Game.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    }).then((updatedGame)=>{
        if(!updatedGame){
            return res.status().json({error:"failed to find game"})
        }
        res.json(updatedGame);
        //res.redirect("/");
    }).catch((err)=>{
        res.status(400).json({error:"Failed to update the game"})
    })
});

app.delete("/deleteGame/:gameName",async(req,res)=>{
    try{
        const gameName = req.query;
        const game = await Game.find(gameName);

        if(game.length === 0){
            return res.status(404).json({error:"Failed to find game."});
        }

        const deletedGame = await Game.findOneAndDelete(gameName);
        res.json({message:"game deleted"});
        //res.redirect("/");
    }catch(err){
        console.log(err);
        res.status(404).json({error:"Game not found"});
    }
});

app.listen(port,function(){
    console.log(`Server os running on port ${port}`);
});

