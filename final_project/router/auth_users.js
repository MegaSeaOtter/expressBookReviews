const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{   
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
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

//only registered users can login
regd_users.post("/login", (req,res) => {
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

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
const review = req.params.email;
    let books = books[title]
    if (friend) { //Check is friend exists
        let title = req.body.title;
        let author = req.body.author;
        let reviews = req.body.reviews;
        if(reviews) {
            books["review"] = review
        }
        books[review]=review;
        res.send(`Your review of ${title} has been saved.`);
    }
    else{
        res.send("Unable to find book!");
    }
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
module.exports.review = review;
  
