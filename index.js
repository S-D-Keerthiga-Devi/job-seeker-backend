import express from 'express';
import dotenv from 'dotenv';
import AuthRoutes from './routes/Auth.routes.js';
import DBconn from './libs/db.js';
import cors from 'cors';
import router from './routes/Job.Routes.js';
import cookieParser from 'cookie-parser';

dotenv.config()
DBconn()
const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true
}))
// app.use('/auth')
app.use('/auth',AuthRoutes)
app.use('/api',router)
app.listen(PORT,()=>{
  console.log(`App is running on port ${PORT}`)
})
