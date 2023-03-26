require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors())
const { PORT,SECRET } = process.env;

// const token = jwt.sign({course:"backend"}, "masai")

// console.log(token)

// const decode = jwt.verify(token,"masai");
// console.log(decode)

const auth = (req,res,next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.split(" ")[1];
      const result = jwt.verify(token,SECRET);
      req.user = result;
      console.log(req.user);
      next();
    } else {
      res.send("No TOKEN");
    }
  } catch (error) {
    res.send(error);
    console.log(error)
  }
};

const user = { username: "vineet", password: "password" };

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (username === user.username && password === user.password) {
    const token = jwt.sign({ username }, SECRET);
    await res.json(token);
  } else {
    res.send("wrong username or password");
  }
});

app.get("/test", auth, (req, res) => {
  res.send(user);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
