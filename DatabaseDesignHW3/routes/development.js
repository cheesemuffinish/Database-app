var express = require('express');
var router = express.Router();
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

var reqVar, resVar, nextVar;

/* GET configuration details. */
router.get('/', function(req, res, next) {
  res.send('respond with config details');
});

/* POST configuration details. */
router.post('/', function(req, res, next) {
	reqVar = req;
	resVar = res;
	nextVar = next;

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
      var PendingReviewRequestItemID;
      var PendingReviewRequestItemStatus;

      // Populate form name variables
      for (var i = 0; i < req.body.formData.length; i++){
        if (req.body.formData[i].name == "PendingReviewRequestItemID") {
          PendingReviewRequestItemID = req.body.formData[i].value;
        } else if (req.body.formData[i].name == "PendingReviewRequestItemStatus") {
        	PendingReviewRequestItemStatus = req.body.formData[i].value;
        }
      }

      var queryStatement;
      queryStatement = `
      INSERT INTO work.status_changes (
          item_id,
          previous_status,
          new_status,
          added_by
         )
         VALUES (
          '${PendingReviewRequestItemID}',
          'Development',
          '${PendingReviewRequestItemStatus}',
          'Joe-PC\\Joe'
        );
      update work.items set status = '${PendingReviewRequestItemStatus}'
      where id = '${PendingReviewRequestItemID}'`;

      console.log(queryStatement);

      request = new Request(
        queryStatement,
        function(err, rowCount, rows) {
          if (err) {
            return resVar.send(err);
          }

          if (rowCount === 0) {
          	resVar.send("Success");
          } else {
          	resVar.send("Success");
          }
        }
      );

      connection.execSql(request);
    }
  });
});

module.exports = router;
