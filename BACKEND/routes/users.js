const router=require('express').Router();
const bcrypt=require("bcrypt")
const User=require("../models/User");


////Register///

router.post("/register",async (req,res)=>{
    try{
        //generate password
        const salt =await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(req.body.password,salt);
        //create new user 
        const newUser =  new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword
        });
        // save and respones
        const saveUser= await newUser.save();
        res.status(200).json(saveUser._id); 

    }
    catch(err){
         res.status(500).json(err);
    }
})

///Login/////
router.post("/login",async (req,res)=>{
    try{
         //find user 
         const user=await User.findOne({username:req.body.username});
        //  !user && res.status(400).json("INVALID USERNAME");

         //validate
           const validatePassword=await bcrypt.compare(req.body.password,user.password);
           !validatePassword && res.status(400).json("WRONG PASSWORD");
         //send respond
         res.status(200).json({userID:user._id,username:user.username});
    }
    catch(err)
    {
        res.status(500).json("You messed up!!");
    }
})

module.exports=router;