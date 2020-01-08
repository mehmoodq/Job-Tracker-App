const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const applicationSchema = new Schema(
  {
    username: { type: String, required: true },
    company: { type: String, required: true },
    position: { type: String, required: true },
    applicationDate: { type: Date, required: true },
    salary: { type: Number, required: false },
    status: { type: String, required: false },
    jobLink: { type: String, required: false }
  },
  {
    timestamps: true
  }
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
