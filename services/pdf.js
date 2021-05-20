import moment from 'moment'
import header from './layout/header.js'
import stuD from './layout/stuD.js'
import office from './layout/OfficeUse.js'
import instruction from './layout/Instruction.js'
import Father from './layout/Father.js'
import Mother from './layout/Mother.js'
import employee from './layout/Empolyee.js'
import marriage from './layout/marriage.js'
import footer from './layout/Footer.js'
import guard from './layout/guard.js'

const applicationDocDefinition = data => {
	const {
		fullName,
		siblingsUnder19,
		married,
		spouse,
		siblingsUniversity,
		incomeFromEstateFieldsLands,
		incomeFromHouses,
		employed,
		employment,
		father,
		mother,
		guardian
	} = data

	const rows = siblingsUnder19.map(sibling => [
		`${sibling.namesb}`,
		`${moment(sibling.dob).format('L')}`,
		`${moment().diff(sibling.dob, 'years')}`,
		`${sibling.school}`
	])

	const rows1 = siblingsUniversity.map(sib => [
		`${sib.name}`,
		`${sib.regNo}`,
		`${sib.university}`,
		`${sib.siblingCourse}`,
		`${sib.academicYear}`,
		`${sib.isBursaryRecipient}`
	])

	const rows2 = incomeFromEstateFieldsLands.map(income => [
		`${income.nameOfOwner}`,
		`${income.relationship}`,
		`${income.location}`,
		`${income.natureOfCultivation}`,
		`${income.extentOfLandAndDetails}`,
		`${income.annualIncome}`
	])

	const rows3 = incomeFromHouses.map(income => [
		`${income.nameOfOwner}`,
		`${income.relationship}`,
		`${income.assessmentNo}`,
		`${income.noOfHouseholders}`,
		`${income.address}`,
		`${income.annualIncome}`
	])

	console.log(rows)

	return {
		pageMargins: [60, 60, 60, 60],

		content: [
			...header,
			{
				alignment: 'justify',

				table: {
					widths: [110, 100],
					body: [
						[
							{ text: 'Registration No:', fontSize: 15 },
							{ text: `${data.regNo}` }
						]
					]
				}
			},
			{
				columns: [
					...stuD,
					[
						{ text: '\n\n\n' },
						{ text: `\n${fullName}` },
						{
							text: `\n${data.street}, ${data.city}, ${data.district} `
						},
						{ text: '\n' },
						{ text: `\n${data.gsDivision}&${data.gsNo}` },
						{ text: `\n${data.dsDivision}` },
						{ text: `\n${data.district}` },
						{ text: `\n${data.phone}` },
						{ text: `\n\n${data.alDistrict}` },
						{ text: `\n${data.indexNo}` },
						{ text: `\n${data.zScore}` },
						{ text: `\n\n${data.course}` },
						{ text: `\n${data.nic}` }
					]
				]
			},
			...office,
			...instruction,

			{ text: '2.Family Details:', bold: 'true' },
			{
				text: ' \nA.  state details of school going bothers, sisters / Rev.brothers/children, if married who are 19 years or under, you should prepared to produce birth certificate if necessary.\n'
			},
			{
				style: 'tableExample',
				table: {
					headerRows: 1,
					heights: 40,
					body: [
						[
							{ text: 'Name', style: 'tableHeader' },
							{ text: 'Date of Birth', style: 'tableHeader' },
							{ text: 'Age', style: 'tableHeader' },
							{
								text: 'Name of school/Institute attenden ',
								style: 'tableHeader'
							}
						],
						...rows
					]
				}
			},

			{
				text: `\nB. Distance from the student\'s permanent residence to the University of Jaffna(k.m) : ${data.Distance} km`
			},
			{
				text: '\nC. If you have any brother or sisters following courses of study in a University, or any Campus, Institute of Athletic studies or Institute of Indigenous Medicine , give details:\n'
			},
			{
				style: 'tableExample',
				table: {
					headerRows: 1,
					heights: 40,
					body: [
						[
							{ text: 'Name', style: 'tableHeader' },
							{
								text: 'Registration No of the Higher Education',
								style: 'tableHeader'
							},
							{
								text: 'Name of the Institution where the course of study is being followed ',
								style: 'tableHeader'
							},
							{ text: 'Course ', style: 'tableHeader' },
							{ text: 'Acadamic Year', style: 'tableHeader' },
							{ text: 'getBursary', style: 'tableHeader' }
						],
						...rows1
					]
				}
			},

			{
				text: '\n3. Income from Estates,Fields,Lands etc.:',
				bold: 'true'
			},
			{
				style: 'tableExample',
				table: {
					headerRows: 1,
					heights: 40,
					body: [
						[
							{ text: 'Name of Owner', style: 'tableHeader' },
							{ text: 'Relationship', style: 'tableHeader' },
							{ text: 'Location', style: 'tableHeader' },
							{
								text: 'Nature of Cultivation ',
								style: 'tableHeader'
							},
							{
								text: 'Extent of Land & Details of Property',
								style: 'tableHeader'
							},
							{
								text: 'Annual income in Rupees ',
								style: 'tableHeader'
							}
						],
						...rows2
					]
				}
			},

			{ text: '\n4. Income from the Houses:', bold: 'true' },
			{
				style: 'tableExample',
				table: {
					headerRows: 1,
					heights: 40,
					body: [
						[
							{ text: 'Name of Owner', style: 'tableHeader' },
							{ text: 'Relationship', style: 'tableHeader' },
							{ text: 'Assessment No', style: 'tableHeader' },
							{
								text: 'No. of house holders List',
								style: 'tableHeader'
							},
							{ text: 'Address', style: 'tableHeader' },
							{ text: 'Annual income', style: 'tableHeader' },
							{
								text: 'If given on rent/lease names and addresses of tenant/lease',
								style: 'tableHeader'
							}
						],
						...rows3
					]
				}
			},

			{
				columns: [
					[
						{
							text: '\n 1. Grama sevaka division number of above  house :'
						},
						{ text: '\n 2.D.S Division :' },
						{ text: '\n 3.Name of the Local Authority :' }
					],
					[
						{ text: `\n\n${data.GSDNo}` },
						{ text: `\n${data.DSDivision}` },
						{ text: `\n${data.LocalAthority}` }
					]
				]
			},

			{
				columns: [
					employee,
					[
						{ text: '\n\n\n' },
						...employment.map(work => [
							{ text: `\n${work.establishment}` },
							{
								text: `\n\n${work.address.street},${work.address.city},${work.address.district}`
							},
							{ text: `\n${work.designation}` },
							{ text: `\n${work.salaryScale}` },
							{ text: `\n${work.salary}` },
							{ text: `\n${work.dateOfEmployment}` }
						])
					]
				]
			},
			{
				columns: [
					marriage,
					[
						{ text: `\n\n\n\n\n` },
						...spouse.map(spouse => [
							{ text: `\n${spouse.dateOfMarriage}` },
							{ text: `\n${spouse.name}` },
							{ text: `\n\n${spouse.employment.establishment}` },
							{ text: `\n${spouse.employment.designation}` },
							{ text: `\n\n${spouse.employment.salary}` }
						])
					]
				]
			},
			{
				text: '\n\n Details of Parents/Guardians (Applicant forwarding guardians should fill cage 9 in addition)',
				bold: 'true'
			},
			{ text: '\n\n07. Details of Father ', bold: 'true' },
			{
				columns: [
					Father,
					[
						...father.map(attr => [
							{ text: `\n${attr.name}` },
							{ text: `\n\n\n${attr.living}` },
							{ text: `\n${attr.age}` },
							{ text: `\n\n\n${attr.employment.occupation}` },
							{ text: `\n\n${attr.employment.address}` },
							{
								text: `\n\n\n${attr.annualIncome.occupationOrPension}`
							},
							{
								text: `\n\n${attr.annualIncome.houseAndProperty}`
							},
							{ text: `\n${attr.annualIncome.otherSources}` },
							{ text: `\n${attr.fatherTotalAnnualIncome}` }
						])
					]
				]
			},

			{ text: '\n\n\n08. Details of Mother ', bold: 'true' },
			{
				columns: [
					Mother,
					[
						...mother.map(attr => [
							{ text: `\n${attr.name}` },
							{ text: `\n\n\n${attr.living}` },
							{ text: `\n${attr.age}` },
							{ text: `\n\n\n${attr.employment.occupation}` },
							{ text: `\n\n${attr.employment.address}` },
							{
								text: `\n\n\n${attr.annualIncome.occupationOrPension}`
							},
							{
								text: `\n\n${attr.annualIncome.houseAndProperty}`
							},
							{ text: `\n${attr.annualIncome.otherSources}` },
							{ text: `\n${attr.motherTotalAnnualIncome}` }
						])
					]
				]
			},

			{
				text: '\nTotal annual income of Father and Mother in words : ',
				bold: 'true'
			},
			{ text: '\n\n\n09. Details of Guardian ', bold: 'true' },
			{
				text: '\nThis cage should filled by orphans or clergy or any other applicant who is under the custody of legal guardian. '
			},
			{
				columns: [
					guard,
					[
						...guardian.map(attr => [
							{ text: `\n${attr.name}` },
							{ text: `\n${attr.address}` },
							{ text: `\n${attr.post}` },
							{ text: `\n\n\n\n${attr.annualIncome.salary}` },
							{
								text: `\n\n${attr.annualIncome.houseAndPropertyOrTemple}`
							},
							{ text: `\n${attr.age}` }
						])
					]
				]
			},
			footer
		],
		styles: {
			header: {
				fontSize: 25,
				bold: true
			},
			bigger: {
				fontSize: 15,
				italics: true
			},
			tableExample: {
				margin: [15, 15, 10, 10]
			},
			tableHeader: {
				bold: true,
				fontSize: 13,
				color: 'black'
			}
		},
		defaultStyle: {
			columnGap: 20
		}
	}
}

export const getDocumentDefinition = (type, data) => {
	switch (type) {
		case 'application':
			return applicationDocDefinition(data)
		default:
			return applicationDocDefinition(data)
	}
}
