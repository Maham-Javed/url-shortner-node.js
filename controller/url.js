const shortid = require("shortid");
const URL = require("../model/url");

// this will create the short url of the original one:
async function handleCreateShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ err: "Required Url" });
  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  return res.render("home", { id: shortID });
}

// this route will give the analytics of the url:
async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.VisitHistory.length,
    analytics: result.VisitHistory,
  });
}

module.exports = {
  handleCreateShortURL,
  handleGetAnalytics,
};
