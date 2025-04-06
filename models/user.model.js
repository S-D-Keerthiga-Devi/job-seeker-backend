import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
  fullname:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
  },
  phone:{
    type:String
  },
  location:{
    type:String,
  },
  role: {
    type: String,
    enum: ['employer', 'job_seeker'],
    required: true,
  },
  verificationCode:String,
  bio: {
    type: String,
    default: '',
  },
  profilePicture: {
    type: String,
    default: '',
  },
},{timestamps:true})

const User = mongoose.model('User',userSchema);
export default User;