const express = require("express");
const app = express();
const vision = require("@google-cloud/vision");
// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: "api_key.json",
});

app.all("/secret", (req, res, next) => {
  // Performs label detection on the image file
  client
    .textDetection("./capture1.png")
    .then((results) => {
      const [result] = results;
      const detections = result.textAnnotations;
      console.log('Text:');
      detections.forEach(text => console.log(text));
      res.json(results);
    })
    .catch((err) => {
      console.error("ERROR:", err);
    });
});

app.listen(5000, "127.0.0.1", () => console.log("Server running"));
