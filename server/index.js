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
import multer from "multer";
import fs from 'fs';
import { Place } from "./model/Places.js";

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
    try{
        const { name, email, password } = req.body;
        let userDoc = await User.findOne({ email });
        if (userDoc) {
            return res.status(500).json("user already exists");
        }
        const hashed_password = await bcrypt.hash(password, salt);
        userDoc = await User.create({ name, email, password: hashed_password });
        sendCookie(userDoc, res);
    }
    catch(err){
        console.log(err);
    }
})

app.post("/login", async (req, res) => {
    try{
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
    }
    catch(err){
        console.log(err);
    }
})

app.get("/profile",(req, res) => {
    try{
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
    }
    catch(err){
        console.log(err);
    }
})

app.post("/logout", (req, res) => {
    try{
        res.cookie('token', '').json("logged out !");
    }
    catch(err) {
        console.log(err);
    }
})

app.post("/upload-by-link", async (req, res) => {
    try {
        const {link} = req.body;
        const filename = 'photo' + Date.now() + '.jpg';
        const pathToPhoto = __dirname + '/uploads/' + filename; 
        await imageDownloader.image({
            url : link,
            dest : pathToPhoto,
        })
        res.json(filename);
    } 
    catch(error){
        console.log(error);
    }
})

const uploadPhotosMiddleware = multer({dest: "uploads/"});
app.post("/upload", uploadPhotosMiddleware.array('photos', 100), (req, res) => {
    try{
        const uploadedPhotos = [];
        for(let i=0; i<req.files.length; i++){
            const {originalname, path, filename} = req.files[i];
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            const newPath = path + '.' + ext;
            fs.renameSync(path, newPath);
            uploadedPhotos.push(filename + '.' + ext);
        }
        res.json(uploadedPhotos);
    }
    catch(err){
        console.log(err);
    }
});

app.post("/places", (req, res) => {
    try{
        const {token} = req.cookies;
        const {title, location, addedPhotos, description, perks, otherInfo, checkIn, checkOut, maxGuests} = req.body;
        if(token){
            jwt.verify(token, process.env.SECRET_KEY, {}, async (err, data) => {
                if(err) throw err;
                const placeDoc = await Place.create({owner: data.id, title, address: location, photos: addedPhotos, description, perks, extraInfo: otherInfo, checkIn, checkOut, maxGuests});
                res.json(placeDoc);
            })
        }
    }
    catch(err){
        console.log(err);
    }
})

app.get("/places", (req, res) => {
    try{
        const {token} = req.cookies;
        if(token){
            jwt.verify(token, process.env.SECRET_KEY, {}, async (err, userData) => {
                if(err) throw err;
                const {id} = userData;
                const userDoc = await Place.find({owner : id});
                res.json(userDoc);
            })
        }
    }
    catch(err){
        console.log(err);
    }
})

app.put("/places", (req, res) => {
    try{
        const {token} = req.cookies;
        const {id, title, location, addedPhotos, description, perks, otherInfo, checkIn, checkOut, maxGuests} = req.body;
        if(token){
            jwt.verify(token, process.env.SECRET_KEY, {}, async (err, userData) => {
                if(err) throw err;
                const placeDoc = await Place.findById(id);
                if(userData.id === placeDoc.owner.toHexString()){           // we can also toString()
                    placeDoc.set({title, address: location, photos: addedPhotos, description, perks, extraInfo: otherInfo, checkIn, checkOut, maxGuests});
                    await placeDoc.save();
                }
                res.json(placeDoc);
            })
        }
    }
    catch(err){
        console.log(err);
    }
})

app.get("/places/:id", async (req, res) => {
    const {id} = req.params;
    const placeDoc = await Place.findById(id);
    res.json(placeDoc);
})


app.listen(4000);