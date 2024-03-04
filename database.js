import User from "./models/user.model.js";

class dbFunctions{
    static async createNewUser({name,username, email, hashedPassword}){
        const newUser = await User.create({
            name: name, 
            username: username, 
            email: email,
            hashedPassword: hashedPassword,
        })
        return newUser;
    }

    static async findOne({email, username}){
        return await User.findOne({$or : [{email:email},{username:username}] });
    }

    static async findByIdAndUpdate(id, password){
        return User.findByIdAndUpdate(id, { password : password });
    }

}

export default dbFunctions;