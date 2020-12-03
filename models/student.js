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

    incomefromEstate_Fields_Lands:[{
        nameofOwner:{
            type:String,
            required: true
        },
        relationship:{
            type:String,
            required: true
        },
        location:{
            type:String,
            required: true
        },
        natureofcultivation:{
            type:String,
            required: true
        },
        extentofLandAndDetails:{
            type:String,
            required: true
        },
        annual_income:{
            type:Number,
            required: true
        }

    }],

    incomefromHouses:[{
        nameofOwner:{
            type:String,
            required: true
        },
        relationship:{
            type:String,
            required: true
        },
        assessmentNo:{
            type:String,
            required: true
        },
        noofHouseholders:{
            type:String,
            required: true
        },
        adddress:{
            type:String,
            required: true
        },
        annual_income:{
            type:Number,
            required: true
        }

    }],

    employed:[{
        establishmentName:{
            type:String,
            required: true
        },
        establishmentAddress:{
            type:String,
            required: true
        },
        post:{
            type:String,
            required: true
        },
        salaryScale:{
            type:Number,
            required: true
        },
        dateOfAppoinment:{
            type:Date
        }
    }],

    married:[{
        spouseName:{
            type:String,
            required: true
        },
        dateOfMarriage:{
            type:Date,
            required: true
        },
        spousePost:{
            type:String,
            required: true
        },
        spouseEstablishmentName:{
            type:String,
            required: true
        },
        spouseMonthlySalary:{
            type:Number,
            required: true
        }
    }],

    parentsDetails: [{
        father:[{
            fatherFullName: {
                type: String,
                required: true
            },

            aliveORnot: {
                type: String,
                required: true
            },

            ageYearMonth: {
                type: String,
                required: true
            },

            fatherOccupation: {
                type: String,
                required: true
            },

            fatherWorkPlace: {
                type: String,
                required: true
            },

            fatherAnnualIncome:{
                type:Number,
                required: true
            },
            fatherAnnualPropertyIncome:{
                type:Number,
                required: true
            },

            fatherAnnualOtherIncome:{
                type:Number,
                required: true
            },

            fatherTotalAnnualIncome:{
                type:Number,
                required: true
            }
        }],

        mother:[{
            motherFullName: {
                type: String,
                required: true
            },

            aliveORnot: {
                type: String,
                required: true
            },

            ageYearMonth: {
                type: String,
                required: true
            },

            motherOccupation: {
                type: String,
                required: true
            },

            motherWorkPlace: {
                type: String,
                required: true
            },

            motherAnnualIncome:{
                type:Number,
                required: true
            },
            motherAnnualPropertyIncome:{
                type:Number,
                required: true
            },

            motherAnnualOtherIncome:{
                type:Number,
                required: true
            },

            motherTotalAnnualIncome:{
                type:Number,
                required: true
            }
        }],

        guardian:[{
            guardianFullName: {
                type: String,
                required: true
            },

            permenentAddress: {
                type : String,
                required : true
            },

            motherOccupation: {
                type: String,
                required: true
            },

            guardianAnnualIncome:{
                type:Number,
                required: true
            },
            guardianAnnualPropertyIncome:{
                type:Number,
                required: true
            },

            guardianAge: {
                type: Number,
                required: true
            }
        }]
    }],



})

const Student = mongoose.model('student', studentSchema)

export default Student
