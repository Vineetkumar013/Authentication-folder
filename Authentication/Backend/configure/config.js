const mongoose = require("mongoose");
mongoose.set("strictQuery",true);
const connection = mongoose.connect(process.env.mongodbURL);

module.exports = {
    connection
}