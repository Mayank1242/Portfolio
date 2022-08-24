const express =require('express');
const path =require('path');
const hbs =require('hbs');
const app=express();
const port=process.env.PORT || 4000;



const static_path=path.join(__dirname,"../public");
app.use(express.static(static_path));

require("./db/conn");
app.use(express.urlencoded({extended:false}));
const User=require("./models/userModel");

app.set("view engine","hbs");
const templatesPath=path.join(__dirname, '../templates/views');
const partialsPath=path.join(__dirname, '../templates/partials');

app.set('views', templatesPath);
hbs.registerPartials(partialsPath);

app.get("",(req,res)=>{
 
    res.render("index");

});


app.post("/contact",async(req,res)=>{
    try {
        const userData =new User(req.body);
       
        // res.render("index");
        await userData.save();
        res.redirect("/#home"); 
    } catch (error) {
        res.send(error);
    }
    
});


app.get("*",(req,res)=>{
    res.send("404 error page oops")
})

app.listen(port,()=>{
    console.log("Server is started at "+ port);
});