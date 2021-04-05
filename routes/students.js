import express from 'express'
import auth from '../middleware/auth.js'
<<<<<<< HEAD
import {
	getStudents,
	createStudent,
	deleteStudent,
	updateStudent,
	PDFStudent,
	PDF,
} from '../controllers/students.js'
=======
import { getStudents, createStudent,deleteStudent,updateStudent,PDFStudent } from '../controllers/students.js'
>>>>>>> f8794a111574752555b9142aa577a05ecdc18bf6
//import auth2 from '../middleware/auth.js'

const router = express.Router()

// protected
router.get('/', auth, getStudents)
<<<<<<< HEAD
// router.post('/', createStudent, PDF)
router.post('/', createStudent)
router.delete('/:id', auth, deleteStudent)
router.put('/:id', auth, updateStudent)
// router.post('/pdf',PDFStudent)
router.post('/pdf', PDF)
=======
router.post('/', createStudent)
router.delete('/:id',auth, deleteStudent)
router.put('/:id',auth,updateStudent)
router.get('/pdf',PDFStudent)
// update all other routes
>>>>>>> f8794a111574752555b9142aa577a05ecdc18bf6

export default router
