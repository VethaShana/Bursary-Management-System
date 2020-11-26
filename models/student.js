import mongoose from 'mongoose'

const studentSchema = mongoose.Schema({
	fullName: String,
	nameWithInitials: String,
	// all data related to student goes here
})

const Student = mongoose.model('student', studentSchema)

export default Student
