import express from 'express'
import auth from '../middleware/auth.js'
import { getStudents, createStudent,deleteStudent,updateStudent,PDF } from '../controllers/students.js'
//import auth2 from '../middleware/auth.js'

const router = express.Router()

// protected
router.get('/', auth, getStudents)
router.post('/', createStudent)
router.delete('/:id',auth, deleteStudent)
router.put('/:id',auth,updateStudent)
router.post('/pdf/:id',auth,PDF)
// update all other routes

export default router