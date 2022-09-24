import RestroRegistration from "../models/RestroReg.js";


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

