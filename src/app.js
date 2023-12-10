const express = require("express");
const app = express();
require('./mongodb/connection');
const port = process.env.port || 8080;
const path = require('path');
const hbs = require("hbs");

const Register = require("./models/registers");

const Publicpath = path.join(__dirname, "../public");
app.use(express.static(Publicpath));
//we have to menton both code that i have written below otherwise i will give an error;
app.set("view engine", 'hbs');
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", (req,res)=>{
    res.render('index');
});

app.get("/login", (req,res)=>{
    res.render("login");
});

app.get("/register", (req,res)=>{
    res.render("register");
});

app.get("/index", (req,res)=>{
    res.render("index");
});

app.post("/register", async(req,res)=>{
    try{
       const password = req.body.password;
       const cpassword = req.body.confirmPassword;

       if(password === cpassword){
           const registerEmplo = new Register({
             firstname:req.body.fname,
             lastname:req.body.lname,
             email:req.body.email,
             phoneNumber:req.body.phno,
             gender:req.body.gender,
             password:req.body.pass,
             confirmPassword:req.body.cpass
           });

          const register = await registerEmplo.save();
          res.status(200).render("index");
        }else{
        res.send("Password are not matched");
       }

    }catch(err){
       res.status(400).send(err);
    }
});



app.listen(port, ()=>{
    console.log("server is running on port number " +port);
});