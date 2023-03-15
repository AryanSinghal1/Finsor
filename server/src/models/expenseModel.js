const mongoose = require('mongoose');
const currentDate = new Date();
const expenseSchema = new mongoose.Schema({
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

const expense = new mongoose.model('expense', expenseSchema);
module.exports = expense;
