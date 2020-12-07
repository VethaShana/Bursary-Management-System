import express from 'express'
import { LoginUser } from '../controllers/user.js'
//import auth from '../middleware/auth'


const router = express.Router()

router.post('/login', LoginUser)

export default router