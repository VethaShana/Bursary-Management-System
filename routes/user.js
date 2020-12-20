import express from 'express'
import { Delete, LoginUser, Register, tokenIsValid,getUser } from '../controllers/user.js'
import auth from '../middleware/auth.js'


const router = express.Router()

router.post('/login', LoginUser)
router.post("/register",Register)
router.delete("/delete", auth, Delete) 
router.post("/tokenIsValid",tokenIsValid)
router.get("/", auth, getUser)
export default router