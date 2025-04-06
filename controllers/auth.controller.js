import { generateToken } from "../libs/utils.js";
import { sendVerificationCode, welcomeEmail } from "../middleware/email.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'



const register = async(req,res)=>{
  try {
    const  {fullname,email,password,phone,location,role} = req.body;
    if(!email || !password || !fullname || !phone || !location){
      return res.status(400).json({success:false,message:"All Fields are required"})
    }
    const existsUser = await User.findOne({email})
    if(existsUser){
      return res.status(400).json({success:false,message:"User Already Exists Please Login"})

    }
    const hashPassword = await bcrypt.hashSync(password,10)
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    const user = new User({
      email,
      password:hashPassword,
      fullname,
      phone,
      location,
      role,
      verificationCode
    })
    await user.save()
    sendVerificationCode(user.email,user.verificationCode)
    return res.status(200).json({success:true,message:"User Register Successful",user})
  } catch (error) {
    console.log(error);
    return res.status(500).json({success:false,message:"Failed to register user"})
  }
}

const verifyEmail = async(req,res)=>{
  try {
    const {code} = req.body;
    const user = await User.findOne({verificationCode:code})
    if(!user){
      return res.status(400).json({success:false,message:"Invalid or Expired Code"})
    }
    user.isVerified = true
    user.verificationCode = undefined
    await user.save()
    await welcomeEmail(user.email,user.fullname)
    return res.status(200).json({success:true,message:"Email Verified Successfully"})
  } catch (error) {
    return res.status(500).json({success:false,message:"Internal Server Error"})
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Successful login
    generateToken(user._id,res);
    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const logout = (req,res)=>{
  try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"Logged out successfully"})
  } catch (error) {
   console.log("Error in logout controller",error.message);
   res.status(500).json({message:"Internal Server Error"}); 
  }
}

const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export {register,verifyEmail,loginUser,logout,checkAuth}