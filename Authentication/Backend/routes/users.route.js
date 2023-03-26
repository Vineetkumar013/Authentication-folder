const mongoose = require("mongoose");
const express = require("express");
const { UserModel } = require("../models/users.model");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
userRouter.use(express.json());


userRouter.post("/signup", async (req,res)=>{
    const {name,email,password,age} = req.body;
    const present = await UserModel.findOne({email})
    if(present){
        res.json("Already exit !!");
        console.log(error);
    }else{
        try {
            bcrypt.hash(password,5, async(error,secure)=>{
                if(error){
                    res.json(error)
                    console.log(error);
                }else{
                    const user = new UserModel({name,email,password:secure,age})
                    await user.save();
                    res.json("Registered !!")
                    console.log(user)
                }
            })
        } catch (error) {
            res.json("something went is wrong in signup");
            console.log(error);
        }
    }
})

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });

    if (user.length > 0) {
      const hashed_pass = user[0].password;
      bcrypt.compare(password, hashed_pass, (error, result) => {
        if (result) {
          const token = jwt.sign({ course: "backend" }, "masai");
          res.json({ msg: "login successfull", token: token });
        } else {
          res.json("wrong Credntials");
          console.log({ error: "wrong here" });
        }
      });
    } else {
      res.json("wrong Credntials");
      console.log({ error: "wrong upper" });
    }
  } catch (error) {
    res.json("something went is wrong in login");
    console.log({ error: "wrong down" });
  }
});

module.exports = {
    userRouter
}