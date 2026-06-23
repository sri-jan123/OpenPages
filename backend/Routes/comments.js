const express = require('express')
const router = express.Router()
const User=require('../Models/User')
const Post = require('../Models/Post')
const comment = require('../Models/Comment')
const verifyToken=require('../verifyToken');


//create post
router.post("/create",verifyToken,async function(req,res){
    try{
     const newComment=new comment(req.body)
     const savedComment=await newComment.save()
     res.status(200).json(savedComment)
    }
    catch(err){
    res.status(500).json(err)
    }
})

//Update route
router.put("/:id",verifyToken, async function (req, res) {
  try {
    const updatedComment = await comment.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    res.status(200).json(updatedComment)
  }
  catch (err) {
    res.status(500).json(err)
  }
})
module.exports = router;


//delete route
router.delete("/:id",verifyToken,async function (req, res) {
  try {
    await comment.findByIdAndDelete(req.params.id);
    res.status(200).json("comment has been deleted")
  }
  catch (err) {
    res.send(500).json(err)
  }
})


//get post comments
router.get('/post/:postId', async function(req,res){
    try{
     const comments=await comment.find({postId:req.params.postId})
     res.status(200).json(comments)
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports=router;