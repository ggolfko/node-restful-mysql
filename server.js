// BASE SETUP
// =============================================================================

// call the packages we need
const app = require('./app');

const port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
const router = require('./routes/users'); // get an instance of the users Router


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
const server = app.listen(port,() => {

  let host = server.address().address
  let port = server.address().port

  console.log("Magic happens on http://%s:%s in %s mode", host, port, app.settings.env)

});
