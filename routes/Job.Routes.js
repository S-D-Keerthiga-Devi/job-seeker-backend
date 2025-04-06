import express from 'express';
import { getJobs, postJob } from '../controllers/post.controller.js';
const router = express.Router();


router.post("/post-job",postJob);
router.get('/jobs', getJobs);

export default router;
