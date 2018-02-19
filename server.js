// ...not sure why hapi wants me to do this, but I think I have an idea.
//'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Path = require('path');
const Dotenv = require('dotenv');
const Handlebars = require('handlebars');
const HandlebarsRepearHelper = require('handlebars-helper-repeat');

// Extend Handlebars Instance
// Need to look into this to see what it does exactly
Handlebars.registerHelper('repeat', HandlebarsRepearHelper);

// Import all of the environmental variables from teh .env file
Dotenv.config({ path: Path.resolve(__dirname, 'secrets.env') });

// Iniialize a server instance, with connection
const server = new Hapi.server({
    host: 'localhost',
    port: 4200
    // routes: {
    //     files: {
    //         relativeTo: Path.join(__dirname, 'build')
    //     }
    // }
});

const provision = async () => {
 
    await server.register(Inert);
 
    // server.route({
    //     method: 'GET',
    //     path: '/',
    //     handler: {
    //         directory: {
    //             path: '.',
    //             redirectToSlash: true,
    //             index: true,
    //         }
    //     }
    // });

    server.route({
        method: 'GET',
        path: '/api/hello',
        handler: function (request, h){
            return "Sherwino was able to connect to the backend";
        }
    });
 
    await server.start();

    console.log('Server running at:', server.info.uri);
};

provision();