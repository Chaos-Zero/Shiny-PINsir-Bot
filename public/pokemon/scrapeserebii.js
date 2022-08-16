const { Client, RichEmbed } = require("discord.js");
const Discord = require("discord.js");
const util = require("util");

const embedColours = {
  games: "0x3498DB", //Blue
  "pokémon of the week": "0xF1C40F", // Gold
  "pokemon of the week": "0xF1C40F", // Gold
  anime: "0x11806A", //Aqua
  animé: "0x11806A", //Aqua
  pokémon: "0x992D22", // Dark Red
  pokemon: "0x992D22", // Dark Red
  tcg: "0x7289DA", // Blurple
  "trading card": "0x7289DA", // Blurple
  miscellaneous: "0x34495E", //Navy
  misc: "0x34495E", // Navy
};
const defaultEmbedColour = "0xFFFFFF";

async function SendSerebiiNews(db, bot, rawHtml) {
  var latestpost = GetLatestPost(rawHtml);
  var date = GetPostDate(latestpost);
  var postEntries = GetSplitPosts(latestpost);
  var discordPosts = CreatePostEmbeds(postEntries);
  UpdateAndSendDbEmbeds(db, bot, date, discordPosts);
}

function GetLatestPost(rawHtml) {
  var html = rawHtml.toString("latin1");
  const startSting = '<div class="post">';
  const endString = "<!-- end_news -->";
  //console.log(html.split(startSting)[1].split(endString)[0]);
  return html.split(startSting)[1].split(endString)[0];
}

function GetPostDate(htmlPost) {
  const startSting = '<span class="date">';
  const endString = "</span>";
  var fullDate = htmlPost.split(startSting)[1].split(endString)[0];
  console.log(fullDate.split(" ")[0]);
  return fullDate.split(" ")[0];
}

/*
    var list = [
    { date: '12/1/2011', reading: 3, id: 20055 },
    { date: '13/1/2011', reading: 5, id: 20053 },
    { date: '14/1/2011', reading: 6, id: 45652 }
];

Need to get: Display Pic
             Department
             Title
             Paragraph
             Contained Pictures 
             Youtube Video
             
  */
function GetSplitPosts(htmlPosts) {
  const startSting = '<div class="pics">';
  const endString = "</p></div>";
  var deLimitedsplitHtmlPosts = htmlPosts.split(startSting);
  var splitHtmlPosts = [];
  // We start on 1 because there is always a preamble entry
  for (var i = 1; i < deLimitedsplitHtmlPosts.length; i++) {
    splitHtmlPosts.push(
      deLimitedsplitHtmlPosts[i].slice(
        0,
        deLimitedsplitHtmlPosts[i].indexOf(endString) + 1
      )
    );
  }

  var postData = [];
  for (var i = 0; i < splitHtmlPosts.length; i++) {
    var allPictures = splitHtmlPosts[i].split('<img src="')[1].split('"');
    var displayPic = "https://serebii.net" + allPictures.shift();
    var department = splitHtmlPosts[i].split("<h3>")[1].split("</h3>")[0];
    var title = splitHtmlPosts[i].split('class="title">')[1].split("</p>")[0];
    var unformattedText = splitHtmlPosts[i]
      .split("<p>")[1]
      .split("<p></div>")[0];
    var textAndYoutube = FormatHtmlTags(unformattedText);
    postData.push({
      displayPic: displayPic,
      department: department,
      title: title,
      text: textAndYoutube[0],
      youtubeLink: textAndYoutube[1],
      pictures: textAndYoutube[2],
    });
  }
  return postData;
}

function CreatePostEmbeds(postData) {
  var discordMessages = [];
  for (var i = 0; i < postData.length; i++) {
    var message = new Discord.EmbedBuilder()
      .setTitle(postData[i].title)
      .setColor(GetEmbedColur(postData[i].department))
      .setAuthor({
        name: postData[i].department,
        iconURL: "https://serebii.net/anime/pokemon/251.gif",
        url: "https://serebii.net/",
      })
      //.setThumbnail(postData[i].displayPic)
      .setDescription(postData[i].text)
      .setImage(postData[i].displayPic)
      .setFooter({
        text: "danimyuu ♡",
        iconURL:
          "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FMewditto.png?v=1609471789850",
      });
    discordMessages.push({
      embeds: [message],
      allowedMentions: { repliedUser: false },
    });

    if (!postData[i].youtubeLink == "") {
      discordMessages.push(
        "**" + postData[i].title + " video:** " + postData[i].youtubeLink
      );
    }

    if (
      Array.isArray(postData[i].pictures) &&
      postData[i].pictures.length > 1
    ) {
      var embedsPics = [];
      for (var j = 0; j < postData[i].pictures.length; j++) {
        if (j == 0) {
          let embed = new Discord.EmbedBuilder()
            .setTitle(postData[i].title + " preview:")
            .setURL("https://serebii.net/") //);
            .setColor(GetEmbedColur(postData[i].department))
            .setImage(postData[i].pictures[j]);
          embedsPics.push(embed);
        } else {
          let embed = new Discord.EmbedBuilder()
            .setURL("https://serebii.net/")
            .setImage(postData[i].pictures[j]);
          embedsPics.push(embed);
          //}
        }
      }
      discordMessages.push({
        embeds: embedsPics,
        allowedMentions: { repliedUser: false },
      });

      //var picturesString = '[ ';
      //for (var j = 0; j < postData[i].pictures.length; j++) {
      //  picturesString.concat('"');
      //  picturesString.concat(postData[i].pictures[j]);
      //  picturesString.concat('",');
      //}
      //picturesString.concat(' ]');
      //discordMessages.push(
      //  postData[i].title + " pictures: ", { files: postData[i].pictures }
      //);
    }

    //  for (var j=0; j < postData[i].pictures.length; j++){
    //  discordMessages.push(
    //    postData[i].title + " video: " + postData[i].pictures[j]
    //  );
    // }
    //discordMessages.push(postData[i].title + " video: https://youtu.be/rHimPkAq5V8");
  }
  return discordMessages;
}

function httpGetAsync(theUrl, callback) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  };
  xmlHttp.open("GET", "https://serebii.net/", true); // true for asynchronous
  xmlHttp.send(null);
}

async function fetchAsync(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

function httpGet(url) {
  return new Promise((resolve, reject) => {
    const http = require("http"),
      https = require("https");

    let client = http;

    if (url.toString().indexOf("https") === 0) {
      client = https;
    }

    client
      .get(url, (resp) => {
        let chunks = [];

        // A chunk of data has been recieved.
        resp.on("data", (chunk) => {
          chunks.push(chunk);
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          resolve(Buffer.concat(chunks));
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

async function GetSerebii(url) {
  try {
    let buf = await httpGet(url);
    console.log("Serebii News retrieved.");
    return buf;
  } catch (err) {
    console.log("Could not get Serebii News.");
  }
}

function FormatHtmlTags(text) {
  // Find links and replace them
  var formattedText = text;
  try {
    var links = [];
    var splitLinks = text.split("</a>");
    if (splitLinks.length > 0) {
      for (var i = 0; i < splitLinks.length; i++) {
        var link = splitLinks[i].substr(splitLinks[i].lastIndexOf("<a href="));
        links.push(link.concat("</a>"));
      }
      for (var i = 0; i < links.length; i++) {
        var formattedHyperlink = CreateHyperlinkFromHtmlTag(links[i]);
        if (formattedHyperlink.length > 0) {
          formattedText = formattedText.replace(
            links[i],
            CreateHyperlinkFromHtmlTag(links[i])
          );
        }
      }
    }
  } catch (err) {}
  formattedText = formattedText.split("<br />").join("\n");
  formattedText = formattedText.split("<br/>").join("\n");

  let youtubeLinkConfirm = GetYoutubeLinks(formattedText);

  var pictureLinks = GetPictureLinks(youtubeLinkConfirm[1]);
  formattedText = pictureLinks[0];

  if (youtubeLinkConfirm[0] == true) {
    return [formattedText, youtubeLinkConfirm[2], pictureLinks[1]];
  } else {
    return [formattedText, "", pictureLinks[1]];
  }
}

function CreateHyperlinkFromHtmlTag(link) {
  // <a href="/swordshield/maxraidbattles/eventden-grimmsnarlevent.shtml">Max Raid Battle Event</a>
  // [country codes](https://countrycode.org/)
  try {
    var address;
    if (link.includes("https") || link.includes("http")) {
      address = link.split('href="')[1].split('"')[0];
    } else {
      address = "https://serebii.net".concat(
        link.split('href="')[1].split('">')[0]
      );
    }
    var hyperlinkText = link.split('">')[1].split("</a>")[0];
    return "[" + hyperlinkText + "](" + address + ")";
  } catch (err) {
    return "";
  }
}

function GetYoutubeLinks(text) {
  // https://youtu.be/rHimPkAq5V8
  // https://www.youtube.com/embed/rHimPkAq5V8
  if (text.includes("youtube")) {
    try {
      var youtubeEmbedSubstringsIndex = text.indexOf("<table");
      var youtubeEmbedSubstring = text.substr(youtubeEmbedSubstringsIndex);
      var youtubeLink = youtubeEmbedSubstring.split('src="')[1].split('"')[0];
      var youtubeId = youtubeLink.lastIndexOf("/");
      var idResult = youtubeLink.substring(youtubeId + 1);
      var finalYoutubeLink = "https://youtu.be/".concat(idResult);
      //text = text.slice(0, youtubeEmbedSubstringsIndex);
      console.log("Youtube Video!");
      return [true, text, finalYoutubeLink];
    } catch (err) {
      console.log("Nae Youtube Video");
      return [false, text, ""];
    }
  } else {
    console.log("Nae Youtube Video");
    return [false, text, ""];
  }
}

function GetPictureLinks(text) {
  // https://youtu.be/rHimPkAq5V8
  // https://www.youtube.com/embed/rHimPkAq5V8
  var imageLinks = [];
  try {
    var pictureEmbedSubstringsIndex = text.indexOf("<table");
    var pictureEmbedSubstring = text.substr(pictureEmbedSubstringsIndex);

    if (!pictureEmbedSubstring.includes("youtube")) {
      var pictureAddresses = pictureEmbedSubstring.split('src="');
      if (pictureAddresses.length > 0) {
        for (var i = 1; i < pictureAddresses.length; i++) {
          var link = pictureAddresses[i].split('"')[0];
          imageLinks.push("https://serebii.net".concat(link));
        }
      }
    }
    text = text.slice(0, pictureEmbedSubstringsIndex);
    return [text, imageLinks];
  } catch (err) {
    console.log("Nae Youtube Video or images");
    return [text, imageLinks];
  }
}

function GetEmbedColur(department) {
  for (var key in embedColours) {
    if (department.toLowerCase().indexOf(key) !== -1) {
      return embedColours[key];
    }
  }
  return defaultEmbedColour;
}

async function UpdateAndSendDbEmbeds(db, bot, date, discordPosts) {
  // Get collection of embeds from DB
  var channel = await GetChannelByNameWithoutMessage(bot, "○-serebii-news");
  var dbSerebiiNews = GetSerebiiEmbeds(db, "serebiiMessages", date);
  if (typeof dbSerebiiNews === "undefined") {
    db.get("serebiiMessages").shift().write();
    sendSerbiiMessages(bot, discordPosts);
    db.get("serebiiMessages")
      .push({
        date: date,
        message: discordPosts,
        ammountOfPosts: discordPosts.length,
      })
      .write();
  }
  //else if(dbSerebiiNews.message != discordPosts){
  else if (!util.isDeepStrictEqual(dbSerebiiNews.message, discordPosts)) {
    console.log(channel);
    channel
      .bulkDelete(dbSerebiiNews.ammountOfPosts)
      .then((messages) => console.log(`Bulk deleted ${messages.size} messages`))
      .catch(console.error);
    sendSerbiiMessages(bot, discordPosts);
    var discordPostsAssignment = {
      date: date,
      message: discordPosts,
      ammountOfPosts: discordPosts.length,
    };
    UpdateSerebiiEmbeds(db, "serebiiMessages", date, discordPostsAssignment);
  }
  // check if messages are equal
  //if (dbSerebiiNews.posts != discordPosts){
  //message.channel.bulkDelete(dbSerebiiNews.ammountOfPosts)
  //.then(messages => console.log(`Bulk deleted ${messages.size} messages`))
  //.catch(console.error);
  //for (var i = 0; i < discordPosts.length; i++) {
  //  console.log("Sending Message: " + i);
  //  message.channel.send(discordPosts[i]);
  //}
  //}
}

function sendSerbiiMessages(bot, discordPosts) {
  var channel = GetChannelByNameWithoutMessage(bot, "○-serebii-news");
  for (var i = discordPosts.length; i > 0; i--) {
    console.log("Sending Message: " + i);
    channel.send(discordPosts[i-1]);
  }
}
