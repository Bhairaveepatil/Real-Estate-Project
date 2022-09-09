const mongoose = require ("mongoose");
// const validator = require("validator");
// const sequencing = require("../config/sequencing");


const signupSchema = new mongoose.Schema ({
    
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required: true,
    }

});

const signupModal = mongoose.model("usersignup", signupSchema);
module.exports = signupModal;