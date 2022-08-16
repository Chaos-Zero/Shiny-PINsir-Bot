const { Client, RichEmbed } = require("discord.js");
const Discord = require("discord.js");
const fs = require("fs");

//eval(fs.readFileSync('./public/collections/pokemonlists.js') + "");
const collections = "./public/collections/";
const balltism = require(collections + "balltism.json");
const aBalltism = require(collections + "aballtism.json");
const gBalltism = require(collections + "gballtism.json");
const gmaxBalltism = require(collections + "gmaxballtism.json");

const pokemonList = require(collections + "pokemonlists.js").pokemonList;
const pokemonCapList = require(collections + "pokemonlists.js").pokemonCapList;
const ballList = require(collections + "pokemonlists.js").ballList;
const regionIdentifiers = require(collections + "pokemonlists.js")
  .regionIdentifiers;

function PokemonNumberMessage(message, bot) {
  const username = message.author.username;
  const argument = message.content.split(" ");
  var region = "Kanto";

  var pokemonAddress = message.content.includes("*")
    ? "Shiny/SWSH/"
    : "swordshield/pokemon/";

  var pokemon = argument[2] != null ? argument[2] : "";
  var splitPokemon =
    argument[3] != null && isNaN(argument[3]) ? " " + argument[3] : "";
  pokemon += splitPokemon;

  if (pokemon == "") {
    var pinsirMessage =
      "Please a add Pokémon or number to the end of the message " + username;
    message.channel.send(pinsirMessage);
  } else {
    var pokeIndex = pokemon;
    if (isNaN(pokeIndex)) {
      if (pokemon.toLowerCase() == "missingno") {
        var pinsirMessage =
          "It would appear that <@" +
          message.author.id +
          "> has guessed the easter egg!";
        bot.users.cache.get("268487608680579072").send(pinsirMessage);

        var embed = new Discord.EmbedBuilder()
          .setAuthor({name: "Who's that P̸̡̨̢̡̧̛̛̣̼͈͍̟͉̳̖͖̱͎̲͔̱̻̦̙̺̞̩̬̫̫̭̥̤͓̖̤̞͓̦͙̱̻̼̖̗͈̣̩̪͐̓̈́̓͋̔̔̄̌̀͗͋͒̌̍̉͋͛̌̊̐͛̈́̽͆̆̽̂̽͐̾͂̂̈́̃̐̾̐͝͝ͅơ̵̢̨̧̨̯̝̘̩̲͚̤̭̩͇̰͕̹̫̟̭͖̤̲̙͇̞̊́͐̂ķ̵̢̡̢͉͕͖̲̜̖̦̭̻̹̯͔̬̟͇̮̞͕͖͇̪̙̰͙̠͚̖̲̗̮̟͔̻̬̥͚̙̘̽̃̉͊̽̒̅̈́͑̓̾͒̌͋̅̈͌͆͆̊̐͌̓̃͊̉̀̀̃̏͗̌̈̊̇͘͘̕̕͜͜͜͝͠ͅę̴̛̣͚̲̭̯̣͖͓̟̠̩͕̘͈̱͇̹͉̹̯́̌̋̓͌̋̽̃̂̎̅̇̀́̇̏̚̚̕͜͝ͅͅm̷̢̢̨̛̭̺͕̣͈̘̮̖̪̜͍̤̟̲̥̪̰̤̣̰̰͉̳̼̅̏͒͛̽̄̋̈́͋̑̇̌̇̓̏̿̎͗̀̌͂̂̏̀̏̍̊̈́͊͂̅̈̅ͅò̶̧̨̨͕̺̝͎̯̜̤̯̜̹̞͇̤͕͉̪̣̭͍͔̦̝̼̺̱̊̓̓̈́̈̌̐́̐͂̄͐̾͌̅̈́̉͒͂̇̀̽͋̏̾̿͋̊̑͒͌̚͘̚͘̚͜͝͝n̶̲̹̗̼͉̣͈͖̭̬͈͓̰̩̼̠̞͙̤͕̠̗͈̹͍̤̺̰͓̺̣̈̚ͅͅͅ?"})
          .setColor("0xff0000")
          //.setDescription("Coming up next: " + pokemonCapList[pokeIndex-1] + "!")
          .addFields({
            name:
              "**NationalDex** ɹǝqɯnu sᴉ **    ?⃞    ?⃞    ?⃞     ** ł₦ ₮ⱧɆ NationalDex!",
            value:
              "This M was ỏri͛̿͝g̓̿̕i̐͊̋̃͡n̑a͛̄͘l̉̍̕͡͞l̍̚ȳ̛̎ dddddddddd in @@@ r̵e̴g̶i̷o̵n̸ ̵n̷o̷t̵ ̶f̸o̷u̵n̴d̶  region."
          })
          //  .setTitle(`${title1}`)
          //.setDescription("Blah blah")
          .setThumbnail("https://wiki.p-insurgence.com/images/0/09/722.png");
        channel.send({embeds: [embed], allowedMentions: { repliedUser: false } })
          
      } else {
        pokeIndex = pokemonList.indexOf(pokemon.toLowerCase()) + 1;
      }
    }
    if (pokeIndex < 1 || pokeIndex > 898 || isNaN(pokeIndex)) {
      var pinsirMessage =
        "I'm sorry " +
        username +
        ", I do not know this Pokémon. I may have it written down differently.";

      message.channel.send(pinsirMessage);
    }
    var origIndex = pokeIndex;
    region = CheckRegion(origIndex);

    if (pokeIndex < 10) {
      pokeIndex = "00" + pokeIndex;
    } else if (pokeIndex > 9 && pokeIndex < 100) {
      pokeIndex = "0" + pokeIndex;
    }
    if (isNaN(pokemon)) {
      var embed = new Discord.EmbedBuilder()
        .setAuthor({name: "Which number is that Pokémon?"})
        .setColor("0xff0000")
        //.setDescription("Coming up next: " + pokemonCapList[pokeIndex-1] + "!")
        .addFields({
          name:
            "\n**" +
            pokemonCapList[pokeIndex - 1] +
            "** is number **" +
            origIndex +
            "** in the NationalDex!",
          value:
            "This pokemon was originally discovered in the **" +
            region +
            "** region."
        })
        //  .setTitle(`${title1}`)
        //.setDescription("Blah blah")
        .setThumbnail(
          "https://www.serebii.net/" + pokemonAddress + "" + pokeIndex + ".png"
        );

      //    .setFooter(`📥 ${member.user.username} Joined!`)
      //      .setTimestamp();
    } else {
      var pokeImage =
        "https://www.serebii.net/" + pokemonAddress + "" + pokeIndex + ".png";

      var embed = new Discord.EmbedBuilder()
        .setAuthor({name: "Who's that Pokémon?"})
        .setColor("0xff0000")
        //.setDescription("Coming up next: " + pokemonCapList[pokeIndex-1] + "!")
        .addFields({
          name:
            "\nPokemon number **" +
            origIndex +
            "** in the NationalDex is: **" +
            pokemonCapList[pokeIndex - 1] +
            "**!",
          value:
            "This pokemon was originally discovered in the **" +
            region +
            "** region."
        })
        //  .setTitle(`${title1}`)
        //.setDescription("Blah blah")
        .setThumbnail(
          "https://www.serebii.net/" + pokemonAddress + "" + pokeIndex + ".png"
        );
    }
    channel.send({embeds: [embed], allowedMentions: { repliedUser: false } })
  }
}

function BalltismMessage(message, bot) {
  const username = message.author.username;
  var messageSpace = message.content;
  var argument = message.content.split(" ");
  var optionalRegion = "";

  var pokemonAddress = "Shiny/SWSH/";

  if (regionIdentifiers.some(messageSpace.includes.bind(messageSpace))) {
    optionalRegion = argument[2];
    messageSpace = messageSpace.replace(argument[2] + " ", "");
  }

  argument = messageSpace.split(" ");
  var pokemon = argument[2] != null ? argument[2] : "";
  var splitPokemon =
    argument[3] != null && isNaN(argument[3]) ? " " + argument[3] : "";
  pokemon += splitPokemon;

  if (pokemon == "") {
    var pinsirMessage =
      "Please a add Pokémon or number to the end of the message " + username;
    message.channel.send(pinsirMessage);
  } else {
    var pokeIndex = pokemon;
    if (isNaN(pokeIndex)) {
      if (pokemon.toLowerCase() == "missingno") {
        var pinsirMessage =
          "It would appear that <@" +
          message.author.id +
          "> has guessed the easter egg!";
        bot.users.cache.get("268487608680579072").send(pinsirMessage);

        var embed = new Discord.EmbedBuilder()
          .setAuthor({name: "Who's that P̸̡̨̢̡̧̛̛̣̼͈͍̟͉̳̖͖̱͎̲͔̱̻̦̙̺̞̩̬̫̫̭̥̤͓̖̤̞͓̦͙̱̻̼̖̗͈̣̩̪͐̓̈́̓͋̔̔̄̌̀͗͋͒̌̍̉͋͛̌̊̐͛̈́̽͆̆̽̂̽͐̾͂̂̈́̃̐̾̐͝͝ͅơ̵̢̨̧̨̯̝̘̩̲͚̤̭̩͇̰͕̹̫̟̭͖̤̲̙͇̞̊́͐̂ķ̵̢̡̢͉͕͖̲̜̖̦̭̻̹̯͔̬̟͇̮̞͕͖͇̪̙̰͙̠͚̖̲̗̮̟͔̻̬̥͚̙̘̽̃̉͊̽̒̅̈́͑̓̾͒̌͋̅̈͌͆͆̊̐͌̓̃͊̉̀̀̃̏͗̌̈̊̇͘͘̕̕͜͜͜͝͠ͅę̴̛̣͚̲̭̯̣͖͓̟̠̩͕̘͈̱͇̹͉̹̯́̌̋̓͌̋̽̃̂̎̅̇̀́̇̏̚̚̕͜͝ͅͅm̷̢̢̨̛̭̺͕̣͈̘̮̖̪̜͍̤̟̲̥̪̰̤̣̰̰͉̳̼̅̏͒͛̽̄̋̈́͋̑̇̌̇̓̏̿̎͗̀̌͂̂̏̀̏̍̊̈́͊͂̅̈̅ͅò̶̧̨̨͕̺̝͎̯̜̤̯̜̹̞͇̤͕͉̪̣̭͍͔̦̝̼̺̱̊̓̓̈́̈̌̐́̐͂̄͐̾͌̅̈́̉͒͂̇̀̽͋̏̾̿͋̊̑͒͌̚͘̚͘̚͜͝͝n̶̲̹̗̼͉̣͈͖̭̬͈͓̰̩̼̠̞͙̤͕̠̗͈̹͍̤̺̰͓̺̣̈̚ͅͅͅ?"})
          .setColor("0xff0000")
          //.setDescription("Coming up next: " + pokemonCapList[pokeIndex-1] + "!")
          .addFields({
            name:
              "**NationalDex** ɹǝqɯnu sᴉ **    ?⃞    ?⃞    ?⃞     ** ł₦ ₮ⱧɆ NationalDex!",
            value:
              "This M was ỏri͛̿͝g̓̿̕i̐͊̋̃͡n̑a͛̄͘l̉̍̕͡͞l̍̚ȳ̛̎ dddddddddd in @@@ r̵e̴g̶i̷o̵n̸ ̵n̷o̷t̵ ̶f̸o̷u̵n̴d̶  region."
          })
          //  .setTitle(`${title1}`)
          //.setDescription("Blah blah")
          .setThumbnail("https://wiki.p-insurgence.com/images/0/09/722.png");
          channel.send({embeds: [embed], allowedMentions: { repliedUser: false } })
      } else {
        pokeIndex = pokemonList.indexOf(pokemon.toLowerCase()) + 1;
      }
    }
    if (pokeIndex < 1 || pokeIndex > 898 || isNaN(pokeIndex)) {
      var pinsirMessage =
        "I'm sorry " +
        username +
        ", I do not know this Pokémon. I may have it written down differently.";
      message.channel.send(pinsirMessage);
    }

    var pokeImage =
      "https://www.serebii.net/" + pokemonAddress + "" + pokeIndex + ".png";
    var regionIdentity = GetRegionIdentity(optionalRegion, pokeIndex);
    var balltismEntry = GetBalltismEntry(pokeIndex, regionIdentity);

    //pokemonCapList[pokeIndex - 1]
    try {
      channel.send({embeds: [ 
        BalltismEmbed(
          message,
          balltismEntry,
          pokemonAddress,
          pokeIndex,
          regionIdentity
        )], allowedMentions: { repliedUser: false } })
    } catch {
      var pinsirMessage =
        "I'm sorry " +
        username +
        ", this pokemon has not had Balltism entries filled.";
      message.channel.send(pinsirMessage);
    }
  }
}

function BalltismEmbed(
  message,
  pokemonEntry,
  pokemonAddress,
  pokeIndex,
  regionIdentity
) {
  var imgIndex = pokeIndex;
  var ballImg = GetBallImage(pokemonEntry.Ball1);
  console.log(ballImg.img);
  if (imgIndex < 10) {
    imgIndex = "00" + imgIndex;
  } else if (imgIndex > 9 && imgIndex < 100) {
    imgIndex = "0" + imgIndex;
  }
  var embed = new Discord.EmbedBuilder();
  var imgIndex = pokeIndex;
  var ballImg = GetBallImage(pokemonEntry.Ball1);
  console.log(ballImg.img);
  var pokeGif = pokemonList[pokeIndex - 1];

  if (pokemonEntry.Ball3) {
    var embed = threeBallEmbed(
      pokeGif,
      pokeIndex,
      pokemonEntry,
      ballImg,
      regionIdentity
    );
  } else if (pokemonEntry.Ball2) {
    var embed = twoBallEmbed(
      pokeGif,
      pokeIndex,
      pokemonEntry,
      ballImg,
      regionIdentity
    );
  } else {
    var embed = singleBallEmbed(
      pokeGif,
      pokeIndex,
      pokemonEntry,
      ballImg,
      regionIdentity
    );
  }
  //.setFooter(
  // "Ref: ",
  //"https://www.serebii.net/" + pokemonAddress + "" + imgIndex + ".png")
  return embed;
}

function threeBallEmbed(pokeGif, pokeIndex, pokemonEntry, ballImg, region) {
  console.log("Region" + region);
  console.log(
    "https://raw.githubusercontent.com/caquillo07/rotom-b-data/master/sprites/pokemon/shiny/" +
      CreateRegionalGifAddress(pokeGif, region) +
      ".gif"
  );
  var embed = new Discord.EmbedBuilder()
    .setAuthor({
      name: "Balltism Suggestion",
      iconURL:"https://cdn.glitch.com/59bb141b-c323-4e6e-86e3-ea46f9f062cf%2FBalltism%20icon.png?v=1605530606838"
})
    .setColor("0xffff00")
    //.setDescription("Coming up next: " + pokemonCapList[pokeIndex-1] + "!")
    .setImage(
      "https://raw.githubusercontent.com/caquillo07/rotom-b-data/master/sprites/pokemon/shiny/" +
        CreateRegionalGifAddress(pokeGif, region) +
        ".gif",
      50.5
    )
    .setDescription(
      "\nFor shiny **" +
        region +
        " " +
        pokemonCapList[pokeIndex - 1] +
        "**, we suggest a **" +
        pokemonEntry.Ball1 +
        "ball**!"
    )
    .addFields(
      {
        name: "Ball 2: " + pokemonEntry.Ball2 + " ball",
        value: GetBallImage(pokemonEntry.Ball2).emoji,
        inline: true
      },
      {
        name: "Ball 3: " + pokemonEntry.Ball3 + " ball",
        value: GetBallImage(pokemonEntry.Ball3).emoji,
        inline: true
      }
    )
    //  .setTitle(`${title1}`)
    //.setDescription("Blah blah")
    .setThumbnail(ballImg.img);
  addFooterBalltism(pokemonEntry, embed, region);
  return embed;
}

function twoBallEmbed(pokeGif, pokeIndex, pokemonEntry, ballImg, region) {
  var embed = new Discord.EmbedBuilder()
    .setAuthor({
      name: "Balltism Suggestion",
      iconURL:"https://cdn.glitch.com/59bb141b-c323-4e6e-86e3-ea46f9f062cf%2FBalltism%20icon.png?v=1605530606838" }
    )
    .setColor("0xffff00")
    //.setDescription("Coming up next: " + pokemonCapList[pokeIndex-1] + "!")
    .setImage(
      "https://raw.githubusercontent.com/caquillo07/rotom-b-data/master/sprites/pokemon/shiny/" +
        CreateRegionalGifAddress(pokeGif, region) +
        ".gif",
      50.5
    )
    .setDescription(
      "\nFor shiny **" +
        region +
        " " +
        pokemonCapList[pokeIndex - 1] +
        "**, we suggest a **" +
        pokemonEntry.Ball1 +
        "ball**!"
    )
    .addFields({
      name: "Ball 2: " + pokemonEntry.Ball2 + " ball",
      value: GetBallImage(pokemonEntry.Ball2).emoji,
      inline: true
    })
    //  .setTitle(`${title1}`)
    //.setDescription("Blah blah")
    .setThumbnail(ballImg.img);
  addFooterBalltism(pokemonEntry, embed, region);
  return embed;
}

function singleBallEmbed(pokeGif, pokeIndex, pokemonEntry, ballImg, region) {
  var embed = new Discord.EmbedBuilder()
    .setAuthor({
      name: "Balltism Suggestion",
      iconURL:"https://cdn.glitch.com/59bb141b-c323-4e6e-86e3-ea46f9f062cf%2FBalltism%20icon.png?v=1605530606838"}
    )
    .setColor("0xffff00")
    //.setDescription("Coming up next: " + pokemonCapList[pokeIndex-1] + "!")
    .setImage(
      "https://raw.githubusercontent.com/caquillo07/rotom-b-data/master/sprites/pokemon/shiny/" +
        CreateRegionalGifAddress(pokeGif, region) +
        ".gif",
      50.5
    )
    .setDescription(
      "\nFor shiny **" +
        region +
        " " +
        pokemonCapList[pokeIndex - 1] +
        "**, we suggest a **" +
        pokemonEntry.Ball1 +
        "ball**!"
    )
    //  .setTitle(`${title1}`)
    //.setDescription("Blah blah")
    .setThumbnail(ballImg.img);
  addFooterBalltism(pokemonEntry, embed, region);
  return embed;
}

function addFooterBalltism(pokemonEntry, embed, region) {
  var regionText = region;
  if (region) {
    regionText += " ";
  }
  if (pokemonEntry.AltEvolution) {
    embed.setFooter({
      text :"For shiny " +
        regionText +
        pokemonEntry.FullEvolution +
        ", we suggest a " +
        pokemonEntry.EvoBall +
        " ball\nFor shiny " +
        regionText +
        pokemonEntry.AltEvolution +
        ", we suggest a " +
        pokemonEntry.AltEvoBall +
        " ball",
      //GetBallImage(pokemonEntry.EvoBall).img
      iconURL: "https://cdn.glitch.com/59bb141b-c323-4e6e-86e3-ea46f9f062cf%2FBalltism%20icon%20multi.png?v=1605573712202" }
    );
  } else if (pokemonEntry.FullEvolution) {
    embed.setFooter({
      text: "For shiny " +
        regionText +
        pokemonEntry.FullEvolution +
        ", we suggest a " +
        pokemonEntry.EvoBall +
        " ball",
      //GetBallImage(pokemonEntry.EvoBall).img
      iconURL: "https://raw.githubusercontent.com/caquillo07/rotom-b-data/master/sprites/pokemon/shiny/" +
        CreateRegionalGifAddress(
          pokemonEntry.FullEvolution.toLowerCase(),
          region
        ) +
        ".gif" }
    );
  } else if (pokemonEntry.Gmax && region != "Gigantamax") {
    embed.setFooter({
      text: "For shiny Gigantamax " +
        pokemonEntry.Gmax +
        ", we suggest a " +
        pokemonEntry.GmaxBall +
        " ball",
      //GetBallImage(pokemonEntry.EvoBall).img
      iconURL: "https://raw.githubusercontent.com/caquillo07/rotom-b-data/master/sprites/pokemon/shiny/" +
        CreateRegionalGifAddress(
          pokemonEntry.Gmax.toLowerCase(),
          "Gigantamax"
        ) +
        ".gif" }
    );
  }
}

function GetBallImage(ball) {
  for (var i = 0; i < ballList.length; i++) {
    if (ballList[i].ball == ball) {
      return ballList[i];
    }
  }
}

function CreateRegionalGifAddress(pokemon, region) {
  console.log("The region is: " + region);
  var string = pokemon;
  switch (region) {
    case "Alolan":
      console.log("We have hit Alola");
      return "alolan-" + string;
      break;
    case "Galarian":
      return "galarian-" + string;
      break;
    case "Gigantamax":
      console.log("We have hit Gigantamax");
      return string + "-gigantamax";
      break;
    default:
      return string;
      break;
  }
  return string;
}
