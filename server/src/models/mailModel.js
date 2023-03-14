const mongoose = require('mongoose');
const currentDate = new Date();
const mailSchema = new mongoose.Schema({
    userName:{
            type: String,
        },
    advisorName:{
            type: String,
        },
        time:{
            type:String,
        },
        ratings:{
            type: Number,
            default: 0
        },
})

const mail = new mongoose.model('mails', mailSchema);
module.exports = mail;
