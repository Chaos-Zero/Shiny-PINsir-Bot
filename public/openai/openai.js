// This is used to get anime and manga details
const { get } = require("request-promise");
const { MessageEmbed } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const request = require("request");

async function downloadImage(uri, filename, callback) {
  request.head(uri, function (err, res, body) {
    request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
  });
}

function updateUsers(arith) {
  if (arith == "") {
    aiUsers = 0;
  } else {
    arith == "plus" ? aiUsers++ : aiUsers--;
  }
}

async function getAi(message) {
  var a = message.content.split(" ");
  const messageArg = a.slice(2).join(" ");
  //message.content.substring(8);
  if (!messageArg.length) {
    return message.channel.send("I'm sorry, something went wrong.");
  }
 //if (message.author.id == "228982675145359371") {
 //  return message.channel.send({
 //    content:
 //      "I'm sorry <@" + message.author.id + ">, I can't let you do that.",

 //    files: ["https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FPinsir%20Bot%20Mad.png?v=1609715165741"],
 //  });
 //}

  console.log(
    message.member.displayName + " sent the Ai prompt: " + messageArg
  );
  updateUsers("plus");
  let aiUser = aiUsers;

  //aiUsers = parseInt(aiUsers) + 1;
  message.delete();

  const configuration = new Configuration({
    apiKey: process.env.open_api_key,
  });
  const openai = new OpenAIApi(configuration);

  message.channel.send("Rendering image...").then((msg) => {
    openai
      .createImage({
        prompt: messageArg,
        n: 1,
        size: "1024x1024",
      })
      .catch((error) =>
        message.channel.send(
          "Sorry, <@" +
            message.author.id +
            ">, I can't seem to visualise this..."
        )
      )
      .then((response) => {
        console.log(response.data.data[0].url);
        //{
        //"created": 1589478378,
        //"data": [
        //  {
        //    "url": "https://..."
        //  },
        // {
        //    "url": "https://..."
        //  }
        // ]
        //}

        downloadImage(
          response.data.data[0].url,
          "./images/temp" + aiUser + ".png",
          function () {}
        ).then(() => {
          //msg.delete();
          setTimeout(() => {
            try {
              message.channel.send({
                content: "<@" + message.author.id + ">: " + messageArg,

                files: ["./images/temp" + aiUser + ".png"],
              });
              updateUsers("minus");
            } catch (err) {
              msg.delete();
              if (aiUsers > 0) {
                updateUsers("minus");
              } else {
                updateUsers("");
              }
              return msg.edit("No images could be rendered.");
            }
          }, 1500);
        });
      });
  });
}
