const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const books_routes = require('./router/booksdb.js').general;

const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}
const authenticatedUser = (username,password)=>{
  let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}
const booklist = (author,title)=>{
  let bookreview = books.filter((book)=>{
    return (books.author === author && books.title === title)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer", function auth(req,res,next){
    if(req.session.authorization) {
        token = req.session.authorization['accessToken'];
        jwt.verify(token, "access",(err,user)=>{
            if(!err){
                req.user = user;
                next();
            }
            else{
                return res.status(403).json({message: "User not authenticated"})
            }
         });
     } else {
         return res.status(403).json({message: "User not logged in"})
     }
 });
 app.post("/login", (req,res) => {
   const username = req.body.username;
   const password = req.body.password;
   if (!username || !password) {
       return res.status(404).json({message: "Error logging in"});
   }
   if (authenticatedUser(username,password)) {
     let accessToken = jwt.sign({
       data: password
     }, 'access', { expiresIn: 60 * 60 });
     req.session.authorization = {
       accessToken,username
   }
   return res.status(200).send("User successfully logged in");
   } else {
     return res.status(208).json({message: "Invalid Login. Check username and password"});
   }
 });
 app.post("/register", (req,res) => {
   const username = req.body.username;
   const password = req.body.password;
   if (username && password) {
     if (!doesExist(username)) { 
       users.push({"username":username,"password":password});
       return res.status(200).json({message: "User successfully registered. Now you can login"});
     } else {
       return res.status(404).json({message: "User already exists!"});    
     }
   } 
   return res.status(404).json({message: "Unable to register user."});
 });
 app.post("/review", (req,res) => {
   const title = req.body.title;
   const author = req.body.author;
   if (title && author) {
     if (!doesExist(title)) { 
       books.push({"author":author,"title":title, "review":review});
       return res.status(200).json({message: "Thank you for your review!"});
     } else {
       return res.status(404).json({message: "Title already reviewed by user."});    
     }
   } 
   return res.status(404).json({message: "Title does not exist."});
 });
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);
app.use("/books", books_routes);

app.listen(PORT,()=>console.log("Server is running"));
