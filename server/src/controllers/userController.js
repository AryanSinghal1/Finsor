const userSchema = require("../models/userModel");
const advisorSchema = require("../models/advisorModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
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
  res.send("0");
};
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