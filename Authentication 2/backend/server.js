const express = require("express");
const {connection} = require("./config/db");
const {userRouter}= require("./routes/user.route")
const {noteRouter} = require("./routes/notes.route")
const {authenticate} = require("./middleware/authenticate.middldeware")
const app = express();
const cors = require("cors");
app.use(cors({
  origin:"*"
}))




app.use(express.json());
app.use("/users",userRouter);
app.use(authenticate)


app.use("/notes", noteRouter);

app.get("/", (req, res) => {
  res.send("home page");
});


app.listen(7070, async () => {
  try {
    await connection;
    console.log("Server start on 7070");
  } catch (error) {
    res.send("error");
    console.log(error);
  }
});
