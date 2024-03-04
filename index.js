import express from "express";
const app = express();
import mongoose from "mongoose";
import userRoutes from "./routes/user.js"
import dotenv from "dotenv"
import cors from "cors"
if(process.env.NODE_ENV != "production"){
    dotenv.config()
}

const port = process.env.PORT || 4000;
const dbUrl = process.env.DB_URI;
// console.log(dbUrl);

//Connect to Database
async function main(){
   await mongoose.connect(dbUrl);
}

main().then(()=>{
    console.log("Connected Successfully to ",port,"... ")
}).catch((err) => {
    console.log(err)
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes
app.use("/user", userRoutes)


app.listen(port, () => {
    console.log(`Server is Running on http://localhost:${port}`);
})