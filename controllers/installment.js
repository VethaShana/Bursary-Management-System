import Installment from "../models/installment.js";
import Student from "../models/student.js";
import pdfMake from "pdfmake/build/pdfmake.js";
import PDF_Fonts from "pdfmake/build/vfs_fonts.js";
import { uoj } from "../utils/Uojlogo.js";

pdfMake.vfs = PDF_Fonts.pdfMake.vfs;

export const getInstallments = async (req, res) => {
  try {
    const installment = await Installment.find();
    res.status(200).json(installment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createInstallments = async (req, res) => {
  const { stream: course } = req.body;
  const newInstallment = new Installment(req.body);
  try {
    await newInstallment.save().then((doc) => {
      // const students = Student.find({ course });
      // console.log(doc);
      const students = Student.updateMany(
        { course },
        { $set: { installments: doc._id } },
        { multi: true }
      );
      // console.log(students);
    });
    // res.status(200).json(newInstallment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
