import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { connectToDB } from "./data/database.js";
import {User} from "./model/user.js";

dotenv.config();
const app = express();

const salt = await bcrypt.genSalt(10);

app.use(express.json());
app.use(cors({
    credentials: true,
    "origin": "http://localhost:5173",
    "methods": ['POST', 'GET', 'DELETE', 'PUT'],
}))

connectToDB();

app.get("/test", (req, res) => {
    res.json("test successfull");
})

app.post("/register", async (req, res) => {
    const {name, email, password} = req.body;
    let userDoc = await User.findOne({email});
    if(userDoc){
        console.log("user already exists");
        return res.status(500).json("error");
    }
    const hashed_password = await bcrypt.hash(password, salt);
    userDoc = await User.create({name, email, password : hashed_password}); 
    res.json(userDoc);
})

app.listen(4000);