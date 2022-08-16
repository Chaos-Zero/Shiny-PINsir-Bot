// Required Declarations
const { Client, RichEmbed } = require("discord.js");
const Discord = require("discord.js");

const fs = require("fs");

eval(fs.readFileSync("./public/database/read.js") + "");
eval(fs.readFileSync("./public/database/write.js") + "");

function GetMessageFromId(message, messageId) {
  return new Promise(function(resolve, reject) {
    resolve(
      message.channel.messages.fetch(messageId).then(val => {
        console.log("Got Message from ID");
        return val;
      })
    );
    reject(console.log("Not a message"));
  });
}

function GetUserFromId(message, userId) {
  var discordUser = message.client.users.cache.find(user => user.id == userId);

  return discordUser;
}

function GetChannelByName(message, channelString) {
  var channel = message.guild.channels.cache.find(
    ch => ch.name === channelString
  );

  return channel;
}

function MoveMessage(message, channelString, canMove) {
  try {
    message.guild.channels.cache
      .find(ch => ch.name === channelString)
      .send(
        "<@" +
          message.author.id +
          "> sent this message in " +
          message.channel.toString() +
          ": \n> " +
          message.content
      );
  } catch {
    canMove = false;
    DeletePinsirMessages(message);
    message.channel.send(
      "Sorry, I cannot find the channel you are trying to send this message to."
    );
  }
}

function ModMoveMessage(message) {
  var argument = message.content.split(" ");
  var messageId = argument[2];
  var channel = argument[3];
  var canMove = true;
  if (
    message.member.roles.cache.some(role => role.name === "Owner") ||
    message.member.roles.cache.some(role => role.name === "Admin")
  ) {
    GetMessageFromId(message, messageId)
      .then(result => {
        console.log("Got Message by ID");
        MoveMessageChannel(result, channel, canMove);
        message.delete();
        console.log("Deleting: " + result.content);
        //result.delete();
      })
      .catch(function() {
        DeletePinsirMessages(message);
        message.channel.send(
          "The message doesn't exist. Make sure the message ID is correct."
        );
      })
      .then(function() {
        return;
      });
  } else {
    message.channel.send("Only Admins and Mods can move messages.");
  }
  message.delete();
}

function MoveMessageChannel(message, channel, canMove) {
  try {
    var formattedChannel = channel.replace(/[^0-9]/g, "");
    console.log(formattedChannel);
    message.guild.channels.cache
      .find(ch => ch.id === formattedChannel)
      .send(
        "<@" +
          message.author.id +
          "> sent this message in " +
          message.channel.toString() +
          ": \n> " +
          message.content
      );
    message.delete();
  } catch {
    canMove = false;
    message.channel.send(
      "Sorry, I cannot find the channel you are trying to send this message to."
    );
  }
}

function SetUserMutedTime(db, message) {
  var endBool = message.content.includes("GIVEAWAY ENDED") ? true : false;
  const giveawayUser = GetGiveawayUser(message);
  if (giveawayUser) {
    SaveGiveawayTime(db, GetGiveawayUser(message), endBool);
  }
}

function GetGiveawayUser(message) {
  const hostedString = "Hosted by:";
  var embedContent = "";
  if (message.embeds[0]) {
    if (message.embeds[0].description.includes(hostedString)) {
      embedContent = message.embeds[0].description;
    }
  }
  //With two split
  var username = "";
  try {
    username = embedContent.split(hostedString)[1].split(" ")[1];
    username = username.replace(/[^0-9]/g, "");
  } catch (err) {
    ("No embed available.");
  }
  return username;
}

function GetGiveawayTime(message) {
  const hostedString = "Hosted by:";
  var embedContent = "";
  if (message.embeds[0]) {
    if (message.embeds[0].description.includes(hostedString)) {
      embedContent = message.embeds[0].description;
    }
  }
  //With two split
  var username = "";
  try {
    username = embedContent.split(hostedString)[1].split(" ")[1];
    username = username.replace(/[^0-9]/g, "");
    console.log("Sanitised user: " + username);
  } catch (err) {
    ("No embed available.");
  }
  return username;
}

function CheckIfMessageExists(message, messageId) {
  return new Promise(function(resolve, reject) {
    resolve(
      message.channel.messages.fetch(messageId).then(val => {
        console.log("Got Message from ID");
        return val;
      })
    );
    reject(console.log("Not a message"));
  });
}

function MoveIfMuted(db, message) {
  if (
    message.member.roles.cache.some(role => role.name === "Admins") ||
    message.member.roles.cache.some(role => role.name === "Mods") ||
    message.member.roles.cache.some(role => role.name === "Contributors")
  ) {
    return;
  }
  const user = message.author.id;
  var time = "N/A";
  var dbUsers = [];
  var users = db.get("giveaways").value();
  users.forEach(function(user) {
    dbUsers.push([user.username]); // adds their info to the dbUsers value
  });
  try {
    time = db
      .get("giveaways")
      .find({ username: user })
      .value();
  } catch (err) {
    console.log("User not found in DB");
  }
  console.log(time);
  if (time === undefined) {
    HandleMute(message);
  } else if (time.timeUntilMute == "") {
    return;
  } else if (Date.parse(time.timeUntilMute) < new Date()) {
    MoveMessage(message, "★-general");
    message.delete();
    DeletePinsirMessages(message);
    SendPinsirMoveMessage(message);
  }
}

function HandleMute(message) {
  MoveMessage(message, "★-general");
  message.delete();
  DeletePinsirMessages(message);
  SendPinsirMoveMessage(message);
}

function SendPinsirMoveMessage(message) {
  message.channel.send(
    "Please direct questions or general comments to the " +
      message.guild.channels.cache
        .find(ch => ch.name === "★-general")
        .toString() +
      " channel."
  );
}

function DeletePinsirCommand(message) {
  console.log("Checking for the channel: " + message.channel.name);
  if (!(message.channel.name == "bot-commands")) {
    message.delete();
  }
}

// Sets a DM to users with tempdm role
function DmSend(message) {
  const Role = message.guild.roles.cache.find(role => role.name == "tempdm");
  message.guild.members.fetch().then(members => {
    var roleMembers = members
      .filter(member => member.roles.cache.find(role => role == Role))
      .map(member => member.user);
    for (let i = 0; i < roleMembers.length; i++) {
      console.log("Message sent to: " + roleMembers[i].username);
      roleMembers[i].send("You've been MEATBALLED", {
        files: [
          "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FMeatballed.gif?v=1609553498357"
        ]
      });
    }
  });
}

// Gives a role to everyone in the server
async function roleAssign(message) {
  message.guild.members.fetch().then(members => {
    members.forEach(member => {
      member.roles.add("659830066297176074").catch(e => console.error(e));
    });
  });
}

// Fun stuff
function SusImage(message) {
  var argument = message.content.split(" ");
  var name = "u";
  if (argument[2]) {
    var pingedMember = message.mentions.members.first();

    try {
      console.log("Member: " + pingedMember.user.username);
      name = pingedMember.user.username;
    } catch {
      name = argument[2];
    }
  }

  var request = require("request");
  var username = process.env.img_flip_username;
  var password = process.env.img_flip_password;

  const text = name + " looks pretty sus";
  var formData = {
    template_id: "289266869", //"280738345",
    username: username,
    password: password,
    text0: "",
    text1: text.toString(),
    font: "lucida_console",
    max_font_size: 65
  };

  request.post(
    "https://api.imgflip.com/caption_image",
    {
      form: formData
    },
    function(error, response, body) {
      var meme = JSON.parse(body);

      if (!error && response.statusCode == 200) {
        message.channel.send("", {
          files: [meme.data.url]
        });
      }
    }
  );
}

async function Meatballed(message, users) {
  var name = message.author.username;

  let sendMessageFunction = function(message, sanitisedUserId) {
    message.client.users.fetch(sanitisedUserId).then(user => {
      user.send(name + " got you!\nYou've been **MEATBALLED**", {
        files: [
          "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FPinMeatballed.gif?v=1609600983767"
        ]
      });
    });
  };

  var length = users.length;

  for (let i = 2; i < length; i++) {
    sendMessageFunction(message, users[i].replace(/[^0-9]/g, ""));
  }
  var channel = message.guild.channels.cache.find(
    ch => ch.id == "794269032030404608"
  );

  channel.send("Someone just got **Meatballed**!");
  channel.send("<a:pinmeat:795462296604377139>");
}

// Join a channel, send a message - needs to be manually disconnected.
//function SendSound(message) {
//  var voiceChannel = GetChannelByName(message, "Gaming");
//  voiceChannel
//    .join()
//    .then(connection => {
//      const dispatcher = connection.play(
//        "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FCircus%20-%20Theme%20Song.mp3"
//      );
//      dispatcher.on("end", end => {
//        voiceChannel.leave();
//      });
//    })
//    .catch(console.error);
//}
