const express = require ("express");
const signupModal = require("../modals/signupSchema");
const { checkExistingUser, generatePasswordHash }= require ("../utility");
const bcrypt = require ("bcryptjs");
const jwt = require ("jsonwebtoken");
const crypto = require("crypto");
const salt = 10;

const router = express.Router();

router.post("/login", (req, res)=>{
    signupModal.find({email: req.body.email}).then((userData)=>{
        if(userData.length){
             bcrypt.compare(req.body.password,userData[0].password).then((val) =>{
                if(val){
                  const authToken = jwt.sign(userData[0].email, process.env.SECRET_KEY);
                  res.status(200).send({authToken})
                 // res.status(200).send("login successfull")
                }else{
                    res.status(400).send("Incorrect Password")
                }
             })
        }else {
            res.status(400).send("Unauthorized user")
        }
    })
});

router.post("/signup", async(req, res)=>{
  //  console.log(req.body) 
    if (await checkExistingUser(req.body.email)){
        res.status(400).send("Email exist already. Please try with different Email")
    
    }else {
        generatePasswordHash(req.body.password).then((passwordHash) => {
            signupModal.create({ email: req.body.email, password: passwordHash }).then((data) => {
                res.status(200).send("user signedup sucessfully")
            }).catch((err) => {
                res.status(400).send(err.message)
            })
        })
    //     bcrypt.genSalt(salt).then((saltHash)=>{
    //        bcrypt.hash(req.body.password, saltHash).then((passwordHash) => {
    //         signupModal.create({username : req.body.username, 
    //             email: req.body.email, 
    //             password : passwordHash  
    //             })
    //             // confirm_password :req.body.confirm_password })
    //             .then(()=>{
    //                 res.status(200).send(`${req.body.username} added successfully`)
    //         }).catch ((err)=>{
    //             res.status(400).send(err.message)
    //         })
    //        }).catch ((err)=>{
    //              console.log(err)
    //        })
    //     }).catch((err)=>{
    //       console.log(err)
    //    })

    }
});

router.post("/logout", (req, res) => {
    authToken = ""
    res.status(200).send("User Logeged Out sucessfully")
})

// router.put("/updatePassword", (req, res)=>{
//     signupModal.find({username: username}).then((user)=>{
//         if(user.length){
//             bcrypt.compare(req.body.oldpassword, user[0].password).then((isMatch)=>{
//                 if(isMatch){
//                     signupModal.updateOne({username: req.body.username})
//                 }else{
//                      res.status(400).send("Old Password is incorrect")
//                 }
//             })
//         }else{
//             res.status(400).send("Invalid user")
//         }
//     })
// })
module.exports = router