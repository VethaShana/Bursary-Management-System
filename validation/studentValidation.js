import * as yup from 'yup'
const studentValidationSchema = yup.object().shape({
	// userId: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: 'user',
	// 	required: true,
	// 	unique: true
	// },

	regNo: yup.string().required('registration number is required'),

	nic: yup.string().trim().required('nic number is required'),

	//title: yup.string().trim().oneOf(['Mr.', 'Mrs.', 'Miss']).required(),

	nameWithInitials: yup
		.string()
		.required('nameWithInitials number is required'),

	fullName: yup.string().required('fullName number is required'),

	street: yup.string().required('street number is required'),

	city: yup.string().required('city number is required'),

	district: yup.string().required('district number is required'),

	phone: yup
		.string()
		.matches(/^(?:7|0|(?:\+94))[0-9]{9,10}$/, 'Invalid phone number.')
		.required('Phone is required'),

	email: yup.string().required('email number is required'),

	zScore: yup.string().required('zScore number is required'),

	course: yup.string().required('course number is required'),

	GSDivision: yup.string().required('gsDivision number is required'),

	DSDivision: yup.string(),

	indexNo: yup.string(),

	siblingsUnder19: yup
		.array()
		.of(
			yup.object().shape({
				name: yup.string(), //.required('Name is required'),
				dob: yup
					.date()
					.max(new Date(), 'Date of Birth cannot be in future'),
				//	.required('Date of Birth is required'),
				// age: yup
				// 	.number()
				// 	.min(0, 'Age cannot be negative')
				// 	.max(123, 'Invalid age')
				// 	.required('Age is required'),
				schoolOrInstitute: yup.string().max(123, 'Invalid age')
				//.required('Academic year is required')
			})
		)
		.optional(),

	siblingsAtUniversity: yup
		.array()
		.of(
			yup.object().shape({
				name: yup.string(), //.required('Name is required'),
				regNo: yup.string(), //.required('Registration No. is required'),
				institute: yup.string(), //.required('Institute is required'),
				academicYear: yup.string(),
				//.min(new Date().getFullYear() - 10, 'Invalid Academic year')
				// .max(
				// 	new Date().getFullYear(),
				// 	'Academic year cannot exceed current year.'
				// ),
				//.required('Academic year is required'),
				course: yup.string(), //.required('Course is required'),
				isBursaryOrMahapolaRecipient: yup.boolean() //.required()
			})
		)
		.optional(),

	incomeFromEstateFieldsLands: yup
		.array()
		.of(
			yup.object().shape({
				name: yup.string(), //.required('Name is required'),
				relationship: yup.string(),
				//.required('Relationship No. is required'),
				location: yup.string(), //.required('Location is required'),
				natureOfCultivation: yup.string(), //.required('Nature of Cultivation is required'),
				extentOfLandAndDetails: yup.string(), //.required('Extent of Land & Details are required'),
				annualIncome: yup.number() //.required('Annual Income is requied')
			})
		)
		.optional(),

	incomeFromHouses: yup
		.array()
		.of(
			yup.object().shape({
				name: yup.string(), //.required('Name is required'),
				relationship: yup.string(), //.required('Relationship is required'),
				assessmentNo: yup.string(), //.required('Assessment No. is required'),
				noOfHouseholders: yup.number(), //.required('No. of Householders is required'),
				address: yup.string(), //.required('Address is required'),
				annualIncome: yup.number() //.required('Annual Income is requied')
			})
		)
		.optional(),

	DSDivision: yup
		.string()
		.required('DSDivision number is required')
		.optional(),

	employed: yup.boolean().required('employed number is required'),

	employment: yup.object().when('employed', (employed, schema) =>
		schema.shape({
			establishment: employed
				? yup.string().required('Establishment is required')
				: yup.string(),
			designation: employed
				? yup.string().required('Designation is required')
				: yup.string(),
			salary: employed
				? yup
						.number()
						.min(0, 'Salary cannot be negative')
						.required('Salary is required')
				: yup.string(),
			// salaryScale: employed
			// 	? yup.number().required('Salary scale required')
			// 	: yup.number(),

			dateOfEmployment: employed
				? yup
						.date()
						.max(
							new Date(),
							'Date of Employment cannot be in future'
						)
						.required('Date of Employment is required')
				: yup.date(),

			address: yup.object().shape({
				street: employed
					? yup.string().required('Street is required')
					: yup.string(),
				city: employed
					? yup.string().required('City is required')
					: yup.string(),
				district: employed
					? yup
							.string()
							//.oneOf(districts, 'Invalid district')
							.required('Street is required')
					: yup.string()
			})
		})
	),

	married: yup
		.boolean()
		.default(false)
		.required('State whether married or not'),
	spouse: yup.object().when('married', (married, schema) =>
		schema.shape({
			name: married
				? yup.string().required('Name is required')
				: yup.string(),
			dateOfMarriage: married
				? yup
						.date()
						.max(new Date(), 'Date of Marriage cannot be in future')
						.required('Date of Marriage is required')
				: yup.date(),
			employment: yup.object().shape({
				establishment: married
					? yup.string().required('Establishment is required')
					: yup.string(),
				designation: married
					? yup.string().required('Designation is required')
					: yup.string(),
				salary: married
					? yup
							.number()
							.min(0, 'Salary cannot be negative')
							.required('Salary is required')
					: yup.string()
			})
		})
	),

	father: yup.object().shape({
		name: yup.string().required("Father's name is required"),
		living: yup.boolean().required('This field is required'),
		age: yup.number().when('living', {
			is: true,
			then: yup
				.number()
				.min(0, 'Age cannot be negative')
				.max(
					123,
					'World record for oldest person is 122 years and 164 days :)'
				)
				.required('Age is required, if living'),
			otherwise: yup
				.number()
				.min(0, 'Age cannot be negative')
				.max(123, 'Invalid age')
		}),
		employment: yup.object().shape({
			occupation: yup.string().required('Occupation is required'),
			salary: yup
				.number()
				.min(0, 'Salary cannot be negative')
				.required('Salary is required'),
			dateOfEmployment: yup
				.date()
				.max(new Date(), 'Date of Employment cannot be in future')
				.required('Date of Employment is required'),
			address: yup.string().required('Address is required')
		}),
		annualIncome: yup.object().shape({
			occupationOrPension: yup
				.number()
				.min(0, 'Income cannot be negative')
				.required('Occupation or pension income is required'),
			houseAndProperty: yup
				.number()
				.min(0, 'Income cannot be negative')
				.required('House & property income is required'),
			otherSources: yup
				.number()
				.min(0, 'Income cannot be negative')
				.required('Income from other sources is required')
		})
	}),

	mother: yup.object().shape({
		name: yup.string().required("Mother's name is required"),
		living: yup.boolean().required('This field is required'),
		age: yup.number().when('living', {
			is: true,
			then: yup
				.number()
				.min(0, 'Age cannot be negative')
				.max(
					123,
					'World record for oldest person is 122 years and 164 days :)'
				)
				.required('Age is required, if living'),
			otherwise: yup
				.number()
				.min(0, 'Age cannot be negative')
				.max(123, 'Invalid age')
		}),
		employment: yup.object().shape({
			occupation: yup.string().required('Occupation is required'),
			salary: yup
				.number()
				.min(0, 'Salary cannot be negative')
				.required('Salary is required'),
			dateOfEmployment: yup
				.date()
				.max(new Date(), 'Date of Employment cannot be in future')
				.required('Date of Employment is required'),
			address: yup.string().required('Address is required')
		}),
		annualIncome: yup.object().shape({
			occupationOrPension: yup
				.number()
				.min(0, 'Income cannot be negative')
				.required('Occupation or pension income is required'),
			houseAndProperty: yup
				.number()
				.min(0, 'Income cannot be negative')
				.required('House & property income is required'),
			otherSources: yup
				.number()
				.min(0, 'Income cannot be negative')
				.required('Income from other sources is required')
		})
	}),

	guardian: yup.object().shape({
		name: yup.string().optional(),
		living: yup.boolean().optional(),
		address: yup.string().optional(),
		age: yup
			.number()
			.min(0, 'Age cannot be negative')
			.max(123, 'Invalid age')
			.optional(),
		post: yup.string(),
		annualIncome: yup.object().shape({
			houseAndPropertyOrTemple: yup
				.number()
				.min(0, 'Income cannot be negative'),
			salary: yup.number().min(0, 'Income cannot be negative')
		})
	}),

	//netAmount: yup.number().required('netAmount number is required'),

	//isValidCandidate: yup.required(),

	installments: yup.array().of(
		yup.object().shape({
			installmentId: yup.string().required(),
			noOfInstallments: yup
				.number()
				.required('noOfInstallments No. is required')
		})
	)
})

export default studentValidationSchema
