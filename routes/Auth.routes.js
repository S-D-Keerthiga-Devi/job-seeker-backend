import express from 'express'
import { checkAuth, loginUser, logout, register, verifyEmail } from '../controllers/auth.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js';
const AuthRoutes = express.Router()

AuthRoutes.post('/register',register);
AuthRoutes.post('/verifyemail',verifyEmail);
AuthRoutes.post('/login',loginUser)
AuthRoutes.get('/logout',logout)
AuthRoutes.get('/check-auth',protectRoute,checkAuth)

export default AuthRoutes;
