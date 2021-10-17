import _ from "lodash";
import { validationResult } from "express-validator";
import errorHandler from "../helpers/databaseErrorHandling.js";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config({
    path: "./config/config.env"
});

import User from "../models/user.js";

const profileController = (req, res) => {
    const { email, token, username, bio, dateOfBirth, gender, topics, languages } = req.body;
    const errors = validationResult(req);

    if(token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, 
            (err, decoded) => {
                if(err) {
                    return res.status(401).json({
                        errors: "Expired Token. Try Again"
                    });
                } else {

                    if (!errors.isEmpty()) {
                        const firstError = errors.array().map(error => error.msg)[0];
                        return res.status(422).json({
                            errors: firstError
                        });
                    } else {
                        User.findOne({
                            username
                        }).exec((err, user) => {
                            if (user) {
                                return res.status(400).json({
                                    errors: 'Username is taken'
                                });
                            }
                        });
                    }

                    const { email, password } = jwt.decode(token);
            
                    const user = new User({
                        email,
                        password,
                        username, 
                        bio,
                        dateOfBirth,
                        gender,
                        topics,
                        languages
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

export { profileController };