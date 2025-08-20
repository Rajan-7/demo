// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
const express = require("express")
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());



// MongoDB connection
mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology:true
});

const EmailSchema = new mongoose.Schema({email : String});
const Email = mongoose.model("Email",EmailSchema);

// API route
app.post("/subscribe",async(req,res)=>{
  try{
    const newEmail = new Email({email:req.body.email});
    await newEmail.save();
    res.status(201).send("Email saved");
  }catch(err){
    res.status(500).send("Error saving email");
  }
})

// Starting server

app.listen(3000,()=>console.log("Server running on 3000"));