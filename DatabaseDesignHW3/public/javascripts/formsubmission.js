
// Assign default global values
var username = "admin";
var password = "password";
var server = "localhost";
var instanceName = "MSSQLSERVER";
var database = "Reporting_developer";

// Put values into configuration form
document.getElementById("configurationUsername").value = username;
document.getElementById("configurationPassword").value = password;
document.getElementById("configurationServer").value = server;
document.getElementById("configurationInstanceName").value = instanceName;
document.getElementById("configurationDatabase").value = database;

$('#reportRequest').submit(function (evt) {
   evt.preventDefault(); //prevents the default action

   $.ajax({ // Make post request to endpoint
          type: "POST",
          url: `/reportRequest`,
          contentType: 'application/json',
          data: JSON.stringify({
            formData: $("#reportRequest").serializeArray(),
            configuration: {
              uName: username,
              pWord: password,
              serv: server,
              instance: instanceName,
              db: database
            }
          }),
          success: function(data) {
              alert(data);
          },
          error: function(err) {
              console.log(err)
          }
        });
})

$('#assignedInputRequest').submit(function (evt) {
   evt.preventDefault(); //prevents the default action

   $.ajax({ // Make post request to endpoint
          type: "POST",
          url: `/assignedInput`,
          contentType: 'application/json',
          data: JSON.stringify({
            formData: $("#assignedInputRequest").serializeArray(),
            configuration: {
              uName: username,
              pWord: password,
              serv: server,
              instance: instanceName,
              db: database
            }
          }),
          success: function(data) {
              alert(data);
          },
          error: function(err) {
              console.log(err)
          }
        });
})

$('#peerReviewRequest').submit(function (evt) {
   evt.preventDefault(); //prevents the default action

   $.ajax({ // Make post request to endpoint
          type: "POST",
          url: `/peerReview`,
          contentType: 'application/json',
          data: JSON.stringify({
            formData: $("#peerReviewRequest").serializeArray(),
            configuration: {
              uName: username,
              pWord: password,
              serv: server,
              instance: instanceName,
              db: database
            }
          }),
          success: function(data) {
              alert(data);
          },
          error: function(err) {
              console.log(err)
          }
        });
})


$('#businessReviewRequest').submit(function (evt) {
   evt.preventDefault(); //prevents the default action

   $.ajax({ // Make post request to endpoint
          type: "POST",
          url: `/businessReview`,
          contentType: 'application/json',
          data: JSON.stringify({
            formData: $("#businessReviewRequest").serializeArray(),
            configuration: {
              uName: username,
              pWord: password,
              serv: server,
              instance: instanceName,
              db: database
            }
          }),
          success: function(data) {
              alert(data);
          },
          error: function(err) {
              console.log(err)
          }
        });
})

$('#updateStatusRequest').submit(function (evt) {
   evt.preventDefault(); //prevents the default action

   $.ajax({ // Make post request to endpoint
          type: "POST",
          url: `/updateStatus`,
          contentType: 'application/json',
          data: JSON.stringify({
            formData: $("#updateStatusRequest").serializeArray(),
            configuration: {
              uName: username,
              pWord: password,
              serv: server,
              instance: instanceName,
              db: database
            }
          }),
          success: function(data) {
              alert(data);
          },
          error: function(err) {
              console.log(err)
          }
        });
})


$('#requestReviewRequest').submit(function (evt) {
  evt.preventDefault(); //prevents the default action

  $.ajax({ // Make post request to endpoint
         type: "POST",
         url: `/requestReview`,
         contentType: 'application/json',
         data: JSON.stringify({
           formData: $("#requestReviewRequest").serializeArray(),
           configuration: {
             uName: username,
             pWord: password,
             serv: server,
             instance: instanceName,
             db: database
           }
         }),
         success: function(data) {
             alert(data);
         },
         error: function(err) {
             console.log(err)
         }
       });
})


$('#pendingReviewRequest').submit(function (evt) {
  evt.preventDefault(); //prevents the default action

  $.ajax({ // Make post request to endpoint
         type: "POST",
         url: `/pendingReview`,
         contentType: 'application/json',
         data: JSON.stringify({
           formData: $("#pendingReviewRequest").serializeArray(),
           configuration: {
             uName: username,
             pWord: password,
             serv: server,
             instance: instanceName,
             db: database
           }
         }),
         success: function(data) {
             alert(data);
         },
         error: function(err) {
             console.log(err)
         }
       });
})

$('#addNoteRequest').submit(function (evt) {
      evt.preventDefault(); //prevents the default action

      $.ajax({ // Make post request to endpoint
             type: "POST",
             url: `/note`,
             contentType: 'application/json',
             data: JSON.stringify({
               formData: $("#addNoteRequest").serializeArray(),
               configuration: {
                 uName: username,
                 pWord: password,
                 serv: server,
                 instance: instanceName,
                 db: database
               }
             }),
             success: function(data) {
                 alert(data);
             },
             error: function(err) {
                 console.log(err)
             }
           });
})

$('#addEffortRequest').submit(function (evt) {
      evt.preventDefault(); //prevents the default action

      $.ajax({ // Make post request to endpoint
             type: "POST",
             url: `/levelOfEffort`,
             contentType: 'application/json',
             data: JSON.stringify({
               formData: $("#addEffortRequest").serializeArray(),
               configuration: {
                 uName: username,
                 pWord: password,
                 serv: server,
                 instance: instanceName,
                 db: database
               }
             }),
             success: function(data) {
                 alert(data);
             },
             error: function(err) {
                 console.log(err)
             }
           });
})

$('#addDeveloperRequest').submit(function (evt) {
      evt.preventDefault(); //prevents the default action

      $.ajax({ // Make post request to endpoint
             type: "POST",
             url: `/developerInput`,
             contentType: 'application/json',
             data: JSON.stringify({
               formData: $("#addDeveloperRequest").serializeArray(),
               configuration: {
                 uName: username,
                 pWord: password,
                 serv: server,
                 instance: instanceName,
                 db: database
               }
             }),
             success: function(data) {
                 alert(data);
             },
             error: function(err) {
                 console.log(err)
             }
           });
})

$('#pendingDevelopmentInputRequest').submit(function (evt) {
      evt.preventDefault(); //prevents the default action

      $.ajax({ // Make post request to endpoint
             type: "POST",
             url: `/pendingDevelopment`,
             contentType: 'application/json',
             data: JSON.stringify({
               formData: $("#pendingDevelopmentInputRequest").serializeArray(),
               configuration: {
                 uName: username,
                 pWord: password,
                 serv: server,
                 instance: instanceName,
                 db: database
               }
             }),
             success: function(data) {
                 alert(data);
             },
             error: function(err) {
                 console.log(err)
             }
           });
})

$('#configuration').submit(function (evt) {
      evt.preventDefault(); //prevents the default action

      // Assign default global values
      username = document.getElementById("configurationUsername").value;
      password = document.getElementById("configurationPassword").value;
      server = document.getElementById("configurationServer").value;
      instanceName = document.getElementById("configurationInstanceName").value;
      database = document.getElementById("configurationDatabase").value;

      $.ajax({ // Make post request to endpoint
             type: "POST",
             url: `/configuration`,
             contentType: 'application/json',
             data: JSON.stringify({
               formData: $("#configuration").serializeArray(),
               configuration: {
                 uName: username,
                 pWord: password,
                 serv: server,
                 instance: instanceName,
                 db: database
               }
             }),
             success: function(data) {
                 alert(data);
             },
             error: function(err) {
                 console.log(err)
             }
           });
})


$('#DevelopmentInputRequest').submit(function (evt) {
      evt.preventDefault(); //prevents the default action

      $.ajax({ // Make post request to endpoint
             type: "POST",
             url: `/development`,
             contentType: 'application/json',
             data: JSON.stringify({
               formData: $("#DevelopmentInputRequest").serializeArray(),
               configuration: {
                 uName: username,
                 pWord: password,
                 serv: server,
                 instance: instanceName,
                 db: database
               }
             }),
             success: function(data) {
                 alert(data);
             },
             error: function(err) {
                 console.log(err)
             }
           });
})

var lastFormValue = 1;

function onloadBody() {
	$('.form-view.form-view-1').fadeIn();
}

function onchangeFormSelect() {
	var newFormValue = document.getElementById('form-select').value;

	$('.form-view.form-view-' + lastFormValue).fadeOut();

	setTimeout(function() {
		$('.form-view.form-view-' + newFormValue).fadeIn();
	}, 500);

	lastFormValue = newFormValue;
}
