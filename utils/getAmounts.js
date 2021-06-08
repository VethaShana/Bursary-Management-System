import Student from '../models/student.js'
export default data => {
	const {
		married,
		spouse: { salary },
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
	if (guardian && guardian.annualIncome) {
		const { salary = 0, houseAndPropertyOrTemple = 0 } =
			guardian.annualIncome
		netIncome += parseInt(salary) + parseInt(houseAndPropertyOrTemple)
	} else {
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
	}

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
}
