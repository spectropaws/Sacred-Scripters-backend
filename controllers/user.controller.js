// import User from "../models/user.model.js"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
// import nodemailer from "nodemailer"
import dotenv from "dotenv";
import dbFunctions from "../database.js";
import User from "../models/user.model.js";
dotenv.config()

class userContoller {
    //Controller for user registration
    static userRegistration = async (req, res) => {
        console.log(req.body);
        const { name, username, email, password, confirmPassword } = req.body;
        try {

            if (name && username && email && password && confirmPassword) {
                if (password != confirmPassword) {
                    console.log("same");
                    return res.status(400).json({ message: "Password and Confirm Password Should be Same!", success: false })
                } else {
                    const isUser = await dbFunctions.findOne({ username, email });
                    if (isUser) {
                        return res.status(400).json({ message: "User Already Exists!", success: false })
                    } else {
                        const salt = await bcryptjs.genSalt(10);
                        const hashedPassword = await bcryptjs.hash(password, salt);

                        const savedUser = await dbFunctions.createNewUser({ name, username, email, hashedPassword });
                        console.log("well");
                        console.log(savedUser);
                        if (savedUser) {
                            return res.status(200).json({ message: "Registered Successfully.", user: savedUser, success: true })
                        } else {
                            return res.status(400).json({ message: "Error During user Registration!", success: false })
                        }
                    }
                }
            } else {
                // console.log("problem")
                return res.status(400).json({ message: "All fields are required!", success: false })
            }

        } catch (error) {
            return res.status(400).json({ message: error.message, success: false })
        }
    }

    //Controller for user Login
    static userLogin = async (req, res) => {
        console.log(req.body);
        const { email, password } = req.body;
        try {

            if (email && password) {
                const isUser = await dbFunctions.findOne({ email });
                if (isUser) {
                    if (email === isUser.email && await bcryptjs.compare(password, isUser.hashedPassword)) {

                        //generate token
                        const token = jwt.sign({ userID: isUser._id }, "This is a secret key!", { expiresIn: "5d" });
                        return res.status(200).json({ message: "Login Successfull.", token, name: isUser.name, success: true });
                    } else {
                        return res.status(400).json({ message: "Invalid Credentials!", success: false })
                    }
                } else {
                    return res.status(400).json({ message: "User is Not Registered!", success: false })
                }
            } else {
                return res.status(400).json({ message: "All fields are required!", success: false })
            }

        } catch (error) {
            return res.status(400).json({ message: error.message, success: false })
        }
    }

    // static changePassword = async (req, res) => {
    //     const { newPassword, confirmPassword } = req.body;
    //     try {
    //         if (newPassword && confirmPassword) {
    //             if (newPassword === confirmPassword) {
    //                 const salt = await bcryptjs.genSalt(10);
    //                 const hashedPassword = await bcryptjs.hash(newPassword, salt);
    //                 const updatedUser = await dbFunctions.findByIdAndUpdate(req.user._id, hashedPassword);
    //                 return res.status(200).json({ message: "Password Changed Successfully.", updatedUser, success: true });
    //             } else {
    //                 return res.status(400).json({ message: "Password does not match with confirm password!", success: false })
    //             }
    //         } else {
    //             return res.status(400).json({ message: "All fields are required!", success: false })
    //         }
    //     } catch (error) {
    //         return res.status(400).json({ message: error.message, success: false })
    //     }
    // }

    // static forgetPassword = async (req, res) => {
    //     const { email } = req.body;
    //     try {
    //         if (email) {
    //             const isUser = await dbFunctions.findOne({ email: email });
    //             if (isUser) {
    //                 //Generate Token
    //                 const secret = "mysecretkey";
    //                 const token = jwt.sign({ userID: isUser._id }, "my secret key!", { expiresIn: "2m" })
    //                 console.log(secret);

    //                 const link = `http://localhost:3000/user/reset/${isUser._id}/${token}`;
    //                 const transporter = nodemailer.createTransport({
    //                     host: "smtp.gmail.com",
    //                     port: 465,
    //                     secure: true,
    //                     auth: {
    //                         user: process.env.EMAIL,
    //                         pass: process.env.EMAIL_PASSWORD,
    //                     },
    //                 });


    //                 const mailOptions = {
    //                     from: process.env.EMAIL,
    //                     to: email,
    //                     subject: "Password Reset Request.",
    //                     text: "Hello world?",
    //                     html: `
    //                     <!DOCTYPE html>
    //                     <html lang="en">
    //                     <head>
    //                         <meta charset="UTF-8">
    //                         <meta http-equiv="X-UA-Compatible" content="IE=edge">
    //                         <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //                         <title>Password Reset</title>
    //                         <style>
    //                             body {
    //                                 background-color: whitesmoke;
    //                                 font-family: Verdana, Geneva, Tahoma, sans-serif;
    //                             }

    //                             .email-container {
    //                                 max-width: 600px;
    //                                 margin: 20px auto;
    //                                 padding: 20px;
    //                                 background-color: antiquewhite;
    //                                 border-radius: 8px;
    //                                 box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    //                             }

    //                             a {
    //                                 color: whitesmoke;
    //                                 text-decoration: none;
    //                             }

    //                             #button {
    //                                 display: inline-block;
    //                                 padding: 5px 10px;
    //                                 color: whitesmoke;
    //                                 background-color: black;
    //                                 text-decoration: none;
    //                                 border-radius: 5px;
    //                             }
    //                         </style>
    //                     </head>
    //                     <body>
    //                         <div class="email-container">
    //                             <h1>Reset Password</h1>
    //                             <h3>Hello,</h3>
    //                             <h3>You recently requested to reset your password. Click the Button below to reset it:</h3>
    //                             <h4><a href="${link}" id="button">Reset Password</a></h4>
    //                             <h3>If you did not request a password reset, please ignore this email or contact support.</h3>
    //                             <h2>Thank you!</h2>
    //                         </div>
    //                     </body>
    //                     </html>
    //                     `
    //                 };
    //                 transporter.sendMail(mailOptions, (error) => {
    //                     if (error) {
    //                         return res.status(400).json({ message: "ERROR!", success: false });
    //                     }
    //                     return res.status(200).json({ message: "Mail Sent", success: true });
    //                 });
    //             } else {
    //                 return res.status(400).json({ message: "User Not Found!", success: false })
    //             }
    //         } else {
    //             return res.status(400).json({ message: "Email is required", success: false })
    //         }
    //     } catch (error) {
    //         return res.status(400).json({ message: error.message, success: false })
    //     }
    // }

    // static forgetPasswordEmail = async (req, res) => {
    //     const { newPassword, confirmPassword } = req.body;
    //     const { id } = req.params;
    //     const { authorization } = req.headers;
    //     const token = authorization.split(" ")[1];
    //     // console.log(newPassword,"   ", confirmPassword, "  " , id, "   ", token );
    //     try {
    //         if (newPassword && confirmPassword && id && token) {
    //             if (newPassword === confirmPassword) {
    //                 //token verification
    //                 const isUser = await User.findById(id);
    //                 const isValid = jwt.verify(token, "my secret key!");
    //                 if (isValid) {
    //                     const salt = await bcryptjs.genSalt(10);
    //                     const hashedPassword = await bcryptjs.hash(newPassword, salt);
    //                     const isSuccess = await dbFunctions.findByIdAndUpdate(isUser._id, hashedPassword);
    //                     if (isSuccess) {
    //                         return res.status(200).json({ message: "Password Changed Succefuuly." });
    //                     } else {
    //                         return res.status(400).json({ message: "Error in changing Password!" });
    //                     }
    //                 } else {
    //                     return res.status(400).json({ message: "Link Has Been Expired!" });
    //                 }
    //             } else {
    //                 return res.status(400).json({ message: "Both Should be same!" });
    //             }
    //         } else {
    //             return res.status(400).json({ message: "All fiels are required" });
    //         }
    //     } catch (error) {
    //         return res.status(400).json({ message: error.message });
    //     }
    // }

    static getUser = async (req, res) => {
        try {
            const username = req.params.username;
            const user = await User.findOne({ username: username });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default userContoller;