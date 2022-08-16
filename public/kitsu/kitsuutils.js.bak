// This is used to get anime and manga details
const { get } = require("request-promise");
const { MessageEmbed } = require("discord.js");

function getAnime(message) {
  const args = message.content.substring(2);
  if(!args.length) {
      return message.channel.send("I'm sorry, but I don't recognise this title.")
 }
  
  let option = {
    url: encodeURI("https://kitsu.io/api/edge/anime?filter[text]=" + args),
    method: `GET`,
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json"
    },
    json: true
  };

  message.channel.send("Fetching The Info").then(msg => {
    get(option).then(body => {
      try {
        let title = body.data[0].attributes.titles.en ? body.data[0].attributes.titles.en : body.data[0].attributes.titles.en_jp;
        let embed = new MessageEmbed()
          .setTitle(title)
          .setColor("RED")
          .setDescription(body.data[0].attributes.synopsis)
          .setThumbnail(body.data[0].attributes.posterImage.original)
          .addField("Trailer:", "https://www.youtube.com/watch?v=" + body.data[0].attributes.youtubeVideoId)
          .addFields({name: "Ratings", value: body.data[0].attributes.averageRating, inline: true})
          .addFields({name: "Episode Count", value: body.data[0].attributes.episodeCount, inline: true})
          .setImage(body.data[0].attributes.coverImage.large);
        //try it

        message.channel.send(embed);
        msg.delete();
      } catch (err) {
        msg.delete();
        return message.channel.send("Sorry, but I couldn't find this anime in our catalogue\nMaybe I have it written down differently...");
      }
    });
  });
}

function getManga(message) {
  const args = message.content.substring(2);
  if(!args.length) {
      return message.channel.send("I'm sorry, but I don't recognise this title.")
 }
  
  let option = {
    url: encodeURI("https://kitsu.io/api/edge/manga?filter[text]=" + args),
    method: `GET`,
    headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json"
    },
    json: true
  };

  message.channel.send("Fetching The Info").then(msg => {
    get(option).then(body => {
      try {
        let title = body.data[0].attributes.titles.en ? body.data[0].attributes.titles.en : body.data[0].attributes.titles.en_jp;
        let embed = new MessageEmbed()
          .setTitle(title)
          .setColor("GREEN")
          .setDescription(body.data[0].attributes.synopsis)
          .setThumbnail(body.data[0].attributes.posterImage.original)
          .addFields({name: "Type:", value: body.data[0].attributes.mangaType.toUpperCase(), inline: true})
          .addFields({name: "Ratings", value: body.data[0].attributes.averageRating, inline: true})
          .addFields({name: "Volumes:", value: body.data[0].attributes.volumeCount, inline: true})
          .setImage(body.data[0].attributes.coverImage.large);
        //try it

        message.channel.send(embed);
        msg.delete();
      } catch (err) {
        msg.delete();
        return message.channel.send("Sorry, but I couldn't find this manga in our catalogue.\nMaybe I have it written down differently...");
      }
    });
  });
}

