// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const fs = require("fs");

eval(fs.readFileSync("./public/entry.js") + "");

const app = express();

//Set up bot
const bot = CreateBot();
SetAcEntries();
SetErEntries();
async function SendSerebiiAfterDownload(){
  await FetchSerebii();
  await new Promise(resolve => setTimeout(resolve, 5000));
  SendSerebiiNews(GetDb(), bot, serebiiNewsHtml);
};
SendSerebiiAfterDownload();

var count = 10;

// Deal with Discord Messages
bot.on("messageCreate", (message) => {
  //console.log(message)
  let thisChannel = message.channel;
  CheckForBadWords(message, thisChannel);

  CheckForCommand(message, thisChannel, bot, db);
  // Remove auto pin message
  if (message.type === "PINS_ADD") {
    message.delete();
    GetPinnedMessages(thisChannel).then((result) => {
      console.log("Got PinnedMessages");
      console.log("Writing user " + result[0].author.username);
      SavePinMessage(
        GetDb(),
        result[0].author.username,
        result[0],
        thisChannel
      );
    });
  }
  //pinnedMessages.forEach(message => console.log(message));
  if (thisChannel.name === "raids") {
    CheckForBlacklist(message, thisChannel);
    CheckForFriendBlacklist(message, thisChannel);
    // Disable begging
    CheckForBegging(message, thisChannel);
  }

  CheckForDumb(message, thisChannel);
  CheckForGood(message, thisChannel);
  CheckForLove(message, thisChannel);
  //Do not remove
  ResetStringFoundCheck();

  if (thisChannel.name === "❥-giveaways") {
    if (message.author.bot) {
      console.log("We got here. I am a bot?");
      if (message.author.username == "GiveawayBot") {
        SetUserMutedTime(GetDb(), message);
      }
    } else {
      console.log("Yay, I'm not a bot");
      MoveIfMuted(GetDb(), message);
    }
  }
});

bot.on("messageUpdate", (oldMessage, newMessage) => {
  if (newMessage.author.bot) {
    if (newMessage.author.username == "GiveawayBot") {
      SetUserMutedTime(GetDb(), newMessage);
    }
  }
});

// Deal with DMs
bot.on("messageCreate", function(msg) {
  if (msg.content.toLowerCase() == "templates") {
    SendTemplateMessage(msg);
  } else if (msg.content.toLowerCase() == "jargon") {
    JargonMessage(msg);
  } else if (msg.content.toLowerCase() == "commands") {
    SendCommandMessages(msg);
  } else if (msg.content.toLowerCase() == "add") {
    ChangeId(GetDb(), msg);
  } else if (msg.content.toLowerCase() == "gameid") {
    GameId(GetDb(), msg);
  } else if (msg.content.toLowerCase() == "remove") {
    RemoveId(GetDb(), msg);
  }
});

//bot.on("messageDelete", async (messageDelete) => {
//  var content = messageDelete.content;
//  if (messageDelete.content.includes("and/or") && !messageDelete.author.bot) {
//    content = "I cannot allow you to remove that message. This is important for people to read.\n" + messageDelete.author.username + " sent this message:\n " + content;
//  }
//  messageDelete.channel.send(content);
//});

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/index.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

var minutes = 30, the_interval = minutes * 60 * 1000;
setInterval(function() {
  // Updating Serebii news
  SendSerebiiAfterDownload()
}, the_interval);
