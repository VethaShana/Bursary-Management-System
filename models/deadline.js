import mongoose from 'mongoose'
const dateSchema = mongoose.Schema({
	deadline: {
		type: Date,
		default: '21-06-2021'
	}
})

const Deadline = mongoose.model('deadline', dateSchema)

export default Deadline
