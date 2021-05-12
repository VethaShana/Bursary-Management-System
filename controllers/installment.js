import Installment from "../models/installment.js";
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
  const newInstallment = new Installment(req.body);
  try {
    await newInstallment.save();
    res.status(200).json(newInstallment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
