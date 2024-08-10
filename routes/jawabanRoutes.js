const router = require("express").Router();
const controllerMateri = require("../controller/jawabanController");

const path = require("path");
const multer = require("multer");
const { isObjectIdOrHexString } = require("mongoose");
const utilApps = require("../utils/utils_apps");
const uploadFile = multer({
  storage: utilApps.uploadFile,
}).single("file");

const uploadSertifikat = multer({
  storage: utilApps.uploadSertifikat,
}).single("file");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/sertifikat");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  },
});

router.post("/input", (req, res) => {
  console.log(req.body);
  controllerMateri
    .inputKategori(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/update/:id", (req, res) => {
  controllerMateri
    .updateKategoriById(req.params.id, req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/updateWeb/:idBarang", uploadSertifikat, (req, res) => {
  let newBody = JSON.parse(req.body.data);
  let file = utilApps.cekNull(req.file);
  if (file !== null) {
    newBody.file = file;
  }
  controllerMateri
    .updateWeb(req.params.idBarang, newBody)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/get-all", (req, res) => {
  controllerMateri
    .getAllKategori()
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.json(error);
    });
});

router.get("/getId/:id", (req, res) => {
  controllerMateri
    .getKategoriById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/getUserId/:id", (req, res) => {
  controllerMateri
    .getUserIdd(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/getMateri/:id", (req, res) => {
  controllerMateri
    .getNamaPelatihan(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete("/delete/:idKategori", (req, res) => {
  controllerMateri
    .deleteKategori(req.params.idKategori)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
