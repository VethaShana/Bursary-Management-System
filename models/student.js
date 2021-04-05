import mongoose from "mongoose";
import moment from "moment";

const studentSchema = mongoose.Schema({
<<<<<<< HEAD
	regNo: {
		type: String,
		// required:true
	},
	fullName: {
		type: String,
		// required: true,
	},
	nic: {
		type: String,
		// required: true,
		trim: true,
	},
	address: {
		type: String,
		// required: true,
	},
	mobile: {
		type: Number,
		// required: true,
	},
	gsArea: {
		type: String,
		// required:true,
	},
	gsNo: {
		type: Number,
		// required:true,
	},
	dsDivision: {
		type: String,
		// required:true,
	},
	indexNum: {
		type: String,
	},
	district: {
		type: String,
		// required:true,
	},
	admin_districtAL: {
		type: String,
		// required:true,
	},
	zScore: {
		type: Number,
		// required: true,
	},
	siblingsUnder19: [
		{
			namesb: {
				type: String,
				// required: true,
			},
			dob: {
				type: Date,
				// required: true,
			},
			school: {
				type: String,
				// required: true,
			},
		},
	],
	siblingsUniversity: [
		{
			name: {
				type: String,
				// required: true,
			},
			regNo: {
				type: String,
				// required: true,
			},
			university: {
				type: String,
				// required: true,
			},
			siblingCourse: {
				type: String,
				// required: true,
			},
			academicYear: {
				type: String,
				// required: true,
			},
			isBursaryRecipient: {
				type: Boolean,
				// required: true,
			},
		},
	],
	incomeFromEstateFieldsLands: [
		{
			nameOfOwner: {
				type: String,
				// required: true,
			},
			relationship: {
				type: String,
				// required: true,
			},
			location: {
				type: String,
				// required: true,
			},
			natureOfCultivation: {
				type: String,
				// required: true,
			},
			extentOfLandAndDetails: {
				type: String,
				// required: true,
			},
			annualIncome: {
				type: Number,
				// required: true,
			},
		},
	],
	incomeFromHouses: [
		{
			nameOfOwner: {
				type: String,
				// required: true,
			},
			relationship: {
				type: String,
				// required: true,
			},
			assessmentNo: {
				type: String,
				// required: true,
			},
			noOfHouseholders: {
				type: String,
				// required: true,
			},
			address: {
				type: String,
				// required: true,
			},
			annualIncome: {
				type: Number,
				// required: true,
			},
		},
	],
	employed: [
		{
			establishmentName: {
				type: String,
				// required: true,
			},
			establishmentAddress: {
				type: String,
				// required: true,
			},
			post: {
				type: String,
				// required: true,
			},
			salaryScale: {
				type: Number,
				// required: true,
			},
			dateOfAppointment: {
				type: Date,
			},
		},
	],

	married: [
		{
			spouseName: {
				type: String,
				// required: true,
			},
			dateOfMarriage: {
				type: Date,
				// required: true,
			},
			spousePost: {
				type: String,
				// required: true,
			},
			spouseEstablishmentName: {
				type: String,
				// required: true,
			},
			spouseMonthlySalary: {
				type: Number,
				// required: true,
			},
		},
	],
	parentsDetails: [
		{
			father: [
				{
					fatherFullName: {
						type: String,
						// required: true,
					},
					aliveOrNot: {
						type: String,
						// required: true,
					},
					ageYearMonth: {
						type: String,
						// required: true,
					},
					fatherOccupation: {
						type: String,
						// required: true,
					},
					fatherWorkPlace: {
						type: String,
						// required: true,
					},
					fatherAnnualIncome: {
						type: Number,
						// required: true,
					},
					fatherAnnualPropertyIncome: {
						type: Number,
						// required: true,
					},
					fatherAnnualOtherIncome: {
						type: Number,
						// required: true,
					},
					fatherTotalAnnualIncome: {
						type: Number,
						// required: true,
					},
				},
			],
			mother: [
				{
					motherFullName: {
						type: String,
						// required: true,
					},
					aliveOrNot: {
						type: String,
						// required: true,
					},
					ageYearMonth: {
						type: String,
						// required: true,
					},
					motherOccupation: {
						type: String,
						// required: true,
					},
					motherWorkPlace: {
						type: String,
						// required: true,
					},
					motherAnnualIncome: {
						type: Number,
						// required: true,
					},
					motherAnnualPropertyIncome: {
						type: Number,
						// required: true,
					},
					motherAnnualOtherIncome: {
						type: Number,
						// required: true,
					},
					motherTotalAnnualIncome: {
						type: Number,
						// required: true,
					},
				},
			],
			guardian: [
				{
					guardianFullName: {
						type: String,
						// required: true,
					},
					permanentAddress: {
						type: String,
						// required: true,
					},
					motherOccupation: {
						type: String,
						// required: true,
					},
					guardianAnnualIncome: {
						type: Number,
						// required: true,
					},
					guardianAnnualPropertyIncome: {
						type: Number,
						// required: true,
					},
					guardianAge: {
						type: Number,
						// required: true,
					},
				},
			],
		},
	],
})
=======
  regNo: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  gsArea: {
    type: String,
    required: true,
  },
  gsNo: {
    type: Number,
    required: true,
  },
  dsDivision: {
    type: String,
    required: true,
  },
  indexNum: {
    type: String,
  },
  district: {
    type: String,
    required: true,
  },

  course: {
    type: String,
    required: true,
  },
>>>>>>> f8794a111574752555b9142aa577a05ecdc18bf6

  admin_districtAL: {
    type: String,
    required: true,
  },
  zScore: {
    type: Number,
    required: true,
  },
  siblingsUnder19: [
    {
      namesb: {
        type: String,
        required: true,
      },
      dob: {
        type: Date,
        required: true,
      },
      //age: moment(dob, "YYYY-MM-DD").fromNow(),
      school: {
        type: String,
        required: true,
      },
    },
  ],
  Distance: {
    type: Number,
    required: true,
  },
  siblingsUniversity: [
    {
      name: {
        type: String,
        required: true,
      },
      regNo: {
        type: String,
        required: true,
      },
      university: {
        type: String,
        required: true,
      },
      siblingCourse: {
        type: String,
        required: true,
      },
      academicYear: {
        type: String,
        required: true,
      },
      isBursaryRecipient: {
        type: Boolean,
        required: true,
      },
    },
  ],
  incomeFromEstateFieldsLands: [
    {
      nameOfOwner: {
        type: String,
        required: true,
      },
      relationship: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      natureOfCultivation: {
        type: String,
        required: true,
      },
      extentOfLandAndDetails: {
        type: String,
        required: true,
      },
      annualIncome: {
        type: Number,
        required: true,
      },
    },
  ],
  incomeFromHouses: [
    {
      nameOfOwner: {
        type: String,
        required: true,
      },
      relationship: {
        type: String,
        required: true,
      },
      assessmentNo: {
        type: String,
        required: true,
      },
      noOfHouseholders: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      annualIncome: {
        type: Number,
        required: true,
      },
    },
  ],
  GSDNo: {
    type: String,
    //required:true
  },
  DSDivision: {
    type: String,
    //required:true
  },
  LocalAthority: {
    type: String,
    //required:true
  },
  employed: [
    {
      establishmentName: {
        type: String,
        required: true,
      },
      establishmentAddress: {
        type: String,
        required: true,
      },
      post: {
        type: String,
        required: true,
      },
      salaryScale: {
        type: Number,
        required: true,
      },
      salary: {
        type: String,
        required: true,
      },
      dateOfAppointment: {
        type: Date,
      },
    },
  ],

  married: [
    {
      spouseName: {
        type: String,
        required: true,
      },
      dateOfMarriage: {
        type: Date,
        required: true,
      },
      spousePost: {
        type: String,
        required: true,
      },
      spouseEstablishmentName: {
        type: String,
        required: true,
      },
      spouseMonthlySalary: {
        type: Number,
        required: true,
      },
    },
  ],

  father: [
    {
      fatherFullName: {
        type: String,
        required: true,
      },
      aliveOrNot: {
        type: String,
        required: true,
      },
      ageYearMonth: {
        type: String,
        required: true,
      },
      fatherOccupation: {
        type: String,
        required: true,
      },
      fatherWorkPlace: {
        type: String,
        required: true,
      },
      fatherAnnualIncome: {
        type: Number,
        required: true,
      },
      fatherAnnualPropertyIncome: {
        type: Number,
        required: true,
      },
      fatherAnnualOtherIncome: {
        type: Number,
        required: true,
      },
      fatherTotalAnnualIncome: {
        type: Number,
        required: true,
      },
    },
  ],
  mother: [
    {
      motherFullName: {
        type: String,
        required: true,
      },
      aliveOrNot: {
        type: String,
        required: true,
      },
      ageYearMonth: {
        type: String,
        required: true,
      },
      motherOccupation: {
        type: String,
        required: true,
      },
      motherWorkPlace: {
        type: String,
        required: true,
      },
      motherAnnualIncome: {
        type: Number,
        required: true,
      },
      motherAnnualPropertyIncome: {
        type: Number,
        required: true,
      },
      motherAnnualOtherIncome: {
        type: Number,
        required: true,
      },
      motherTotalAnnualIncome: {
        type: Number,
        required: true,
      },
    },
  ],
  guardian: [
    {
      guardianFullName: {
        type: String,
        required: true,
      },
      permanentAddress: {
        type: String,
        required: true,
      },
      guardianOccupation: {
        type: String,
        required: true,
      },
      guardianAnnualIncome: {
        type: Number,
        required: true,
      },
      guardianAnnualPropertyIncome: {
        type: Number,
        required: true,
      },
      guardianAge: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Student = mongoose.model("student", studentSchema);

export default Student;
