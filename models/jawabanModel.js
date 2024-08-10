const mongoose = require("mongoose");

const jawabanModel = mongoose.Schema({
  userName: {
    type: String,
  },
  namaPelatihan: {
    type: String,
  },
  jawabanUser: {
    type: String,
  },
  status: {
    type: String,
  },
  file: {
    type: String,
  },
});

module.exports = mongoose.model("jawaban", jawabanModel);
