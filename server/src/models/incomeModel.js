const mongoose = require('mongoose');
const currentDate = new Date();
const incomeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
        },
        detail:{
            type:String,
        },
        amount:{
            type:Number
        },
        date:{
            type:String,
            default:currentDate
        }
})

const income = new mongoose.model('income', incomeSchema);
module.exports = income;
