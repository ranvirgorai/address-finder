// Bring Mongoose into the app
var mongoose = require('mongoose');
var addressSeed = require('./FrontEnd/data/address.json');
var address_model = require('./Backend/models/address');

// Build the connection string
var dbURI = 'mongodb://localhost/addressApp';

// Create the database connection
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function() {
  console.log('Mongoose default connection open to ' + dbURI);
  address_model.insertMany(addressSeed, function(err, data) {
    if (err) {
      return console.log('Error while inserting data', err);
    } else {
      console.log('Seeded Successfully');
      mongoose.connection.close();
    }
  });
});

// If the connection throws an error
mongoose.connection.on('error', function(err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
