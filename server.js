// ...not sure why hapi wants me to do this, but I think I have an idea.
// 'use strict';

const Hapi = require('hapi');
const Path = require('path');
const Dotenv = require('dotenv');
const Handlebars = require('handlebars');
const HandlebarsRepearHelper = require('handlebars-helper-repeat');

// Extend Handlebars Instance
// Need to look into this to see what it does exactly
Handlebars.registerHelper('repeat', HandlebarsRepearHelper);

// Import all of the environmental variables from teh .env file
Dotenv.config({ path: Path.resolve(__dirname, 'secrets.env') })

// Iniialize a server instance, with connection
const server = new Hapi.server({
    host: 'localhost',
    port: 3000
});

// Add the route
server.route({
    method: 'GET',
    path:'/hello', 
    handler: function (request, h) {

        return 'Sherwino you suck';
    }
});

// Register any plugins, configure the views, and start the server

//     // view configuration
//     const viewsPath = Path.resolve(__dirname, 'public', 'views')

//     server.views({
//       engines: {
//         hbs: Handlebars
//       },
//       path: viewsPath,
//       layoutPath: Path.resolve(viewsPath, 'layouts'),
//       layout: 'layout',
//       helpersPath: Path.resolve(viewsPath, 'helpers'),
//       partialsPath: Path.resolve(viewsPath, 'partials'),
//       isCached: process.env.NODE_ENV === 'production',
//       context: {
//         title: 'Futureflix'
//       }
//   })

// Start the server
async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();

