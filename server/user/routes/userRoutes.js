const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const signupModal = require("../modals/signupSchema")
const userModal = require ("../modals/userSchema")

router.post("/addproperty" , async (req, res)=>{
    const aboutProperty = userModal({
        property_type: req.body.property_type,
        negotiable :req.body.negotiable,
        ownership: req.body.ownership,
        price: req.body.price,
        property_age : req.body.property_age,
        property_approved : req.body.property_approved,
        property_description : req.body.property_description,
        bank_loan: req.body.bank_loan,
        
        length:req.body.length,
        breadth:req.body.breadth,
        total_area:req.body.total_area,
        area_unit:req.body.area_unit,
        no_of_bhk:req.body.no_of_bhk,
        no_of_floors:req.body.no_of_floors,
        attached:req.body.attached,
        western_toilet:req.body.western_toilet,
        furnished:req.body.furnished,
        car_parking:req.body.car_parking,
        lift:req.body.lift,
        electricity:req.body.electricity,
        facing:req.body.facing,
       
        name:req.body.name,
        mobile:req.body.mobile,
        posted_by:req.body.posted_by,
        sale_type:req.body.sale_type,
        featured_package:req.body.featured_package,
        ppd_package:req.body.ppd_package,
        image:req.body.image,
        email:req.body.email,
        city:req.body.city,
        area:req.body.area,
        city:req.body.city,
        pincode:req.body.pincode,
        address:req.body.address,
        landmark:req.body.landmark,
        latitude:req.body.latitude,
        longitude:req.body.longitude,
        views:req.body.views,
        status:req.body.status,
        days_left:req.body.days_left
    })
    aboutProperty.save().then((data) => {
        console.log('Property Added')
        res.send('Property Added');
    }).catch(err => console.log(err));
})

// router.get("/property", async (req,res)=>{
//     // res.status(200).send("property GET route")
//     console.log(`This is cookie from backend ${req.headers.authorization}`)

//     // console.log("get route of property")
//     try{
//         const token = req.headers.authorization;
//         const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
//         console.log(verifyToken)
//         if(verifyToken){
//             // console.log(verifyToken)
//             const userDetail = await signupModal.find({email : verifyToken }) 
//             // console.log(userDetail)

//             if(userDetail.length){
//                 const propertyData = await userModal.find();
//                 res.status(200).send({property:propertyData, userData : userDetail});
//                 console.log(userDetail)
                
//             }else{
//                 res.status(409).send("Unauthorized user")
//             }
//             // console.log(userDetail)

//         }else{
//             res.status(409).send("Unauthorized user")
//         }
        
//     }catch(err){
//         console.log(err)
//         res.status(400).send(err)
//     }
// })

router.get("/", (req, res) => {

    if (req.headers.authorization) {
        try {
            user_mail = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
            signupModal.find({ email: user_mail }).then((userData) => {
                if (userData.length) {
                    // console.log(user_mail)
                    userModal.find().then((propertyData) => {
                               const value= propertyData.reverse()
                        res.status(200).send(value)                
                    })
                } else {
                    res.status(403).send("No such user exist with the mentioned email id")
                   }
            }).catch((err) => {
                res.status(400).send(err.message)
            })
        } catch (err) {
            res.status(401).send("User not authorized")
        }
    } else {
        res.status(200).send("Header is empty. Please add Header")
    }
})

router.get("/search/:id", (req, res) => {
    userModal.find({_id:req.params.id}).then((propertyData) => {
        // console.log(propertyData)
        res.status(200).send(propertyData)
    }).catch(err=>{
        console.log("Error occured")
        res.status(400).send("No match found please enter correct Id")
})
})

module.exports = router;