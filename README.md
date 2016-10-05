# NeverRESTing
This application provides an easy way to manage periodically repeating ToDos.
You will be able to manage and access all your tasks on a web application as well as on your mobile phone.
The intent of this application is to enforce discipline. To connect your todos we will probably use
GitHub as an authentication provider.

## Technology stack
The backend is based on the following technologies:

* [NodeJS](https://nodejs.org/)
* [ExpressJS](http://expressjs.com/)
* [Mongoose](http://mongoosejs.com/)
* [DotEnv](https://github.com/bkeepers/dotenv)

The web frontend uses [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org/).
The mobile application will probably be a [React Native](https://facebook.github.io/react-native/) app.

## How to install
All you need in order to run this application is the latest version of NodeJS and a MongoDB server.
To configure the application edit the `.env` and the `mongo_start.bat` file.

1. Start the MongoDB server using the batch file.
2. Type `npm start` to start the NodeJS backend.
3. Type `npm webpack` to start the webpack watch task.
4. Open `localhost:3000/static/index.html` using a browser of your choice.