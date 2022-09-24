import mongoose from "mongoose";

const AuditSchema = new mongoose.Schema({
  restroName: { type: String, required: true },
  restroManger: { type: String, required: true },
  restroEmail: { type: String, required: true },
  auditList: [Object],
  restaurant: {
    type: mongoose.Types.ObjectId,
    ref: "RestroRegistration",
    required: true,
  },
});

export default mongoose.model("Audit", AuditSchema);
