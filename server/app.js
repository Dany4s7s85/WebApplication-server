const patient = require("./dbConn");
const express = require("express");
const app = express();
const cors = require("cors");
const validator = require('validator');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser')
app.use(cookieParser())


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



//register a user
app.post("/register", function (req, res) {

  const data = req.body;

  const { fname, lname, phone, email, password, cpassword } = data;

  if (!fname || !lname || !phone || !email || !password || !cpassword) {
    res.end("please fill form properly")
  } else if (password != cpassword) {
    res.end("both password fields not matched")
  } else if (!validator.isEmail(email)) {
    res.end("please use a proper email");
  } else{
    const newPatient = new patient(data);
    newPatient.save();
    res.end("saved");

  }

})



//login user
app.post("/login", function (req, res) {


  const data = req.body;

  const { email, password } = data;


  if (!email || !password) {
    res.end("please fill email and password properly");
  }else{
    patient.findOne({email:email}).then((isEmail)=>{
      if(password === isEmail.password){
        var myid = isEmail.id;
        var token = jwt.sign({ myid }, "qwertyuiop1234567890");
        isEmail.tokens = token;
        isEmail.save();
        res.cookie("HealthServices", token, {
          expires:new Date(Date.now() + 900000),
          httpOnly:true
        });
      }else{
        res.end("invalid email or password")
      }
    }).catch((error)=>{
      res.end("error occured");
    })
  }

})

app.listen("5000", function () {
  console.log("listen port 5000");
})

