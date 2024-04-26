const db = require("../utility/database");

module.exports = class Book {
  constructor(
    ISBN,
    Judul,
    Status,
    Pengarang,
    Penerbit,
    Tahun,
    id_admins,
  ) {
   this.ISBN = ISBN;
   this.Judul = Judul;
   this.Status = Status;
   this.Pengarang = Pengarang;
   this.Penerbit = Penerbit;
   this.Tahun = Tahun;
   this.id_admins = id_admins;
  }

  static findAll() {
    return db.execute("SELECT * FROM buku LIMIT 10");
  }
};
