import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  companyDetails: {
    name: String,
    industry: String,
    location: String,
    website: String,
    description: String,
  },
  postedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
  }],
});

const Recruiter = mongoose.model('Recruiter',recruiterSchema);
export default Recruiter;
