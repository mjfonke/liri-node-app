require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);

var moment = require("moment");

var axios = require("axios");

var fs = require("fs");

var command = process.argv[2];
var search = process.argv.slice(3).join(" ");


switch (command) {
    case "concert-this":
        concert(search);
        break;

    case "spotify-this-song":
        spotifyThis(search);
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

                for (var i = 0; i < response.data.length; i++){
                    var venue = response.data[i].venue.name;
                    var location = response.data[i].venue.city;
                    var state = response.data[i].venue.region;
                    var date = response.data[i].datetime;
                    var dateSplit = date.split("T");

                    console.log("\n---------------------------------------------\n"
                    + "Venue: " + venue + "\n" 
                    + "Location: " + location + "," + state + "\n" 
                    + "Date: " + dateSplit[0]+ "\n"
                    + "-------------------------------------------------");

                }  
              
         
        })
        .catch(function(error) {
            console.log(error);
        })
};

function spotifyThis(search) {

    if(!search){
        spotifyFail();
    } else {
    spotify.search({type: "track", query: search}).then(
        function(response) {
            for (var i = 0; i < 5; i++){
            var jsonData = response.tracks;
            console.log("\n--------------------------------------------\n")
            console.log("Artist: " + jsonData.items[i].artists[0].name);
            console.log("Song: " + jsonData.items[i].name);
            console.log("Album: " + jsonData.items[i].album.name);
            console.log("Preview Link: " + jsonData.items[i].preview_url);
            console.log("\n--------------------------------------------\n")
            }
        
    }).catch(function(error){
        console.log(error);
    });
}

}

function spotifyFail () {
    spotify.search({type: "track", query: "the sign"})
    .then(function(response) {
            console.log("\n!!!!!!!You did not search any songs.. then Try this one!!!!!!!!!!\n")
            var jsonData = response.tracks;
            console.log("\n--------------------------------------------\n")
            console.log("Artist: " + jsonData.items[3].artists[0].name);
            console.log("Song: " + jsonData.items[3].name);
            console.log("Album: " + jsonData.items[3].album.name);
            console.log("Preview Link: " + jsonData.items[3].preview_url);
            console.log("\n--------------------------------------------\n")
         
    }).catch(function(error){
        console.log(error);
    });
}

function movie(search){
    
    if(!search) {
        search = "Mr.Nobody"
        console.log("!!!!!!!If you haven't watched Mr. Nobody, then you should!!!!!!!")
    } 
    var url = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";
    axios.get(url).then(
        function(respond) {
                
                console.log("\n------------------------------------\n")
                console.log("Movie: " + respond.data.Title);
                console.log("Year: " + respond.data.Year);
                console.log("IMDB Ratings: " + respond.data.Ratings[0].Value);
                if (respond.data.Ratings[1] === undefined) {
                    console.log("Rotten Tomatoes Ratings: N/A")
                }else {
                console.log("Rotten Tomatoes Ratings: " + respond.data.Ratings[1].Value);
                }
                console.log("Country: " + respond.data.Country);
                console.log("Language: " + respond.data.Language);
                console.log("Plot: " + respond.data.Plot);
                console.log("Actors: " + respond.data.Actors);
                console.log("\n---------------------------------------\n")
           
        }).catch(function(error){
            console.log(error);
        });
};

function doThis() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);

        }

        console.log(data);
    })
}

fs.appendFile("log.txt", command + ": " + search + "\n-------------\n", function(err) {
    if(err) {
        return console.log(err)
    }
});