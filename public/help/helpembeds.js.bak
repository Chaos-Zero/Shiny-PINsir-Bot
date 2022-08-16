const { Client, RichEmbed } = require("discord.js");
const Discord = require("discord.js");

function TerrainMessage(message) {
  const argument = message.content.split(" ");
  switch (String(argument[2]).toLowerCase()) {
    case "electric":
      return ElectricTerrainMessage();
      break;
    case "grass":
    case "grassy":
      return GrassyTerrainMessage();
      break;
    case "misty":
      return MistyTerrainMessage();
      break;
    case "psychic":
      return PsychicTerrainMessage();
      break;
    default:
      return "You must specify one of the following terrains:\n Electric, Grassy, Misty, Psychic.";
  }
}

function ElectricTerrainMessage() {
  const Embed = new Discord.MessageEmbed()
    .setTitle("<:Electric:778732680870625281> Electric Terrain")
    .setColor(0xffff00)
    //.setImage(
    ///"https://cdn.glitch.com/59bb141b-c323-4e6e-86e3-ea46f9f062cf%2F5c60775e-2ebb-461c-9f0b-0af6fb375e5c.image.png?v=1605728589335"
    //)
    .setDescription("Watch out for **Electric** type Pokémon")
    .addFields(
      {
        name: "Activation Means:",
        value:
          "Use of the move Electric Terrain\nUse of the Max Move Max Lightning\nA Pokémon activates the ability Electric Surge",
        inline: false
      },
      {
        name: "Effects",
        value:
          "```If the Pokémon is on the ground, it will wake up from Sleep, and be unable to fall asleep\nIf the Pokémon is on the ground, the Pokémon's Electric-type move power will be boosted 30% as of Pokémon Sword & Shield. 50% before.\nThe move Nature Power becomes Thunderbolt\nThe move Terrain Pulse becomes Electric-type and doubles power.\nThe ability Surge Surfer activates, causing the Pokémon's Speed to double. Pokémon holding the Electric Seed item have their Defense boosted 1 stage. The item is then consumed.```",
        inline: false
      }
    );
  return Embed;
}

function GrassyTerrainMessage() {
  const Embed = new Discord.MessageEmbed()
    .setTitle("<:Grassy:778732681294643242> Grassy Terrain")
    .setColor(0x98ff98)
    //.setImage(
    //"https://cdn.glitch.com/59bb141b-c323-4e6e-86e3-ea46f9f062cf%2Fe1a40e3e-0567-4d1a-9b82-0e0c73e11b1c.image.png?v=1605728962486"
    //)
    .setDescription("Watch out for **Grass** type Pokémon")
    .addFields(
      {
        name: "Activation Means:",
        value:
          "Use of the move Grassy Terrain\nUse of the Max Move Max Overgrowth\nA Pokémon activates the ability Grassy Surge",
        inline: false
      },
      {
        name: "**Effects**",
        value:
          "```If the Pokémon is on the ground, it will recover 1/16th of its Hit Points each turn\nIf the Pokémon is on the ground, its Grass-type moves will be boosted 30% as of Pokémon Sword & Shield. 50% before.\nPokémon with the Grass Pelt ability gain a Defense boost of 50%\nThe move Nature Power becomes Energy Ball\nThe move Terrain Pulse becomes Grass-type and doubles power.\nThe move Grassy Gliade now has a Speed Priority of 1.\nPower of moves Earthquake, Bulldoze & Magnitude is reduced by 50%\nPokémon holding the Grassy Seed item have their Defense boosted 1 stage. The item is then consumed.```",
        inline: false
      }
    );
  return Embed;
}

function MistyTerrainMessage() {
  const Embed = new Discord.MessageEmbed()
    .setTitle("<:NoDragon:778732681201713176> Misty Terrain")
    .setColor(0xb3d5e0)
    //.setImage(
    //"https://cdn.glitch.com/59bb141b-c323-4e6e-86e3-ea46f9f062cf%2F641332e0-4d14-4599-b456-be2e5dc759b8.image.png?v=1605731508825"
    //)
    .setDescription(
      "**Dragon** type moves are **halved in power** if both Pokemon are on the ground."
    )
    .addFields(
      {
        name: "Activation Means:",
        value:
          "Use of the move Misty Terrain\nUse of the Max Move Max Starfall\nA Pokémon activates the ability Misty Surge",
        inline: false
      },
      {
        name: "Effects",
        value:
          "```If the Pokémon is on the ground, it will not be able to be affected by a status condition\nIf the Pokémon is on the ground, and so is its target, their Dragon-type moves are reduced in power by 50%\nThe move Nature Power becomes Moon Blast\nThe move Terrain Pulse becomes Fairy-type and doubles power.\nThe move Misty Explosion increases in power by 50%\nPokémon holding the Misty Seed item have their Special Defense boosted 1 stage. The item is then consumed.```",
        inline: false
      }
    );
  return Embed;
}

function PsychicTerrainMessage() {
  const Embed = new Discord.MessageEmbed()
    .setTitle("<:Psychic:778732680883208203> Psychic Terrain")
    .setColor(0xff1493)
    //.setThumbnail(
    //  "https://cdn.glitch.com/59bb141b-c323-4e6e-86e3-ea46f9f062cf%2F4a3fa1ce-caaf-4a07-a8e2-5ded2a445517.image.png?v=1605731830585"
    //)
    //.setImage(
    //"https://cdn.glitch.com/59bb141b-c323-4e6e-86e3-ea46f9f062cf%2F4a3fa1ce-caaf-4a07-a8e2-5ded2a445517.image.png?v=1605731830585"
    //)
    .setDescription(
      "Watch out for **Psychic** type Pokémon. Priority 1 and above moves are negated on the ground."
    )
    .addFields(
      {
        name: "Activation Means:",
        value:
          "Use of the move Psychic Terrain\nCompletion of Mew's Special Z-Move, Genesis Supernova\nUse of the Max Move Max Mindstorm\nA Pokémon activates the ability Psychic Surge",
        inline: false
      },
      {
        name: "Effects",
        value:
          "```If the Pokémon is on the ground, it will not be affected by moves with a Speed Priority of 1 or higher. This does not affect moves with increased priority that the user uses on itself or moves that effect the field\nThe move Nature Power becomes Psychic\nThe move Terrain Pulse becomes Psychic-type and doubles power.\nThe move Expanding Force increases in power by 50% and damages all opponents.\nIf the Pokémon is on the ground, the Pokémon's Psychic-type move power will be boosted 30% as of Pokémon Sword & Shield. 50% before.\nPokémon holding the Psychic Seed item have their Special Defense boosted 1 stage. The item is then consumed.```",
        inline: false
      }
    );
  return Embed;
}