import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const isAuthenticated = async (req, res, next) =>{
    let token;
    const { authorization } = req.headers;
    if(authorization && authorization.startsWith("Bearer")){
        try {
            token = authorization.split(" ")[1];
            //Verify Token
            const { userID } = await jwt.verify(token, "This is a secret key!");
            req.user = await User.findById(userID).select("--password");
            next();
        } catch (error) {
            return res.status(401).json({message: "Unauthorized User!", success:false });
        }
    }else{
        return res.status(401).json({message: "Unauthorized User!", success:false });
    }   
}

export default isAuthenticated;