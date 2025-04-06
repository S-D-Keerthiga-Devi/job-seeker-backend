import mongoose from "mongoose";

const jobSeekerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  resume: {
    type: String, // URL to resume file
  },
  skills: [String],
  experience: [
    {
      company: String,
      position: String,
      startDate: Date,
      endDate: Date,
      description: String,
    }
  ],
  education: [
    {
      institution: String,
      degree: String,
      fieldOfStudy: String,
      startDate: Date,
      endDate: Date,
    }
  ],
  appliedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
  }],
  savedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
  }],
});

const Seeker = mongoose.model('Seeker',jobSeekerSchemaSchema);
export default Seeker;