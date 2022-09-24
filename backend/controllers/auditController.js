import Audit from "../models/Audit.js";

export const auditReport = async (req, res) => {
  const { restroName, restroManger, restroEmail, auditList, restaurant } =
    req.body;

    console.log(req.body);

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

    const auidtReport = await Audit.create(req.body);
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
