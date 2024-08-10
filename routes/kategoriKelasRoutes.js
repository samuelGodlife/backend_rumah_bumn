const router = require("express").Router();
const barangController = require("../controller/kategorikelasController");

const utilApps = require("../utils/utils_apps");
const multer = require("multer");
const barangModels = require("../models/kategoriKelasModel");
const { isObjectIdOrHexString } = require("mongoose");
const uploadFile = multer({
  storage: utilApps.uploadFile,
}).single("gambar");

router.post("/input", uploadFile, (req, res) => {
  let newBody = JSON.parse(req.body.data);
  if (req.file === undefined) {
    res.json({
      status: false,
      msg: "Data tidak boleh kosong",
    });
  } else {
    req.body.gambar = req.file.filename;
    newBody.gambar = req.body.gambar;
  }
  console.log(newBody);
  barangController
    .input(newBody)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.get("/get-all", (req, res) => {
  barangController
    .getAllBarang()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/get-id/:id", (req, res) => {
  console.log(req.params.id);
  barangController
    .getBarangById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/update/:id", uploadFile, (req, res) => {
  let newBody = JSON.parse(req.body.data);
  let gambar = utilApps.cekNull(req.file);
  if (gambar !== null) {
    newBody.gambar = gambar;
  }
  barangController
    .update(req.params.id, newBody)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/delete/:id", (req, res) => {
  barangController
    .delete(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
