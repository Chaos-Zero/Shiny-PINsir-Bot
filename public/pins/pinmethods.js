const fs = require("fs");

eval(fs.readFileSync("./public/database/read.js") + "");
eval(fs.readFileSync("./public/database/write.js") + "");

function PinMessage(message) {
  const channel = message.channel;
  var pinnedMessage = false;
  if (channel.name == "raids" ) {
    const pinMessages = [];
    var msg;
    channel.messages.fetch({ limit: 20 }).then(msgs => {
      console.log("We have the messages.");
      const pinned = msgs.forEach(msg => pinMessages.push(msg));

      for (msg of pinMessages) {
        if (
          msg.author.username == message.author.username &&
          msg.content.toLowerCase().includes("ign")
        ) {
          msg.pin();
          console.log(message.author.id);
          channel.send(
            "<@" + message.author.id + "> has pinned a message! :eyes:"
          );

          pinnedMessage = true;
          break;
        }
      }
      if (pinnedMessage == false) {
        if (channel.name == "raids") {
          channel.send(
            "I only pin messages I recognise as raids.\nDoes your raid have all the necessary fields? \nType `$pinsir template raid` for a raid template you can fill out!"
          );
        } else if (channel.name == "live-giveaway") {
          channel.send(
            "I only pin messages I recognise as live giveaways.\nDoes your giveaway have all the necessary fields? \nType `$pinsir template giveaways` for a giveaway template you can fill out!"
          );
        }
      }
    });
  } else {
    var raids = GetChannelByName(message, "raids");
    var giveaway = GetChannelByName(message, "live-giveaway");
    channel.send(
      "I only pin raids and live giveway messages in " +
        raids.toString() +
        " and " +
        giveaway.toString()
    );
  }
}

function RemovePins(message) {
  const messageToDelete = [];
  var msg;
  message.channel.messages.fetchPinned().then(msgs => {
    const pinned = msgs.forEach(msg => messageToDelete.push(msg));
    messageToDelete.forEach(msg => {
      if (msg.author.id == message.author.id) {
        if (msg.content.includes("IGN:") || msg.content.includes("SW-") || msg.content.toLowerCase().includes("in game name")) {
          msg.unpin();
        }
      }
      if (
        msg.author.username == "STFU-READTHEPINS-BOT" ||
        msg.author.username == "PINsir-Bot"
      ) {
        if (msg.content.includes(message.author.id)) {
          msg.delete();
        }
      }
    });
  });
}

function DeletePinsirMessages(message) {
  const messageToDelete = [];
  var msg;
  message.channel.messages.fetch({ limit: 20 }).then(msgs => {
    console.log("We have the messages.");
    const pinned = msgs.forEach(msg => messageToDelete.push(msg));
    messageToDelete.forEach(msg => {
      if (
        msg.author.username == "STFU-READTHEPINS-BOT" ||
        msg.author.username == "PINsir-Bot"
      ) {
        if (
          msg.content.includes("Please direct questions") ||
          msg.content.includes("The message doesn't exist.") ||
          msg.content.includes(
            "Sorry, I cannot find the channel you are trying to send this message to."
          )
        ) {
          msg.delete();
        }
      }
    });
  });
}

function GetPinnedMessages(channel) {
  return new Promise(function(resolve, reject) {
    var messages;

    resolve(
      channel.messages.fetchPinned().then(val => {
        var pinned = [];

        console.log("Pins received from discord");
        const messages = val.forEach(msg => pinned.push(msg));
        return pinned;
      })
    );
  });
}

function Repin(db, message) {
  const channel = message.channel;
  var repinMessageId;
  var type;
  GetRepinMessage(db, message);
  if (channel.name == "raids") {
    type = "hosting a den";
  } else if (channel.name == "live-giveaway") {
    type = "holding a giveaway";
  } else {
    var raids = GetChannelByName(message, "raids");
    var giveaway = GetChannelByName(message, "live-giveaway");
    channel.send(
      "This command can only be used in " +
        raids.toString() +
        " and " +
        giveaway.toString() +
        "."
    );
    DeletePinsirCommand(message);

    return;
  }

  repinMessageId = GetRepinMessage(db, message);
  console.log("repinMessageId: " + repinMessageId[1]);
  GetMessageFromId(message, repinMessageId[1])
    .then(result => {
      console.log("Got Message by ID");
      result.pin();
      channel.send("<@" + message.author.id + "> is now " + type + "!\n");
      DeletePinsirCommand(message);
    })
    .catch(function() {
      console.log("\nWe're here\n");
      var repinMessage = RepinLastMessage(db, message);
      if (repinMessage[0] == true) {
        channel
          .send(
            "<@" +
              message.author.id +
              "> is now " +
              type +
              ":\n" +
              RepinLastMessage(db, message)[1]
          )
          .then(msg => msg.pin())
          .then(function() {
            DeletePinsirCommand(message);
          });
      } else {
        channel.send(repinMessage[1]);
      }
    });
}

// Read from DB
function GetRepinMessage(db, message) {
  var messageId;
  var tableName;
  var pinType;
  if (message.channel.name == "raids") {
    tableName = "pinMessages";
    pinType = "raid";
  } else if (message.channel.name == "live-giveaway") {
    tableName = "liveGiveawayPinMessages";
    pinType = "giveway";
  }
  var dbUsers = GetDbUsers(db, tableName);
  if (dbUsers.some(elem => elem == message.author.username)) {
    messageId = GetDataForUser(db, tableName, message.author.username)
      .messageId;
    return [true, messageId];
  } else {
    return [
      false,
      "Sorry, it doesn't look like you have pinned a previous " +
        pinType +
        ". \nTry setting up a new one and pinning it to use this command in the future."
    ];
  }
}

function RepinLastMessage(db, message) {
  var messages = [];
  var entry;

  var tableName;
  if (message.channel.name == "raids") {
    tableName = "pinMessages";
  } else if (message.channel.name == "live-giveaway") {
    tableName = "liveGiveawayPinMessages";
  }

  var dbUsers = GetDbUsers(db, tableName);
  if (dbUsers.some(elem => elem == message.author.username)) {
    message = GetDataForUser(db, tableName, message.author.username).message
      .content;
    return [true, message];
  } else {
    return [
      false,
      "Sorry, it doesn't look like you have pinned a previous raid. \nTry setting up a new one and pinning it to use this command in the future."
    ];
  }
}

// Write to db
function SavePinMessage(db, username, message, channel) {
  var tableName;
  if (channel.name == "raids") {
    tableName = "pinMessages";
  } else if (channel.name == "live-giveaway") {
    tableName = "liveGiveawayPinMessages";
  }
  var dbUsers = GetDbUsers(db, tableName);
  console.log("dbusers: " + dbUsers);
  var sanitisedMessageId = message.id.replace(/[^0-9]/g, "");
  if (dbUsers.some(elem => elem == username)) {
    console.log("Updating " + username);
    UpdateUser(db, tableName, username, {
      message: message,
      messageId: sanitisedMessageId
    });
  } else {
    // Set a user using Lodash shorthand syntax
    console.log("writing " + username);
    db.get(tableName)
      .push({
        username: username,
        message: message,
        messageId: sanitisedMessageId
      })
      .write();
  }
}
