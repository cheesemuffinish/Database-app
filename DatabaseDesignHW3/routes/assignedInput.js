var express = require('express');
var router = express.Router();
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

/* POST configuration details. */
router.post('/', function(req, res, next) {

  console.log(req.body.configuration);

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
      var assignedInputRequestID;
      var assignedInputRequestAssignee;
      var assignedInputRequestAssigner;

      // Populate form name variables
      for (var i = 0; i < req.body.formData.length; i++){
        if (req.body.formData[i].name == "assignedInputRequestID") {
          assignedInputRequestID = req.body.formData[i].value;
        } else if (req.body.formData[i].name == "assignedInputRequestAssignee") {
          assignedInputRequestAssignee = req.body.formData[i].value
        } else if (req.body.formData[i].name == "assignedInputRequestAssigner") {
          assignedInputRequestAssigner = req.body.formData[i].value;
        }
      }

      var queryStatement;
      queryStatement = `INSERT INTO work.assignments (
		      item_id,
		      assignee,
		      assigned,
		      assigner
	       )
         VALUES (
          ${assignedInputRequestID},
          '${assignedInputRequestAssignee}',
          current_timestamp,
          '${assignedInputRequestAssigner}'
        );
        update work.items set status = 'Pending Development'
        where id = '${assignedInputRequestID}';
        INSERT INTO work.status_changes (
            item_id,
            previous_status,
            new_status,
            added_by
           )
           VALUES (
            '${assignedInputRequestID}',
            'Assigned',
            'Pending Development',
            'Joe-PC\\Joe'
          );`;

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
