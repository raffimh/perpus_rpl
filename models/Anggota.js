const db = require("../utility/database");

module.exports = class Anggota {
  constructor(
    id,
    nama,
    email,
    alamat,
    masa_berlaku,
    nomor,
    nik,
    tanggal_lahir
  ) {
    this.id = id;
    this.nama = nama;
    this.email = email;
    this.alamat = alamat;
    this.masa_berlaku = masa_berlaku;
    this.nomor = nomor;
    this.nik = nik;
    this.tanggal_lahir = tanggal_lahir;
  }

  static findAll() {
    return db.execute("SELECT * FROM anggota LIMIT 10");
  }
};
