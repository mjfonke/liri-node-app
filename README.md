<h1>LIRI-NODE-APP</h1>
<p> LIRI is a language interpretation and recognition interface. LIRI will be a command line node app that takes in parameters and gives hou back data.</p>

<h2>How does it works</h2>
Here is the link for Video Guide
https://drive.google.com/file/d/1xTPKQWdvJXGiSQn8zGZ9MaJuKxdxsiwo/view

Liri can take four commands which is 
* concert-this: 
    - node liri.js concert-this (artist/band name) 
    - This will search the Bands in Town Artist Events API and upload artist/bands concert information such ans venue and event date on users terminal.

* spotify-this-song:
    - node liri.js spotify-this-song (song name)
    - This will search the spotify API to show information about the song you searched such as artist name, the song's name, album, and a preview link of the song.
    - If user provide no song, the app will show its default information which is "The Sign" by Ace by Base.

* movie-this:
    - node liri.js movie-this (movie name)
    - This will search movie information from OMDB API and upload on users terminal.

* do-what-it-says
    - By using the fs Node Package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's command.


