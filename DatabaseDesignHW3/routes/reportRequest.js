var express = require('express');
var router = express.Router();
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

/* GET configuration details. */
router.get('/', function(req, res, next) {
  res.send('respond with config details');
});

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
      var ReportRequestItemTitle;
      var ReportRequestItemRequestor;
      var ReportRequestItemDepartment;
      var ReportRequestItemPriority;
      var ReportRequestItemPurpose;
      var ReportRequestItemType;
      var ReportRequestItemDescription;

      // Populate form name variables
      for (var i = 0; i < req.body.formData.length; i++){
        if (req.body.formData[i].name == "ReportRequestItemTitle") {
          ReportRequestItemTitle = req.body.formData[i].value;
        } else if (req.body.formData[i].name == "ReportRequestItemRequestor") {
          ReportRequestItemRequestor = req.body.formData[i].value
        } else if (req.body.formData[i].name == "ReportRequestItemDepartment") {
          ReportRequestItemDepartment = req.body.formData[i].value;
        } else if (req.body.formData[i].name == "ReportRequestItemPriority") {
          ReportRequestItemPriority = req.body.formData[i].value;
        } else if (req.body.formData[i].name == "ReportRequestItemPurpose") {
          ReportRequestItemPurpose = req.body.formData[i].value;
        } else if (req.body.formData[i].name == "ReportRequestItemType") {
          ReportRequestItemType = req.body.formData[i].value;
        } else if (req.body.formData[i].name == "ReportRequestItemDescription") {
          ReportRequestItemDescription = req.body.formData[i].value;
        }
      }

      var queryStatement;
      queryStatement = `INSERT INTO work.items (
		      name,
		      requested,
		      requestor,
		      department,
      		priority,
      		purpose,
      		requirements,
      		type,
      		request_location,
          added_by
	       )
         VALUES (
          '${ReportRequestItemTitle}',
          current_timestamp,
          '${ReportRequestItemRequestor}',
          '${ReportRequestItemDepartment}',
          '${ReportRequestItemPriority}',
          '${ReportRequestItemPurpose}',
          '${ReportRequestItemDescription}',
          '${ReportRequestItemType}',
          'Internal',
          'Joe-PC\\Joe'
        )`;

        console.log(queryStatement)

      request = new Request(
        queryStatement,
        function(err) {
          if (err) {
            return err;
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
