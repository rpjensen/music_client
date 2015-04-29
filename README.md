# music_client

University of North Carolina Asheville | CSCI 344 - Web Technology | Spring 2015

Contributors: Ryan Jensen, Mariana Herzog, Ivy Sugars, Katelynn Alexander

Code located at: https://github.com/rpjensen/music_client/tree/master

The intention behind this site is for users to populate and modify the database. 
This has a beautiful interface for interacting with a database that stores Bands, Artists, Albums, and Songs. 

It uses a mysql database to relate artists to specific bands, songs to specific albums, and songs and albums to specific artists or bands.



To view the site follow these few simple steps:
  1. Start a MYSQL daemon either a bare bones install or using a package such as,
   - WAMP works for Windows
   - MAMP works for Mac (MySQL Port: 3306)
   - Sidenote: Depending on the machine you might (read as probably) need to comment out line #13 for socketPath in the server.js file if it isn't already commented out.
  2. Create a MYSQL database called music
  3. Run the 'create_tables.sql' query on that database.  This will create the table structure and some sample data to work with.
  4. Run Node on the server.js file. It should give you the output "Listening on port 3000."
  5. Start a server
  6. Go to localhost:3000 in the browser of your choice
