const { Client, RichEmbed } = require("discord.js");
const Discord = require("discord.js");

const testHtmlWithAddtionalPictures =
  '<div class="pics"><a href="/playpokemon/2022/worldchampionships.shtml"><img src="/worlds2022motif.jpg" alt="Pokémon World Championships " width="300" loading="lazy" /></a></div> <div class="subcat" ><h3>In The Pokémon Department</h3> <p class="title">Pokémon World Championships - Exclusive Merchandise Reveal</p> <p>The Pokémon Company International has given us the global exclusive reveal of a pair of merchandise that can be exclusively purchased at the Pokémon Center Pop-up Store at the <a href="/playpokemon/2022/worldchampionships.shtml">Pokémon World Championships</a> next week from August 17th through 21st in the ExCeL in London, United Kingdom.<br /> This merchandise is the much coveted Coin, Damage Counters & VSTAR Marker Set, with two variations being available in the store. The Coin, Damage Counters & VSTAR Marker Set  - Main Look (London WC22) and the Coin, Damage Counters & VSTAR Marker Set  - City (London WC22) which offer a different case and different coins with a different look<br /> The opening time of Pokémon Center are as follows, with entry being through a virtual queue system at the venue<br /> Wednesday 17th August: 12 pm to 7 pm<br /> Thursday 18th – Saturday 20th August: 8 am to 8 pm<br /> Sunday 21st August: 8 am to 4 pm <table align="center" class="dextab"> <tr > <td class="fooevo">Coin, Damage Counters & VSTAR Marker Set  - Main Look<br />Case</td><td class="fooevo">Coin, Damage Counters & VSTAR Marker Set  - Main Look<br />Dice & Coin</td></tr> <tr> <td class="cen"><a href="/playpokemon/2022/coinsetmain.jpg" rel="lightbox[ranger3]"><img src="/playpokemon/2022/coinsetmainth.jpg" width="250" loading="lazy" /></a></td><td class="cen"><a href="/playpokemon/2022/coinsetmain2.jpg" rel="lightbox[ranger3]"><img src="/playpokemon/2022/coinsetmain2th.jpg" height="250" loading="lazy" /></a></td> </tr> <tr >  <td class="fooevo">Coin, Damage Counters & VSTAR Marker Set  - City<br />Case</td><td class="fooevo">Coin, Damage Counters & VSTAR Marker Set  - City<br />Dice & Coin</td></tr> <tr><td class="cen"><a href="/playpokemon/2022/coinsetcity.jpg" rel="lightbox[ranger3]"><img src="/playpokemon/2022/coinsetcityth.jpg" width="250" loading="lazy" /></a></td><td class="cen"><a href="/playpokemon/2022/coinsetcity2.jpg" rel="lightbox[ranger3]"><img src="/playpokemon/2022/coinsetcity2th.jpg" height="250" loading="lazy" /></a></td> </tr> </table> </p></div>';

const testHtmlWithYoutube =
  '<div class="pics"><a href="/anime/epiguide/pokemon/"><img src="/arceuschronicles.jpg" width="300"  alt="Pokémon The Arceus Chronicles" loading="lazy" /></a></div> <div class="subcat"><h3>In The AnimeDepartment</h3> <p class="title">Pokémon Arceus Chronicles</p> <p>The Pokémon Company International have announced Pokémon The Arceus Chronicles, a special focused around Arceus and Team Galactic. This special will air at the Pokémon World Championships next week at a special screening on August 19th at 18:00, and will then be on Netflix from September 23rd<br /> This special aired in four parts in Japan on Amazon Prime back in January <table align="center" class="dextab"> <tr > <td class="fooevo" colspan="2">Footage</td></tr> <tr><td class="cen" colspan="2"><iframe width="590" height="344" loading="lazy" src="https://www.youtube.com/embed/rHimPkAq5V8" frameborder="0" allowfullscreen></iframe></td></tr> </table></p></div>   <div class="pics"><a href="/card"><img src="/tcgexhibition2.jpg" width="300"  alt="Pokémon Trading Card Game: Online Illustration Exhibition" loading="lazy" /></a></div> <div class="subcat"><h3>In The TCG Department</h3> <p class="title"> Pokémon Trading Card Game: Online Illustration Exhibition</p> <p>Following its announcement last month, the <a href="https://lp.anique.jp/exhibition/pokemon-card/en" target="blank" rel="nofollow">Pokémon Trading Card Game: Online Illustration Exhibition</a> is now online. This will run from August 10th through to October 22nd and allows for people to look at a variety of Pokémon Card artwork amongst three themes Life, History, and Artist showcasing artwork from over 50 different Pokémon TCG artists.</p></div>';

function SendSerebiiNews(message, rawHtml) {
  var latestpost = GetLatestPost(rawHtml);
  //var postEntries = GetSplitPosts(latestpost);
  var postEntries = GetSplitPosts(testHtmlWithAddtionalPictures);
  var discordPosts = CreatePostEmbeds(postEntries);
  for (var i = 0; i < discordPosts.length; i++) {
    message.channel.send(discordPosts[i]);
  }
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
        deLimitedsplitHtmlPosts[i].indexOf(endString)
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
      .setColor(0x00ace6)
      .setAuthor({
        name: postData[i].department,
        iconURL: "https://serebii.net/anime/pokemon/251.gif",
        url: "https://serebii.net/"
       })
      //.setThumbnail(postData[i].displayPic)
      .setDescription(postData[i].text)
      .setImage(postData[i].displayPic)
      .setFooter({
        text: "danimyuu ♡",
        iconURL: "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FMewditto.png?v=1609471789850"}
      );
    discordMessages.push(message);
    if (postData[i].youtubeLink.length > 1) {
      discordMessages.push(
        postData[i].title + " video: " + postData[i].youtubeLink
      );
    }

    if (
      Array.isArray(postData[i].pictures) ||
      postData[i].pictures.length > 0
    ) {
      var embedsPics = [];
      for (var j = 0; j < postData[i].pictures.length; j++) {
        console.log('"' + postData[i].pictures[j] + '"');
        if (j == 0) {
          let embed = new Discord.EmbedBuilder()
          .setTitle('Some title')
          .setURL('https://serebii.net/')
          .setImage(
            '"' + postData[i].pictures[j] + '"'
          );
          embedsPics.push(embed);
        } else {
          let embed = new Discord.EmbedBuilder()
          .setURL('https://serebii.net/')
          .setImage(
            '"' + postData[i].pictures[j] + '"'
          );
          embedsPics.push(embed);
        }
      }
      discordMessages.push({
        embeds: embedsPics,
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
  formattedText = formattedText.split("<br />").join("\n");
  formattedText = formattedText.split("<br/>").join("\n");

  var pictureLinks = GetPictureLinks(formattedText);
  formattedText = pictureLinks[0];

  console.log("\n\nPICTURE LINKS: " + pictureLinks[1] + "\n\n");

  let youtubeLinkConfirm = GetYoutubeLinks(formattedText);
  if (youtubeLinkConfirm[0] == true) {
    return [youtubeLinkConfirm[1], youtubeLinkConfirm[2], pictureLinks[1]];
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
      address = link.split('href="')[1].split('">')[0];
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
      console.log(youtubeEmbedSubstring + "\n");
      var youtubeLink = youtubeEmbedSubstring.split('src="')[1].split('"')[0];
      console.log(youtubeLink + "\n");
      var youtubeId = youtubeLink.lastIndexOf("/");
      var idResult = youtubeLink.substring(youtubeId + 1);
      console.log;
      var finalYoutubeLink = "https://youtu.be/".concat(idResult);
      console.log(finalYoutubeLink);
      text = text.slice(0, youtubeEmbedSubstringsIndex);
      return [true, text, finalYoutubeLink];
    } catch (err) {
      console.log("Nae Youtube Video");
      return [false, "", ""];
    }
  } else {
    return [false, "", ""];
  }
}

function GetPictureLinks(text) {
  // https://youtu.be/rHimPkAq5V8
  // https://www.youtube.com/embed/rHimPkAq5V8
  var imageLinks = [];
  try {
    var pictureEmbedSubstringsIndex = text.indexOf("<table");
    var pictureEmbedSubstring = text.substr(pictureEmbedSubstringsIndex);
    console.log(pictureEmbedSubstring + "\n");

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
