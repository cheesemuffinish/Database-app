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
      var businessReviewRequestID;
      var businessReviewApproval;
      var businessReviewApprovalText;
      var businessReviewApprovalReview;

      // Populate form name variables
      for (var i = 0; i < req.body.formData.length; i++){
        if (req.body.formData[i].name == "businessReviewRequestID") {
          businessReviewRequestID = req.body.formData[i].value;
        } else if (req.body.formData[i].name == "businessReviewApproval") {
          if (req.body.formData[i].value == "True") {
            businessReviewApproval = 1;
          } else {
            console.log("Here")
            businessReviewApproval = 0;
          }
        } else if (req.body.formData[i].name == "businessReviewApprovalText") {
          businessReviewApprovalText = req.body.formData[i].value
        } else if (req.body.formData[i].name == "businessReviewApprovalReview") {
          businessReviewApprovalReview = req.body.formData[i].value
        }
      }

      var queryStatement;

      if(businessReviewApproval == 1) {
        queryStatement = `INSERT INTO work.business_reviews (
          item_id,
  		    approval,
          reviewer,
  		    comment,
  		    reviewed
  	       )
           VALUES (
            '${businessReviewRequestID}',
            ${businessReviewApproval},
            '${businessReviewApprovalReview}',
            '${businessReviewApprovalText}',
            current_timestamp
          )
          INSERT INTO work.status_changes (
              item_id,
              previous_status,
              new_status,
              added_by
             )
             VALUES (
              '${businessReviewRequestID}',
              'Business Review',
              'Complete',
              'Joe-PC\\Joe'
            );
          update work.items set status = 'Complete'
          where id = '${businessReviewRequestID}'`;
      } else {
        queryStatement = `INSERT INTO work.business_reviews (
          item_id,
  		    approval,
          reviewer,
  		    comment,
  		    reviewed
  	       )
           VALUES (
            '${businessReviewRequestID}',
            ${businessReviewApproval},
            '${businessReviewApprovalReview}',
            '${businessReviewApprovalText}',
            current_timestamp
          )
          INSERT INTO work.status_changes (
              item_id,
              previous_status,
              new_status,
              added_by
             )
             VALUES (
              '${businessReviewRequestID}',
              'Business Review',
              'Development',
              'Joe-PC\\Joe'
            );
          update work.items set status = 'Development'
          where id = '${businessReviewRequestID}'`;
      }

      console.log(queryStatement)

      request = new Request(
        queryStatement,
        function(err) {
          if (err) {
            console.log(err);
            //res.send("Unsucessful Request...Error Completeing Query");
          }
        }
      );

      connection.execSql(request);

      res.send("Sucessful Request");
    }
  });
});

module.exports = router;
