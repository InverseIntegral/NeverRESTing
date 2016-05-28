# NeverRESTing
This application provides an easy way to manage periodically repeating ToDos.
You will be able to manage and access all your tasks on a web application as well as on your mobile phone.
The intent of this application is to enforce discipline.

## Technology stack
The backend is based on the following technologies:

* [NodeJS](https://nodejs.org/)
* [ExpressJS](http://expressjs.com/)
* [Mongoose](http://mongoosejs.com/)
* [DotEnv](https://github.com/bkeepers/dotenv)

The frontend will use the [React library](https://facebook.github.io/react/).

## How to install
All you need in order to run this application is the latest version of NodeJS and a MongoDB server.
To configure the application edit the `.env` and the `mongo_start.bat` file.
Then start your MongoDB using the batch file and run the application using the `npm start` command.