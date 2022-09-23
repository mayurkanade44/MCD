import mongoose from "mongoose";

const RestroRegSchema = new mongoose.Schema({
  restroName: { type: String, required: true },
  restroManger: { type: String, required: true },
  restroEmail: { type: String, required: true },
  auditList: [Object],
});

export default mongoose.model("RestroRegistration", RestroRegSchema);
