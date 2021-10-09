import errorHandler from "../helpers/databaseErrorHandling.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config({
    path: "./config/config.env"
});

const activationController = (req, res) => {
    const { token } = req.body;
    if(token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, 
            (err, decoded) => {
                if(err) {
                    return res.status(401).json({
                        errors: "Expired Token. Try Again"
                    });
                } else {
                    const { email, password } = jwt.decode(token);
            
                    const user = new User({
                        email,
                        password
                    });
            
                    user.save((err, user) => {
                        if(err) {
                            return res.status(401).json({
                                errors: errorHandler(err)
                            });
                        } else {
                            return res.json({
                                success: true,
                                message: "Sign Up Successful!"
                            });
                        }
                    })
                }
            }
        );
    } else {
        return res.json({
            message: 'Error occured, Please try again'
        });
    }
}

export { activationController };