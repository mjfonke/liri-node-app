require("dotenv").config();

var keys = require.apply("./keys.js");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var moment = require("moment");

var axios = require("axios");

var fs = require("fs");

var command = process.argv[2];
var search = process.argv[3];


switch (command) {
    case "concert-this":
        concert(search);
        break;

    case "spotify-this-song":
        spotify(search);
        break;

    case "movie-this":
        movie(search);
        break;

    case "do-what-it-says":
        doThis(search);
        break;
};

function concert(search) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";
    
    axios.get(queryUrl).then(function(response) {

                console.log(response)

                for (var i = 0; i < response.data.length; i++){
                    var venue = response.data[i].venue.name;
                    var location = response.data[i].venue.city;
                    var state = response.data[i].venue.region;
                    var date = response.data[0].datetime;
                    var dateSplit = date.split("T");

                    console.log("Venue: " + venue + "\n" 
                    + "Location: " + location + "," + state + "\n" 
                    + "Date: " + moment(dateSplit[0], MM/DD/YYYY) + "\n"
                    + "-------------------------------------------------")
                }
         
        })
        .catch(function(error) {
            console.log(error);
        })
};

function spotify(search) {
    spotify.search({type: "track", query: search}).then(
        function(response) {
            for (var i = 0; i < 6; i++){
            console.log(response.track.items[i].artists[0].name);
            console.log(response.tracks.items[i].name);
            console.log(response.tracks.items[i].album.name);
            console.log(response.tracks.items[i].preview_url);
        }
    }).catch(function(error){
        console.log(error);
    });

};

function movie(search){
    var url = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";
    axios.get(url).then(
        function(respond) {
            
                console.log("Movie: " + respond.Title);
                console.log("Year: " + respond.Year);
                console.log("IMDB Ratings: " + respond.Ratings[0].Value);
                console.log("Rotten Tomatoes Ratings: " + respond.Ratings[1].Value);
                console.log("Country: " + respond.Country);
                console.log("Language: " + respond.Language);
                console.log("Plot: " + respond.Plot);
                console.log("Actors: " + respond.Actors);
           
        }).catch(function(error){
            console.log(error);
        });
};

function doThis(value) {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);

        }

        console.log(data);
    })
}