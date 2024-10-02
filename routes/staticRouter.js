const express = require("express");
const URL = require("../model/url");
const { restrictTo } = require("../middleware/auth");

const router = express.Router();

router.get("/", restrictTo(["NORMAL"]), async (req, res) => {
  const allURLs = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allURLs,
  });
});

router.get("/signup", async (req, res) => {
  return res.render("signup");
});

router.get("/login", async (req, res) => {
  return res.render("login");
});

module.exports = router;
