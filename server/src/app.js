const express = require('express');
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;
const cookieParser = require("cookie-parser");
const route = require('./routes/userRoutes');
require("./connection/connect");
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ extended: true , limit:"500mb"}));
app.use(cors());
app.use(cookieParser());
app.use(function(req, res, next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
})
app.get("/", (req,res)=>{
    res.send("Hello");
})
app.use("/api", route);
app.listen(port, () => {
  console.log(`Listening to the server ${port}`);
});