const express = require("express");
const {noteModel} = require("../models/note.model");
const noteRouter = express.Router();



noteRouter.get("/", (req, res)=>{
    res.json("All the notes")
  });

noteRouter.post("/create", async (req,res)=>{
    const payload = req.body 
    try {
        const new_note = new noteModel(payload);
        await new_note.save()
        res.json("Create the note")
    } catch (error) {
        console.log(error);
        res.json({"msg":"something went wrong"});
    }
})

noteRouter.patch("/update/:id",async (req,res)=>{
    const noteID = req.params.noteID
    const userID = req.body.userID
    const payload = req.body
    const note = await NoteModel.findOne({_id:noteID})
    try {
        if(userID!==note.userID){
            res.json("You are not Authorized for updating")
        }else{
             const data = await NoteModel.findByIdAndUpdate({_id:noteID},payload)
            res.json("Data Updated Successfully")
        }
       
    } catch (error) {
        console.log(Error)
        res.json("error in patch")
    }
})

noteRouter.delete("/delete/:Id",async(req,res)=>{
    const Id = req.params.Id
    try {
        const data =  await noteModel.findByIdAndDelete({_id:Id})
    
    res.json("Data Deleted Successfully")
    } catch (error) {
        console.log(Error)
        res.json("error in Delete")
    }
})

module.exports ={
    noteRouter
}
