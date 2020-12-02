import Student from '../models/student.js'

export const getStudents = async (req, res) => {
	try {
		const student = await Student.find()
		res.status(200).json(student)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

export const createStudent = async (req, res) => {
	const student = req.body
	const newStudent = new Student(student)
	try {
		await newStudent.save()
		res.status(201).json(newStudent)
	} catch (error) {
		res.status(409).json({ message: error.message })
	}
}


export const deleteStudent = async (req, res) => {
	try {
		const student = await Student.findByIdAndRemove(req.params.id)
		res.status(200).json({message:"Deleted Successfully"})
	} 
	catch (error) {
		res.status(400).json({ message: error.message })
	}
}

export const updateStudent = async (req, res) => {
	try {
		const student = await Student.findByIdAndUpdate(req.params.id,{$set:{
			fullName: req.body.fullName,
			nic: req.body.nic,
			address: req.body.address,
			mobileNo: req.body.mobileNo,
			zScore: req.body.zScore
		}
	})
	
		
		res.status(200).json({message:"Updated Successfully"})
	} 
	catch (error) {
		res.status(400).json({ message: error.message })
	}
}