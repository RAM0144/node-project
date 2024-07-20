import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../db-utils/models.js";
import { db } from "../db-utils/mongodb-connection.js";


const authRouter = express.Router();

// Register

authRouter.post("/register", async (req, res) => {
    try {
        const userDetails = req.body;

        console.log(userDetails);

        bcrypt.hash(userDetails.password, 10, async (err, hash) => {
            if (err) {
                res.status(500).send({ msg: "Something went Wrong, please try again" })
            } else {
                const tempData = {
                    ...userDetails,
                    password: hash,
                };
                // store the above user into the DB
                const user = new userModel(tempData);

                await user.save(); // will validate the schema and insert the record into the DB

                res.send({ msg: "User Created Successfully!" });
            }

        });

    } catch (error) {
        console.log("error", error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
});

// Login

authRouter.post("/login", async (req, res) => {
    try {
        const creds = req.body; // email, password

        // check if the user email exists in the DB
        const userObj = await db.collection("users").findOne({ email: creds.identifier }, { projection: { _id: 0, __v: 0, } });
        
        if (userObj) {
            //check the password matching
            bcrypt.compare(creds.password, userObj.password, (err, result) => {
                if (result) {
                    const tempUser = { ...userObj };

                    delete tempUser.password;

                    const token = jwt.sign(tempUser, process.env.JWT_SECRET, {
                        // expiresIn: "1d", OR
                           expiresIn: process.env.EXPIRY_TIME,

                    });

                    res.send({ msg: "Login Successfully!", userToken: token });
                } else {
                    res.status(401).send({ msg: "Invalid username or password" })
                }

            });

        } else {
            res.status(400).send({ msg: "Invalid username or password" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
});


export default authRouter;