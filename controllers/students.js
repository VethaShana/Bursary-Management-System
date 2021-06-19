import Student from '../models/student.js'
//import Deadline from '../models/student.js'
import pdfMake from 'pdfmake/build/pdfmake.js'
import PDF_Fonts from 'pdfmake/build/vfs_fonts.js'
import { json, response } from 'express'
import bodyParser from 'body-parser'
import { getDocumentDefinition } from '../services/pdf.js'

import getAmounts from '../utils/getAmounts.js'
import sendMail from '../services/sendMail.js'
import { getDocDefinition } from '../services/summary1.js'
//import Deadline from '../models/deadline.js'
//import JSON  from 'nodemon/lib/utils'

pdfMake.vfs = PDF_Fonts.pdfMake.vfs

//@route GET /students/
export const getStudents = async (req, res) => {
	try {
		const { query } = req
		let students = []
		if (query) {
			students = await Student.find(query)
		} else {
			students = await Student.find()
		}
		res.status(200).json(students)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

export const getStudent = async (req, res) => {
	try {
		const student = await Student.findOne({ userId: req.params.userId })
		res.status(200).json(student)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

export const createStudent = async (req, res, next) => {
	try {
		const [netIncome, capIncome] = getAmounts(req.body)
		console.log(netIncome, capIncome)
		const isValidCandidate = netIncome <= capIncome
		var deadline = new Date()
		deadline.setDate(deadline.getDate() + 7)
		deadline =
			deadline.getFullYear() +
			'-' +
			deadline.getMonth() +
			'-' +
			deadline.getDate()
		const newStudent = new Student({
			...req.body,
			userId: req.user._id,
			netIncome: netIncome,
			capIncome: capIncome,
			isValidCandidate,
			deadline
		})
		await newStudent.save()
		const pdfDoc = pdfMake.createPdf(
			getDocumentDefinition('application', { ...req.body, deadline })
		)

		var data
		pdfDoc.getBase64(function (encodedString) {
			data = encodedString
		})

		pdfDoc.getBase64(data => {
			res.writeHead(200, {
				'Content-Type': 'application/pdf',
				'Content-Disposition': 'attachment;filename="filename.pdf"'
			})
			//stu_Doc = data.toString("utf-8");

			const download = Buffer.from(data.toString('utf-8'), 'base64')
			const { email, fullName } = req.body
			sendMail({
				to: email,
				subject: 'Bursary Application',
				text: 'Thank you for applying for Bursary Fund. Please carefully read the instructions given in the email attachment.',
				attachments: {
					filename: `Bursary Application - ${fullName}.pdf`,
					content: download
				}
			})
			res.end(download)
		})
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

export const deleteStudent = async (req, res) => {
	try {
		const student = await Student.findByIdAndRemove(req.params.id)
		res.status(200).json({ message: 'Deleted Successfully' })
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

export const updateStudent = async (req, res) => {
	const [netIncome, capIncome] = getAmounts(req.body)
	const isValidCandidate = netIncome <= capIncome

	try {
		const student = await Student.findByIdAndUpdate(
			req.params.id,
			{
				$set: {
					...req.body,
					netIncome: netIncome,
					capIncome: capIncome,
					isValidCandidate
				}
			},
			{ new: true }
		)
		res.status(200).json(student)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

export const createPDF = async (req, res) => {
	const userId =
		req.user.role === 'student' ? req.user._id : req.params.userId
	const pdfDoc = pdfMake.createPdf(getDocDefinition('application', req.body))

	pdfDoc.getBase64(data => {
		res.writeHead(200, {
			'Content-Type': 'application/pdf',
			'Content-Disposition': 'attachment;filename="filename.pdf"'
		})

		const download = Buffer.from(data.toString('utf-8'), 'base64')
		res.end(download)
	})
}

export const getInstallments = async (req, res) => {
	try {
		const student = await Student.findById(req.params.id).populate(
			'installments.installmentId'
		)
		res.status(200).json(student.installments)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}
