const { Client, RichEmbed } = require("discord.js");
const Discord = require("discord.js");
const util = require("util");

const testHtmlWithAddtionalPictures =
  '<div class="pics"><a href="/playpokemon/2022/worldchampionships.shtml"><img src="/worlds2022motif.jpg" alt="Pokémon World Championships " width="300" loading="lazy" /></a></div> <div class="subcat" ><h3>In The Pokémon Department</h3> <p class="title">Pokémon World Championships - Exclusive Merchandise Reveal</p> <p>The Pokémon Company International has given us the global exclusive reveal of a pair of merchandise that can be exclusively purchased at the Pokémon Center Pop-up Store at the <a href="/playpokemon/2022/worldchampionships.shtml">Pokémon World Championships</a> next week from August 17th through 21st in the ExCeL in London, United Kingdom.<br /> This merchandise is the much coveted Coin, Damage Counters & VSTAR Marker Set, with two variations being available in the store. The Coin, Damage Counters & VSTAR Marker Set  - Main Look (London WC22) and the Coin, Damage Counters & VSTAR Marker Set  - City (London WC22) which offer a different case and different coins with a different look<br /> The opening time of Pokémon Center are as follows, with entry being through a virtual queue system at the venue<br /> Wednesday 17th August: 12 pm to 7 pm<br /> Thursday 18th – Saturday 20th August: 8 am to 8 pm<br /> Sunday 21st August: 8 am to 4 pm <table align="center" class="dextab"> <tr > <td class="fooevo">Coin, Damage Counters & VSTAR Marker Set  - Main Look<br />Case</td><td class="fooevo">Coin, Damage Counters & VSTAR Marker Set  - Main Look<br />Dice & Coin</td></tr> <tr> <td class="cen"><a href="/playpokemon/2022/coinsetmain.jpg" rel="lightbox[ranger3]"><img src="/playpokemon/2022/coinsetmainth.jpg" width="250" loading="lazy" /></a></td><td class="cen"><a href="/playpokemon/2022/coinsetmain2.jpg" rel="lightbox[ranger3]"><img src="/playpokemon/2022/coinsetmain2th.jpg" height="250" loading="lazy" /></a></td> </tr> <tr >  <td class="fooevo">Coin, Damage Counters & VSTAR Marker Set  - City<br />Case</td><td class="fooevo">Coin, Damage Counters & VSTAR Marker Set  - City<br />Dice & Coin</td></tr> <tr><td class="cen"><a href="/playpokemon/2022/coinsetcity.jpg" rel="lightbox[ranger3]"><img src="/playpokemon/2022/coinsetcityth.jpg" width="250" loading="lazy" /></a></td><td class="cen"><a href="/playpokemon/2022/coinsetcity2.jpg" rel="lightbox[ranger3]"><img src="/playpokemon/2022/coinsetcity2th.jpg" height="250" loading="lazy" /></a></td> </tr> </table> </p></div>';

const testHtmlWithYoutube =
  '<div class="pics"><a href="/anime/epiguide/pokemon/"><img src="/arceuschronicles.jpg" width="300"  alt="Pokémon The Arceus Chronicles" loading="lazy" /></a></div> <div class="subcat"><h3>In The AnimeDepartment</h3> <p class="title">Pokémon Arceus Chronicles</p> <p>The Pokémon Company International have announced Pokémon The Arceus Chronicles, a special focused around Arceus and Team Galactic. This special will air at the Pokémon World Championships next week at a special screening on August 19th at 18:00, and will then be on Netflix from September 23rd<br /> This special aired in four parts in Japan on Amazon Prime back in January <table align="center" class="dextab"> <tr > <td class="fooevo" colspan="2">Footage</td></tr> <tr><td class="cen" colspan="2"><iframe width="590" height="344" loading="lazy" src="https://www.youtube.com/embed/rHimPkAq5V8" frameborder="0" allowfullscreen></iframe></td></tr> </table></p></div>   <div class="pics"><a href="/card"><img src="/tcgexhibition2.jpg" width="300"  alt="Pokémon Trading Card Game: Online Illustration Exhibition" loading="lazy" /></a></div> <div class="subcat"><h3>In The TCG Department</h3> <p class="title"> Pokémon Trading Card Game: Online Illustration Exhibition</p> <p>Following its announcement last month, the <a href="https://lp.anique.jp/exhibition/pokemon-card/en" target="blank" rel="nofollow">Pokémon Trading Card Game: Online Illustration Exhibition</a> is now online. This will run from August 10th through to October 22nd and allows for people to look at a variety of Pokémon Card artwork amongst three themes Life, History, and Artist showcasing artwork from over 50 different Pokémon TCG artists.</p></div>';

const testMix =
  '<div class="post"><h2><a href="/news/2022/15-August-2022.shtml" id="15-August-2022">Monday: Pokémon Masters EX - Giovanni & Persian Event & Run-Up to Third Anniversary Events</a></h2><p class="info"><span class="date">15-08-2022 07:00 BST / 02:00 EDT</span> by <span class="user"><a  href=mailto:webmaster@serebii.net>Serebii</a></span>.</p><p>This update will be amended throughout the day so be sure to check back. If you have any ideas for the site, be sure to send them in.<br /><b>Last Update:</b> 07:11 BST<br />Edit @ 07:11: Pokémon Café ReMix</p><div class="pics"><a href="/pokemonmasters/events/specialsyncpaireventgiovanniandpersian.shtml"><img src="/pokemonmasters/events/specialsyncpaireventgiovanniandpersian.jpg" alt="Pokémon Masters - Lookers Tenacity" width="300" loading="lazy" /></a></div><div class="subcat" ><h3>In The Games Department</h3><p class="title">Pokémon Masters EX - Special Sync Pair Event</p><p>As part of the run-up to third anniversary celebrations, several events have gone live in Pokémon Masters EX<br />First is the <a href="/pokemonmasters/events/specialsyncpaireventgiovanniandpersian.shtml">Special Sync Pair Event Giovanni and Persian Event</a>. This special event gives all players the Sync Pair of <a href="/pokemonmasters/syncpairs/giovanni.shtml">Giovanni (Classic) & Persian</a> and offers various items to boost up the Sync Pair. It runs until<br />In addition to that, a special event, the <a href="/pokemonmasters/events/run-uptothreespecialbattlesdailypresentevent.shtml">Run-Up to Three Special Battles Daily Present Event</a> is running until August 28th which provides daily battles for a variety of rewards. A special Event Mission Bingo is also live for this event</p></div>' +
  '<div class="pics"><a href="/anime/epiguide/pokemon/"><img src="/arceuschronicles.jpg" width="300"  alt="Pokémon The Arceus Chronicles" loading="lazy" /></a></div> <div class="subcat"><h3>In The AnimeDepartment</h3> <p class="title">Pokémon Arceus Chronicles</p> <p>The Pokémon Company International have announced Pokémon The Arceus Chronicles, a special focused around Arceus and Team Galactic. This special will air at the Pokémon World Championships next week at a special screening on August 19th at 18:00, and will then be on Netflix from September 23rd<br /> This special aired in four parts in Japan on Amazon Prime back in January <table align="center" class="dextab"> <tr > <td class="fooevo" colspan="2">Footage</td></tr> <tr><td class="cen" colspan="2"><iframe width="590" height="344" loading="lazy" src="https://www.youtube.com/embed/rHimPkAq5V8" frameborder="0" allowfullscreen></iframe></td></tr> </table></p></div>   <div class="pics"><a href="/card"><img src="/tcgexhibition2.jpg" width="300"  alt="Pokémon Trading Card Game: Online Illustration Exhibition" loading="lazy" /></a></div> <div class="subcat"><h3>In The TCG Department</h3> <p class="title"> Pokémon Trading Card Game: Online Illustration Exhibition</p> <p>Following its announcement last month, the <a href="https://lp.anique.jp/exhibition/pokemon-card/en" target="blank" rel="nofollow">Pokémon Trading Card Game: Online Illustration Exhibition</a> is now online. This will run from August 10th through to October 22nd and allows for people to look at a variety of Pokémon Card artwork amongst three themes Life, History, and Artist showcasing artwork from over 50 different Pokémon TCG artists.</p></div>' +
  '<div class="pics"><a href="/playpokemon/2022/worldchampionships.shtml"><img src="/worlds2022motif.jpg" alt="Pokémon World Championships " width="300" loading="lazy" /></a></div> <div class="subcat" ><h3>In The Pokémon Department</h3> <p class="title">Pokémon World Championships - Exclusive Merchandise Reveal</p> <p>The Pokémon Company International has given us the global exclusive reveal of a pair of merchandise that can be exclusively purchased at the Pokémon Center Pop-up Store at the <a href="/playpokemon/2022/worldchampionships.shtml">Pokémon World Championships</a> next week from August 17th through 21st in the ExCeL in London, United Kingdom.<br /> This merchandise is the much coveted Coin, Damage Counters & VSTAR Marker Set, with two variations being available in the store. The Coin, Damage Counters & VSTAR Marker Set  - Main Look (London WC22) and the Coin, Damage Counters & VSTAR Marker Set  - City (London WC22) which offer a different case and different coins with a different look<br /> The opening time of Pokémon Center are as follows, with entry being through a virtual queue system at the venue<br /> Wednesday 17th August: 12 pm to 7 pm<br /> Thursday 18th – Saturday 20th August: 8 am to 8 pm<br /> Sunday 21st August: 8 am to 4 pm <table align="center" class="dextab"> <tr > <td class="fooevo">Coin, Damage Counters & VSTAR Marker Set  - Main Look<br />Case</td><td class="fooevo">Coin, Damage Counters & VSTAR Marker Set  - Main Look<br />Dice & Coin</td></tr> <tr> <td class="cen"><a href="/playpokemon/2022/coinsetmain.jpg" rel="lightbox[ranger3]"><img src="/playpokemon/2022/coinsetmainth.jpg" width="250" loading="lazy" /></a></td><td class="cen"><a href="/playpokemon/2022/coinsetmain2.jpg" rel="lightbox[ranger3]"><img src="/playpokemon/2022/coinsetmain2th.jpg" height="250" loading="lazy" /></a></td> </tr> <tr >  <td class="fooevo">Coin, Damage Counters & VSTAR Marker Set  - City<br />Case</td><td class="fooevo">Coin, Damage Counters & VSTAR Marker Set  - City<br />Dice & Coin</td></tr> <tr><td class="cen"><a href="/playpokemon/2022/coinsetcity.jpg" rel="lightbox[ranger3]"><img src="/playpokemon/2022/coinsetcityth.jpg" width="250" loading="lazy" /></a></td><td class="cen"><a href="/playpokemon/2022/coinsetcity2.jpg" rel="lightbox[ranger3]"><img src="/playpokemon/2022/coinsetcity2th.jpg" height="250" loading="lazy" /></a></td> </tr> </table> </p></div>' +
  '<div class="pics"><a href="/cafemix/events.shtml"><img src="/cafemix/machokehiker.jpg" alt="Pokémon Café ReMix" width="300" loading="lazy" /></a></div><div class="subcat"><h3>In The Games Department</h3><p class="title">Pokémon Café ReMix</p><p>A Pokémon Café ReMix login bonus event has begun. This gives you special rewards every day totalling up to 21,000 Golden Acorns while, on Day 5, will give you the special Hiker Outfit for <a href="/cafemix/pokemon/machoke.shtml">Machoke</a>. It  runs until September 1st</p></div> </div> <!-- end_news -->';

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
  // Test message
  //var postEntries = GetSplitPosts(testMix);
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
  for (var i = 0; i < discordPosts.length; i++) {
    console.log("Sending Message: " + i);
    channel.send(discordPosts[i]);
  }
}
