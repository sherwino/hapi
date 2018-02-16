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
const server = new Hapi.Server({
    host: 'localhost',
    port: 3000
});

// Register any plugins, configure the views, and start the server

async function start () {
    // register plugins to server instance
//     await server.register([
//       {
//         plugin: require('inert')
//       },
//       {
//         plugin: require('vision')
//       },
//       {
//         plugin: require('./web/authentication')
//       },
//       {
//         plugin: require('./web/base')
//       },
//       {
//         plugin: require('./web/movies')
//       },
//       {
//         plugin: require('./web/tv-shows')
//       },
//       {
//         plugin: require('./web/user-profile')
//       },
//       {
//         plugin: require('./web/add-user-to-views')
//       }
//   ])

    // view configuration
    const viewsPath = Path.resolve(__dirname, 'public', 'views')

    server.views({
      engines: {
        hbs: Handlebars
      },
      path: viewsPath,
      layoutPath: Path.resolve(viewsPath, 'layouts'),
      layout: 'layout',
      helpersPath: Path.resolve(viewsPath, 'helpers'),
      partialsPath: Path.resolve(viewsPath, 'partials'),
      isCached: process.env.NODE_ENV === 'production',
      context: {
        title: 'Futureflix'
      }
  })

   // start your server
   try {
    await server.start()
    console.log(`Server started → ${server.info.uri}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()