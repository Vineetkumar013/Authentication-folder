const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    title : String,
    note : String,
    category : String,
    author: String
})

const noteModel = mongoose.model("note", noteSchema)

module.exports = {
    noteModel
}


// "title" : "javascript",
// "note" : "Today it is the full stack crud",
// "category" : "Live Session",
// "author": "Vineet"