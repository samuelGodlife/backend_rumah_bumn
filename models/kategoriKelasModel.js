const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const barangScheme = new mongoose.Schema({
  namaPelatihan: {
    type: String,
  },
  deskripsi: {
    type: String,
  },
  gambar: {
    type: String,
  },
});

module.exports = mongoose.model("kategoriKelas", barangScheme);
