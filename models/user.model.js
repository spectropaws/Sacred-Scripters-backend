import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name : {
        type:String,
        required: true,
    },
    username : {
        type:String,
        required: true,
        unique:true,
    },

    email : {
        type:String,
        required: true,
        unique:true,
    },
    
    hashedPassword : {
        type:String,
        required: true,
    },

    tokens:{
        type:Number,
        default: 1000,
        require:true,
    }

}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;