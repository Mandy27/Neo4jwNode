// Reference: http://neo4j.com/docs/api/javascript-driver/current/


const express        = require('express');
const neo4j 	     = require('neo4j-driver').v1;
const bodyParser     = require('body-parser');
const server         = express();
const apiRouter      = require('./api');
const port = 8000;

var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "neo4j"));

// Register a callback to know if driver creation was successful:
driver.onCompleted = function() {
  // proceed with using the driver, it was successfully instantiated
  console.log('Neo4j connection successful');
};

// Register a callback to know if driver creation failed.
// This could happen due to wrong credentials or database unavailability:
driver.onError = function(error) {
  console.log('Neo4j Driver instantiation failed', error);
};

server.use('/api', apiRouter);

server.listen(port, () => {
  console.log('Express listening on port ' + port);
});
