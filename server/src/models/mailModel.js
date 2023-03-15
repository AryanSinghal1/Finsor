const mongoose = require('mongoose');
const currentDate = new Date();
const meetSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
        },
    advisor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "advisor"
        },
        time:{
            type:String,
        },
        ratings:{
            type: Number,
            default: 0
        },
})

const meet = new mongoose.model('meet', meetSchema);
module.exports = meet;
