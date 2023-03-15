const userSchema = require("../models/userModel");
const advisorSchema = require("../models/advisorModel");
const mailSchema = require("../models/mailModel");
const incomeSchema = require("../models/incomeModel");
const expenseSchema = require("../models/expenseModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const meet = require("../models/mailModel");
exports.getInvite = async (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "aryann11223@gmail.com",
      pass: "wbbjbzxprjzozeqc",
    },
  });
  let info = await transporter.sendMail({
    from: "FinsorTeam",
    to: req.body.username,
    subject: `Finsor Advisor Update`,
    text: `A request has been sent to the Advisor ${req.body.advName} and you will be notified accordingly.`,
    // html: `<p>Hello User, Your username is ${req.body.username} and your invite code is ${req.body.invitecode}</p>`,
    html: `<p>A request has been sent to the Advisor ${req.body.advName} and you will be notified accordingly.</p>`,
  });
  console.log("Message sent: %s", info.messageId);
  const newMeet = new meet({
    advisor: req.body.advisorId,
    user: req.body.userId
    })
  await newMeet.save().then(()=>{
    res.send("0");
  }).catch(()=>{
    res.send("1");
  })
};
exports.mailDetails = async(req,res) => {
   await mailSchema.find().populate("user").populate("advisor").then(p=>res.send(p)).catch((e)=>console.log(e))
}
exports.changeStatus = async(req, res) => {
  const advisor = await advisorSchema.findOne({
    _id:req.body.advisor
  })
  if(advisor){
    advisor.available = advisor.available?false:true;
  }
  await advisor.save().then((e)=>res.send("Changed"))
}
exports.getUser = async(req,res) =>{
  const user = await userSchema.find({_id: req.body._id});
  // console.log(user,"dsasj");
  res.send(user);
}
exports.addLimit = async(req,res) =>{
  console.log(req.body)
  const userNew = await userSchema.findOne({
    _id: req.body.user
  })
  userNew.limit = req.body.limit;
  await userNew.save().then(()=>res.send("0"))
}
exports.getExpense = async(req, res) =>{
  const incomes = await incomeSchema.find();
  const expenses = await expenseSchema.find();
  res.json({incomes, expenses});
}
exports.addExpense = async(req,res) =>{
  const currUser = await userSchema.findOne({_id:req.body.user})
  if(req.body.type==2){
    if(currUser.limit && ((req.body.expense+req.body.amount) >= currUser.limit/2)){
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "aryann11223@gmail.com",
        pass: "wbbjbzxprjzozeqc",
      },
    });
    let info = await transporter.sendMail({
      from: "FinsorTeam",
      to: currUser.email,
      subject: `Finsor Advisor Update`,
      text: `Dear customer, you have crossed half of your monthly limit.`,
      // html: `<p>Hello User, Your username is ${req.body.username} and your invite code is ${req.body.invitecode}</p>`,
      html: `<p>Dear customer, you have crossed half of your monthly limit.</p>`,
    });
    console.log("Message sent: %s", info.messageId);  
  }
    const newUser = new expenseSchema({
        amount: req.body.amount,
        user: req.body.user,
        detail: req.body.title,
      })
      await newUser.save().then(()=>{res.send("Registered")})
    }else{
      const newAdvisor = new incomeSchema({
      amount: req.body.amount,
      user: req.body.user,
      detail: req.body.title,
    })
    await newAdvisor.save().then(()=>{res.send("Registered")})
}
}

exports.advisorUser = async(req, res) => {
  const advData = await advisorSchema.find();
  console.log(advData)
  res.send(advData);
}
exports.registerUser = async(req, res) => {

    if(req.body.role==2){
        const newUser = new userSchema({
            name: req.body.name,
            role: req.body.role==1?'Advisor':'User',
            gender: req.body.gender,
            email: req.body.email,
            mobile: req.body.mobile,
            password: req.body.password
        })
        await newUser.save().then(()=>{res.send("Registered")})
    }else{
        const newAdvisor = new advisorSchema({
            name: req.body.name,
            role: req.body.role==1?'Advisor':'User',
            gender: req.body.gender,
            email: req.body.email,
            mobile: req.body.mobile,
            password: req.body.password
        })
        await newAdvisor.save().then(()=>{res.send("Registered")})
    }
}
exports.loginUser = async(req, res)=>{
        const loginUser = req.body.role==1? await advisorSchema.findOne({ email: req.body.email }):await userSchema.findOne({ email: req.body.email });
        console.log(req.body, loginUser);
        if (loginUser) {
          const loginDone = await bcrypt.compare(
            req.body.password,
            loginUser.password
          );
          const token = await loginUser.generateAuthToken();
          if (loginDone) {
            res.cookie("jwtoken", token, {
              expires: new Date(Date.now() + 25892000),
              httpOnly: true,
            });
            console.log("Sivvess");
            return res.status(200).json({ loginUser, token, Message: "Welcome" });
          } else {
            // res.send("1");
            return res.status(400).json({ message: "Invalid Credentials" });
          }
        } else {
          // res.send("2");
          return res.status(400).json({ message: "User not registered" });
        }
      };