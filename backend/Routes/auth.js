const express=require('express')
const router=express.Router()
const User=require('../Models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

// Register route
router.post("/register",async(req,res)=>{
  try{
      const {username,email,password}=req.body
      const salt=await bcrypt.genSalt(10)
      const hashedPassword=await bcrypt.hashSync(password,salt)
      const newUser=new User({username,email,password:hashedPassword})
      const savedUser=await newUser.save();
      res.status(200).json(savedUser)

  }
  catch(err){
      res.status(500).json(err)
  }
})

//login route
router.post('/login', async function(req,res){
  try{
    const user= await User.findOne({email:req.body.email})
    if(!user){
      return res.status(404).json("user not found")
    }
    else{
      const match=await bcrypt.compare(req.body.password,user.password)
      if(!match){
        return res.status(401).json("invalid credentials")
      }
      else{
        const token=jwt.sign({id:user._id,username:user.username,email:user.email},process.env.SECRET,{expiresIn:"3d"})
        const{password,...info}=user._doc
        res.cookie("token",token).status(200).json(info)
      }
    }
  }
  catch(err){
    res.status(500).json(err)
  }
})

// logout route
router.get('/logout', async function(req, res) {
  try {
      res.clearCookie("token", {
          httpOnly: true, // Ensure the cookie is accessible only by the server
          sameSite: "None" // SameSite=None is needed for cross-site cookies
      }).status(200).send("logged out successfully");
  } catch (err) {
      res.status(500).json(err);
  }
});


//REFETCH
router.get('/refresh',function(req,res){
  const token=req.cookies.token;
  jwt.verify(token,process.env.SECRET,{},async (err,data)=>{
    if(err){
      return res.status(404).json(err)
    }
    res.status(200).json(data)
  })
})

module.exports = router;
