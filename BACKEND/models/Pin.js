const mongoose = require("mongoose")

const PinSchema=new mongoose.Schema(
    {
        username:{
            type: String,
            require:true,
            min:5,
        },
        title:{
         type:String,
        },
        desc:{
            type:String,
        },
        rating:{
            type:Number,
            require:true,
            min:0,
            max:5,
        },
        lat:{
           type:Number,
           require:true,
        },
        long:{
            type:Number,
            reqiure:true,
        },
    },
    {
        timestamps :true
    }
);

module.exports=mongoose.model("Pin",PinSchema);