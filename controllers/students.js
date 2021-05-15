import Student from "../models/student.js";
import pdfMake from "pdfmake/build/pdfmake.js";
import PDF_Fonts from "pdfmake/build/vfs_fonts.js";
import { json, response } from "express";
import bodyParser from "body-parser";
import { getDocumentDefinition } from "../services/pdf.js";
import { uoj } from "../utils/Uojlogo.js";
import getAmounts from "../utils/getAmounts.js";
import sendMail from "../services/sendMail.js";
//import JSON  from 'nodemon/lib/utils'

pdfMake.vfs = PDF_Fonts.pdfMake.vfs;

export const getStudents = async (req, res) => {
  try {
    const student = await Student.find();
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createStudent = async (req, res, next) => {
  const [netAmount, capAmount] = getAmounts(req.body);
  const isValidCandidate = netAmount <= capAmount;

  try {
    const newStudent = new Student({
      ...req.body,
      netAmount,
      capAmount,
      isValidCandidate,
    });
    await newStudent.save();
    const pdfDoc = pdfMake.createPdf(
      getDocumentDefinition("application", req.body)
    );

    //Try to save
    var data;
    pdfDoc.getBase64(function (encodedString) {
      data = encodedString;
    });

    pdfDoc.getBase64((data) => {
      res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment;filename="filename.pdf"',
      });
      //stu_Doc = data.toString("utf-8");

      const download = Buffer.from(data.toString("utf-8"), "base64");
      const { email, fullName } = req.body;
      sendMail({
        to: email,
        subject: "Bursary Application",
        text: "some text",
        attachments: {
          filename: `Bursary Applicatoin - ${fullName}.pdf`,
          content: download,
        },
      });
      res.end(download);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  const [netAmount, capAmount] = getAmounts(req.body);
  const isValidCandidate = netAmount <= capAmount;

  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...req.body,
          netAmount,
          capAmount,
          isValidCandidate,
        },
      },
      { new: true }
    );
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const PDFStudent = async (req, res) => {
  //var student= await Student.findById(req.params.id);
  //const Name = student.fullName;
  //const lname = req.body.lname;
  const student = await Student.find();
  var headers = {
    fila_1: {
      col_1: { text: "ID", style: "tableHeader", alignment: "center" },
      col_2: { text: "RegNo", style: "tableHeader", alignment: "center" },
      col_3: { text: "Name", style: "tableHeader", alignment: "center" },
      col_4: { text: "Course", style: "tableHeader", alignment: "center" },
      col_5: { text: "Mode", style: "tableHeader", alignment: "center" },
      col_6: { text: "BYr", style: "tableHeader", alignment: "center" },
      col_7: { text: "Beg-Aca-Yr", style: "tableHeader", alignment: "center" },
      col_8: { text: "DateOfAppo", style: "tableHeader", alignment: "center" },
      col_9: { text: "Status", style: "tableHeader", alignment: "center" },
    },
  };
  var rows = {
    a: {
      ID: "1",
      RegNo: "2017/CSC/XXX",
      Name: "Kamal Kamalakkannan",
      Course: "ComputerScience",
      Mode: "2",
      BYr: "2017",
      BegAcaYr: "2017/2018",
      DateOfAppo: "12/02/2018",
      Status: "A",
    },

    b: {
      ID: "2",
      RegNo: "2016/CSC/YYY",
      Name: "Rani Ramesh",
      Course: "ComputerScience",
      Mode: "3",
      BYr: "2016",
      BegAcaYr: "2016/2017",
      DateOfAppo: "2016/05/04",
      Status: "A",
    },
  };

  var body = [];
  for (var key in headers) {
    if (headers.hasOwnProperty(key)) {
      var header = headers[key];
      var row = new Array();
      row.push(header.col_1);
      row.push(header.col_2);
      row.push(header.col_3);
      row.push(header.col_4);
      row.push(header.col_5);
      row.push(header.col_6);
      row.push(header.col_7);
      row.push(header.col_8);
      row.push(header.col_9);
      body.push(row);
    }
  }
  for (var key in rows) {
    if (rows.hasOwnProperty(key)) {
      var data = rows[key];
      var row = new Array();
      row.push(data.ID.toString());
      row.push(data.RegNo.toString());
      row.push(data.Name.toString());
      row.push(data.Course.toString());
      row.push(data.Mode.toString());
      row.push(data.BYr.toString());
      row.push(data.BegAcaYr.toString());
      row.push(data.DateOfAppo.toString());
      row.push(data.Status.toString());
      body.push(row);
    }
  }

  var documentDefinition = {
    //pageMargins: [40,40,40,40],
    pageOrientation: "landscape",
    header: function () {
      return {
        margin: 40,
        columns: [{}],
      };
    },
    footer: function (currentPage, pageCount) {
      return {
        text: "Page " + currentPage.toString() + " of " + pageCount,
        alignment: "center",
        margin: [0, 30, 0, 0],
      };
    },
    content: [
      //{ text: 'Tables', style: 'header' },
      {
        alignment: "center",
        fit: [300, 300],
        image: uoj,
      },

      {
        text: "\nBursary Students List - University of Jaffna ",
        style: "header",
      },
      { bold: true, text: "Date :\n\n" },
      //{ text: 'A simple table (no headers, no width specified, no spans, no styling)', style: 'sta' },
      //'The following table has nothing more than a body array',
      {
        style: "tableExample",
        table: {
          //widths: [ '*', '*', '*', '*', '*','*','*','*','*'],
          //headerRows: 2,
          // keepWithHeaderRows: 1,
          body: body,
        },
      },
    ],
    styles: {
      header: {
        fontSize: 28,
        bold: true,
      },
      subheader: {
        fontSize: 15,
        bold: true,
      },
      quote: {
        italics: true,
      },
      small: {
        fontSize: 8,
      },
      sta: {
        fontSize: 11,
        bold: false,
        alignment: "justify",
      },
    },
  };
  // pdfMake.createPdf(docDefinition).download();
  // const pdfDoc = pdfMake.createPdf(docDefinition);
  // pdfDoc.getBase64((data) => {
  //   res.writeHead(200, {
  //     "Content-Type": "application/pdf",
  //     "Content-Disposition": 'attachment;filename="filename.pdf"',
  //   });

  //   const download = Buffer.from(data.toString("utf-8"), "base64");
  //   res.end(download);
  // });

  const pdfDoc = pdfMake.createPdf(documentDefinition);
  pdfDoc.getBase64((data) => {
    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment;filename="filename.pdf"',
    });

    const download = Buffer.from(data.toString("utf-8"), "base64");
    res.end(download);
  });

  console.log("sucessfully Done!");
};
