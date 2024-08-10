const mongoose = require("mongoose");

const userModel = mongoose.Schema({
  namaLengkap: {
    type: String,
  },
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  alamat: {
    type: String,
  },
  noHp: {
    type: String,
  },
  role: {
    type: String,
  },
});

module.exports = mongoose.model("users", userModel);
