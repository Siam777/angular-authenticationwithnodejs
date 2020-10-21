const express= require("express");

const jwt = require('jsonwebtoken');
const router = express.Router();

const User= require('../Model/user');

const mongoose = require('mongoose');
const { json } = require("body-parser");
const db = "mongodb://localhost:27017/testdb";
mongoose.connect(db, err=>{
    if(err){
        console.log("Error! "+err);
    }else{
        console.log("connected to mongodb");
    }
})

function verifyToken(req,res,next){
  //console.log(req.headers);
  if(!req.headers.authorization){
    return res.status(401).send('Unauthorized request');
  }
  let token = req.headers.authorization.split(' ')[1];
  if(token === 'null'){
    return res.status(401).send('Unauthorized request');
  }
  jwt.verify(token,'secretKey',function(err,payload){
    if(err){
      return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.suject;
    next()
  })
  
}

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
          let payload = {subject: registerUser._id}
          let token = jwt.sign(payload,'secretKey');
          res.status(200).send({token});
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
                  let payload = {subject:user._id};
                  let token = jwt.sign(payload,'secretKey');
                    res.status(200).send({token});
                }
            }
        }
    })

})

router.get('/events',(req,res)=>{
    let events = [
        {
          "_id": "1",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "2",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "3",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "4",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "5",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "6",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        }
      ]
      res.json(events);
})
router.get('/special',verifyToken,(req,res)=>{
    let events = [
        {
          "_id": "1",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "2",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "3",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "4",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "5",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        },
        {
          "_id": "6",
          "name": "Auto Expo",
          "description": "lorem ipsum",
          "date": "2012-04-23T18:25:43.511Z"
        }
      ]
      res.json(events);
})

module.exports = router;