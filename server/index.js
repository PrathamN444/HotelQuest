import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { connectToDB } from "./data/database.js";
import { User } from "./model/user.js";
import { sendCookie } from "./utils/feature.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import imageDownloader from "image-downloader";
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();

// const currentDir = ( typeof(__dirname) !== 'undefined' ) ? __dirname : process.cwd();
// console.log(currentDir);

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
// console.log({__dirname});

const salt = await bcrypt.genSalt(10);

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
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
    const { name, email, password } = req.body;
    let userDoc = await User.findOne({ email });
    if (userDoc) {
        return res.status(500).json("user already exists");
    }
    const hashed_password = await bcrypt.hash(password, salt);
    userDoc = await User.create({ name, email, password: hashed_password });
    sendCookie(userDoc, res);
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let userDoc = await User.findOne({ email });
    if (!userDoc) {
        return res.status(500).json("user don't exists");
    }
    const valid = await bcrypt.compare(password, userDoc.password);
    if (!valid) {
        return res.status(500).json("wrong email or password");
    }
    sendCookie(userDoc, res);
})

app.get("/profile",(req, res) => {
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, {}, (err, data) => {
            if (err) throw err;
            res.json(data);
        });
    }
    else {
        res.json(null);
    }
})

app.post("/logout", (req, res) => {
    res.cookie('token', '').json("logged out !");
})

app.post("/upload-by-link", async (req, res) => {
    const {link} = req.body;
    const filename = 'photo' + Date.now() + '.jpg';
    const pathToPhoto = __dirname + '/uploads/' + filename; 
    await imageDownloader.image({
        url : link,
        dest : pathToPhoto,
    })
    res.json(filename);
})

app.listen(4000);