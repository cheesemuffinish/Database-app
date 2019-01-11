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
      var requestReviewRequestID;
      var requestReviewApprovalBit;
      var requestReviewApprovalText;
      var requestReviewApprovalReviewer;

      // Populate form name variables
      for (var i = 0; i < req.body.formData.length; i++){
        if (req.body.formData[i].name == "requestReviewRequestID") {
          requestReviewRequestID = req.body.formData[i].value;
        } else if (req.body.formData[i].name == "requestReviewApprovalBit") {
          if(req.body.formData[i].value == "True") {
            requestReviewApprovalBit = 1;
          } else {
            requestReviewApprovalBit = 0;
          }
        } else if (req.body.formData[i].name == "requestReviewApprovalText") {
          requestReviewApprovalText = req.body.formData[i].value;
        } else if (req.body.formData[i].name == "requestReviewApprovalReviewer") {
        	requestReviewApprovalReviewer = req.body.formData[i].value;
        }
      }

      var queryStatement;

      if (requestReviewApprovalBit) {
        queryStatement = `INSERT INTO work.request_reviews (
          item_id,
          approval,
          comment,
          reviewer,
          reviewed
  	       )
           VALUES (
            '${requestReviewRequestID}',
            '${requestReviewApprovalBit}',
            '${requestReviewApprovalText}',
            '${requestReviewApprovalReviewer}',
            current_timestamp
          )
          INSERT INTO work.status_changes (
              item_id,
              previous_status,
              new_status,
              added_by
             )
             VALUES (
              '${requestReviewRequestID}',
              'Pending Review',
              'Request Reviewed',
              'Joe-PC\\Joe'
            );
          update work.items set status = 'Request Reviewed'
          where id = '${requestReviewRequestID}'`;
      } else {
        queryStatement = `INSERT INTO work.request_reviews (
          item_id,
          approval,
          comment,
          reviewer,
          reviewed
           )
           VALUES (
            '${requestReviewRequestID}',
            '${requestReviewApprovalBit}',
            '${requestReviewApprovalText}',
            '${requestReviewApprovalReviewer}',
            current_timestamp
          )
          INSERT INTO work.status_changes (
              item_id,
              previous_status,
              new_status,
              added_by
             )
             VALUES (
              '${requestReviewRequestID}',
              'Pending Review',
              'Closed',
              'Joe-PC\\Joe'
            );
          update work.items set status = 'Closed'
          where id = '${requestReviewRequestID}'`;
      }



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
