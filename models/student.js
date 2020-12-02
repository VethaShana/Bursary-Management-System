import mongoose from 'mongoose'

const studentSchema = mongoose.Schema({
	fullName: {
        type: String,
        required: true
    },

    nic: {
        type: String,
        required: true,
        trim: true
	},
	
	address: {
        type: String,
        required: true
	},

	mobile: {
        type: Number,
        required: true
    },

    zScore: {
        type: Number,
        required: true
    },

	siblingsUnder19: [{

		name: {
            type: String,
            required: true
        },

        dob: {
            type: Date,
            required: true
        },

        school: {
            type: String,
            required: true
        },
	}],

	siblingsUniversity:[{

        name:{
            type: String,
            required: true
        },

        regNo:{
            type: String,
            required: true
        },
        university:{
            type: String,
            required: true
        },

        siblingCourse:{
            type: String,
            required: true
        },

        acadamicYear:{
            type: String,
            required: true
        },

        isBursaryRecipient:{
            type:Boolean,
            required: true
        }
    }],

})

const Student = mongoose.model('student', studentSchema)

export default Student
