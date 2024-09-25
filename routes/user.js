const express = require("express");
const { handleCreateSignup, handleUserLogin } = require("../controller/user");

const router = express.Router();

router.post("/", handleCreateSignup);
router.post("/login", handleUserLogin);

module.exports = router;
