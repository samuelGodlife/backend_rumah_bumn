const express = require("express");
const app = express();
const path = require("path");
const mongosee = require("mongoose");
const dbConfig = require("./config/dbConfig");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(
  express.urlencoded({
    enableTypes: ["json", "form"],
    extended: true,
  })
);
app.use(
  express.json({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.send("Selamat Datang");
});
//e-commerce
app.use("/users", require("./routes/userRoutes"));
app.use("/kategori", require("./routes/kategoriRoutes"));
app.use("/barang", require("./routes/barangRoutes"));
app.use("/keranjang", require("./routes/keranjangRoutes"));
app.use("/transaksi", require("./routes/transaksiRoutes"));

//gambar
app.use("/gambar-barang", express.static("public/images"));
app.use("/gambar-sertifikat", express.static("public/sertifikat"));

//pelatihan
app.use("/kategoriKelas", require("./routes/kategoriKelasRoutes"));
app.use("/materi", require("./routes/materiRoutes"));
app.use("/tugas", require("./routes/tugasRoutes"));
app.use("/jawaban", require("./routes/jawabanRoutes"));

//sertifikasi
app.use("/sertifikasi", require("./routes/sertifikasiRoutes"));
mongosee
  .connect(dbConfig.mongoUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Berhasil Konek ke mongodb");
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log("Server Berjalan di Port");
    });
  })
  .catch((err) => {
    console.log(err);
  });
