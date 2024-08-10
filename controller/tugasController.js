const materiModel = require("../models/tugasModel");
const objectId = require("mongoose").Types.ObjectId;

exports.inputKategori = (data) =>
  new Promise(async (resolve, reject) => {
    materiModel
      .create(data)
      .then(() => {
        resolve({
          status: true,
          msg: "Berhasil menambahkan kategori",
        });
      })
      .catch((err) => {
        reject({
          status: false,
          msg: "Terjadi Kesalahan Pada Server",
        });
      });
  });
// })

exports.updateKategoriById = (id, data) =>
  new Promise((resolve, reject) => {
    materiModel.findOne({ _id: objectId(id) }).then((kategori) => {
      if (kategori) {
        materiModel
          .updateOne({ _id: objectId(id) }, data)
          .then(() => {
            resolve({
              status: true,
              msg: "Berhasil Update kategori",
            });
          })
          .catch((err) => {
            reject({
              status: false,
              msg: "Terjadi kesalahan asa",
            });
          });
      } else {
        reject({
          status: false,
          msg: "Kategori tidak ditemukan",
        });
      }
    });
  });

exports.getAllKategori = () =>
  new Promise((resolve, reject) => {
    materiModel
      .find()
      .then((kategori) => {
        if (kategori.length > 0) {
          resolve({
            status: true,
            msg: "berhasil memuat data kategori",
            data: kategori.reverse(),
          });
        } else {
          reject({
            status: false,
            msg: "Tidak ada data",
          });
        }
      })
      .catch((err) => {
        reject({
          status: false,
          msg: "Terjadi Kesalahan Pada user",
        });
      });
  });

exports.getKategoriById = (idKategori) =>
  new Promise((resolve, reject) => {
    materiModel
      .findOne({ _id: objectId(idKategori) })
      .then((kategori) => {
        if (kategori) {
          resolve({
            status: true,
            msg: "berhasil memuat data kategori",
            data: kategori,
          });
        } else {
          reject({
            status: false,
            msg: "Tidak ada data",
          });
        }
      })
      .catch((err) => {
        reject({
          status: false,
          msg: "Terjadi Kesalahan Pada user",
        });
      });
  });

exports.getNamaPelatihan = (idKategori) =>
  new Promise((resolve, reject) => {
    materiModel
      .find({ namaPelatihan: idKategori })
      .then((kategori) => {
        if (kategori) {
          resolve({
            status: true,
            msg: "berhasil memuat data kategori",
            data: kategori,
          });
        } else {
          reject({
            status: false,
            msg: "Tidak ada data",
          });
        }
      })
      .catch((err) => {
        reject({
          status: false,
          msg: "Terjadi Kesalahan Pada user",
        });
      });
  });

exports.deleteKategori = (idKategori) =>
  new Promise((resolve, reject) => {
    materiModel
      .deleteOne({ _id: objectId(idKategori) })
      .then(() => {
        resolve({
          status: true,
          msg: "Berhasil Menghapus Data",
        });
      })
      .catch((err) => {
        reject({
          status: false,
          msg: "Tidak Bisa",
        });
      });
  });
