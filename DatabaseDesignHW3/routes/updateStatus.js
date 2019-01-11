var express = require('express');
var router = express.Router();
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

/* POST configuration details. */
router.post('/', function(req, res, next) {

  // Make Sure that we can connect
  var config = {
    userName: req.body.configuration.uName,
    password: req.body.configuration.pWord,
    server: req.body.configuration.serv,
    port: 1433,
    options: {
      instanceName: req.body.configuration.instance,
      database: req.body.configuration.db
    }
  }

  var connection = new Connection(config);

  connection.on('connect', function(err) {
    if (err) {
      console.log(err);
      res.send("Unsucessful Request...Error Connecting to DB");
    } else {
      console.log("Successful Connection...Proceed");

      // Enumerate form names as variables
      var updateStatusID;
      var updateStatusNewStatus;

      // Populate form name variables
      for (var i = 0; i < req.body.formData.length; i++){
        if (req.body.formData[i].name == "updateStatusID") {
          updateStatusID = req.body.formData[i].value;
        } else if (req.body.formData[i].name == "updateStatusNewStatus") {
          updateStatusNewStatus = req.body.formData[i].value;
        }
      }

      var queryStatement;
      queryStatement = `exec work.update_status ${updateStatusID}, '${updateStatusNewStatus}';`;

      console.log(queryStatement)

      request = new Request(
        queryStatement,
        function(err) {
          if (err) {
            console.log(err);
          }
        }
      );

      connection.execSql(request);

      res.send("Sucessful Request");
    }
  });
});

module.exports = router;
