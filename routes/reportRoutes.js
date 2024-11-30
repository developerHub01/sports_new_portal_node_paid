const express = require("express");
const ReportControllers = require("../controllers/reportControllers");

const router = express.Router();

router.post("/", ReportControllers.create);

router.post("/delete/:id", ReportControllers.delete);

module.exports = router;
