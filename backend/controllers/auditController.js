import Audit from "../models/Audit.js";
import exceljs from "exceljs";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const auditReport = async (req, res) => {
  const { restroName, restroManger, restroEmail, auditList, restaurant } =
    req.body;

  try {
    if (
      !restroName ||
      !restroManger ||
      !restroEmail ||
      !auditList ||
      !restaurant
    ) {
      return res.status(400).json({ msg: "Please provide all values" });
    }

    const auditReport = await Audit.create(req.body);
    const error1 = await auditFile(auditReport);
    if (error1) {
      return res.status(400).json({
        msg: "There is some error while generating a file. Try again later",
      });
    }
    res
      .status(201)
      .json({ msg: `${restroName} audit report has been created` });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

const auditFile = async (auditReport) => {
  const data = auditReport.auditList;
  const filename = auditReport.restroName;
  const row2 = `Store Code : ${auditReport.restroName}            Store Manager : ${auditReport.restroManger}`;

  try {
    const workbook = new exceljs.Workbook();

    await workbook.xlsx.readFile("book1.xlsx");
    let worksheet = workbook.getWorksheet("Sheet1");

    let row = worksheet.getRow(2);
    row.getCell(1).value = row2;

    const data1 = [];
    data.map((item) => {
      data1.push({
        device: item.device,
        condition1Option: item.condition1Option,
        condition2Option: item.condition2Option,
        condition3Option: item.condition3Option,
        location: item.location,
        imageId: workbook.addImage({
          filename: item.image,
          extension: "jpg",
        }),
        image: item.image,
      });
    });

    data1.map((item, index) => {
      let row = worksheet.getRow(index + 4);
      row.getCell(1).value = item.device;
      row.getCell(2).value = item.condition1Option;
      row.getCell(3).value = item.condition2Option;
      row.getCell(4).value = item.condition3Option;
      row.getCell(5).value = item.location;
      row.getCell(6).value = worksheet.addImage(item.imageId, {
        tl: { col: 5, row: 3 + index },
        ext: { width: 80, height: 40 },
      });
      row.alignment = { vertical: "middle", horizontal: "left" };
      row.commit();
    });

    workbook.xlsx.writeFile(`${filename}.xlsx`);

    // sheet.columns = [
    //   { header: "Sr No", key: "no", width: 20 },
    //   { header: "Condition 1", key: "condition1", width: 20 },
    //   { header: "Condition 2", key: "condition2", width: 20 },
    //   { header: "Condition 3", key: "condition3", width: 20 },
    //   { header: "Location", key: "location", width: 20 },
    //   { header: "Picture", key: "pic", width: 20 },
    // ];

    // await data.map((item) => {
    //   sheet.addRow({
    //     no: item.device,
    //     condition1: item.condition1,
    //     condition2: item.condition2,
    //     condition3: item.condition3,
    //     location: item.location,
    //   });

    //   sheet.getRow(1).style.alignment = {
    //     vertical: "middle",
    //     horizontal: "center",
    //   };

    //   res.setHeader(
    //     "Content-Type",
    //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    //   );
    //   res.setHeader(
    //     "Content-Disposition",
    //     "attachment;filename=" + "exportData.xlsx"
    //   );
    // });

    // workbook.xlsx.writeFile("test.xlsx");
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const imageUploader = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).json({ msg: "No image file found" });
    }

    // const result = await cloudinary.uploader.upload(
    //   req.files.image.tempFilePath,
    //   {
    //     use_filename: true,
    //     folder: "mcd",
    //   }
    // );

    // fs.unlinkSync(req.files.image.tempFilePath);
    res.status(200).json({ image: req.files.image.tempFilePath });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, please try again later" });
  }
};
