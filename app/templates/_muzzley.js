  var myAppToken = '<%= muzzleyKey %>';

  muzzley.on('error', function (err) {
    console.log("Error: " + err);
  });

  muzzley.connectApp(myAppToken, function (err, activity) {
    if (err) return console.log("Connect error: " + err);

    // Usually you'll want to show this Activity's QR code image
    // or its id so that muzzley users can join.
    // They are in the `activity.qrCodeUrl` and `activity.activityId`
    // properties, respectively.
    console.log(activity);
    document.getElementById('qrCodeContainer').src = activity.qrCodeUrl;

    activity.on('participantQuit', function (participant) {
      // A participant quit
    });

    activity.on('participantJoin', function (participant) {

      // A participant joined. Tell him to transform into a gamepad.
      participant.changeWidget('gamepad', function (err) {
        if (err) return console.log('changeWidget error: ' + err );
      });

      participant.on('action', function (action) {
        // The action object represents the participant's interaction.
        // In this case it might be "button 'a' was pressed".
        console.log(action);
      });

      participant.on('quit', function () {
        // You can also check for participant quit events
        // directly in each participant object.
      });

    });
  });