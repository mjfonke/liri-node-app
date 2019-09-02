require("dotenv").config();

var keys = require.apply("./keys.js");

var spotify = new spotify(keys.spotify);

