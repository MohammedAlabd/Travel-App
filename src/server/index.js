const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Helpers Methods
const fetchWeather = require("./helperMethods/fetchWeather");
const fetchCoordinates = require("./helperMethods/fetchCoordinates");
const fetchImage = require("./helperMethods/fetchImage");

// Constant Variables
const USERNAME = "mohammedalabd";
const BASE_COORDINATES_URL = "http://api.geonames.org/postalCodeSearchJSON";
const WETHERBIT_API_KEY = "1774a820b2644d1e9b3a181d7e804837";
const PIXABAY_API_KEY = "17037476-2956bf4cea34945d496b59932";
const BASE_PIXABAY_URL = "https://pixabay.com/api";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("dist"));

app.use(cors());

console.log(__dirname);

app.get("/", function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve("src/client/views/index.html"));
});

// designates what port the app will listen to for incoming requests
app.listen(8083, function () {
  console.log("Example app listening on port 8083!");
});

app.get("/test", function (req, res) {
  res.send("Hello I am here");
});

const appData = {};

const main = async (req, res) => {
  console.log(req.body);
  const { country, city, date } = req.body;
  const coordinates = await fetchCoordinates(
    country,
    city,
    BASE_COORDINATES_URL,
    USERNAME
  );
  if (!coordinates) {
    res.send(JSON.stringify({ state: false, msg: "Sorry we can't find this city Maybe You chose a wrong country or maybe you have a typo" }));
    return;
  }
  const weatherData = await fetchWeather(coordinates, date, WETHERBIT_API_KEY);
  let image = await fetchImage(city, BASE_PIXABAY_URL, PIXABAY_API_KEY);
  if (!image) {
    image = await fetchImage(
      coordinates.adminName2,
      BASE_PIXABAY_URL,
      PIXABAY_API_KEY
    );
  }
  res.send(JSON.stringify({ image, weatherData, state: true }));
  console.log({ image, weatherData });
};

app.post("/post", main);
