
import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({

    name : {
        type:String,
        required: true,
    },
    creator:{
        type: String,
        required:true,
    },
    
    price : {
        type:Number,
        required: true,
        default:0,
    },

    poster : {
        type:String,
        required: true,
        default:"",
    },
    
    external: {
        type: String,
        default:"",
    },

    category: {
        type:String,
    },

    description: {
        type:String,
    },


}, {timestamps: true});

const Game = mongoose.model("Game", gameSchema);

export default Game;