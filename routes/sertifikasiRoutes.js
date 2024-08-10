const router = require("express").Router();
const barangController = require("../controller/sertifikasiController");
const path = require("path");
const utilApps = require("../utils/utils_apps");
const multer = require("multer");
const { isObjectIdOrHexString } = require("mongoose");

const uploadFile = multer({
  storage: utilApps.uploadFile,
}).single("file");

const uploadSertifikat = multer({
  storage: utilApps.uploadSertifikat,
}).single("file");
// const upload = multer({ storage: utilApps.uploadFile });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/sertifikat");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  },
});

const upload = multer({ storage: storage });
// Rute untuk meng-upload multiple image
const fs = require("fs");
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

router.post(
  "/upload",
  upload.fields([{ name: "foto_ktp" }, { name: "foto_produk" }]),
  (req, res) => {
    console.log(req.body);
    let newBody = req.body;
    if (req.files === undefined) {
      res.json({
        status: false,
        msg: "Data tidak boleh kosong",
      });
    } else {
      const fotoKtp = req.files["foto_ktp"] ? req.files["foto_ktp"][0] : null;
      const fotoProduk = req.files["foto_produk"]
        ? req.files["foto_produk"][0]
        : null;
      newBody.foto_ktp = fotoKtp.filename;
      newBody.foto_produk = fotoProduk.filename;
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
  }
);

router.put("/update/:idBarang", uploadSertifikat, (req, res) => {
  let newBody = JSON.parse(req.body.data);
  let file = utilApps.cekNull(req.file);
  if (file !== null) {
    newBody.file = file;
  }
  barangController
    .update(req.params.idBarang, newBody)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

// router.put("/update/:id", upload.fields([{ name: "file" }]), (req, res) => {
//   // console.log(req.files.length);
//   console.log(req.files["file"]);
//   let newBody = JSON.parse(req.body.data);
//   if (req.files["file"] == undefined) {
//     res.json({
//       status: false,
//       message: "Data tidak boleh kosong",
//     });
//   } else {
//     const file = req.files["file"] ? req.files["file"][0] : null;
//     newBody.file = file.filename;
//     console.log(req.params.id, newBody);
//     barangController
//       .update(req.params.id, newBody)
//       .then((result) => {
//         res.json(result);
//       })
//       .catch((error) => {
//         res.json(error);
//       });
//   }
// });

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

router.get("/get-id-user/:id", (req, res) => {
  console.log(req.params.id);
  barangController
    .getIdUser(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});
// router.put("/update/:id", uploadFile, (req, res) => {
//   let newBody = JSON.parse(req.body.data);
//   let gambar = utilApps.cekNull(req.file);
//   if (gambar !== null) {
//     newBody.gambar = gambar;
//   }
//   barangController
//     .update(req.params.id, newBody)
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

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
