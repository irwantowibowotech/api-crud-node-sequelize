const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./src/routes/router");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1", router);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server berjalan di port ${port}`));
