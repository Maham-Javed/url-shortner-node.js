const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectedMongoDB } = require("./connect");

const URL = require("./model/url");

// routes:
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const staticRoute = require("./routes/staticRouter");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middleware/auth");

const app = express();
const PORT = 8001;

// connected MongoDB:
connectedMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongoDB is connected!")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// middleware for parsing the upcoming bodies:
app.use(express.json()); // middleware for json object
app.use(express.urlencoded({ extended: false })); //middleware for form data
app.use(cookieParser());

// routes:
app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute); // SSR route:

// route for redirect-url:
app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        VisitHistory: [
          {
            timestamp: Date.now(),
          },
        ],
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server ruuning on PORT: ${PORT}`));
