const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const currentDate = new Date();
const advisorSchema = new mongoose.Schema({
    name:{
            type: String,
        },
        role:{
            type:String,
            default:"User"
        },
    gender:{
            type:String
        },
    email:{
            type:String
        },
    mobile:{
            type:Number,
          
        },
    date:{
            type:String,
            default: currentDate
        },
    password:{
            type:String,
          
        },
})
advisorSchema.pre("save", async function(next){
    if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 10);
}
next();
})
advisorSchema.methods.generateAuthToken=async function(){
    try{
            const token = jwt.sign({_id: this._id.toString()}, "HelloeveryonewelcometoFinsorAppp")
            this.token = token;
            await this.save();
            return token;
        }catch(err){
            console.log("Error is"+err);
        }
}
const advisor = new mongoose.model('advisor', advisorSchema);
module.exports = advisor;
