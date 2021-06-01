import mongoose from 'mongoose'

const installmentSchema = mongoose.Schema({
	stream: {
		type: String,
		required: true
	},
	year: {
		type: String,
		required: true
	},
	noOfInstallments: {
		type: Number,
		required: true
	},
	acadamicYear: {
		type: String,
		required: true
	},
	from: {
		type: String,
		required: true
	},
	to: {
		type: String,
		required: true
	}
})

const Installment = mongoose.model('installment', installmentSchema)

export default Installment
