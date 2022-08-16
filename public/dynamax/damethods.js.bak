const { Client, RichEmbed } = require("discord.js");
const Discord = require("discord.js");
const fs = require("fs");

eval(fs.readFileSync("./public/database/read.js") + "");
eval(fs.readFileSync("./public/database/write.js") + "");
eval(fs.readFileSync("./public/utils/pokemonutils.js") + "");

eval(fs.readFileSync("./public/collections/pokemonlists.js") + "");

const dALegendsList = require("./public/collections/pokemonlists.js")
  .dALegendsList;

async function DynamaxAdventure(db, message) {
  if (message.content.toLowerCase().includes("add")) {
    ChangeDAPokemon(db, message, true);
  } else if (message.content.toLowerCase().includes("remove")) {
    ChangeDAPokemon(db, message, false);
  } else if (message.content.toLowerCase().includes("clear")) {
    ClearDAPokemon(db, message);
  } else if (message.content.toLowerCase().includes("list")) {
    GetAdventureList(db, message);
  } else if (message.content.toLowerCase().includes("request")) {
    SetSearchDAPokemon(db, message);
  } else if (message.content.toLowerCase().includes("searching")) {
    SearchDAPokemon(db, message);
  } else if (message.content.toLowerCase().includes("ping")) {
    PingSearchDAPokemon(db, message);
  } else {
    SendDAHostedByMessage(db, message);
  }
}

function getDbTable(db, table) {
  return db.get(table).value();
}

function ClearDAPokemon(db, message) {
  const username = message.author.username;
  var dbUsers = [];
  const tableName = "dynamax";
  var users = db.get(tableName).value();
  users.forEach(function(user) {
    dbUsers.push({ name: user.username, pokemon: user.pokemon }); // adds their info to the dbUsers value
  });

  if (dbUsers.some(elem => elem.name == username)) {
    var pokemonList = [];
    UpdateUser(db, tableName, username, {
      pokemon: pokemonList,
      searching: ""
    });
    message.channel.send(
      "Your Adventure list has been reset <@" + message.author.id + ">!"
    );
  } else {
    message.channel.send(
      "You don't seem to have an Adventure list set up <@" +
        message.author.id +
        ">\n" +
        "Try using `$pinsr da add [pokemon]` to let people know which Dynamanx Adventure paths you have availible!"
    );
  }
}

async function ChangeDAPokemon(db, message, isSave) {
  var users = await GetPokemonHost(db);
  //isPokemon, Pokemon name, Pokemon number, optional region
  var pokemon = GetPokemonDetailsFromMessage(message);
  if (!pokemon[0]) {
    message.channel.send(pokemon[1]);
  } else {
    if (!dALegendsList.includes(pokemon[1].toLowerCase())) {
      message.channel.send(
        "**" +
          pokemon[1] +
          "** does not appear to be one of the Dynamax Adventure bosses <@" +
          message.author.id +
          ">.\nPlease select from the Legends and Ultra Beast availible."
      );
      return;
    }
    var pokeIndex = pokemon[2];
    if (users.some(elem => elem.name == message.author.username)) {
      const index = users
        .map(function(e) {
          return e.name;
        })
        .indexOf(message.author.username);

      var pokemonList;
      pokemonList = users[index].pokemon;

      if (isSave) {
        if (pokemonList.length > 2) {
          var pokemonListString = pokemonList.join(", ");
          message.channel.send(
            "<@" +
              message.author.id +
              "> it appears you already have these three Pokémon saved: **" +
              pokemonListString +
              "**\nUse `$pinsir da remove [pokemon]` to make space for new adventures!"
          );
          return;
        } else if (pokemonList.includes(pokemon[1])) {
          message.channel.send(
            "It appears you already have **" +
              pokemon[1].toString().join(", ") +
              "** saved in your adventure list <@" +
              message.author.id +
              ">!"
          );
          return;
        }

        console.log("Now saving to Db");
        SaveDAPokemon(db, message, pokemon[1]);
      } else {
        console.log("Preparing to remove");
        RemoveDAPokemon(db, message, pokemon[1]);
      }
    } else {
      console.log("Now saving to Db");
      SaveDAPokemon(db, message, pokemon[1]);
    }
  }
}

async function RemoveDAPokemon(db, message, pokemon) {
  const username = message.author.username;
  var dbUsers = [];
  const tableName = "dynamax";
  var users = db.get(tableName).value();
  users.forEach(function(user) {
    dbUsers.push({ name: user.username, pokemon: user.pokemon }); // adds their info to the dbUsers value
  });

  if (dbUsers.some(elem => elem.name == username)) {
    const index = dbUsers
      .map(function(e) {
        return e.name;
      })
      .indexOf(username);
    if (!(index > -1)) {
      message.channel.send(
        "You do not appear to have set up an Adventure list yet.\n" +
          "Try using `$pinsr da add [pokemon]` to let people know which Dynamanx Adventure paths you have availible!"
      );
      return;
    } else {
      var pokemonList;
      pokemonList = dbUsers[index].pokemon;
      await new Promise(r => setTimeout(r, 1000));
      const pokeIndex = pokemonList
        .map(function(e) {
          return e;
        })
        .indexOf(pokemon);

      if (pokeIndex > -1) {
        pokemonList.splice(pokeIndex, 1);

        UpdateUser(db, tableName, username, { pokemon: pokemonList });
        message.channel.send(
          "**" +
            pokemon +
            "** has been removed from your list <@" +
            message.author.id +
            ">."
        );
      } else {
        message.channel.send(
          "<@" +
            message.author.id +
            ">, you do not appear to have " +
            pokemon +
            " in your adventure list.\n" +
            "Use `$pinsir da list` to see which Pokémon you have saved or use `$pinsir da clear` to clear your current list and request."
        );
      }
    }
  } else {
    message.channel.send(
      "You don't seem to have an Adventure list set up <@" +
        message.author.id +
        ">\n" +
        "Try using `$pinsr da add [pokemon]` to let people know which Dynamanx Adventure paths you have availible!"
    );
  }
}

// Read from DB
async function SaveDAPokemon(db, message, pokemon) {
  const username = message.author.username;
  var dbUsers = [];
  const tableName = "dynamax";
  var users = db.get(tableName).value();
  users.forEach(function(user) {
    dbUsers.push({ name: user.username, pokemon: user.pokemon }); // adds their info to the dbUsers value
  });

  if (dbUsers.some(elem => elem.name == username)) {
    const index = dbUsers
      .map(function(e) {
        return e.name;
      })
      .indexOf(username);
    var pokemonList;
    pokemonList = dbUsers[index].pokemon;
    await new Promise(r => setTimeout(r, 1000));
    pokemonList.push(pokemon);
    UpdateUser(db, tableName, username, { pokemon: pokemonList });
  } else {
    var pokemonList = [];
    pokemonList.push(pokemon);
    // Set a user using Lodash shorthand syntax
    db.get(tableName)
      .push({ username: username, pokemon: pokemonList })
      .write();
  }
  message.channel.send(
    "**" +
      pokemon +
      "** has been saved to your adventure list <@" +
      message.author.id +
      ">!"
  );
}

// Read from DB
async function GetPokemonHost(db) {
  var tableName = "dynamax";
  var dbUsers = [];

  var table = getDbTable(db, tableName);
  table.forEach(function(user) {
    dbUsers.push({
      name: user.username,
      pokemon: user.pokemon,
      searching: user.searching,
      userId: user.userId
    }); // adds their info to the dbUsers value
  });
  // Lowdb has lazy returns but no promise so we have to wait.
  await new Promise(r => setTimeout(r, 1000));
  return dbUsers;
}

async function SendDAHostedByMessage(db, message) {
  var users = await GetPokemonHost(db);
  var pokemon = GetPokemonDetailsFromMessage(message);
  if (pokemon[0]) {
    if (!dALegendsList.includes(pokemon[1].toLowerCase())) {
      message.channel.send(
        "<@" +
          message.author.id +
          "> " +
          pokemon[1] +
          " does not appear to be one of the Dynamax Adventure bosses." +
          "\nPlease select from the Legends and Ultra Beast availible."
      );
      return;
    }
    var pokeIndex = pokemon[2];
    var optionalRegionTag = GetHtmlRegionTag(pokemon[3], pokeIndex);
    if (pokeIndex < 10) {
      pokeIndex = "00" + pokeIndex;
    } else if (pokeIndex > 9 && pokeIndex < 100) {
      pokeIndex = "0" + pokeIndex;
    }

    var name = "The following Adventurers have **" + pokemon[1] + "**:";
    var usernames = "";
    await users.forEach(function(user) {
      if (user.pokemon && user.pokemon.includes(pokemon[1])) {
        console.log(user.pokemon);
        usernames += " > " + user.name + "\n";
      }
      usernames.replace("undefined", "");
    });
    if (!usernames) {
      name =
        "Nobody has a path that leads to **" + pokemon[1] + "** at the time.";
      usernames = "\u200b";
    }
    var embed = new Discord.MessageEmbed()
      .setColor(0xffd700)
      .setAuthor(
        message.author.username + " is looking to battle a " + pokemon[1],
        message.author.displayAvatarURL()
      )
      //.setDescription("Coming up next: " + pokemonCapList[pokeIndex-1] + "!")
      .addFields({
        name: name,
        value: usernames
      })
      //  .setTitle(`${title1}`)
      //.setDescription("Blah blah")
      .setThumbnail(
        "https://www.serebii.net/swordshield/pokemon/" +
          pokeIndex +
          optionalRegionTag +
          ".png"
      );
    message.channel.send(embed);
  } else message.channel.send(pokemon[1]);
}

async function GetAdventureList(db, message) {
  var users = await GetPokemonHost(db);
  //isPokemon, Pokemon name, Pokemon number, optional region
  if (users.some(elem => elem.name == message.author.username)) {
    const index = users
      .map(function(e) {
        return e.name;
      })
      .indexOf(message.author.username);

    var pokemonList = users[index].pokemon;
    var searching = users[index].searching;
    var searchString = "";
    if (searching) {
      searchString =
        "You are currently looking to go on an adventure for: **" +
        searching +
        "**";
    }
    if (pokemonList.length > 0) {
      var pokemonListString = pokemonList.join(", ");
      message.channel.send(
        "<@" +
          message.author.id +
          "> You have the following Pokémon in your Adventure list: **" +
          pokemonListString +
          "**\n" +
          searchString
      );
      return;
    } else if (!(pokemonList.length > 0) && searching) {
      var pokemonListString = pokemonList.join(", ");
      message.channel.send("<@" + message.author.id + "> " + searchString);
    } else {
      message.channel.send(
        "You don't seem to have an Adventure list set up <@" +
          message.author.id +
          ">\n" +
          "Try using `$pinsr da add [Pokémon]` to let people know which Dynamanx Adventure paths you have availible." +
          "\n Or you can let people know you are looking for an Adventure using `$pinsir da request [Pokémon]`!"
      );
      return;
    }
  } else {
    message.channel.send(
      "You don't seem to have an Adventure list set up <@" +
        message.author.id +
        ">\n" +
        "Try using `$pinsr da add [Pokémon]` to let people know which Dynamanx Adventure paths you have availible!"
    );
    return;
  }
}

async function SetSearchDAPokemon(db, message) {
  var users = await GetPokemonHost(db);
  //isPokemon, Pokemon name, Pokemon number, optional region
  var pokemon = GetPokemonDetailsFromMessage(message);
  if (!pokemon[0]) {
    message.channel.send(pokemon[1]);
  } else {
    if (!dALegendsList.includes(pokemon[1].toLowerCase())) {
      message.channel.send(
        "**" +
          pokemon[1] +
          "** does not appear to be one of the Dynamax Adventure bosses <@" +
          message.author.id +
          ">.\nPlease select from the Legends and Ultra Beast availible."
      );
      return;
    }
    var pokeIndex = pokemon[2];
    console.log("About to save the search pokemon");
    SaveSearchDAPokemon(db, message, pokemon[1]);
  }
}

function SaveSearchDAPokemon(db, message, pokemon) {
  const username = message.author.username;
  var dbUsers = [];
  const tableName = "dynamax";
  var users = db.get(tableName).value();
  users.forEach(function(user) {
    dbUsers.push({ name: user.username }); // adds their info to the dbUsers value
  });

  if (dbUsers.some(elem => elem.name == username)) {
    const index = dbUsers
      .map(function(e) {
        return e.name;
      })
      .indexOf(username);
    UpdateUser(db, tableName, username, {
      searching: pokemon,
      userId: message.author.id
    });
  } else {
    // Set a user using Lodash shorthand syntax
    db.get(tableName)
      .push({
        username: username,
        searching: pokemon,
        userId: message.author.id
      })
      .write();
  }
  message.channel.send(
    "<@" +
      message.author.id +
      "> People can now see you are looking for **" +
      pokemon +
      "**!"
  );
}

async function SearchDAPokemon(db, message) {
  var users = await GetPokemonHost(db);
  var pokemon = GetPokemonDetailsFromMessage(message);
  if (pokemon[0]) {
    if (!dALegendsList.includes(pokemon[1].toLowerCase())) {
      message.channel.send(
        "<@" +
          message.author.id +
          "> " +
          pokemon[1] +
          " does not appear to be one of the Dynamax Adventure bosses." +
          "\nPlease select from the Legends and Ultra Beast availible."
      );
      return;
    }
    var pokeIndex = pokemon[2];
    var optionalRegionTag = GetHtmlRegionTag(pokemon[3], pokeIndex);
    if (pokeIndex < 10) {
      pokeIndex = "00" + pokeIndex;
    } else if (pokeIndex > 9 && pokeIndex < 100) {
      pokeIndex = "0" + pokeIndex;
    }

    var name =
      "The following Adventurers are looking for **" + pokemon[1] + "**:";
    var usernames = "";
    users.forEach(function(user) {
      if (user.searching == pokemon[1]) {
        usernames += " > " + user.name + "\n";
      }
      usernames.replace("undefined", "");
    });
    if (!usernames) {
      name =
        "Nobody is currently looking to adventure for **" +
        pokemon[1] +
        "** at the time.";
      usernames = "\u200b";
    }
    var embed = new Discord.MessageEmbed()
      .setColor(0xffd700)
      .setAuthor(
        message.author.username +
          " is looking for allies to battle a " +
          pokemon[1],
        message.author.displayAvatarURL()
      )
      //.setDescription("Coming up next: " + pokemonCapList[pokeIndex-1] + "!")
      .addFields({
        name: name,
        value: usernames
      })
      //  .setTitle(`${title1}`)
      //.setDescription("Blah blah")
      .setThumbnail(
        "https://www.serebii.net/swordshield/pokemon/" +
          pokeIndex +
          optionalRegionTag +
          ".png"
      );
    message.channel.send(embed);
  } else message.channel.send(pokemon[1]);
}

async function PingSearchDAPokemon(db, message) {
  // message.guild.channels.cache.find(u => u.tag === 'Someone#1234').id
  var users = await GetPokemonHost(db);
  var pokemon = GetPokemonDetailsFromMessage(message);
  if (pokemon[0]) {
    if (!dALegendsList.includes(pokemon[1].toLowerCase())) {
      message.channel.send(
        "<@" +
          message.author.id +
          "> " +
          pokemon[1] +
          " does not appear to be one of the Dynamax Adventure bosses." +
          "\nPlease select from the Legends and Ultra Beast availible."
      );
      return;
    }
    var pokeIndex = pokemon[2];
    var optionalRegionTag = GetHtmlRegionTag(pokemon[3], pokeIndex);
    if (pokeIndex < 10) {
      pokeIndex = "00" + pokeIndex;
    } else if (pokeIndex > 9 && pokeIndex < 100) {
      pokeIndex = "0" + pokeIndex;
    }
    var msgUserName = message.author.username;
    if (users.some(elem => elem.name == msgUserName)) {
      const index = users
        .map(function(e) {
          return e.name;
        })
        .indexOf(msgUserName);
      var pokemonList;
      pokemonList = users[index].pokemon;

      if (!pokemonList.includes(pokemon[1])) {
        message.channel.send(
          "<@" +
            message.author.id +
            "> It appears you do not have **" +
            pokemon[1] +
            "** saved in your adventure list.\nPlease use `$pinsir da add " +
            pokemon[1] +
            "` before using the ping command."
        );
        return;
      }

      var name = "The following Adventurers are requested for backup!";
      var usernames = "";
      await users.forEach(function(user) {
        if (user.searching == pokemon[1]) {
          usernames += "<@" + user.userId + "> \n";
        }
        usernames.replace("undefined", "");
      });
      if (!usernames) {
        name = "The cheer echoed feebly around the arena...";
        usernames =
          "Unfortunately, nobody is currently looking to adventure for **" +
          pokemon[1] +
          "** at the time.";
      }
      var embed = new Discord.MessageEmbed()
        .setColor(0xffd700)
        .setAuthor(
          message.author.username +
            " needs allies to battle a " +
            pokemon[1] +
            "!",
          message.author.displayAvatarURL()
        )
        //.setDescription("Coming up next: " + pokemonCapList[pokeIndex-1] + "!")
        .addFields({
          name: name,
          value: usernames
        })
        //  .setTitle(`${title1}`)
        //.setDescription("Blah blah")
        .setThumbnail(
          "https://www.serebii.net/swordshield/pokemon/" +
            pokeIndex +
            optionalRegionTag +
            ".png"
        );
      message.channel.send(embed);
    } else message.channel.send(pokemon[1]);
  } else {
    "<@" +
      message.author.id +
      ">! It appears you do not have **" +
      pokemon +
      "** saved in your adventure list. Please use `$pinsir da add [" +
      pokemon +
      "]' before using the ping command.";
  }
}
