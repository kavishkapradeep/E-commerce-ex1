const port=4000;
const express=require("express");
const { JsonWebTokenError } = require("jsonwebtoken");
const app=express();
const mongoose =require("mongoose");
const jwt=require("jsonwebtoken");
const multer =require("multer");
const path =require("path");
const cors =require("cors");
const { error } = require("console");

app.use(express.json());
app.use(cors());

//databse connection with mongodb

mongoose.connect("mongodb+srv://kavishkapradeep903:Kavishka07@cluster0.hqrxauj.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=Cluster0");

//API Creation
app.get("/",(req,res)=>{
    res.send("express app is runing")
})



app.listen(port,(error)=>{
    if (!error) {
        console.log("Server Running Port"+port)
    } else {
        console.log("Error :"+error)
    }
})

//Image Storage Engine

const storage =multer.diskStorage({
    destination :'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)

    }
})

const upload =multer({storage:storage})

//Creating Upload endpoint for images
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        sucess:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})