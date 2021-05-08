<<<<<<< HEAD
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
=======
import express from "express";
import auth from "../middleware/auth.js";
import {
  getStudents,
  createStudent,
  deleteStudent,
  updateStudent,
  PDFStudent,
} from "../controllers/students.js";
>>>>>>> d837796 (adding getAmount and pdfwork)
//import auth2 from '../middleware/auth.js'

const router = express.Router();

// protected
<<<<<<< HEAD
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
=======
router.get("/", auth, getStudents);
router.post("/", createStudent);
router.delete("/:id", auth, deleteStudent);
router.put("/:id", auth, updateStudent);
router.post("/pdf", PDFStudent);
>>>>>>> d837796 (adding getAmount and pdfwork)
// update all other routes
>>>>>>> f8794a111574752555b9142aa577a05ecdc18bf6

<<<<<<< HEAD
export default router
=======
export default router;
>>>>>>> d837796 (adding getAmount and pdfwork)
