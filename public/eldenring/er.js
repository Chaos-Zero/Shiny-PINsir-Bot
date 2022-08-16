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

async function ErCommands(message, bosses, creatures, aow, npcs, spirits) {
  var args;
  try {
    args = message.content.split(" ").slice(2, 3).join(" ");
  } catch {
    args = "";
  }
  if (args == "boss") {
    GetBoss(message, bosses);
  } else if (args == "creature") {
    GetCreature(message, creatures);
  } else if (args == "ashes" || args == "ash" || args == "aow") {
    GetAsh(message, aow);
  } else if (args == "npc" || args == "character" || args == "char") {
    GetNpc(message, npcs);
  } else if (args == "spirit" || args == "summon") {
    GetSpirit(message, spirits);
  } else if (args == "weapon") {
    GetWeapon(message);
  }
}

// API calls
async function GetBosses() {
  let option = {
    url: encodeURI("https://eldenring.fanapis.com/api/bosses?limit=200"),
    method: `GET`,
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json",
    },
    json: true,
  };

  try {
    let erChar = await get(option);
    console.log("Bosses retrieved");
    return erChar;
  } catch (err) {
    console.log("Bosses could not be retrieved");
  }
}

async function GetCreatures() {
  let option = {
    url: encodeURI("https://eldenring.fanapis.com/api/creatures?limit=200"),
    method: `GET`,
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json",
    },
    json: true,
  };

  try {
    let erChar = await get(option);
    console.log("Creatures retrieved");
    return erChar;
  } catch (err) {
    console.log("Creatures could not be retrieved");
  }
}

async function GetAshes() {
  let option = {
    url: encodeURI("https://eldenring.fanapis.com/api/ashes?limit=200"),
    method: `GET`,
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json",
    },
    json: true,
  };

  try {
    let erChar = await get(option);
    console.log("Ashes retrieved");
    return erChar;
  } catch (err) {
    console.log("Ashes could not be retrieved");
  }
}

async function GetNpcs() {
  let option = {
    url: encodeURI("https://eldenring.fanapis.com/api/npcs?limit=200"),
    method: `GET`,
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json",
    },
    json: true,
  };

  try {
    let erChar = await get(option);
    console.log("Npcs retrieved");
    return erChar;
  } catch (err) {
    console.log("Npcs could not be retrieved");
  }
}

async function GetSpirits() {
  let option = {
    url: encodeURI("https://eldenring.fanapis.com/api/spirits?limit=200"),
    method: `GET`,
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json",
    },
    json: true,
  };

  try {
    let erChar = await get(option);
    console.log("Spirits retrieved");
    return erChar;
  } catch (err) {
    console.log("Spirits could not be retrieved");
  }
}

// Get functions from API responses
function GetBoss(message, bosses) {
  const args = message.content.split(" ").slice(3).join(" ");
  if (!args.length) {
    return message.channel.send("Please enter a Boss' name.");
  }

  var boss;
  for (var b in bosses.data) {
    var bossName = bosses.data[b].name;
    if (bossName.toLowerCase().includes(args.toLowerCase())) {
      boss = bosses.data[b];
      //console.log("FOUND: " + boss["name"]);
      break;
    }
  }

  if (!boss) {
    return message.channel.send("I'm sorry, but I don't recognise this boss.");
  }

  var bio;
  boss.description != null
    ? (bio = boss.description)
    : (bio = "There is no recorded description of this foe.");

  var bossDrops = boss.drops;
  var bossDropText;
  bossDrops.forEach((bossDrop) => {
    if (bossDrop != "undefined") {
      bossDropText += bossDrop + ", ";
    }
    //For some reason the first item is undefined
    bossDropText = bossDropText.replace("undefined", "");
  });

  //Remove extra space and comma
  bossDropText = bossDropText.slice(0, -2);

  let embed = new EmbedBuilder()
    //.setAuthor("Boss")
    .setTitle(boss.name)
    .setColor("0x000000")
    //.setThumbnail("https://i.redd.it/3e2afpjsi4f61.png")
    .setImage(boss.image)
    .addFields({
      name: "Health Points",
      value: boss.healthPoints,
      inline: true,
    })
    .addFields({
      name: "Location",
      value: boss.location,
      inline: true,
    })
    .addFields({
      name: "Bio",
      value: bio,
      inline: false,
    })
    .addFields({
      name: "Drops",
      value: bossDropText,
      inline: false,
    })
    //.setImage(body.data[0].attributes.coverImage.large)
    //.setFooter("Elden Ring", "https://i.redd.it/3e2afpjsi4f61.png");
    .setFooter({
      text: "danimyuu ♡",
      iconURL: "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FMewditto.png?v=1609471789850"}
    );
  //try it
  message.channel.send(embed);
  //message.delete();
}

// Get functions from API responses
function GetCreature(message, creatures) {
  const args = message.content.split(" ").slice(3).join(" ");
  if (!args.length) {
    return message.channel.send("Please enter a Creatures name.");
  }

  var creature;
  for (var c in creatures.data) {
    var creatureName = creatures.data[c].name;
    if (creatureName.toLowerCase().includes(args.toLowerCase())) {
      creature = creatures.data[c];
      //console.log("FOUND: " + boss["name"]);
      break;
    }
  }

  if (!creature) {
    return message.channel.send(
      "I'm sorry, but I don't recognise this creature."
    );
  }

  var bio;
  creature.description != null
    ? (bio = creature.description)
    : (bio = "There is no recorded description of this foe.");

  var creatureDrops = creature.drops;
  var creatureDropText;
  creatureDrops.forEach((creatureDrop) => {
    if (creatureDrop != "undefined") {
      creatureDropText += creatureDrop + ", ";
    }
    //For some reason the first item is undefined
    creatureDropText = creatureDropText.replace("undefined", "");
  });

  //Remove extra space and comma
  creatureDropText = creatureDropText.slice(0, -2);

  let embed = new EmbedBuilder()
    //.setAuthor("Boss")
    .setTitle(creature.name)
    .setColor("0x808080")
    //.setThumbnail("https://i.redd.it/3e2afpjsi4f61.png")
    .setImage(creature.image)
    .addFields({
      name: "Location",
      value: creature.location,
      inline: true,
    })
    .addFields({
      name: "Bio",
      value: bio,
      inline: false,
    })
    .addFields({
      name: "Drops",
      value: creatureDropText,
      inline: false,
    })
    //.setImage(body.data[0].attributes.coverImage.large)
    //.setFooter("Elden Ring", "https://i.redd.it/3e2afpjsi4f61.png");
    .setFooter({
      text: "danimyuu ♡",
      iconURL: "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FMewditto.png?v=1609471789850"}
    );
  //try it
  message.channel.send(embed);
  //message.delete();
}

function GetAsh(message, ashes) {
  const args = message.content.split(" ").slice(3).join(" ");
  if (!args.length) {
    return message.channel.send("Please enter an Ash of War.");
  }

  var ash;
  console.log(ashes);
  for (var a in ashes.data) {
    var ashName = ashes.data[a].name;
    if (ashName.toLowerCase().includes(args.toLowerCase())) {
      ash = ashes.data[a];
      //console.log("FOUND: " + boss["name"]);
      break;
    }
  }

  if (!ash) {
    return message.channel.send(
      "I'm sorry, but I don't recognise this Ash of War."
    );
  }

  var bio;
  ash.description != null
    ? (bio = ash.description)
    : (bio = "There is no recorded description of this Ash of War.");

  let embed = new EmbedBuilder()
    //.setAuthor("Boss")
    .setTitle(ash.name)
    .setColor("0xFFD700")
    .setThumbnail(GetIconImage(ash.affinity, affinityList))
    .setImage(ash.image)
    .addFields({
      name: "Skill",
      value: ash.skill,
      inline: true,
    })
    .addFields({
      name: "Affinity",
      value: ash.affinity,
      inline: true,
    })
    .addFields({
      name: "Description",
      value: bio,
      inline: false,
    })
    //.setImage(body.data[0].attributes.coverImage.large)
    //.setFooter("Elden Ring", "https://i.redd.it/3e2afpjsi4f61.png");
    .setFooter({
      text: "danimyuu ♡",
      iconURL: "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FMewditto.png?v=1609471789850"}
    );
  //try it
  message.channel.send(embed);
  //message.delete();
}

function GetNpc(message, npcs) {
  const args = message.content.split(" ").slice(3).join(" ");
  if (!args.length) {
    return message.channel.send("Please enter an NPC name.");
  }

  var npc;
  for (var n in npcs.data) {
    var npcName = npcs.data[n].name;
    if (npcName.toLowerCase().includes(args.toLowerCase())) {
      npc = npcs.data[n];
      //console.log("FOUND: " + boss["name"]);
      break;
    }
  }

  if (!npc) {
    return message.channel.send("I'm sorry, but I don't recognise this NPC.");
  }

  let embed = new EmbedBuilder()
    //.setAuthor("Boss")
    .setTitle(npc.name)
    .setColor("0xA020F0")
    //.setThumbnail("https://i.redd.it/3e2afpjsi4f61.png")
    .setImage(npc.image)
    .addFields({
      name: "Location",
      value: npc.location,
      inline: true,
    })
    .addFields({
      name: "Role",
      value: npc.role,
      inline: true,
    })
    .addFields({
      name: "Quote",
      value: npc.quote,
      inline: false,
    })
    //.setImage(body.data[0].attributes.coverImage.large)
    //.setFooter("Elden Ring", "https://i.redd.it/3e2afpjsi4f61.png");
    .setFooter({
      text: "danimyuu ♡",
      iconURL: "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FMewditto.png?v=1609471789850"}
    );
  //try it
  message.channel.send(embed);
  //message.delete();
}

function GetSpirit(message, spirits) {
  const args = message.content.split(" ").slice(3).join(" ");
  if (!args.length) {
    return message.channel.send("Please enter a spirit.");
  }

  var spirit;
  for (var s in spirits.data) {
    var spiritName = spirits.data[s].name;
    if (spiritName.toLowerCase().includes(args.toLowerCase())) {
      spirit = spirits.data[s];
      //console.log("FOUND: " + boss["name"]);
      break;
    }
  }

  if (!spirit) {
    return message.channel.send(
      "I'm sorry, but I don't recognise this spirit."
    );
  }

  var bio;
  spirit.description != null
    ? (bio = spirit.description)
    : (bio = "There is no recorded description of this spirit.");

  let embed = new EmbedBuilder()
    //.setAuthor("Boss")
    .setTitle(spirit.name)
    .setColor("0xFFFFFF")
    .setImage(spirit.image)
    .addFields({
      name: "Effect",
      value: spirit.effect,
      inline: false,
    })
    .addFields({
      name: "FP Cost",
      value: spirit.fpCost,
      inline: true,
    })
    .addFields({
      name: "HP Cost",
      value: spirit.hpCost,
      inline: true,
    })
    .addFields({
      name: "Description",
      value: bio,
      inline: false,
    })
    //.setImage(body.data[0].attributes.coverImage.large)
    //.setFooter("Elden Ring", "https://i.redd.it/3e2afpjsi4f61.png");
    .setFooter({
      text: "danimyuu ♡",
      iconURL: "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FMewditto.png?v=1609471789850"}
    );
  //try it
  message.channel.send(embed);
  //message.delete();
}

function GetWeapon(message) {
  const args = message.content.split(" ").slice(3).join(" ");
  if (!args.length) {
    return message.channel.send("Please enter a weapon name.");
  }

  let option = {
    url: encodeURI("https://eldenring.fanapis.com/api/weapons?name=" + args),
    method: `GET`,
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json",
    },
    json: true,
  };

  console.log("https://eldenring.fanapis.com/api/weapons?name=" + args);
  message.channel.send("...").then((msg) => {
    get(option).then((weaponData) => {
      try {
        let weapon = weaponData.data[0];
        let embed = new EmbedBuilder()
          //.setAuthor("Boss")
          .setTitle(weapon.name)
          .setColor("0xFF0000")
          .setThumbnail(GetIconImage(weapon.category, weaponList))
          //.setThumbnail("https://i.redd.it/3e2afpjsi4f61.png")
          .setImage(weapon.image)
          .addFields({
            name: "Description",
            value: weapon.description,
            inline: false,
          })
          .addFields({
            name: "Category",
            value: weapon.category,
            inline: true,
          })
          .addFields({
            name: "Required Str",
            value: weapon.requiredAttributes[0].amount,
            inline: true,
          })
          .addFields({
            name: "Required Dex",
            value: weapon.requiredAttributes[1].amount,
            inline: true,
          })
          .addFields({
            name: "Weight",
            // weigth is a spelling mistake in the API
            value: weapon.weigth,
            inline: true,
          })
          .addFields({
            name: "Str Scale",
            value: weapon.scalesWith[0].scaling,
            inline: true,
          })
          .addFields({
            name: "Dex Scale",
            value: weapon.scalesWith[1].scaling,
            inline: true,
          })
          .addFields({
            name: "\u200b",
            value: "\u200b",
            inline: false,
          })
          .addFields({
            name: "\nAttack Stats",
            value: "\u200b",
            inline: false,
          })
          .addFields({
            name: "Physical",
            value: weapon.attack[0].amount,
            inline: true,
          })
          .addFields({
            name: "Magic",
            value: weapon.attack[1].amount,
            inline: true,
          })
          .addFields({
            name: "Fire",
            value: weapon.attack[2].amount,
            inline: true,
          })
          .addFields({
            name: "Lightning",
            value: weapon.attack[3].amount,
            inline: true,
          })
          .addFields({
            name: "Holy",
            value: weapon.attack[4].amount,
            inline: true,
          })
          .addFields({
            name: "Critical",
            value: weapon.attack[5].amount,
            inline: true,
          })
          .addFields({
            name: "\u200b",
            value: "\u200b",
            inline: false,
          })
          .addFields({
            name: "\nDefence Stats",
            value: "\u200b",
            inline: false,
          })
          .addFields({
            name: "Physical",
            value: weapon.defence[0].amount,
            inline: true,
          })
          .addFields({
            name: "Magic",
            value: weapon.defence[1].amount,
            inline: true,
          })
          .addFields({
            name: "Fire",
            value: weapon.defence[2].amount,
            inline: true,
          })
          .addFields({
            name: "Lightning",
            value: weapon.defence[3].amount,
            inline: true,
          })
          .addFields({
            name: "Holy",
            value: weapon.defence[4].amount,
            inline: true,
          })
          .addFields({
            name: "Boost",
            value: weapon.defence[5].amount,
            inline: true,
          })
          //.setImage(body.data[0].attributes.coverImage.large)
          //.setFooter("Elden Ring", "https://i.redd.it/3e2afpjsi4f61.png");
          .setFooter({
            text: "danimyuu ♡",
            iconURL: "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FMewditto.png?v=1609471789850"}
          );
        message.channel.send(embed);
        msg.delete();
      } catch (err) {
        msg.delete();
        return message.channel.send(
          "I'm sorry, but I don't recognise this Weapon."
        );
      }
    });
  });
}

function GetIconImage(item, list) {
  for (var i = 0; i < list.length; i++) {
    if (list[i].type == item) {
      return list[i].emoji;
    }
  }
}

const affinityList = [
  {
    type: "Standard",
    emoji: "https://cdn.discordapp.com/emojis/962480983121215549.png",
  },
  {
    type: "Sacred",
    emoji:
      "https://cdn.glitch.global/e4f8ed33-788a-4058-b894-988e6619f0a4/sacred.png?v=1649548008503",
  },
  {
    type: "Quality",
    emoji:
      "https://cdn.glitch.global/e4f8ed33-788a-4058-b894-988e6619f0a4/nice.png?v=1649548008649",
  },
  {
    type: "Poison",
    emoji:
      "https://cdn.glitch.global/e4f8ed33-788a-4058-b894-988e6619f0a4/poison.png?v=1649548008591",
  },
  {
    type: "Occult",
    emoji:
      "https://cdn.glitch.global/e4f8ed33-788a-4058-b894-988e6619f0a4/occult.png?v=1649548008474",
  },
  {
    type: "None",
    emoji:
      "https://cdn.glitch.global/e4f8ed33-788a-4058-b894-988e6619f0a4/moon.png?v=1649548008614",
  },
  {
    type: "Magic",
    emoji:
      "https://cdn.glitch.global/e4f8ed33-788a-4058-b894-988e6619f0a4/magic.png?v=1649548008545",
  },
  {
    type: "Lightning",
    emoji:
      "https://cdn.glitch.global/e4f8ed33-788a-4058-b894-988e6619f0a4/lightening.png?v=1649548008229",
  },
  {
    type: "Keen",
    emoji:
      "https://cdn.glitch.global/e4f8ed33-788a-4058-b894-988e6619f0a4/eye.png?v=1649548008151",
  },
  {
    type: "Heavy",
    emoji:
      "https://cdn.glitch.global/e4f8ed33-788a-4058-b894-988e6619f0a4/heavy.png?v=1649548008355",
  },
  {
    type: "Flame Art",
    emoji:
      "https://cdn.glitch.global/e4f8ed33-788a-4058-b894-988e6619f0a4/Flameheart.png?v=1649548008329",
  },
  {
    type: "Fire",
    emoji:
      "https://cdn.glitch.global/e4f8ed33-788a-4058-b894-988e6619f0a4/Flame.png?v=1649548008048",
  },
  {
    type: "Cold",
    emoji:
      "https://cdn.glitch.global/e4f8ed33-788a-4058-b894-988e6619f0a4/snow.png?v=1649548181288",
  },
  {
    type: "Blood",
    emoji:
      "https://cdn.glitch.global/e4f8ed33-788a-4058-b894-988e6619f0a4/Blood.png?v=1649548007934",
  },
];

const weaponList = [
  {
    type: "Axe",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/battle-axe__weapons-elden-ring-wiki-guide-200.png",
  },
  {
    type: "Axes",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/battle-axe__weapons-elden-ring-wiki-guide-200.png",
  },
  {
    type: "Ballista",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/hand_ballista-elden-ring-wiki-guide-200px.png",
  },
  {
    type: "Bow",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/longbow_weapon_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Claw",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/hookclaws_claw-elden-ring-wiki-guide-200px.png",
  },
  {
    type: "Colossal Sword",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/watchdogs_greatsword_colossal_swords_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Colossal Weapon",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/envoys_greathorn_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Crossbow",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/light_crossbow_weapon_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Crossbows",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/light_crossbow_weapon_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Curved Greatsword",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/onyx_lords_greatswords_curved_greatswords-elden-ring-wiki-guide-200.png",
  },
  {
    type: "Curved Sword",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/scimitar_curved_sword_weapon_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Curved Swords",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/scimitar_curved_sword_weapon_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Daggers",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/parrying_dagger_dagger_weapon_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Dagger",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/parrying_dagger_dagger_weapon_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Fist",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/caestus_fist_weapon_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Flail",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/nightrider-flail_flail_weapons-elden-ring-wiki-guide-200.png",
  },

  {
    type: "Flails",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/nightrider-flail_flail_weapons-elden-ring-wiki-guide-200.png",
  },
  {
    type: "Glintstone Staff",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/azurs-glintstone-staff-weapon-elden-ring-wiki-guide-200.png",
  },
  {
    type: "Glintstone Staffs",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/azurs-glintstone-staff-weapon-elden-ring-wiki-guide-200.png",
  },
  {
    type: "Glintstone S",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/azurs-glintstone-staff-weapon-elden-ring-wiki-guide-200.png",
  },
  {
    type: "Greataxes",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/axe-of-godrick-weapon--elden-ring-wiki-guide-200.png",
  },
  {
    type: "Greataxe",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/axe-of-godrick-weapon--elden-ring-wiki-guide-200.png",
  },
  {
    type: "Greatbow",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/lion_greatbow_weapon_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Great Spear",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/serpent-hunter_greatspear_weapon_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Great Spears",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/serpent-hunter_greatspear_weapon_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Greatswords",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/claymore_weapon_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Greatsword",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/claymore_weapon_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Halberds",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/halberd_halberd_weapon_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Halberd",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/halberd_halberd_weapon_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Hammer",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/mace_hammer_weapon_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Hammers",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/mace_hammer_weapon_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Heavy Thrusting Sword",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/great_epee_heavy_thrusting_sword_weapon_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Katana",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/uchigatana_katana_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Light Bows",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/shortbow_lightbow_weapon_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Light Bow",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/shortbow_lightbow_weapon_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Reaper",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/grave_scythe_reaper_weapon_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Light Bows",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/shortbow_lightbow_weapon_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Light Bow",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/shortbow_lightbow_weapon_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Sacred Seals",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/finger_seal_sacred_seal_weapon_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Sacred Seal",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/finger_seal_sacred_seal_weapon_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Spear",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/short_spear_spear_weapon_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Spears",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/short_spear_spear_weapon_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Straight Swords",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/short_sword_straight_sword_weapon_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Straight Sword",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/short_sword_straight_sword_weapon_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Thrusting Sword",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/estoc_thrusting-sword_weapons-elden-ring-wiki-guide-200.png",
  },
  {
    type: "Weapon",
    emoji: "https://cdn.discordapp.com/emojis/962480983121215549.png",
  },
  {
    type: "Torch",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/torch_weapons_elden_ring_wiki_guide_75px.png",
  },
  {
    type: "Twinblades",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/twinblade_weapons_elden_ring_wiki_guide_75px.png",
  },
  {
    type: "Twinblade",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/twinblade_weapons_elden_ring_wiki_guide_75px.png",
  },
  {
    type: "Warhammer",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/brick_hammer_warhammer_weapon_elden_ring_wiki_guide_200px.png",
  },
  {
    type: "Whip",
    emoji:
      "https://eldenring.wiki.fextralife.com/file/Elden-Ring/whip_whip-elden-ring-wiki-guide-200px.png",
  },
  {
    type: "Null",
    emoji: "https://cdn.discordapp.com/emojis/962480983121215549.png",
  },
];
