import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  id: Number,
  title: String,
  company: String,
  location: String,
  jobType: String,
  salary: String,
  description: String,
  skills: [String],
  postedDays: Number
});

const jobCollectionSchema = new mongoose.Schema({
  jobs: [jobSchema]
}, { timestamps: true });

export const JobCollection = mongoose.model('JobCollection', jobCollectionSchema);
