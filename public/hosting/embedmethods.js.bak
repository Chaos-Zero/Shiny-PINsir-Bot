// Required Declarations
const { Client, RichEmbed } = require("discord.js");
const Discord = require("discord.js");

const fs = require("fs");

eval(fs.readFileSync("./public/database/read.js") + "");
eval(fs.readFileSync("./public/database/write.js") + "");
eval(fs.readFileSync("./public/utils/discordutils.js") + "");
eval(fs.readFileSync("./public/pins/pinmethods.js") + "");
eval(fs.readFileSync("./public/utils/pokemonutils.js") + "");

const collections = "./public/collections/";

const pokemonList = require(collections + "pokemonlists.js").pokemonList;
const pokemonCapList = require(collections + "pokemonlists.js").pokemonCapList;

const balltism = require(collections + "balltism.json");
const aBalltism = require(collections + "aballtism.json");
const gBalltism = require(collections + "gballtism.json");
const gmaxBalltism = require(collections + "gmaxballtism.json");

//Hosting image by silver - Needs refactor or description
function HostingUpMessage(db, message) {
  const username = message.author.username;
  var messageSpace = message.content.replace("rc:", " rc:");
  var messageSpace = messageSpace.toLowerCase();
  var argument = messageSpace.split(" ");

  const regionIdentifiers = [
    " alolan ",
    " a ",
    " galarian ",
    " galar ",
    " g ",
    " gigantamax ",
    " gmax "
  ];
  var optionalRegion = "";

  if (regionIdentifiers.some(messageSpace.includes.bind(messageSpace))) {
    optionalRegion = argument[2];
    messageSpace = messageSpace.replace(argument[2] + " ", "");
  }

  argument = messageSpace.split(" ");
  var pokemon = argument[2] != null ? argument[2] : "";
  var splitPokemon =
    argument[3] != null && isNaN(argument[3]) ? " " + argument[3] : "";
  pokemon += splitPokemon;
  const raidCode = message.content.substring(message.content.length - 9);

  if (pokemon == "") {
    var embed = CreateBasicHostMessage(username);
    SaveHostMessage(db, username, embed);
  } else {
    var pokeIndex = pokemon;
    if (pokemon == "end" || pokemon == "end ") {
      RemovePins(message);
      const pinsirMessage = EventEndMessage(message,username)
      DeletePinsirCommand(message);
      return pinsirMessage;
    }

    if (isNaN(pokeIndex)) {
      pokeIndex = pokemonList.indexOf(pokemon.toLowerCase()) + 1;
    }
    if (pokeIndex < 1 || pokeIndex > 898 || isNaN(pokeIndex)) {
      var pinsirMessage =
        "I'm sorry " +
        username +
        ", I do not know this Pokémon. I may have it written down differently. \nTry using the the Pokémon's National Dex number like '127' for Pinsir.\n You can find the numbers here: https://www.serebii.net/pokedex-swsh/";
      if (argument[1] != "giveaway") {
        return pinsirMessage;
      } else {
        return "Did you mean to use `$pinsir giveaway end`?.\n Use `$pinsir commands` to see how to use PINsir";
      }
    }
    const pokeIndexNumber = pokeIndex;
    if (pokeIndex < 10) {
      pokeIndex = "00" + pokeIndex;
    } else if (pokeIndex > 9 && pokeIndex < 100) {
      pokeIndex = "0" + pokeIndex;
    }

    var regionIdentity = GetRegionIdentity(optionalRegion, pokeIndexNumber);
    regionIdentity =
      regionIdentity.length > 1 ? regionIdentity + " " : regionIdentity;
    optionalRegion = GetHtmlRegionTag(optionalRegion, pokeIndexNumber);

    var raidCodeMessage =
      /\d/.test(raidCode) && message.content.includes("rc:")
        ? raidCode
        : "No code needed!";
    var embed = new Discord.MessageEmbed()
      .setColor(0xffd700)
      .setAuthor(username + " is hosting!", message.author.displayAvatarURL())
      //.setDescription("Coming up next: " + pokemonCapList[pokeIndex-1] + "!")
      .addFields({
        name:
          "Coming up next: " +
          regionIdentity +
          pokemonCapList[pokeIndex - 1] +
          "!",
        value: "Code: " + raidCodeMessage
      })
      //  .setTitle(`${title1}`)
      //.setDescription("Blah blah")
      .setThumbnail(
        "https://www.serebii.net/Shiny/SWSH/" +
          pokeIndex +
          optionalRegion +
          ".png"
      );

    //    .setFooter(`📥 ${member.user.username} Joined!`)
    //      .setTimestamp();
    // Save hosting message
    SaveHostMessage(db, username, embed);
  }
  if (argument[1] != "giveaway") {
    return embed;
  } else {
    return "Did you mean to use `$pinsir giveaway end`?.\n Use `$pinsir commands` to see how to use PINsir";
  }
}

function EventEndMessage(message,username){
  var hosting = " has finished hosting for now.";
      var giveaway = " has concluded the giveaway.";
      var pinsirMessage;
      console.log(message.channel.name);
      if (message.channel.name == "live-giveaway") {
        console.log("We're in live giveaway");
        pinsirMessage =
          username +
          giveaway +
          " \nThank you all for participating and remember to thank your hosts!";
      } else if (message.channel.name == "raids") {
        pinsirMessage =
          username +
          hosting +
          " \nThank you all for participating and remember to thank your hosts!";
      } else {
        var raids = GetChannelByName(message, "raids");
        var giveaway = GetChannelByName(message, "live-giveaway");
        pinsirMessage =
          "This command can only be used in " +
          raids.toString() +
          " and " +
          giveaway.toString() +
          ".";
      }
  return pinsirMessage;
}
function rehost(db, message) {
  const tableName = "users";
  db.get(tableName);
  var dbMessage;
  var dbUsers = GetDbUsers(db, tableName);
  console.log(dbUsers);

  if (dbUsers.some(elem => elem == message.author.username)) {
    dbMessage = GetDataForUser(db, tableName, message.author.username);

    console.log(dbMessage.message);
    var sendingMessage = dbMessage.message;

    message.channel.send(sendingMessage);
  } else {
    message.channel.send(CreateBasicHostMessage());
  }
}

function CreateBasicHostMessage(username) {
  var embed = new Discord.MessageEmbed()
    .setColor(0xffd700)
    .setAuthor(username + " is hosting!")
    .setImage(
      "https://cdn.glitch.com/59bb141b-c323-4e6e-86e3-ea46f9f062cf%2Fclassic_pinsirbot.png?v=1597703026332"
    )
    .setFooter(
      "Image by silver#7472",
      "https://cdn.glitch.com/59bb141b-c323-4e6e-86e3-ea46f9f062cf%2Fsilver.png?v=1597704076569"
    );
  return embed;
}
