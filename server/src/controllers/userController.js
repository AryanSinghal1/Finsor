const userSchema = require("../models/userModel");
const advisorSchema = require("../models/advisorModel");
// const nodemailer = require("nodemailer");
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
  req.body.username.forEach(async (element) => {
  let info = await transporter.sendMail({
    from: "CineliteTeam",
    to: req.body.username,
    subject: req.body.messageSub,
    text: `Hello ${req.body.username}, your invite code is ${req.body.invitecode}`,
    // html: `<p>Hello User, Your username is ${req.body.username} and your invite code is ${req.body.invitecode}</p>`,
    html: req.body.messageCont,
  });
  console.log("Message sent: %s", info.messageId);
});
  let mediaDetails = {
    insta: "Insta to be entered",
    media2: "Next media",
  };
  let paymentDetails = {
    AccNo: "Account Number",
    Swift: "Swift",
    Bank: "Bank",
    Branch: "Branch",
    BranchAddress: "Branch Address",
  };
  req.body.username.forEach(async(elem)=>{
  const newUser = new registerSchema({
    fname: "To be entered by the user",
    lname: "To be entered by the user",
    email: elem,
    password: req.body.invitecode,
    mobile: "To be entered by the user",
    address: "To be entered by the user",
    vatTaxNumber: "To be entered by the user",
    introduction: "To be entered by the user",
    opAddress: "To be entered by the user",
    YearsExp: "To be entered by the user",
    work: "To be entered",
    registered: false,
    refBy: req.body.refId
  });
  newUser.links.push(mediaDetails);
  newUser.bankDetails.push(paymentDetails);
  await newUser
    .save()
    .then(() => {
      res.send("0");
    })
    .catch((e) => console.log(e));
  });
};
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