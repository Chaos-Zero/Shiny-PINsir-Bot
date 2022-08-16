const { Client, RichEmbed } = require("discord.js");
const Discord = require("discord.js");
const fs = require("fs");

eval(fs.readFileSync("./public/database/read.js") + "");
eval(fs.readFileSync("./public/database/write.js") + "");

//    {
//      platform: [
//        {
//          userId: "0123456",
//          username: "testUser",
//          switch: ["switch", "123456789100"],
//          ps: "playstation",
//          xbox: "xbox",
//          steam: ["steam", "12345678"],
//          epic: "epic",
//          battlenet: "battlenet",
//          origin: "origin",
//          uplay: "uplay"
//        }
//      ]
//    },

async function GameId(db, message) {
  const args = message.content.split(" ");

  if (message.content.toLowerCase().includes("add")) {
    ChangeId(db, message);
  } else if (message.content.toLowerCase().includes("remove")) {
    RemoveId(db, message);
  } else {
    GetPlatformsForUser(db, message);
  }
}

// Read from DB
async function GetUserPlatforms(db) {
  var tableName = "platform";
  var dbUsers = [];

  var table = GetDbTable(db, tableName);
  table.forEach(function(user) {
    dbUsers.push({
      id: user.userId,
      username: user.username,
      swithUser: user.switch[0],
      switchId: user.switch[1],
      ps: user.ps,
      xbox: user.xbox,
      steamUser: user.steam[0],
      steamId: user.steam[1],
      epic: user.epic,
      battlenet: user.battlenet,
      origin: user.origin,
      uplay: user.uplay
    }); // adds their info to the dbUsers value
  });
  // Lowdb has lazy returns but no promise so we have to wait.
  await new Promise(r => setTimeout(r, 500));
  return dbUsers;
}

//    {
//      platform: [
//        {
//          userId: "0123456",
//          username: "test",
//          switch: [{ username: "switch", id: "123456789100" }],
//          ps: [{ username: "playstation" }],
//          xbox: [{ username: "xbox" }],
//          steam: [{ username: "steam", id: "12345678" }],
//          epic: [{ username: "epic" }],
//          battlenet: [{ username: "battlenet" }],
//          origin: [{ username: "origin" }],
//          uplay: [{ username: "uplay" }]
//        }
//      ]
//    },

async function GetPlatformsForUser(db, message) {
  var dbUsers = await GetUserPlatforms(db);
  const args = message.content.split(" ");
  var foundUser = "empty";
  var sanitisedUser;
  if (!args[2]) {
    sanitisedUser = message.author.id.replace(/[^0-9]/g, "");
  } else {
    sanitisedUser = args[2].replace(/[^0-9]/g, "");
  }
  for (let dbUser of dbUsers) {
    if (dbUser.id == sanitisedUser) {
      console.log("Found the user: " + dbUser.id);
      foundUser = dbUser;
      break;
    }
  }
  console.log("Found the user: " + foundUser.id);
  if (foundUser == "empty") {
    message.channel.send(
      "It appears this user has not set up their Game ID's.\nUse `$pinsir gameid add` to enter details in a DM."
    );
  } else {
    SendGameIdEmbed(foundUser, message);
  }
}

async function GetPlatforms(db, message) {
  var users = await GetUserPlatforms(db);
  console.log(users);
  var user = users[0];
  SendGameIdEmbed(user, message);
}

function CheckForEntry(string) {
  if (string === "") {
    return "n/a";
  } else {
    return string;
  }
}

async function ChangeId(db, message) {
  var dbUsers = await GetUserPlatforms(db);
  const args = message.content.split(" ");
  var foundUser;
  const tableName = "platform";

  dbUsers.forEach(
    await function(user) {
      if (user.id == message.author.id) {
        console.log("Found the user: " + user.id);
        foundUser = user;
        return;
      }
    }
  );

  //userId: "0123456",
  //        username: "testUser",
  //        switch: ["switch", "123456789100"],
  //        ps: "playstation",
  //        xbox: "xbox",
  //        steam: ["steam", "12345678"],
  //        epic: "epic",
  //        battlenet: "battlenet",
  //        origin: "origin",
  //        uplay: "uplay"

  if (dbUsers.some(elem => elem.id == message.author.id)) {
    const index = dbUsers
      .map(function(e) {
        return e.name;
      })
      .indexOf(message.author.id);
  } else {
    console.log("Couldn't find user");
    db.get(tableName)
      .push({
        userId: message.author.id,
        username: message.author.username,
        switch: ["n/a", "n/a"],
        ps: "n/a",
        xbox: "n/a",
        steam: ["n/a", "n/a"],
        epic: "n/a",
        battlenet: "n/a",
        origin: "n/a",
        uplay: "n/a"
      })
      .write();
  }

  // Set a user using Lodash shorthand syntax
  message.author.createDM().then(dmchannel => {
    //if (!foundUser) {
    var Embed = new Discord.EmbedBuilder()
      .setTitle("Add Game Credentials")
      .setColor("0xffffff")
      .setThumbnail(
        "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FmlgBotSeat.png?v=1611365651832"
      )
      .setDescription(
        "Select the platform you would like to **save** credentials for.\n > Example: Reply `1` or `Switch` to then input Switch credentials."
      )
      .addFields(
        {
          name: "1. Switch",
          value: "<:switch:800296181111455785>",
          inline: true
        },
        {
          name: "2. Playstation",
          value: "<:ps:800296183515316244>",
          inline: true
        },
        {
          name: "3. Xbox",
          value: "<:xbox:800296181669822495>",
          inline: true
        },
        {
          name: "4. Steam",
          value: "<:steam:800296183397744670>",
          inline: true
        },
        {
          name: "5. Epic",
          value: "<:epic:800296182458482728>",
          inline: true
        },
        {
          name: "6. Battlenet",
          value: "<:battlenet:800296531244351508>",
          inline: true
        },
        {
          name: "7. Origin",
          value: "<:origin:801150825954803774>",
          inline: true
        },
        {
          name: "8. Uplay",
          value: "<:uplay:801150826172645397>",
          inline: true
        },
        {
          name: "\u200B",
          value: "\u200B",
          inline: true
        }
      )
      .setFooter({
        text: "danimyuu ♡",
        iconURL: "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FMewditto.png?v=1609471789850"}
      );
    dmchannel.send(({embeds: [Embed]}));
    //}

    const filter = m => m.author.id === message.author.id;
    dmchannel
      .awaitMessages({filter,  max: 1, time: 30000, errors: ["time"] })
      .then(collected => {
        switch (String(collected.first().content.toLowerCase())) {
          case "1":
          case "switch":
            var username, id;
            dmchannel
              .send("Please enter your Switch Username:")
              .then(
                dmchannel
                  .awaitMessages({filter, 
                    max: 1,
                    time: 30000,
                    errors: ["time"]
                  })
                  .then(collected => {
                    username = CheckForEntry(collected.first().content);

                    dmchannel
                      .send(
                        "Please enter your Switch Friend Code (only the numbers, without spaces):"
                      )
                      .then(
                        dmchannel
                          .awaitMessages({filter, 
                            max: 1,
                            time: 30000,
                            errors: ["time"]
                          })
                          .then(collected => {
                            id = CheckForEntry(collected.first().content);
                            if (id != "n/a") {
                              var idNumbers = id.replace(/[^0-9]/g, "");
                              var parts = idNumbers.match(/.{1,4}/g);
                              id = "SW-" + parts.join("-");
                            }
                            var details = [];
                            details.push(username);
                            details.push(id);
                            UpdateUserId(db, tableName, message.author.id, {
                              switch: details
                            });
                            var messageContent =
                              username == "n/a" || id == "n/a"
                                ? "It would appear one of the fields entered was empty. \nPlease reply with `add` and select an entry from the list to try again."
                                : "<:switch:800296181111455785> Switch Code saved!\n" +
                                  "Username: " +
                                  username +
                                  "\n" +
                                  "Friend Code: " +
                                  id +
                                  "\n" +
                                  "Reply with `add` to select another platform";
                            dmchannel.send(messageContent);
                          })
                      );
                  })
                  .catch(collected => {
                    dmchannel.send(
                      ":timer: Credential entry has timed out. \nSend `add` to reselect a platform"
                    );
                  })
              )
              .catch(collected => {
                dmchannel.send(
                  ":timer: Credential entry has timed out. \nSend `add` to reselect a platform"
                );
              });
            break;
          case "2":
          case "playstation":
          case "ps":
            var username;
            dmchannel
              .send("Please enter your PSN Username:")
              .then(
                dmchannel
                  .awaitMessages({filter,
                    max: 1,
                    time: 30000,
                    errors: ["time"]
                  })
                  .then(collected => {
                    username = CheckForEntry(collected.first().content);
                    UpdateUserId(db, tableName, message.author.id, {
                      ps: username
                    });
                    var messageContent =
                      username == "n/a"
                        ? "It would appear there was no entry made. \nPlease reply with `add` and select an entry from the list to try again."
                        : "<:ps:800296183515316244> PSN username saved!\n" +
                          "Username: " +
                          username +
                          "\n" +
                          "Reply with `add` to select another platform";
                    dmchannel.send(messageContent);
                  })
                  .catch(collected => {
                    dmchannel.send(
                      ":timer: Credential entry has timed out. \nSend `add` to reselect a platform"
                    );
                  })
              )
              .catch(collected => {
                dmchannel.send(
                  ":timer: Credential entry has timed out. \nSend `add` to reselect a platform"
                );
              });
            break;
          case "3":
          case "xbox":
            var username;
            dmchannel
              .send("Please enter your Xbox Live Username:")
              .then(
                dmchannel
                  .awaitMessages({filter,
                    max: 1,
                    time: 30000,
                    errors: ["time"]
                  })
                  .then(collected => {
                    username = CheckForEntry(collected.first().content);
                    UpdateUserId(db, tableName, message.author.id, {
                      xbox: username
                    });
                    var messageContent =
                      username == "n/a"
                        ? "It would appear there was no entry made. \nPlease reply with `add` and select an entry from the list to try again."
                        : "<:xbox:800296181669822495> Xbox Live username saved!\n" +
                          "Username: " +
                          username +
                          "\n" +
                          "Reply with `add` to select another platform";
                    dmchannel.send(messageContent);
                  })
                  .catch(collected => {
                    dmchannel.send(
                      ":timer: Credential entry has timed out. \nSend `add` to reselect a platform"
                    );
                  })
              )
              .catch(collected => {
                dmchannel.send(
                  ":timer: Credential entry has timed out. \nSend `add` to reselect a platform"
                );
              });
            break;
          case "4":
          case "steam":
            var username, id;
            dmchannel
              .send("Please enter your Steam Username:")
              .then(
                dmchannel
                  .awaitMessages({filter,
                    max: 1,
                    time: 30000,
                    errors: ["time"]
                  })
                  .then(collected => {
                    username = CheckForEntry(collected.first().content);

                    dmchannel.send("Please enter your Steam ID:").then(
                      dmchannel
                        .awaitMessages({filter,
                          max: 1,
                          time: 30000,
                          errors: ["time"]
                        })
                        .then(collected => {
                          id = collected.first().content;
                          var details = [];
                          details.push(username);
                          details.push(id);
                          UpdateUserId(db, tableName, message.author.id, {
                            steam: details
                          });
                          var messageContent =
                            username == "n/a" || id == "n/a"
                              ? "It would appear one of the fields entered was empty. \nPlease reply with `add` and select an entry from the list to try again."
                              : "<:steam:800296183397744670> Steam code saved!\n" +
                                "Username: " +
                                username +
                                "\n" +
                                "Steam ID: " +
                                id +
                                "\n" +
                                "Reply with `add` to select another platform";
                          dmchannel.send(messageContent);
                        })
                    );
                  })
                  .catch(collected => {
                    dmchannel.send(
                      ":timer: Credential entry has timed out. \nSend `add` to reselect a platform"
                    );
                  })
              )
              .catch(collected => {
                dmchannel.send(
                  ":timer: Credential entry has timed out. \nSend `add` to reselect a platform"
                );
              });
            break;
          case "5":
          case "epic":
            var username;
            dmchannel
              .send("Please enter your Epic Username:")
              .then(
                dmchannel
                  .awaitMessages({filter,
                    max: 1,
                    time: 30000,
                    errors: ["time"]
                  })
                  .then(collected => {
                    username = CheckForEntry(collected.first().content);
                    UpdateUserId(db, tableName, message.author.id, {
                      epic: username
                    });
                    var messageContent =
                      username == "n/a"
                        ? "It would appear there was no entry made. \nPlease reply with `add` and select an entry from the list to try again."
                        : "<:epic:800296182458482728> Epic username saved!\n" +
                          "Username: " +
                          username +
                          "\n" +
                          "Reply with `add` to select another platform";
                    dmchannel.send(messageContent);
                  })
                  .catch(collected => {
                    dmchannel.send(
                      ":timer: Credential entry has timed out. \nSend `add` to reselect a platform"
                    );
                  })
              )
              .catch(collected => {
                dmchannel.send(
                  ":timer: Credential entry has timed out. \nSend `add` to reselect a platform"
                );
              });
            break;
          case "6":
          case "battlenet":
            var username;
            dmchannel
              .send(
                "Please enter your Battlenet Username (remember to include you number at the end: e.g. `Username#1234`):"
              )
              .then(
                dmchannel
                  .awaitMessages({filter,
                    max: 1,
                    time: 30000,
                    errors: ["time"]
                  })
                  .then(collected => {
                    username = CheckForEntry(collected.first().content);
                    UpdateUserId(db, tableName, message.author.id, {
                      battlenet: username
                    });
                    var messageContent =
                      username == "n/a"
                        ? "It would appear there was no entry made. \nPlease reply with `add` and select an entry from the list to try again."
                        : "<:battlenet:800296531244351508> Battlenet username saved!\n" +
                          "Username: " +
                          username +
                          "\n" +
                          "Reply with `add` to select another platform";
                    dmchannel.send(messageContent);
                  })
                  .catch(collected => {
                    dmchannel.send(
                      ":timer: Credential entry has timed out. \nSend `add` to reselect a platform"
                    );
                  })
              )
              .catch(collected => {
                dmchannel.send(
                  ":timer: Credential entry has timed out. \nSend `add` to reselect a platform"
                );
              });
            break;
          case "7":
          case "origin":
            var username;
            dmchannel
              .send("Please enter your Origin Username:")
              .then(
                dmchannel
                  .awaitMessages({filter,
                    max: 1,
                    time: 30000,
                    errors: ["time"]
                  })
                  .then(collected => {
                    username = CheckForEntry(collected.first().content);
                    UpdateUserId(db, tableName, message.author.id, {
                      origin: username
                    });
                    var messageContent =
                      username == "n/a"
                        ? "It would appear there was no entry made. \nPlease reply with `add` and select an entry from the list to try again."
                        : "<:origin:801150825954803774> Origin username saved!\n" +
                          "Username: " +
                          username +
                          "\n" +
                          "Reply with `add` to select another platform";
                    dmchannel.send(messageContent);
                  })
                  .catch(collected => {
                    dmchannel.send(
                      ":timer: Credential entry has timed out. \nSend `add` to reselect a platform"
                    );
                  })
              )
              .catch(collected => {
                dmchannel.send(
                  ":timer: Credential entry has timed out. \nSend `add` to reselect a platform"
                );
              });
            break;
          case "8":
          case "uplay":
            var username;
            dmchannel
              .send("Please enter your Uplay Username:")
              .then(
                dmchannel
                  .awaitMessages({filter,
                    max: 1,
                    time: 30000,
                    errors: ["time"]
                  })
                  .then(collected => {
                    username = CheckForEntry(collected.first().content);
                    UpdateUserId(db, tableName, message.author.id, {
                      uplay: username
                    });

                    var messageContent =
                      username == "n/a"
                        ? "It would appear there was no entry made. \nPlease reply with `add` and select an entry from the list to try again."
                        : "<:uplay:801150826172645397> Uplay username saved!\n" +
                          "Username: " +
                          username +
                          "\n" +
                          "Reply with `add` to select another platform";
                    dmchannel.send(messageContent);
                  })
                  .catch(collected => {
                    dmchannel.send(
                      ":timer: Credential entry has timed out. \nSend `add` to reselect a platform"
                    );
                  })
              )
              .catch(collected => {
                dmchannel.send(
                  ":timer: Credential entry has timed out. \nSend `add` to reselect a platform"
                );
              });
            break;
          default:
            dmchannel.send(
              "Sorry, I do not recognise this platform. Please reply with `add` and select an entry from the list to try again."
            );
        }
      })
      .catch(collected =>
        dmchannel.send(
          ":timer: Credential entry has timed out. Reply with `add` to reselect a platform"
        )
      );
  });
}

async function RemoveId(db, message) {
  var dbUsers = await GetUserPlatforms(db);
  const args = message.content.split(" ");
  var foundUser;
  const tableName = "platform";

  dbUsers.forEach(
    await function(user) {
      if (user.id == message.author.id) {
        console.log("Found the user: " + user.id);
        foundUser = user;
        return;
      }
    }
  );

  if (dbUsers.some(elem => elem.id == message.author.id)) {
    const index = dbUsers
      .map(function(e) {
        return e.name;
      })
      .indexOf(message.author.id);
  } else {
    console.log("Couldn't find user");
    db.get(tableName)
      .push({
        userId: message.author.id,
        username: message.author.username,
        switch: ["n/a", "n/a"],
        ps: "n/a",
        xbox: "n/a",
        steam: ["n/a", "n/a"],
        epic: "n/a",
        battlenet: "n/a",
        origin: "n/a",
        uplay: "n/a"
      })
      .write();
  }

  // Set a user using Lodash shorthand syntax
  message.author.createDM().then(dmchannel => {
    //if (!foundUser) {
    var Embed = new Discord.EmbedBuilder()
      .setTitle("Remove Game Credentials")
      .setColor("0x8c8c8c")
      .setThumbnail(
        "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FmlgBotSeat.png?v=1611365651832"
      )
      .setDescription(
        "Select the platform you would like to **remove** credentials for by replying with the corresponding number or name:"
      )
      .addFields(
        {
          name: "1. Switch",
          value: "<:switch:800296181111455785>",
          inline: true
        },
        {
          name: "2. Playstation",
          value: "<:ps:800296183515316244>",
          inline: true
        },
        {
          name: "3. Xbox",
          value: "<:xbox:800296181669822495>",
          inline: true
        },
        {
          name: "4. Steam",
          value: "<:steam:800296183397744670>",
          inline: true
        },
        {
          name: "5. Epic",
          value: "<:epic:800296182458482728>",
          inline: true
        },
        {
          name: "6. Battlenet",
          value: "<:battlenet:800296531244351508>",
          inline: true
        },
        {
          name: "7. Origin",
          value: "<:origin:801150825954803774>",
          inline: true
        },
        {
          name: "8. Uplay",
          value: "<:uplay:801150826172645397>",
          inline: true
        },
        {
          name: "\u200B",
          value: "\u200B",
          inline: true
        }
      )
      .setFooter({
        text: "danimyuu ♡",
        iconURL: "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FMewditto.png?v=1609471789850"}
      );
    dmchannel.send(({embeds: [Embed]}));
    //}

    const filter = m => m.author.id === message.author.id;
    dmchannel
      .awaitMessages({filter,  max: 1, time: 30000, errors: ["time"] })
      .then(collected => {
        switch (String(collected.first().content.toLowerCase())) {
          case "1":
          case "switch":
            var details = [];
            details.push("n/a");
            details.push("n/a");
            UpdateUserId(db, tableName, message.author.id, {
              switch: details
            });
            dmchannel.send(
              "<:switch:800296181111455785> Switch Code has been reset."
            );
            break;
          case "2":
          case "playstation":
          case "ps":
            UpdateUserId(db, tableName, message.author.id, {
              ps: "n/a"
            });
            dmchannel.send(
              "<:ps:800296183515316244> PSN Username has been reset."
            );
            break;
          case "3":
          case "xbox":
            UpdateUserId(db, tableName, message.author.id, {
              xbox: "n/a"
            });
            dmchannel.send(
              "<:xbox:800296181669822495> Xbox Live Username has been reset."
            );
            break;
          case "4":
          case "steam":
            var details = [];
            details.push("n/a");
            details.push("n/a");
            UpdateUserId(db, tableName, message.author.id, {
              steam: details
            });
            dmchannel.send(
              "<:steam:800296183397744670> Steam Code has been reset."
            );
            break;
          case "5":
          case "epic":
            UpdateUserId(db, tableName, message.author.id, {
              epic: "n/a"
            });
            dmchannel.send(
              "<:epic:800296182458482728> Epic Username has been reset."
            );
            break;
          case "6":
          case "battlenet":
            UpdateUserId(db, tableName, message.author.id, {
              battlenet: "n/a"
            });
            dmchannel.send(
              "<:battlenet:800296531244351508> Battlenet Username has been reset."
            );
            break;
          case "7":
          case "origin":
            UpdateUserId(db, tableName, message.author.id, {
              origin: "n/a"
            });
            dmchannel.send(
              "<:origin:801150825954803774> Origin Username has been reset."
            );
            break;
          case "8":
          case "uplay":
            UpdateUserId(db, tableName, message.author.id, {
              uplay: "n/a"
            });
            dmchannel.send(
              "<:uplay:801150826172645397> Uplay Username has been reset."
            );
            break;
          default:
            dmchannel.send(
              "Sorry, I do not recognise this platform. Please reply with `remove` and select an entry from the list to try again."
            );
        }
      })
      .catch(collected =>
        dmchannel.send(
          ":timer: Credential entry has timed out. Reply with `add` to reselect a platform"
        )
      );
  });
}

function AddEmptyField(fields, embed) {
  var emptyField = {
    name: "\u200B",
    value: "\u200B",
    inline: true
  };
  if (fields > 1 && fields % 3 !== 0) {
    embed.addFields(emptyField);
  }
}

function CreateGameIdEmbedDetails(user, discordUser, message) {
  let fields = 0;
  let embed = new Discord.EmbedBuilder()
    .setTitle(user.username + "'s Game Credentials")
    .setColor("0xffd700")
    //  .setTitle(`${title1}`)
    //.setDescription("Blah blah")
    //.setAuthor(user.username + "'s Game Credentials")
    .setThumbnail(discordUser.displayAvatarURL())
    .setFooter({
      text: "danimyuu ♡",
      iconURL: "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FMewditto.png?v=1609471789850"}
    );

  //.setDescription("Coming up next: " + pokemonCapList[pokeIndex-1] + "!")
  if (user.swithUser != "n/a") {
    ++fields;
    embed.addFields({
      name: "<:switch:800296181111455785> Switch",
      value: user.swithUser + "\n" + user.switchId,
      inline: true
    });
  }
  if (user.ps != "n/a") {
    ++fields;
    embed.addFields({
      name: "<:ps:800296183515316244> Playstation",
      value: user.ps,
      inline: true
    });
  }
  if (user.xbox != "n/a") {
    ++fields;
    embed.addFields({
      name: "<:xbox:800296181669822495> Xbox Live",
      value: user.xbox,
      inline: true
    });
  }
  if (user.steamUser != "n/a") {
    ++fields;
    embed.addFields({
      name: "<:steam:800296183397744670> Steam",
      value: user.steamUser + "\nID: " + user.steamId,
      inline: true
    });
  }
  if (user.epic != "n/a") {
    ++fields;
    embed.addFields({
      name: "<:epic:800296182458482728> Epic",
      value: user.epic,
      inline: true
    });
  }
  if (user.battlenet != "n/a") {
    ++fields;
    embed.addFields({
      name: "<:battlenet:800296531244351508> Battlenet",
      value: user.battlenet,
      inline: true
    });
  }
  if (user.origin != "n/a") {
    ++fields;
    embed.addFields({
      name: "<:origin:801150825954803774> Origin",
      value: user.origin,
      inline: true
    });
  }
  if (user.uplay != "n/a") {
    ++fields;
    embed.addFields({
      name: "<:uplay:801150826172645397> Uplay",
      value: user.uplay,
      inline: true
    });
  }

  if (fields == 0) {
    return "It appears this user has not set up their Game ID's.\nUse `$pinsir gameid add` to enter details in a DM.";
  } else {
    AddEmptyField(fields, embed);
    return embed;
  }
}

async function SendGameIdEmbed(user, message) {
  console.log("User id from DB: " + user.id);
  var discordUser = GetUserFromId(message, user.id);
  var embed = CreateGameIdEmbedDetails(user, discordUser, message);
  message.channel.send({embeds: [embed]});
}
