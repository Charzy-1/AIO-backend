import mongoose from "mongoose";

const FormEntrySchema = new mongoose.Schema({
  name: String,
  epcName: String,
  number: String,
  officeAddress: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("FormEntry", FormEntrySchema);
