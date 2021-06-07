import Student from '../models/student.js'
export default data => {
	const {
		married,
		spouse,
		siblingsUnder19 = [],
		siblingsAtUniversity = [],
		father,
		mother,
		guardian
	} = data

	const siblingUnder19Fund = 24000
	const siblingAtUniversityFund = 36000

	let netIncome = 0
	let capIncome = 500000

	// check marriage status
	if (married) netIncome += parseInt(salary)

	// check guardian
	// if (guardian && guardian.annualIncome) {
	const { salary = 0, houseAndPropertyOrTemple = 0 } = guardian.annualIncome
	netIncome += parseInt(salary) + parseInt(houseAndPropertyOrTemple)
	// } else {
	// check father
	{
		const {
			occupationOrPension = 0,
			houseAndProperty = 0,
			otherSources = 0
		} = father.annualIncome
		netIncome =
			father && father.living
				? parseInt(occupationOrPension) +
				  parseInt(houseAndProperty) +
				  parseInt(otherSources) +
				  netIncome
				: netIncome
	}
	{
		const {
			occupationOrPension = 0,
			houseAndProperty = 0,
			otherSources = 0
		} = mother.annualIncome
		netIncome =
			mother && mother.living
				? parseInt(occupationOrPension) +
				  parseInt(houseAndProperty) +
				  parseInt(otherSources) +
				  netIncome
				: netIncome
	}
	// }

	/**
	 * calculations for cap Amount
	 */

	// check siblings
	if (siblingsUnder19 && siblingsUnder19.length > 0)
		capIncome +=
			siblingUnder19Fund *
			(siblingsUnder19.length <= 3 ? siblingsUnder19.length : 3)

	// check siblings at university
	if (siblingsAtUniversity && siblingsAtUniversity.length > 0) {
		const siblingsNotRecipientOfMahapolaOrBursary =
			siblingsAtUniversity.filter(
				({ isBursaryOrMahapolaRecipient }) =>
					isBursaryOrMahapolaRecipient === false
			)

		//if maximum is thrice
		capIncome +=
			siblingAtUniversityFund *
			(siblingsNotRecipientOfMahapolaOrBursary.length <= 3
				? siblingsNotRecipientOfMahapolaOrBursary.length
				: 3)

		//else
		// capAmount +=
		//   siblingAtUniversityFund * siblingsRecipientOfMahapolaOrBursary.length;
	}

	return [netIncome, capIncome]

	// var data = Student.req.body
	// const query_married = data.find([
	// 	fullName,
	// 	nic,
	// 	{ married: { annual_income } },
	// 	{ propeincomefromEstate_Fields_Lands: { annual_income } },
	// 	{ incomefromHouses: { annual_income } },
	// ])

	// const query_guardian = data.student.find([
	// 	fullName,
	// 	nic,
	// 	{ parentsDetails: { guardian: { guardianAnnualIncome } } },
	// 	{ propeincomefromEstate_Fields_Lands: { annual_income } },
	// 	{ incomefromHouses: { annual_income } },
	// ])

	// const query_parents = data.student.find([
	// 	fullName,
	// 	nic,
	// 	{
	// 		parentsDetails: {
	// 			father: { fatherTotalAnnualIncome },
	// 			mother: { motherTotalAnnualIncome },
	// 		},
	// 	},
	// 	{ propeincomefromEstate_Fields_Lands: { annual_income } },
	// 	{ incomefromHouses: { annual_income } },
	// ])

	// const noOfSibb = data.student.find(nic, {
	// 	$count: { siblingsUniversity: [regNo] },
	// })

	// const noOfSib = data.student.find(nic, {
	// 	$count: { siblingsUnder19: [namesb] },
	// })

	// db.student.aggregate([
	// 	{
	// 		salaryA: {
	// 			$sum: {
	// 				parentsDetails: {
	// 					father: { fatherTotalAnnualIncome },
	// 					mother: { motherTotalAnnualIncome },
	// 				},
	// 			},
	// 			propeincomefromEstate_Fields_Lands: { annual_income },
	// 			incomefromHouses: { annual_income },
	// 		},
	// 	},
	// ])

	// db.student.aggregate([
	// 	{
	// 		salaryB: {
	// 			$sum: { parentsDetails: { guardian: { guardianAnnualIncome } } },
	// 			propeincomefromEstate_Fields_Lands: { annual_income },
	// 			incomefromHouses: { annual_income },
	// 		},
	// 	},
	// ])

	// db.student.aggregate([
	// 	{
	// 		salaryC: {
	// 			$sum: { married: { $multiply: [{ spouseMonthlySalary }, 12] } },
	// 		},
	// 		propeincomefromEstate_Fields_Lands: { annual_income },
	// 		incomefromHouses: { annual_income },
	// 	},
	// ])

	// connection.query(query_married, function (error, result) {
	// 	console.log(result)
	// 	res.send(result)
	// })
}
