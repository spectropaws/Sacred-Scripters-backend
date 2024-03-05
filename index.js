import express from "express";
const app = express();
import mongoose from "mongoose";
import userRoutes from "./routes/user.js"
import dotenv from "dotenv"
import cors from "cors"
import Game from "./models/game.model.js"
import isAuthenticated from "./middlewares/user.middleware.js";
if(process.env.NODE_ENV != "production"){
    dotenv.config()
}

const port = process.env.PORT || 4000;
const dbUrl = process.env.DB_URI;
// console.log(dbUrl);

//Connect to Database
async function main(){
  console.log(dbUrl);
   await mongoose.connect(dbUrl);
}

main().then(()=>{
    console.log("Connected Successfully to database ... ")
}).catch((err) => {
    console.log(err)
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes
app.use("/user", userRoutes)


//games
app.get('/games', async (req, res) => {
    try {
      const games = await Game.find();
      res.json(games);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

app.listen(port, () => {
    console.log(`Server is Running on http://localhost:${port}`);
})