# Movies Vildy App

A react project based on Code with Mosh react course: https://codewithmosh.com/p/mastering-react

An application of a fictitious movie rental company that contains a list of movies and metadata. Features for each movie include the ability to see the rental price, how many in stock and genre. The app also supports the ability for users to log in and add movies to the database. Admin permissions are required to delete movies.

## Local development environment setup

### Node JS

The backend is run locally using "vidly-api-node". Open a command window there and run the backend as follows:

`node index.js`

The local backend endpoint is available at `http://localhost:3900/api`.

### Mongo DB

Mongo server is run locally with the following command:

`mongod`

(The path should be mapped to the folder containing mongod).

### React app

The vidly front end is run with the following command (in the vidly project folder)

`npm start`

The app will open automatically at `http://localhost:5000`.

## Deployment

The app front end is located at:

https://movies-cbhuber.herokuapp.com/movies

The app back end is located at:

https://vidly-cbhuber.herokuapp.com/api
