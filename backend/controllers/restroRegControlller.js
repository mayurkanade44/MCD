import RestroRegistration from "../models/RestroReg.js";
import exceljs from "exceljs";

export const restroReg = async (req, res) => {
  const { restroName, restroManger, restroEmail, auditList } = req.body;

  try {
    if (!restroName || !restroManger || !restroEmail) {
      return res.status(400).json({ msg: "Please provide all values" });
    }

    const newRestro = await RestroRegistration.create(req.body);

    res
      .status(201)
      .json({ msg: `${newRestro.restroName} is successfully added` });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

export const getRestroDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const restro = await RestroRegistration.findOne({ _id: id });
    if (!restro) {
      return res.status(404).json({ msg: "No details found" });
    }
    res.status(200).json({ restro });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

const data = [
  {
    name: "Air Curtain",
    condition1: "working",
  },
  {
    name: "Insect Trapper - 1",
    condition1: "working",
    condition2: "Trap Sheet Needs To Replace - No",
    condition3: "Found Full",
    location: "",
  },
  {
    name: "Insect Trapper - 2",
    condition1: "not working",
    condition2: "Trap Sheet Needs To Replace - Yes",
    condition3: "No Gum",
    location: "Door",
  },
  {
    name: "Insect Trapper - 3",
    condition1: "working",
    condition2: "Trap Sheet Needs To Replace - No",
    condition3: "None",
  },
  {
    name: "Food Leftover",
    condition1: "Yes",
    location: "Kitchen",
  },
  {
    name: "Oil Residue",
    condition2: "No",
  },
  {
    name: "Rodein Bait Station - 1",
    condition1: "Not Ok",
    condition2: "Need Replacement",
  },
  {
    name: "Rodein Bait Station - 2",
    condition1: "Missing",
    condition2: "Need New",
  },
  {
    name: "Rodent Gap",
    location: "Kitchen top side wall side open.",
    picture: "pic 1",
  },
  {
    name: "Rodent Gap",
    location: "Dining table out wall side in flooring cable line open.",
  },
];

const excel1 = async (req, res) => {
  try {
    const workbook = new exceljs.Workbook();
    const sheet = workbook.addWorksheet("My Sheet");

    await workbook.xlsx.readFile("book1.xlsx");
    let worksheet = workbook.getWorksheet("Sheet1");
    data.map((item, index) => {
      let row = worksheet.getRow(index + 4);
      row.getCell(1).value = item.name;
      row.getCell(2).value = item.condition1;
      row.getCell(3).value = item.condition2;
      row.getCell(4).value = item.condition3;
      row.getCell(5).value = item.location;
      row.getCell(6).value = item.picture;
      row.alignment = { vertical: "middle", horizontal: "left" };
      row.commit();
    });

    workbook.xlsx.writeFile("5050813123.xlsx");

    sheet.columns = [
      { header: "Sr No", key: "no", width: 20 },
      { header: "Condition 1", key: "condition1", width: 20 },
      { header: "Condition 2", key: "condition2", width: 20 },
      { header: "Condition 3", key: "condition3", width: 20 },
      { header: "Location", key: "location", width: 20 },
      { header: "Picture", key: "pic", width: 20 },
    ];

    await data.map((item) => {
      sheet.addRow({
        no: item.name,
        condition1: item.condition1,
        condition2: item.condition2,
        condition3: item.condition3,
        location: item.location,
      });

      sheet.getRow(1).style.alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      // res.setHeader(
      //   "Content-Type",
      //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      // );
      // res.setHeader(
      //   "Content-Disposition",
      //   "attachment;filename=" + "exportData.xlsx"
      // );
    });

    // workbook.xlsx.writeFile("test.xlsx");
  } catch (error) {
    console.log(error);
  }
};
