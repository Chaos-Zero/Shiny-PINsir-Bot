const fs = require("fs");

eval(fs.readFileSync("./public/database/read.js") + "");
eval(fs.readFileSync("./public/database/write.js") + "");

// Active raids hosting message
function SaveHostMessage(db, username, message) {
  var dbUsers = [];
  var users = db.get("users").value();
  console.log("users: " + users);
  users.forEach(function(user) {
    dbUsers.push([user.username]); // adds their info to the dbUsers value
  });
  console.log("dbusers: " + dbUsers);
  if (dbUsers.some(elem => elem == username)) {
    console.log("Updating " + username);
    UpdateUser(db, "users", username, { message: message });
  } else {
    // Set a user using Lodash shorthand syntax
    console.log("writing " + username);
    db.get("users")
      .push({ username: username, message: message })
      .write();
  }
}

// Lottery Giveway time
function SaveGiveawayTime(db, username, endBool) {
  var muteTime;
  var tableName = "giveaways";
  if (endBool) {
    var currentDateTime = new Date();
    var gmtDate = currentDateTime;
    const fiveHours = 60 * 60 * 5 * 1000;
    muteTime = new Date(gmtDate.getTime() + fiveHours);
  } else {
    muteTime = "";
  }
  var dbUsers = GetDbUsers(db, tableName);
  if (dbUsers.some(elem => elem == username)) {
    console.log("Updating " + username);
    UpdateUser(db, tableName, username, { timeUntilMute: muteTime });
  } else {
    // Set a user using Lodash shorthand syntax
    console.log("writing " + username);
    db.get("giveaways")
      .push({ username: username, message: muteTime })
      .write();
  }
}
