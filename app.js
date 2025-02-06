const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const Game = require("./models/Game");
const User = require("./models/Users");
const {register} = require("module");


const app = express();
const port = process.env.port||3000;

app.use(express.static(path.join(__dirname,"public")));

//middleware for parsing json requests
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
    secret:"12345",
    resave:false,
    saveUninitialized:false,
    cookie:{secure:false}
}))

function isAuthenticated(req,res,next){
    if(req.session.user)return next();
    return res.redirect("/login");
}

let message = "Tyler was here";

//mongoDB connection setup
const mongoURI = "mongodb://localhost:27017/GamesList";
mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on("error",console.error.bind(console,"MonogDB connection error"));
db.once("open",()=>{
    console.log("connected to monogDB database");
})



function sendMessage(){
    console.log(msg);
};

app.get("/register",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","register.html"));
})
app.post("/register",async (req,res)=>{
    try{

        const{username,password,email}=req.body;

        const existingUser = await User.findOne({username});

        if(existingUser){
            return res.send("Username already taken. try a different one");
        }

        const hashedPassword = bcrypt.hashSync(password,10);

        const newUser = new User({username,password:hashedPassword,email});
        await newUser.save();

        res.redirect("/login");


    }catch(err){
        res.status(500).send("Error registering new user");
    }
})

app.get("/", function(req,res){
    res.sendFile(path.join(__dirname,"Public/Index.html"));
});

app.get("/games",isAuthenticated,async (req,res)=>{
    try{
        const game = await Game.find();
        //res.json(game);
        console.log(game);
        res.redirect("Games.html")
    }catch(error){
        res.status(500).json({error:"failed to get game"});
    }
});

app.get("/login",(req,res)=>{
res.sendFile(path.join(__dirname,"public","Login.html"))
});

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

app.post("/login",async (req,res)=>{
    const{username,password} = req.body;
    console.log(req.body);

    const user = await User.findOne({username});



    if(user && bcrypt.compareSync(password,user.password)){
        req.session.user = username;
        console.log("logged in");
        return res.redirect("/games.html");
    }
    req.session.error="Invalid User";
    console.log("login failed");
    return res.redirect("/login");
});

app.get("/logout",(req,res)=>{
    req.session.destroy(()=>{
        res.redirect("/login");
    })
})

app.put("/updateGame/:gameRank",isAuthenticated ,(req,res)=>{
    const gameRank = req.params.gameRank;
    Game.findOneAndUpdate(gameRank,req.body,{
        new:true,
        runValidators:true
    }).then((updatedGame)=>{
        console.log(gameRank);
        if(!updatedGame){
            return res.status().json({error:"failed to find game"})
        }
        res.json(updatedGame);
        //res.redirect("/");
    }).catch((err)=>{
        console.log(gameRank);
        res.status(400).json({error:"Failed to update the game"})
    })
});

app.delete("/deleteGame/:gameName",async(req,res)=>{
    try{
        const gamename = req.params.gameName;
        console.log(gamename);
        //const game = await Game.find(gamename);

        if(gamename.length === 0){
            return res.status(404).json({error:"Failed to find game."});
        };

        const deletedGame = await Game.findOneAndDelete({gameName:gamename});

        //res.json({message:"game deleted"});

    }catch(error){
        console.log(error);
        res.status(404).json({error:"Game not found"});
    }
});

app.listen(port,function(){
    console.log(`Server os running on port ${port}`);
});

