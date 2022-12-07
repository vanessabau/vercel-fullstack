const express = require("express");
const app = express();

const path = require("path");
const logger = require("morgan");
// Use cors to enable requests from the front end to the back end
const cors = require("cors");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// In all the urls and api you need to start with the slash api on the front so the backend does not load on teh client side
// First checks if is a back end request, if not, then it goes through front end
app.get("/api/test", (req, res) => {
  res.send("test");
});

// app.use("/api", require("./routes"));

// makesure to change filename here if not named frontend
app.use(express.static(path.join(__dirname, ".frontend/build")));

// Get teh request and redirect to index.html, this is how we get all the pages from the frontend
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Server running on port ${port"));

module.exports = app;
