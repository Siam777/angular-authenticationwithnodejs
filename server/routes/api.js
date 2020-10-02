const express= require("express");
const router = express.Router();

const User= require('../Model/user');

const mongoose = require('mongoose');
const db = "mongodb://localhost:27017/testdb";
mongoose.connect(db, err=>{
    if(err){
        console.log("Error! "+err);
    }else{
        console.log("connected to mongodb");
    }
})
router.get('/', (req, res)=> {
    res.send("From API route");
})

router.post('/register',( req, res)=>{
  let userData = req.body;
  let user = new User(userData);
  user.save((error,registerUser)=>{
      if(error){
          console.log("error");
      }else{
          res.status(200).send(no);
      }
  })

})

router.post('/login',(req,res)=>{
    let userData = req.body;
    console.log(userData);
    User.findOne({email:userData.email},(error,user)=>{
        if(error){
            console.log(error);
        }else{
            if(!user){
                res.status(401).send("Invalid email");
            }
            else{
                if(userData.password!==user.password){
                    res.status(401).send('invalid password')
                }else{
                    res.status(200).send(user);
                }
            }
        }
    })

})


module.exports = router;