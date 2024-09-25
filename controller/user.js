const User = require("../model/user");
const { v4: uuidv4 } = require("uuid");
const { use } = require("../routes/staticRouter");
const { setUser } = require("../service/auth");

async function handleCreateSignup(req, res) {
  const { name, email, passward } = req.body;
  await User.create({
    name,
    email,
    passward,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, passward } = req.body;
  const user = await User.findOne({ email, passward });
  if (!user)
    return res.render("login", {
      error: "Invalid Email and Passward.",
    });

  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);

  return res.redirect("/");
}

module.exports = {
  handleCreateSignup,
  handleUserLogin,
};
