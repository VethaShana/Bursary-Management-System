import moment from "moment";
import header from "./layout/header.js";
import stuD from "./layout/stuD.js";
import office from "./layout/OfficeUse.js";
import instruction from "./layout/Instruction.js";
import Father from "./layout/Father.js";
import Mother from "./layout/Mother.js";
import employee from "./layout/Empolyee.js";
import marriage from "./layout/marriage.js";
import footer from "./layout/Footer.js";
import guard from "./layout/guard.js";

const applicationDocDefinition = (data) => {
  const {
    fullName,
    siblingsUnder19,
    married,
    siblingsUniversity,
    incomeFromEstateFieldsLands,
    incomeFromHouses,
    employed,
    father,
    mother,
    guardian,
  } = data;

  const rows = siblingsUnder19.map((sibling) => [
    `${sibling.namesb}`,
    `${moment(sibling.dob).format("L")}`,
    `${moment().diff(sibling.dob, "years")}`,
    `${sibling.school}`,
  ]);

  const rows1 = siblingsUniversity.map((sib) => [
    `${sib.name}`,
    `${sib.regNo}`,
    `${sib.university}`,
    `${sib.siblingCourse}`,
    `${sib.academicYear}`,
    `${sib.isBursaryRecipient}`,
  ]);

  const rows2 = incomeFromEstateFieldsLands.map((income) => [
    `${income.nameOfOwner}`,
    `${income.relationship}`,
    `${income.location}`,
    `${income.natureOfCultivation}`,
    `${income.extentOfLandAndDetails}`,
    `${income.annualIncome}`,
  ]);

  const rows3 = incomeFromHouses.map((income) => [
    `${income.nameOfOwner}`,
    `${income.relationship}`,
    `${income.assessmentNo}`,
    `${income.noOfHouseholders}`,
    `${income.address}`,
    `${income.annualIncome}`,
  ]);

  console.log(rows);

  return {
    pageMargins: [60, 60, 60, 60],

    content: [
      ...header,
      {
        alignment: "justify",

        table: {
          widths: [110, 100],
          body: [
            [
              { text: "Registration No:", fontSize: 15 },
              { text: `${data.regNo}` },
            ],
          ],
        },
      },
      {
        columns: [
          ...stuD,
          [
            { text: "\n\n\n" },
            { text: `\n${fullName}` },
            { text: `\n${data.address}` },
            { text: "\n" },
            { text: `\n${data.gsArea}&${data.gsNo}` },
            { text: `\n${data.dsDivision}` },
            { text: `\n${data.district}` },
            { text: `\n${data.mobile}` },
            { text: `\n\n${data.admin_districtAL}` },
            { text: `\n${data.indexNum}` },
            { text: `\n${data.zScore}` },
            { text: `\n\n${data.course}` },
            { text: `\n${data.nic}` },
          ],
        ],
      },
      ...office,
      ...instruction,

      { text: "2.Family Details:", bold: "true" },
      {
        text:
          " \nA.  state details of school going bothers, sisters / Rev.brothers/children, if married who are 19 years or under, you should prepared to produce birth certificate if necessary.\n",
      },
      {
        style: "tableExample",
        table: {
          headerRows: 1,
          heights: 40,
          body: [
            [
              { text: "Name", style: "tableHeader" },
              { text: "Date of Birth", style: "tableHeader" },
              { text: "Age", style: "tableHeader" },
              {
                text: "Name of school/Institute attenden ",
                style: "tableHeader",
              },
            ],
            ...rows,
          ],
        },
      },

      {
        text: `\nB. Distance from the student\'s permanent residence to the University of Jaffna(k.m) : ${data.Distance} km`,
      },
      {
        text:
          "\nC. If you have any brother or sisters following courses of study in a University, or any Campus, Institute of Athletic studies or Institute of Indigenous Medicine , give details:\n",
      },
      {
        style: "tableExample",
        table: {
          headerRows: 1,
          heights: 40,
          body: [
            [
              { text: "Name", style: "tableHeader" },
              {
                text: "Registration No of the Higher Education",
                style: "tableHeader",
              },
              {
                text:
                  "Name of the Institution where the course of study is being followed ",
                style: "tableHeader",
              },
              { text: "Course ", style: "tableHeader" },
              { text: "Acadamic Year", style: "tableHeader" },
              { text: "getBursary", style: "tableHeader" },
            ],
            ...rows1,
          ],
        },
      },

      { text: "\n3. Income from Estates,Fields,Lands etc.:", bold: "true" },
      {
        style: "tableExample",
        table: {
          headerRows: 1,
          heights: 40,
          body: [
            [
              { text: "Name of Owner", style: "tableHeader" },
              { text: "Relationship", style: "tableHeader" },
              { text: "Location", style: "tableHeader" },
              { text: "Nature of Cultivation ", style: "tableHeader" },
              {
                text: "Extent of Land & Details of Property",
                style: "tableHeader",
              },
              { text: "Annual income in Rupees ", style: "tableHeader" },
            ],
            ...rows2,
          ],
        },
      },

      { text: "\n4. Income from the Houses:", bold: "true" },
      {
        style: "tableExample",
        table: {
          headerRows: 1,
          heights: 40,
          body: [
            [
              { text: "Name of Owner", style: "tableHeader" },
              { text: "Relationship", style: "tableHeader" },
              { text: "Assessment No", style: "tableHeader" },
              { text: "No. of house holders List", style: "tableHeader" },
              { text: "Address", style: "tableHeader" },
              { text: "Annual income", style: "tableHeader" },
              {
                text:
                  "If given on rent/lease names and addresses of tenant/lease",
                style: "tableHeader",
              },
            ],
            ...rows3,
          ],
        },
      },

      {
        columns: [
          [
            { text: "\n 1. Grama sevaka division number of above  house :" },
            { text: "\n 2.D.S Division :" },
            { text: "\n 3.Name of the Local Authority :" },
          ],
          [
            { text: `\n\n${data.GSDNo}` },
            { text: `\n${data.DSDivision}` },
            { text: `\n${data.LocalAthority}` },
          ],
        ],
      },

      {
        columns: [
          employee,
          [
            { text: "\n\n\n" },
            ...employed.map((work) => [
              { text: `\n${work.establishmentName}` },
              { text: `\n\n${work.establishmentAddress}` },
              { text: `\n${work.post}` },
              { text: `\n${work.salaryScale}` },
              { text: `\n${work.salary}` },
              { text: `\n${work.dateOfAppointment}` },
            ]),
          ],
        ],
      },
      {
        columns: [
          marriage,
          [
            { text: `\n\n\n\n\n` },
            ...married.map((spouse) => [
              { text: `\n${spouse.dateOfMarriage}` },
              { text: `\n${spouse.spouseName}` },
              { text: `\n\n${spouse.spouseEstablishmentName}` },
              { text: `\n${spouse.spousePost}` },
              { text: `\n\n${spouse.spouseMonthlySalary}` },
            ]),
          ],
        ],
      },
      {
        text:
          "\n\n Details of Parents/Guardians (Applicant forwarding guardians should fill cage 9 in addition)",
        bold: "true",
      },
      { text: "\n\n07. Details of Father ", bold: "true" },
      {
        columns: [
          Father,
          [
            ...father.map((attr) => [
              { text: `\n${attr.fatherFullName}` },
              { text: `\n\n\n${attr.aliveOrNot}` },
              { text: `\n${attr.ageYearMonth}` },
              { text: `\n\n\n${attr.fatherOccupation}` },
              { text: `\n\n${attr.fatherWorkPlace}` },
              { text: `\n\n\n${attr.fatherAnnualIncome}` },
              { text: `\n\n${attr.fatherAnnualPropertyIncome}` },
              { text: `\n${attr.fatherAnnualOtherIncome}` },
              { text: `\n${attr.fatherTotalAnnualIncome}` },
            ]),
          ],
        ],
      },

      { text: "\n\n\n08. Details of Mother ", bold: "true" },
      {
        columns: [
          Mother,
          [
            ...mother.map((attr) => [
              { text: `\n${attr.motherFullName}` },
              { text: `\n\n\n${attr.aliveOrNot}` },
              { text: `\n${attr.ageYearMonth}` },
              { text: `\n\n\n${attr.motherOccupation}` },
              { text: `\n\n${attr.motherWorkPlace}` },
              { text: `\n\n\n${attr.motherAnnualIncome}` },
              { text: `\n\n${attr.motherAnnualPropertyIncome}` },
              { text: `\n${attr.motherAnnualOtherIncome}` },
              { text: `\n${attr.motherTotalAnnualIncome}` },
            ]),
          ],
        ],
      },

      {
        text: "\nTotal annual income of Father and Mother in words : ",
        bold: "true",
      },
      { text: "\n\n\n09. Details of Guardian ", bold: "true" },
      {
        text:
          "\nThis cage should filled by orphans or clergy or any other applicant who is under the custody of legal guardian. ",
      },
      {
        columns: [
          guard,
          [
            ...guardian.map((attr) => [
              { text: `\n${attr.guardianFullName}` },
              { text: `\n${attr.permanentAddress}` },
              { text: `\n${attr.guardianOccupation}` },
              { text: `\n\n\n\n${attr.guardianAnnualIncome}` },
              { text: `\n\n${attr.guardianAnnualPropertyIncome}` },
              { text: `\n${attr.guardianAge}` },
            ]),
          ],
        ],
      },
      footer,
    ],
    styles: {
      header: {
        fontSize: 25,
        bold: true,
      },
      bigger: {
        fontSize: 15,
        italics: true,
      },
      tableExample: {
        margin: [15, 15, 10, 10],
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: "black",
      },
    },
    defaultStyle: {
      columnGap: 20,
    },
  };
};

export const getDocumentDefinition = (type, data) => {
  switch (type) {
    case "application":
      return applicationDocDefinition(data);
    default:
      return applicationDocDefinition(data);
  }
};
