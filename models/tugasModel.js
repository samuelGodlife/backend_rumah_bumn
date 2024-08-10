const mongoose = require("mongoose");

const materiModel = mongoose.Schema({
  namaPelatihan: {
    type: String,
  },
  soal: {
    type: String,
  },
});

module.exports = mongoose.model("tugas", materiModel);
