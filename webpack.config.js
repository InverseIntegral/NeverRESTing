var path = require('path');

module.exports = {

    // The entry of this application
    entry: './public/javascripts/index.js',

    // The output should go to /build/bundle.js
    output: {
        path: path.resolve(__dirname, "public/build"),
        filename: 'bundle.js'
    },

    module: {

        loaders: [

            /* JavaScript loader */
            {
                test: /\.js/,
                include: [
                    path.resolve(__dirname, "public/javascripts")
                ],
                loaders: ['babel']
            }

        ]
    }
};