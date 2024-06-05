require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const indexRoutes = require("./routes/index");
const adminRoutes = require("./routes/adminRoutes");
const petugasRoutes = require("./routes/petugasRoutes");
const db = require("./utility/database");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", "views");

// db.execute("SELECT * FROM admins")
//   .then(result => {
//     console.log(result[0], result[1]);
//   })
//   .catch(err => {
//     console.log(err);
//   });

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(indexRoutes);
app.use(adminRoutes);
app.use(petugasRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
