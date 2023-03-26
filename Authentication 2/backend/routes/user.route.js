const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.json("connect with server");
});

userRouter.post("/signup", async (req, res) => {
  const { email, password, name, age } = req.body;
  const already = await UserModel.findOne({email})
  if(already){
    res.json("ALready exist,Please Login")
  }else{
  try {
    bcrypt.hash(password, 5, async (error, secure_password) => {
      if (error) {
        console.log(error);
        res.json(error)
      } else {
        const user = new UserModel({
          email,
          password: secure_password,
          name,
          age,
        });
        await user.save();
        res.json(user);
        console.log(user)
      }
    });
  } catch (error) {
    res.json("something went is wrong in signup");
    console.log(error);
  }
}
});

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
  userRouter,
};
