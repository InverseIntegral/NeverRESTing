# NeverRESTing
This application provides an easy way to manage periodically repeating ToDos.
You will be able to manage and access all your tasks on a web application as well as on your mobile phone.
The intent of this application is to enforce discipline. To connect your todos we use GitHub as an
authentication provider.

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

1. Start by configuring the following files:
   * `app/config/.env` Change the MongoDB and Github parameters.
   * `public/config/env.json` Change the backend URLs if necessary.
2. Start the MongoDB server using the batch file.
3. Type `npm run-script start` to start the NodeJS backend.
4. Type `npm run-script webpack` to start the webpack watch task.
5. Open `localhost:3000` using a browser of your choice.
