import mongoose from "mongoose";

const userActivitySchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    ownedGames: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    totalTime : {
        type: Number,
        default: 0,
    },
    recentlyPlayed : {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Game',
        }],
        validate: [limitArray(5), 'Cannot have more than five games in recent activity!'],
    },
    purchaseHistory: {
        type:[{
            game : {
                type:String,
            },
            price: {
                type: Number,
            },
        }]
    }
},{timestamps:true});

function limitArray(limit){
    return function(value){
        return value.length <= limit;
    }
}

const UserActivity = mongoose.Model("UserActivity", userActivitySchema);


export default UserActivity;