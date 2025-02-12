const port=4000;
const express=require("express");
const { JsonWebTokenError } = require("jsonwebtoken");
const app=express();
const mongoose =require("mongoose");
const jwt=require("jsonwebtoken");
const multer =require("multer");
const path =require("path");
const cors =require("cors");
const { error, log } = require("console");
const { type } = require("os");

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

//Schema for Creating Products

const Product =mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    }
    ,available:{
        type:Boolean,
        default:true,
    },
})

app.post('/addproduct',async (req,res)=>{
    let products =await Product.find({});
    let id;
    if (products.length>0) {
        let last_product_array =products.slice(-1);
        let last_product=last_product_array[0];
        id=last_product.id+1;
    } else {
     id=1;   
    }
    const  product =new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        sucess:true,
        name:req.body.name,
    })
})

//Creating API for deleting product

app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id})
    console.log("Removed");
    res.json({
        sucess:true,
        name:req.body.name
    })
})

//Creating API for getting allproducts

app.get('/allproducts', async (req,res)=>{
    let products = await Product.find({})
    console.log("All Products Fetched");
    res.send(products);
})

//Schema creating for user model

const Users =mongoose.model('Users',{
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

//Creating  Endpoint for registering the user

app.post('/signup',async (req,res)=>{
    let check =await Users.findOne({email:req.body.email});

    if(check){
        return res.status(400).json({sucess:false,errors:"existing user found with same email address"})
    }

    let cart ={};
     
    for (let i = 0; i < 300; i++) {
        
        cart[i]=0;
    }
    const user =new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();

    const data ={
        user:{
            id:user.id
        }
    }

    const token =jwt.sign(data,'secret_ecom');
    res.json({sucess:true,token})

})
 
//creating endpoint for user login
app.post('/login',async (req,res)=>
{
    let user = await Users.findOne({email:req.body.email});

    if (user) {
        const passCompare = req.body.password === user.password;

        if (passCompare) {
            const data ={
                user:{
                    id:user.id
                }
            }

            const token =jwt.sign(data,'secret_ecom');
            res.json({sucess:true,token});
        }else{
            res.send({sucess:false,error:"wrong password"});
    }
    }
    else{
        res.json({sucess:false,error:"Wrong Email id"})
    }
})

//creating endpoint for newcollection data 

app.get('/newcollection',async (req,res)=>{
    let products =await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("newcollection Fetched");
    res.send(newcollection);
})

//creating endpoint for popular in women section 

app.get('/popularinwomen',async (req,res)=>{
    let products =await Product.find({category:"women"})
    let popularwomen = products.slice(1).slice(-4);
    console.log("popular women Fetched");
    res.send(popularwomen);
})


 //creating middleware to fetch user 

 const fetchUser = async (req,res,next)=>{
    const token =req.header('auth-token');

    if (!token) {
        res.status(401).send({errors:"Please authenticate using valid token"});
    } else {
        try {
            const data= jwt.verify(token,'secret_ecom');
            req.user=data.user;
            next();
        } catch (error) {
            res.status(401).send({errors:"please authenticate using valid token"})
        }
    }
 }

  //creating endpoint for adding products in cartdata

  app.post('/addtocart',fetchUser, async (req,res)=>{
    let userData =await Users.findOne({_id:req.user.id});

    userData.cartData[req.body.itemId]+=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added")
 })

 //creating endpoint to remove product from cart

 app.post('/removefromcart',fetchUser, async (req,res)=>{
    console.log("removed",req.body.itemId);
    let userData =await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId]-=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")
 })