import Student from '../models/student.js'
import pdfMake from 'pdfmake/build/pdfmake.js'
import PDF_Fonts from 'pdfmake/build/vfs_fonts.js'


pdfMake.vfs = PDF_Fonts.pdfMake.vfs;

export const getStudents = async (req, res) => {
	console.log(req.user)
	try {
		const student = await Student.find()
		res.status(200).json(student)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

export const createStudent = async (req, res) => {
	const student = req.body
	const newStudent = new Student(student)
	try {
		await newStudent.save()
		res.status(201).json(newStudent)
	} catch (error) {
		res.status(409).json({ message: error.message })
	}
}

export const deleteStudent = async (req, res) => {
	try {
		const student = await Student.findByIdAndRemove(req.params.id)
		res.status(200).json({ message: 'Deleted Successfully' })
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

export const updateStudent = async (req, res) => {
	try {
		const student = await Student.findByIdAndUpdate(
			req.params.id,
			{
				$set: {
					...req.body,
				},
			},
			{ new: true }
		)
		res.status(200).json(student)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}
//Queries
// var db

// const query_married= db.student.find([ fullName, nic, {married : {annual_income}}, {propeincomefromEstate_Fields_Lands : {annual_income}}, { incomefromHouses :{annual_income}} ])

// const query_guardian= db.student.find([ fullName, nic,  {parentsDetails : {guardian : {guardianAnnualIncome}}}, {propeincomefromEstate_Fields_Lands : {annual_income}}, { incomefromHouses :{annual_income}} ])

// const query_parents= db.student.find([ fullName, nic,  {parentsDetails : {father : {fatherTotalAnnualIncome}, mother : {motherTotalAnnualIncome}}}, {propeincomefromEstate_Fields_Lands : {annual_income}}, { incomefromHouses :{annual_income}} ])

// const noOfSibb= db.student.find(nic, {$count:{siblingsUniversity:[regNo]}})

// const noOfSib =db.student.find(nic, {$count:{siblingsUnder19:[namesb]}})

// db.student.aggregate([
// 	 {salaryA: { $sum: {parentsDetails:{father : {fatherTotalAnnualIncome}, mother : {motherTotalAnnualIncome}}}, propeincomefromEstate_Fields_Lands : {annual_income}, incomefromHouses :{annual_income}}}
// 	])

// db.student.aggregate([
// 	{salaryB: { $sum: {parentsDetails : {guardian : {guardianAnnualIncome}}}, propeincomefromEstate_Fields_Lands : {annual_income}, incomefromHouses :{annual_income}}}
//    ])

// db.student.aggregate([
// 	{salaryC: { $sum: {married : {$multiply:[{spouseMonthlySalary},12]}}}, propeincomefromEstate_Fields_Lands : {annual_income}, incomefromHouses :{annual_income}}
//    ])

// //functions
// 	var totSalary = 500000;

// 	function salarySort(){
// 		if(db.student.find({married:{$exists:true}})){
// 			salary = salaryC;

// 		}else if(db.student.find({guardian :{$exists:true}})){
// 			salary = salaryB;
// 		}
// 		else{
// 			salary = salaryA;
// 		}
// 		eligibility();
// 	}

// 	function eligibility() {

// 	if (salary <= totSalary) {
// 		console.log(Eligible);
// 	  } else{
// 		console.log(NotEligible);
// 	  }

// }
// 	function eligibilitySib(){
// 	if(noOfSib > 0){

// 		for (var i = 0; i < 3; i++) {
// 			totSalary = totSalary + 18000;
// 		}
// 	  }

// 	  if(noOfSibb > 0){

// 		for (var i = 0; i < 3; i++) {
// 			totSalary = totSalary + 36000;
// 		}
// 	  }
// 	  eligibility();
// }

//router.post('/pdf', (req, res, next)=>{
    //res.send('PDF');
export const PDF = async(req,res)=>{
	var student= await Student.findById(req.params.id);
    const Name = student.fullName;
    //const lname = req.body.lname;

    var docDefinition = {
        content: [
            `Hello ${Name} ` ,
            'Nice to meet you!'
        ]        
    };
	//pdfMake.createPdf(docDefinition).download();
    const pdfDoc = pdfMake.createPdf(docDefinition);
    pdfDoc.getBase64((data)=>{
        res.writeHead(200, 
        {
            'Content-Type': 'application/pdf',
            'Content-Disposition':'attachment;filename="filename.pdf"'
        });

        const download = Buffer.from(data.toString('utf-8'), 'base64');
        res.end(download);
    });
	console.log("sucessfully Done!");
}
