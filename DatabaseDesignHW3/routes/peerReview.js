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
      var peerReviewRequestID;
      var peerReviewApproval;
      var PeerReviewApprovalText;
      var PeerReviewApprovalReview;

      // Populate form name variables
      for (var i = 0; i < req.body.formData.length; i++){
        if (req.body.formData[i].name == "peerReviewRequestID") {
          peerReviewRequestID = req.body.formData[i].value;
        } else if (req.body.formData[i].name == "peerReviewApproval") {
          if (req.body.formData[i].value == "True") {
            peerReviewApproval = 1;
          } else{
            peerReviewApproval = 0;
          }
        } else if (req.body.formData[i].name == "PeerReviewApprovalText") {
          PeerReviewApprovalText = req.body.formData[i].value
        } else if (req.body.formData[i].name == "PeerReviewApprovalReview") {
          PeerReviewApprovalReview = req.body.formData[i].value
        }
      }

      var queryStatement;

      if(peerReviewApproval) {
        queryStatement = `INSERT INTO work.peer_reviews (
          item_id,
  		    approval,
  		    comment,
  		    reviewed,
  		    reviewer
  	       )
           VALUES (
            '${peerReviewRequestID}',
            ${peerReviewApproval},
            '${PeerReviewApprovalText}',
            current_timestamp,
            '${PeerReviewApprovalReview}'
          )
          INSERT INTO work.status_changes (
              item_id,
              previous_status,
              new_status,
              added_by
             )
             VALUES (
              '${peerReviewRequestID}',
              'Peer Review',
              'Business Review',
              'Joe-PC\\Joe'
            );
          update work.items set status = 'Business Review'
          where id = '${peerReviewRequestID}'`;
      } else {
        queryStatement = `INSERT INTO work.peer_reviews (
          item_id,
  		    approval,
  		    comment,
  		    reviewed,
  		    reviewer
  	       )
           VALUES (
            '${peerReviewRequestID}',
            ${peerReviewApproval},
            '${PeerReviewApprovalText}',
            current_timestamp,
            '${PeerReviewApprovalReview}'
          )
          INSERT INTO work.status_changes (
              item_id,
              previous_status,
              new_status,
              added_by
             )
             VALUES (
              '${peerReviewRequestID}',
              'Peer Review',
              'Development',
              'Joe-PC\\Joe'
            );
          update work.items set status = 'Development'
          where id = '${peerReviewRequestID}'`;
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
