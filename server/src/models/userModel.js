const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const currentDate = new Date();
const userSchema = new mongoose.Schema({
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
    limit:{
            type:Number,
         default:"Not Set" 
        },
    date:{
            type:String,
            default: currentDate
        },
    password:{
            type:String,
          
        },
})
userSchema.pre("save", async function(next){
    if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 10);
}
next();
})
userSchema.methods.generateAuthToken=async function(){
    try{
            const token = jwt.sign({_id: this._id.toString()}, "HelloeveryonewelcometoFinsorAppp")
            this.token = token;
            await this.save();
            return token;
        }catch(err){
            console.log("Error is"+err);
        }
}
const user = new mongoose.model('user', userSchema);
module.exports = user;
