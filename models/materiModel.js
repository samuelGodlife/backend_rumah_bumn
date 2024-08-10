const mongoose = require("mongoose");

const materiModel = mongoose.Schema({
  namaPelatihan: {
    type: String,
  },
  judulMateri: {
    type: String,
  },
  isiMateri: {
    type: String,
  },
  linkYoutube: {
    type: String,
  },
});

module.exports = mongoose.model("materi", materiModel);
