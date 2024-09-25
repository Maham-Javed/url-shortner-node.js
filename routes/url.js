const express = require("express");

const {
  handleCreateShortURL,
  handleGetAnalytics,
} = require("../controller/url");

const router = express.Router();

router.post("/", handleCreateShortURL);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
