const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    gameRank:Number,
    gameName:String
});

const Game = mongoose.model("Game",gameSchema,"GamesList");
module.exports=Game;