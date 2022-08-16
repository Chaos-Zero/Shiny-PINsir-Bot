const { Client, RichEmbed } = require("discord.js");
const Discord = require("discord.js");
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const fs = require("fs");
const ytdl = require("ytdl-core");
const DiscordMusicPlayer = require('@discordjs/voice');

eval(fs.readFileSync("./public/database/read.js") + "");
eval(fs.readFileSync("./public/database/write.js") + "");
eval(fs.readFileSync("./public/utils/discordutils.js") + "");

function GetDbTable(db, table) {
  return db.get(table).value();
}

function getYoutubeId(mainUrl) {
  var url = mainUrl;
  var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  if (match && match[2].length == 11) {
    return match[2];
  } else {
    return "dQw4w9WgXcQ";
  }
}

async function UserTheme(db, message) {
  const args = message.content.split(" ");
  if (!args[2]) {
    SendSound(db, message);
  } else {
    if (args[2].toLowerCase() == "add") {
      if (args[3]) {
        SaveVideoUrl(db, message, args[3]);
      } else {
        message.channel.send("No url specified");
      }
    } else if (args[2].toLowerCase() == "stop") {
      StopSound(message);
    } else {
      SendSound(db, message);
    }
  }
}

// { username: "test", url: "test", videoTitle: "test" }

async function SaveVideoUrl(db, message, url) {
  message.delete();
  if (url == "https://www.youtube.com/watch?v=dQw4w9WgXcQ" || url == "https://www.youtube.com/watch?v=iik25wqIuFo" || url == "https://www.youtube.com/watch?v=oHg5SJYRHA0") {
    message.
  channel.send({ content: "**NO U**", 
      files: [
        "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FpinRickRollin.gif?v=1615475691394"
      ]
    });
    return;
  }
  const username = message.author.username;
  var dbUsers = [];
  const tableName = "ghUsers";
  var users = db.get(tableName).value();
  users.forEach(function(user) {
    dbUsers.push({ id: user.userId }); // adds their info to the dbUsers value
  });

  if (dbUsers.some(elem => elem.id == message.author.id)) {
    //var youtubeId = getYoutubeId(url);
    var youtubeTitle = "empty";

    UpdateUserId(db, tableName, message.author.id, {
      username: username,
      url: url,
      videoTitle: youtubeTitle,
      userId: message.author.id
    });
  } else {
    // Set a user using Lodash shorthand syntax
    db.get(tableName)
      .push({
        username: username,
        url: url,
        videoTitle: youtubeTitle,
        userId: message.author.id
      })
      .write();
  }
  message.channel.send(
    " <@" + message.author.id + "> has set a new theme song!"
  );
}

// Read from DB
async function GetGhUsers(db) {
  var tableName = "ghUsers";
  var dbUsers = [];

  var table = GetDbTable(db, tableName);
  table.forEach(function(user) {
    dbUsers.push({
      username: user.username,
      url: user.url,
      videoTitle: user.videoTitle,
      userId: user.userId
    }); // adds their info to the dbUsers value
  });
  //console.log(table);
  // Lowdb has lazy returns but no promise so we have to wait.
  await new Promise(r => setTimeout(r, 1000));
  return dbUsers;
}

async function GetUserGh(db, message) {
  var users = await GetGhUsers(db);
  
  const args = message.content.split(" ");
  var foundUser = "empty";
  var sanitisedUser;
  if (!args[3]) {
    sanitisedUser = message.author.id.replace(/[^0-9]/g, "");
  } else {
    sanitisedUser = args[3].replace(/[^0-9]/g, "");
  }
  for (let dbUser of users) {
    if (dbUser.userId == sanitisedUser) {
      foundUser = await dbUser;
      break;
    }
  }
  //{ username: "test", url: "test", videoTitle: "test", userId: "id", successGuess: ["user", "guess"] }
  console.log("Found the user: " + foundUser.userId);
  if (foundUser == "empty" || !foundUser.url) {
    message.channel.send("It appears this user has not set up a theme song.");
    return "empty";
  }

  return foundUser;
}

// Join a channel, send a message - needs to be manually disconnected.
async function SendSound(db, message) {
  var user = await GetUserGh(db, message);
  console.log("Url is: " + user.url);
  message.delete();
  var discordUser = GetUserFromId(message, user.userId);

  var embed = new Discord.EmbedBuilder()
    .setTitle("Playing " + user.username + "'s theme in 🔊Lobby")
    .setColor("0x0000FF")
    .setDescription("Use reaction to stop or `$pinsir theme stop`")
    .setThumbnail(discordUser.displayAvatarURL());

  message.channel
    .send({embeds: [embed], allowedMentions: { repliedUser: false } })
    .then(m => {
      m.react("⏹️");

      const leftFilter = reaction => reaction.emoji.name === "⏹️";
      var filter = (reaction, user) => ["⏹️"].includes(reaction.emoji.name);
      const collector = m.createReactionCollector(
        // only collect left and right arrow reactions from the message author
        {
        filter, time: 10 * 60 * 1000
        }
      ); // 10 min

      collector.on("collect", async (reaction, user) => {
        if (!user.bot) {
          reaction.remove();
          StopSound(message);
          var embed = new Discord.EmbedBuilder()
            .setTitle("Add your own theme!")
            .setColor("0xFF0000")
            .setDescription(
              "Use `$pinsir theme add [youtube url]`" +
                "\n\nYou can play your theme using `$pinsir theme play`.\nAdd a user id or ping to play another users theme."
            )
            .setThumbnail(
              "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FConductor.png?v=1615424184972"
            );
          m.edit({embeds : [embed]});
        }
      });
      collector.on("end", async (reaction, user) => {
        reaction.remove();
        var embed = new Discord.EmbedBuilder()
          .setTitle("Add your own theme!")
          .setColor("0xFF0000")
          .setDescription(
            "Use `$pinsir theme add [youtube url]`" +
              "\n\nYou can play your theme using `$pinsir theme play`.\nAdd a user id or ping to play another users theme."
          )
          .setThumbnail(
            "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FConductor.png?v=1615424184972"
          );
        m.edit({embeds: [embed]});
      });
    })
    .catch(err => console.error(err));

    var voiceChannel = GetChannelByName(message, "Lobby");
		const stream = ytdl(user.url, { filter: 'audioonly', highWaterMark: 1 << 25 });

		const channel = message.member.voice.channel;

		const player = createAudioPlayer();
		const resource = createAudioResource(stream);

		const connection = joinVoiceChannel({
			channelId: voiceChannel.id,
			guildId: message.guild.id,
			adapterCreator: message.guild.voiceAdapterCreator, 
      selfDeaf: false
		});
    
		player.play(resource);
		connection.subscribe(player);

		player.on(DiscordMusicPlayer.AudioPlayerStatus.Idle, () => {
			StopSound(message)
		});
  
  
  
  
  
    //const connection = joinVoiceChannel({channelId:voiceChannel.id, guildId: message.guildId, adapterCreator: message.guild.voiceAdapterCreator, selfDeaf: false})
    
    //const stream =  ytdl(user.url, { filter: 'audioonly' });
    
		//const player = createAudioPlayer();
		//const resource = createAudioResource(stream);
    
    //player.play(resource);
		//connection.subscribe(player);

		//player.on(Discord.AudioPlayerStatus.Idle, () => {
		//	connection.destroy();
		//});
  
  
  
    //.then(connection => {
    //  const dispatcher = connection.play(
    //    ytdl(
    //      user.url,
    //      {
    //       filter: "audio",
    //        quality: "highestaudio",
    //        highWaterMark: 1 << 25
    //      },
    //      { volume: 0.15 }
    //    )
    //  );
    //  dispatcher.on("end", end => {
    //    voiceChannel.leave();
    //  });
    //})
    //.catch(console.error);
}

function StopSound(message) {
  var voiceChannel = GetChannelByName(message, "Lobby");
  const connection = DiscordMusicPlayer.joinVoiceChannel({
			channelId: voiceChannel.id,
			guildId: message.guild.id,
			adapterCreator: message.guild.voiceAdapterCreator, 
      selfDeaf: false
		});
  connection.destroy();
}
