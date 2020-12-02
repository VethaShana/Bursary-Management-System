import express from 'express'
import { getStudents, createStudent,deleteStudent,updateStudent } from '../controllers/students.js'

const router = express.Router()

router.get('/', getStudents)
router.post('/', createStudent)
router.delete('/:id', deleteStudent)
router.put('/:id',updateStudent)
// update all other routes

export default router