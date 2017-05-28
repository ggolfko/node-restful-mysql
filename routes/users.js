// call the packages we need
const express = require('express'); // call express

//Database setup
const con = require('../config/db'); // load the database config

// ROUTES FOR OUR API
// =============================================================================
const router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use((req, res, next) => {
  // do logging
  console.log('Something is happening.');
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) => {
  res.json({
    message: 'hooray! welcome to our api!'
  });
});

// more routes for our API will happen here
// on routes that end in /bears
// ----------------------------------------------------
router.route('/users')

  // create a user (accessed at POST http://localhost:8080/api/users)
  .post((req, res) => {

    let sql = "INSERT INTO customers (name, address) VALUES ('" + req.body.name + "', '" + req.body.address + "')";
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).json({
        data: result,
        message: '1 record inserted!'
      });
    });

  })

  // get all the user (accessed at GET http://localhost:8080/api/users)
  .get((req, res) => {

    let sql = "SELECT * FROM customers";
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).json(result);
    });

  });

// on routes that end in /users/:user_id
// ----------------------------------------------------
router.route('/users/:user_id')

  // get the user with that id
  .get((req, res) => {

    let sql = "SELECT * FROM customers WHERE id = " + req.params.user_id;
    con.query(sql, (err, result) => {
      if (err) throw err;
      if (!result) return res.status(404).json({
        message: 'No user found.'
      });
      res.status(200).json(result);
    });

  })

  // update the user with this id
  .put((req, res) => {

    let sql = "UPDATE customers SET name = '" + req.body.name + "', address = '" + req.body.address + "' WHERE id = " + req.params.user_id;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).json({
        data: result,
        message: result.affectedRows + ' record(s) updated'
      });
    });

  })

  // delete the user with this id
  .delete((req, res) => {

    let sql = "DELETE FROM customers WHERE id = " + req.params.user_id;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.status(200).json({
        data: result,
        message: 'Number of records deleted: ' + result.affectedRows
      });
    });

  });

// Return router
module.exports = router;
