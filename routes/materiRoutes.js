const router = require("express").Router();

const controllerMateri = require("../controller/materiController");

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
