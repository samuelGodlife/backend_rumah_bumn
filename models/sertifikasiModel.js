const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const barangScheme = new mongoose.Schema({
  userName: {
    type: String,
  },
  Sertifikat: {
    type: String,
  },
  Nama: {
    type: String,
  },
  Email: {
    type: String,
  },
  No_Handphone: {
    type: String,
  },
  No_NPWP: {
    type: String,
  },
  foto_ktp: {
    type: String,
  },
  foto_produk: {
    type: String,
  },
  status: {
    type: String,
  },
  tgl: {
    type: String,
  },
  file: {
    type: String,
  },
});

module.exports = mongoose.model("sertifikasi", barangScheme);
