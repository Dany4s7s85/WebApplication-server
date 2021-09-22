const mongoose = require("mongoose");

//connection with mongodb
mongoose.connect("mongodb://localhost:27017/hospital").then(() =>{
    console.log("connection is successfull");
}).catch((err) =>{
    console.log(err);
});


//create schema for mongodb
const PatientSchema = new mongoose.Schema({
    fname:{
      type: String,
      lowercase: true,
      required: true,
  },
    lname:{
      type: String,
      lowercase: true,
      required: true,
  },
    phone:{
      type: Number,
      required: true,
  },
    email:{
        type:String,
        required:true,
        lowercase: true,
        unique:true,
    },
    password:{
      type: String,
      required: true,
  },
    cpassword:{
      type: String,
    required: true,
  },
    tokens:{
      type:String,
  },
  });

  const patient = mongoose.model("Patients", PatientSchema);


module.exports = patient;