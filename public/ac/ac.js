// This is used to get anime and manga details
const { get } = require("request-promise");
const { EmbedBuilder } = require("discord.js");

// Utility functions
function jsonConcat(o1, o2) {
  for (var key in o2) {
    o1[key] = o2[key];
  }
  return o1;
}

function Compare(strA, strB) {
  for (var result = 0, i = strA.length; i--; ) {
    if (typeof strB[i] == "undefined" || strA[i] == strB[i]);
    else if (strA[i].toLowerCase() == strB[i].toLowerCase()) result++;
    else result += 4;
  }
  return (
    1 -
    (result + 4 * Math.abs(strA.length - strB.length)) /
      (2 * (strA.length + strB.length))
  );
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function AcCommands(
  message,
  villagers,
  bugs,
  fishes,
  fossils,
  arts,
  items,
  hangables
) {
  var args;
  try {
    args = message.content
      .split(" ")
      .slice(2, 3)
      .join(" ");
  } catch {
    args = "";
  }
  if (
    message.content.toLowerCase().includes("character") ||
    message.content.toLowerCase().includes("char")
  ) {
    GetVillager(message, villagers);
  } else if (args == "bug") {
    GetBug(message, bugs);
  } else if (args == "fish") {
    GetFish(message, fishes);
  } else if (args == "fossil") {
    GetFossil(message, fossils);
  } else if (args == "art") {
    GetArt(message, arts);
  } else if (args == "item") {
    GetItem(message, items, hangables);
  } else {
    CycleVillager(message, villagers);
  }
}

// API calls
async function GetVillagers() {
  let option = {
    url: encodeURI("https://acnhapi.com/v1/villagers"),
    method: `GET`,
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json"
    },
    json: true
  };

  try {
    let acChar = await get(option);
    console.log("Villagers retrieved");
    return acChar;
  } catch (err) {
    console.log("Villagers could not be retrieved");
  }
}

async function GetBugs() {
  let option = {
    url: encodeURI("https://acnhapi.com/v1/bugs"),
    method: `GET`,
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json"
    },
    json: true
  };

  try {
    let acChar = await get(option);
    console.log("Bugs retrieved");
    return acChar;
  } catch (err) {
    console.log("Bugs could not be retrieved");
  }
}

async function GetFishes() {
  let option = {
    url: encodeURI("https://acnhapi.com/v1/fish"),
    method: `GET`,
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json"
    },
    json: true
  };

  let option2 = {
    url: encodeURI("https://acnhapi.com/v1/sea"),
    method: `GET`,
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json"
    },
    json: true
  };

  try {
    let acFish = await get(option);
    let acSea = await get(option2);
    var acChar = {};
    acChar = jsonConcat(acChar, acFish);
    acChar = jsonConcat(acChar, acSea);
    console.log("Fish retrieved");
    return acChar;
  } catch (err) {
    console.log("Fish could not be retrieved");
  }
}

async function GetFossils() {
  let option = {
    url: encodeURI("https://acnhapi.com/v1/fossils"),
    method: `GET`,
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json"
    },
    json: true
  };

  try {
    let acChar = await get(option);
    console.log("Fossils retrieved");
    return acChar;
  } catch (err) {
    console.log("Fossils could not be retrieved");
  }
}

async function GetArts() {
  let option = {
    url: encodeURI("https://acnhapi.com/v1/Art"),
    method: `GET`,
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json"
    },
    json: true
  };

  try {
    let acChar = await get(option);
    console.log("Art retrieved");
    return acChar;
  } catch (err) {
    console.log("Art could not be retrieved");
  }
}

async function GetBasicItems() {
  let option = {
    url: encodeURI("https://acnhapi.com/v1/houseware"),
    method: `GET`,
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json"
    },
    json: true
  };
  let option2 = {
    url: encodeURI("https://acnhapi.com/v1/misc"),
    method: `GET`,
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json"
    },
    json: true
  };
  let option3 = {
    url: encodeURI("https://acnhapi.com/v1/wallmounted"),
    method: `GET`,
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json"
    },
    json: true
  };

  try {
    let acHome = await get(option);
    let acMisc = await get(option2);
    let acWallMounted = await get(option3);
    var acItems = {};
    acItems = jsonConcat(acItems, acHome);
    acItems = jsonConcat(acItems, acMisc);
    console.log("Base items retrieved");
    return [acItems, acWallMounted];
  } catch (err) {
    console.log("Base Items could not be retrieved");
  }
}

function CreateVillagerEmbed(villagerCount, villagers) {
  var villager;
  for (var vil in villagers) {
    var acName = villagers[vil]["id"];
    if (acName == villagerCount.toString()) {
      villager = villagers[vil];
      console.log("FOUND: " + villager["name"]["name-USen"]);
      break;
    }
  }

  let embed = new EmbedBuilder()
    .setTitle(villager["name"]["name-USen"])
    .setColor("0x00FF00")
    .setThumbnail(villager["image_uri"])
    .addFields({
      name: "Birthday",
      value: villager["birthday-string"],
      inline: false
    })
    .addFields({
      name: "Personality",
      value: villager["personality"],
      inline: true
    })
    .addFields({
      name: "Species",
      value: villager["species"],
      inline: true
    })
    .addFields({
      name: "Gender",
      value: villager["gender"],
      inline: true
    })
    //.setImage(body.data[0].attributes.coverImage.large)
    .setFooter({ text: '"' + villager["catch-phrase"] + '"', iconURL: villager["icon_uri"]});
  //try it

  return embed;
}

async function CreateItemEmbed(
  message,
  itemCount,
  itemString,
  items,
  hangables
) {
  var item;
  var isWallMountable = false;

  for (var it in items) {
    var itemName = items[it][0]["name"]["name-USen"];
    if (itemName == itemString.toLowerCase()) {
      item = items[it];
      console.log("FOUND: " + item[0]["name"]["name-USen"]);
      break;
    }
  }
  if (!item) {
    for (var it in hangables) {
      var itemName = hangables[it][0]["name"]["name-USen"];
      if (itemName == itemString.toLowerCase()) {
        item = hangables[it];
        isWallMountable = true;
        console.log("FOUND: " + item[0]["name"]["name-USen"]);
        break;
      }
    }
  }
  var highestMatchVal = 0;
  if (!item) {
    for (var it in items) {
      var itemName = items[it][0]["name"]["name-USen"];
      var compareVal = Compare(itemName, itemString.toLowerCase());
      if (compareVal > 0.5 && compareVal > highestMatchVal) {
        item = items[it];
        highestMatchVal = compareVal;
        //break;
      }
    }
    for (var it in hangables) {
      var itemName = hangables[it][0]["name"]["name-USen"];
      var compareVal = Compare(itemName, itemString.toLowerCase());
      if (compareVal > 0.5 && compareVal > highestMatchVal) {
        item = hangables[it];
        highestMatchVal = compareVal;
        isWallMountable = true;
        //break;
      }
    }
  }

  if (item) {
    console.log("FOUND: " + item[0]["name"]["name-USen"]);
  }

  if (!item) {
    return message.channel.send("I'm sorry, but I don't recognise this item.");
  }

  var itemName = item[itemCount]["name"]["name-USen"];
  var title = itemName.replace(/(^\w{1})|(\s+\w{1})/g, letter =>
    letter.toUpperCase()
  );
  if (item[itemCount]["variant"]) {
    var variantEntry = item[itemCount]["variant"];
    var variant = variantEntry.replace(/(^\w{1})|(\s+\w{1})/g, letter =>
      letter.toUpperCase()
    );
    title += ": " + variant;
  }

  const numbeOfItems = Object.keys(item).length;

  var footerText =
    numbeOfItems > 1
      ? "Item available from AC Ver.: " +
        item[itemCount]["version"] +
        " | Page " +
        (parseInt(itemCount) + 1) +
        " of " +
        numbeOfItems
      : "Item available from AC Ver." + item[itemCount]["version"];
  let embed = new EmbedBuilder()
    .setTitle(title)
    .setColor("0xdaa520")
    .setThumbnail(item[itemCount]["image_uri"])
    .setFooter({
      text: footerText,
      iconURL:"https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FGyroid.png?v=1614961148871" }
    );

  if (item[itemCount]["buy-price"]) {
    embed.addFields({
      name: "Buy Price",
      value: item[itemCount]["buy-price"] + " <:bells:817325042902892554>",
      inline: true
    });
  }
  if (item[itemCount]["sell-price"]) {
    embed.addFields({
      name: "Sell Price",
      value: item[itemCount]["sell-price"] + " <:bells:817325042902892554>",
      inline: true
    });
  }
  if (item[itemCount]["source"]) {
    var sourceText = item[itemCount]["isCatalog"]
      ? item[itemCount]["source"] + "\nAvailable in catalogue"
      : item[itemCount]["source"];
    embed.addFields({
      name: "Source",
      value: sourceText,
      inline: true
    });
  }

  if (item[itemCount]["source-detail"]) {
    embed.addFields({
      name: "Source Details",
      value: item[itemCount]["source-detail"],
      inline: false
    });
  }

  if (item[itemCount]["size"]) {
    var sizeText = isWallMountable
      ? item[itemCount]["size"] + "\nThis item is wall mountable"
      : item[itemCount]["size"];
    embed.addFields({
      name: "Tile Size",
      value: sizeText,
      inline: true
    });
  }
  var interactiveText = item[itemCount]["isInteractive"] ? "Yes" : "No";
  embed.addFields({
    name: "Interactive",
    value: interactiveText,
    inline: true
  });
  var outdoorText = item[itemCount]["isOutdoor"] ? "Yes" : "No";
  embed.addFields({
    name: "Outdoors",
    value: outdoorText,
    inline: true
  });

  if (item[itemCount]["hha-series"]) {
    var hhaseries =  item[itemCount]["hha-series"]
    var hhaseriesTextCap = hhaseries.replace(/(^\w{1})|(\s+\w{1})/g, letter =>
      letter.toUpperCase()
    );
    embed.addFields({
      name: "HHA Series",
      value: hhaseriesTextCap,
      inline: true
    });
  }
  if (item[itemCount]["hha-set"]) {
    embed.addFields({
      name: "HHA Set",
      value: item[itemCount]["hha-set"],
      inline: true
    });
  }
  if (item[itemCount]["hha-concept-1"]) {
    
    var hhaText = item[itemCount]["hha-concept-2"]
      ? "1. " +
        item[itemCount]["hha-concept-1"] +
        "\n2. " +
        item[itemCount]["hha-concept-2"]
      : item[itemCount]["hha-concept-1"];
    var hhaTextCap = hhaText.replace(/(^\w{1})|(\s+\w{1})/g, letter =>
      letter.toUpperCase()
    );
    embed.addFields({
      name: "HHA Concepts",
      value: hhaTextCap,
      inline: true
    });
  }

  var diyText = item[itemCount]["isDiy"] ? "Yes" : "No";
  embed.addFields({
    name: "DIY Item",
    value: diyText,
    inline: true
  });
  if (item[itemCount]["kit-cost"]) {
    embed.addFields({
      name: "Kit Cost",
      value: item[itemCount]["kit-cost"],
      inline: true
    });
  }
  var bodyText = item[itemCount]["canCustomizeBody"] ? "Body" : "";
  var patternText = item[itemCount]["canCustomizePattern"] ? "Pattern" : "";
  if (bodyText.length > 0 && patternText.length > 0) {
    patternText = ", " + patternText;
  }
  if (bodyText.length > 0 || patternText.length > 0) {
    embed.addFields({
      name: "Customisable parts",
      value: bodyText + patternText,
      inline: true
    });
  }
  if (item[itemCount]["tag"]) {
    embed.addFields({
      name: "Item Tag",
      value: item[itemCount]["tag"],
      inline: true
    });
  }
  if (item[itemCount]["pattern"]) {
    embed.addFields({
      name: "Set Pattern",
      value: item[itemCount]["pattern"],
      inline: true
    });
  }
  if (item[itemCount]["pattern-title"]) {
    embed.addFields({
      name: "Pattern Title",
      value: item[itemCount]["pattern-title"],
      inline: true
    });
  }

  return [embed, numbeOfItems];
}

// Get functions from API responses
function CycleVillager(message, villagers) {
  // We have the starting number as 1 as we are checking against ID, not entry in JSON
  var villagerCount = getRandomInt(1, Object.keys(villagers).length);
  var embed = CreateVillagerEmbed(villagerCount, villagers);

  message.channel
    .send({embeds: [embed]})
    .then(m => {
      m.react("⬅️");
      m.react("➡️");

      const leftFilter = reaction => reaction.emoji.name === "⬅️";
      const rightFilter = reaction => reaction.emoji.name === "➡️";
      var fiter = (reaction, user) => ["⬅️", "➡️"].includes(reaction.emoji.name);
      const collector = m.createReactionCollector({
        // only collect left and right arrow reactions from the message author
        fiter, time: 5 * 60 * 1000
        }
      ); // 5 min

      collector.on("collect", async (reaction, user) => {
        if (!user.bot) {
          reaction.users.remove(user.id);
          if (reaction.emoji.name === "⬅️" && villagerCount == 1) {
            villagerCount = Object.keys(villagers).length;
          } else if (
            reaction.emoji.name === "➡️" &&
            villagerCount == Object.keys(villagers).length
          ) {
            villagerCount = 1;
          } else {
            reaction.emoji.name === "⬅️" ? villagerCount-- : villagerCount++;
          }
          var embed = CreateVillagerEmbed(villagerCount, villagers);
          m.edit({embeds: [embed]});
          //m.react("⬅️");
          //m.react("➡️");
        }
      });
    })
    .catch(err => console.error(err));
  //message.delete();
}

// Get functions from API responses
function GetVillager(message, villagers) {
  const args = message.content
    .split(" ")
    .slice(3)
    .join(" ");
  if (!args.length) {
    return message.channel.send("Please enter a Villagers name.");
  }

  var villager;
  for (var vil in villagers) {
    var acName = villagers[vil]["name"]["name-USen"];
    if (acName.toLowerCase() == args.toLowerCase()) {
      villager = villagers[vil];
      console.log("FOUND: " + villager["name"]["name-USen"]);
      break;
    }
  }
  if (!villager) {
    return message.channel.send(
      "I'm sorry, but I don't recognise this Villager."
    );
  }
  let embed = new EmbedBuilder()
    .setTitle(villager["name"]["name-USen"])
    .setColor("0x00FF00")
    .setThumbnail(villager["image_uri"])
    .addFields({
      name: "Birthday",
      value: villager["birthday-string"],
      inline: false
    })
    .addFields({
      name: "Personality",
      value: villager["personality"],
      inline: true
    })
    .addFields({
      name: "Species",
      value: villager["species"],
      inline: true
    })
    .addFields({
      name: "Gender",
      value: villager["gender"],
      inline: true
    })
    //.setImage(body.data[0].attributes.coverImage.large)
    .setFooter({ text: '"' + villager["catch-phrase"] + '"', iconURL:villager["icon_uri"]});
  //try it
  message.channel.send({embeds: [embed]});
  //message.delete();
}

function GetBug(message, bugs) {
  const args = message.content
    .split(" ")
    .slice(3)
    .join(" ");
  if (!args.length) {
    return message.channel.send("Please enter a bug name.");
  }

  var bug;
  for (var b in bugs) {
    var bugName = bugs[b]["name"]["name-USen"];
    if (bugName.toLowerCase() == args.toLowerCase()) {
      bug = bugs[b];
      console.log("FOUND: " + bug["name"]["name-USen"]);
      break;
    }
  }
  if (!bug) {
    return message.channel.send("I'm sorry, but I don't recognise this bug.");
  }
  var bugName = bug["name"]["name-USen"];
  var title = bugName.replace(/(^\w{1})|(\s+\w{1})/g, letter =>
    letter.toUpperCase()
  );
  let embed = new EmbedBuilder()
    .setTitle(title)
    .setColor("0x964b00")
    .setThumbnail(bug["image_uri"])
    .addFields({
      name: "Location",
      value: bug["availability"]["location"],
      inline: true
    })
    .addFields({
      name: "Price",
      value: bug["price"] + " <:bells:817325042902892554>",
      inline: true
    })
    .addFields({
      name: "Flick's Price",
      value: bug["price-flick"] + " <:bells:817325042902892554>",
      inline: true
    })
    .addFields({
      name: "Museum Description",
      value: bug["museum-phrase"],
      inline: false
    })
    //.setImage(body.data[0].attributes.coverImage.large)
    .setFooter({ text: '"' + bug["catch-phrase"] + '"', iconURL: bug["icon_uri"]});

  if (bug["availability"]["isAllDay"] == true) {
    embed.addFields({
      name: "Appearance Time",
      value: "All day",
      inline: true
    });
  } else {
    embed.addFields({
      name: "Appearance Time",
      value: bug["availability"]["time"],
      inline: true
    });
  }
  if (bug["availability"]["isAllYear"] == true) {
    embed.addFields({
      name: "This bug is available all year round.",
      value: "\u200b",
      inline: false
    });
  } else {
    embed.addFields({
      name: "N. Hemisphere",
      value: "Months: " + bug["availability"]["month-northern"],
      inline: true
    });
    embed.addFields({
      name: "S. Hemisphere",
      value: "Months: " + bug["availability"]["month-southern"],
      inline: true
    });
  }

  message.channel.send({embeds: [embed]});
  //message.delete();
}

function GetFish(message, fishes) {
  const args = message.content
    .split(" ")
    .slice(3)
    .join(" ");
  if (!args.length) {
    return message.channel.send("Please enter a fish name.");
  }

  var fish;
  for (var f in fishes) {
    var fishName = fishes[f]["name"]["name-USen"];
    if (fishName.toLowerCase() == args.toLowerCase()) {
      fish = fishes[f];
      console.log("FOUND: " + fish["name"]["name-USen"]);
      break;
    }
  }
  if (!fish) {
    return message.channel.send("I'm sorry, but I don't recognise this fish.");
  }
  var fishName = fish["name"]["name-USen"];
  var title = fishName.replace(/(^\w{1})|(\s+\w{1})/g, letter =>
    letter.toUpperCase()
  );
  let embed = new EmbedBuilder()
    .setTitle(title)
    .setThumbnail(fish["image_uri"])
    .setFooter({ text: '"' + fish["catch-phrase"] + '"', iconURL: fish["icon_uri"]});

  if (fish["speed"]) {
    embed.addFields({
      name: "Creature Speed",
      value: fish["speed"],
      inline: true
    });
    embed.setColor("0x006994");
  } else if (fish["availability"]["location"]) {
    embed.addFields({
      name: "Location",
      value: fish["availability"]["location"],
      inline: true
    });
    embed.setColor("0xadd8e6");
  }
  embed.addFields({
    name: "Price",
    value: fish["price"] + " <:bells:817325042902892554>",
    inline: true
  });
  if (fish["price-cj"]) {
    embed.addFields({
      name: "CJ's Price",
      value: fish["price-cj"] + " <:bells:817325042902892554>",
      inline: true
    });
  } else {
    embed.addFields({
      name: "Shadow Size",
      value: fish["shadow"],
      inline: true
    });
  }
  embed.addFields({
    name: "Museum Description",
    value: fish["museum-phrase"],
    inline: false
  });

  if (fish["availability"]["isAllDay"] == true) {
    embed.addFields({
      name: "Appearance Time",
      value: "All day",
      inline: true
    });
  } else {
    embed.addFields({
      name: "Appearance Time",
      value: fish["availability"]["time"],
      inline: true
    });
  }
  if (fish["availability"]["isAllYear"] == true) {
    embed.addFields({
      name: "This fish is available all year round.",
      value: "\u200b",
      inline: false
    });
  } else {
    embed.addFields({
      name: "N. Hemisphere",
      value: "Months: " + fish["availability"]["month-northern"],
      inline: true
    });
    embed.addFields({
      name: "S. Hemisphere",
      value: "Months: " + fish["availability"]["month-southern"],
      inline: true
    });
  }
  if (fish["price-cj"]) {
    embed.addFields({
      name: "Shadow Size",
      value: fish["shadow"],
      inline: true
    });
  }

  message.channel.send({embeds: [embed]});
  //message.delete();
}

function GetFossil(message, fossils) {
  const args = message.content
    .split(" ")
    .slice(3)
    .join(" ");
  if (!args.length) {
    return message.channel.send("Please enter a fossil name.");
  }

  var fossil;
  for (var f in fossils) {
    var fossilName = fossils[f]["name"]["name-USen"];
    if (fossilName.toLowerCase() == args.toLowerCase()) {
      fossil = fossils[f];
      console.log("FOUND: " + fossil["name"]["name-USen"]);
      break;
    }
  }
  if (!fossil) {
    return message.channel.send(
      "I'm sorry, but I don't recognise this fossil."
    );
  }
  var fossilName = fossil["name"]["name-USen"];
  var title = fossilName.replace(/(^\w{1})|(\s+\w{1})/g, letter =>
    letter.toUpperCase()
  );
  let embed = new EmbedBuilder()
    .setTitle(title)
    .setColor("0x964b00")
    .setThumbnail(fossil["image_uri"])
    .addFields({
      name: "Price",
      value: fossil["price"] + " <:bells:817325042902892554>",
      inline: true
    })
    .addFields({
      name: "Museum Description",
      value: fossil["museum-phrase"],
      inline: false
    });

  message.channel.send({embeds: [embed]});
  //message.delete();
}

function GetArt(message, arts) {
  const args = message.content
    .split(" ")
    .slice(3)
    .join(" ");
  if (!args.length) {
    return message.channel.send("Please enter the name of a piece of Art.");
  }

  var art;
  for (var a in arts) {
    var artName = arts[a]["name"]["name-USen"];
    if (artName.toLowerCase() == args.toLowerCase()) {
      art = arts[a];
      console.log("FOUND: " + art["name"]["name-USen"]);
      break;
    }
  }
  if (!art) {
    return message.channel.send(
      "I'm sorry, but I don't recognise this art piece."
    );
  }
  var artName = art["name"]["name-USen"];
  var title = artName.replace(/(^\w{1})|(\s+\w{1})/g, letter =>
    letter.toUpperCase()
  );
  let embed = new EmbedBuilder()
    .setTitle(title)
    .setColor("0xdaa520")
    .setThumbnail(art["image_uri"])
    .addFields({
      name: "Buy Price",
      value: art["buy-price"] + " <:bells:817325042902892554>",
      inline: true
    })
    .addFields({
      name: "Sell Price",
      value: art["sell-price"] + " <:bells:817325042902892554>",
      inline: true
    });

  var hasFake;
  if (art["hasFake"] == true) {
    hasFake = "Exist";
  } else {
    hasFake = "Do not exist";
  }
  embed.addFields({
    name: "Counterfeits?",
    value: hasFake,
    inline: true
  });
  embed.addFields({
    name: "Museum Description",
    value: art["museum-desc"],
    inline: false
  });

  message.channel.send({embeds: [embed]});
  //message.delete();
}

async function GetItem(message, items, hangables) {
  const args = message.content
    .split(" ")
    .slice(3)
    .join(" ");
  if (!args.length) {
    return message.channel.send("Please enter a item name.");
  }
  var itemCount = 0;
  var embed = await CreateItemEmbed(message, itemCount, args, items, hangables);
  let numberOfItems = embed[1];
  console.log("We have returned: " + numberOfItems);
  if (numberOfItems == 0) {
    return;
  }

  if (parseInt(numberOfItems) > 1) {
    message.channel
      .send({embeds: [embed[0]]})
      .then(m => {
        m.react("⬅️");
        m.react("➡️");

        const leftFilter = reaction => reaction.emoji.name === "⬅️";
        const rightFilter = reaction => reaction.emoji.name === "➡️";
        var filter = (reaction, user) => ["⬅️", "➡️"].includes(reaction.emoji.name);
        const collector = m.createReactionCollector(
          // only collect left and right arrow reactions from the message author
          {
            filter,time: 5 * 60 * 1000
          }
        ); // 5 min

        collector.on("collect", async (reaction, user) => {
          if (!user.bot) {
            reaction.users.remove(user.id);
            if (reaction.emoji.name === "⬅️" && itemCount == 0) {
              itemCount = parseInt(numberOfItems) - 1;
            } else if (
              reaction.emoji.name === "➡️" &&
              itemCount == parseInt(numberOfItems) - 1
            ) {
              itemCount = 0;
            } else {
              reaction.emoji.name === "⬅️" ? itemCount-- : itemCount++;
            }
            var embed = await CreateItemEmbed(
              message,
              itemCount,
              args,
              items,
              hangables
            );
            m.edit({embeds: [embed[0]] } );
          }
        });
      })
      .catch(err => console.error(err));
    //message.delete();
  } else {
    message.channel.send({embeds: [embed[0]]});
  }
}
