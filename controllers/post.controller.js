// const JobCollection = require('../models/JobCollection');

import { JobCollection } from "../models/jobs.models.js";

// POST /api/jobs - Add a new job to the array
const postJob = async (req, res) => {
  try {
    let jobCollection = await JobCollection.findOne();

    if (!jobCollection) {
      jobCollection = new JobCollection({ jobs: [req.body] });
    } else {
      jobCollection.jobs.push(req.body);
    }

    await jobCollection.save();
    res.status(201).json({ success: true, data: jobCollection });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET /api/jobs - Fetch all jobs
const getJobs = async (req, res) => {
  try {
    const jobCollection = await JobCollection.findOne();
    res.status(200).json({ success: true, data: jobCollection?.jobs || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  postJob,
  getJobs,
};
