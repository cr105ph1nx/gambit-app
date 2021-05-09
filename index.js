require("dotenv").config();

const cors = require("cors");
const { json } = require("express");
const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.on("open", () => console.log("Connected to database !"));

app.use(express.json());
app.use(cors());

require("./routes")(app);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
