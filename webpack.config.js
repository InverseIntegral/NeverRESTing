var path = require('path');

module.exports = {

    // The entry of this application
    entry: './public/javascripts/todos.js',

    // The output should go to /build/bundle.js
    output: {
        path: path.resolve(__dirname, "public/build"),
        filename: 'bundle.js'
    },

    module: {

        // Don't parse this js file as it throws errors
        noParse: [/node_modules\/json-schema\/lib\/validate\.js/],

        loaders: [

            /* JavaScript loader */
            {
                test: /\.js/,
                include: [
                    path.resolve(__dirname, "public/javascripts")
                ],
                loaders: ['react-hot', 'babel-loader']
            },

            /* JSON loader */
            {
                test: /\.json$/,
                loaders: ['json-loader']
            }

        ]
    }
};