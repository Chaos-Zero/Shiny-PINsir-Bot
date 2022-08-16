const { Client, RichEmbed } = require("discord.js");
const Discord = require("discord.js");
//const genshin = require("genshin-impact-api");

function CreateGenshinEmbed(character) {
  return new Discord.EmbedBuilder()
    .setTitle("Genshin Impact Bio: " + character.name)
    .setColor("0x00ace6")
    .setThumbnail(character.image)
    .setDescription(character.description)
    .addFields(
      {
        name: "Constellation",
        value: character.constellation,
        inline: true
      },
      {
        name: "Weapon",
        value: character.weapon,
        inline: true
      },
      {
        name: "Vision",
        value: character.vision,
        inline: true
      },
      {
        name: "Title",
        value: character.title,
        inline: true
      },
      {
        name: "Rarity",
        value: character.rarity,
        inline: true
      },
      {
        name: "Nation",
        value: character.nation,
        inline: true
      },
      {
        name: "Birthday",
        value: character.birthday,
        inline: true
      },
      {
        name: "Full Bio",
        value: "[" + character.name + " Wiki Link](" + character.url + ")",
        inline: true
      }
    )
    .setFooter({
      text: "danimyuu ♡",
      iconURL: "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FMewditto.png?v=1609471789850"}
    );
}

function GetGenshinCharacter(message, character) {
  try {
    message.channel.send({embeds: [CreateGenshinEmbed(genshin.characters(character))], allowedMentions: { repliedUser: false } });
  } catch {
    message.channel.send("Sorry, I couldn't find that character.");
  }
}
