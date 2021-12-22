const express = require("express");
const app = express();
const cors = require("cors");
const moment = require("moment");
const PORT = process.env.PORT || 9000;
const router = require("./src/modules/routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, console.log("Server is running on port: " + PORT));
