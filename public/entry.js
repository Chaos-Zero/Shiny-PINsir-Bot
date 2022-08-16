// Required Declarations
const {
  Client,
  RichEmbed,
  Intents,
  GatewayIntentBits,
  Partials,
} = require("discord.js");
const Discord = require("discord.js");
const fs = require("fs");
eval(fs.readFileSync("./public/imports.js") + "");

// Package for simpler Discord slash commands - https://youtu.be/-YxuSSG_O6g?t=1350
// const WOKCommands = require("wokcommands");
const daniServerId = "794266230399434832";

// setup a new database
// persisted using async file storage
// Security note: the database is saved to the file `db.json` on the local filesystem.
// It's deliberately placed in the `.data` directory which doesn't get copied if someone remixes the project.
var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var adapter = new FileSync(".data/db.json");
var db = low(adapter);
var acCharacters, acBugs, acFishes, acFossils, acArts, acItems, acHangables;
var erBosses, erCreatures, erAow, erNpcs, erSpirits;
var serebiiNewsHtml;

DbDefaultSetup(db);

function GetDb() {
  return db;
}

// Stops the bot from cheking messages if something is found.
var stringFound = false;

function CreateBot() {
  const intents = [
    //'NON_PRIVILEGED', // include all non-privileged intents, would be better to specify which ones you actually need
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers, // lets you request guild members (i.e. fixes the issue)
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildEmojisAndStickers,
  ];

  //new Intents([
  //  'NON_PRIVILEGED', // include all non-privileged intents, would be better to specify which ones you actually need
  //  'GUILD_MEMBERS', // lets you request guild members (i.e. fixes the issue)
  //]);
  const bot = new Discord.Client({
    intents: intents,
    partials: [Partials.Channel]
  });
  bot.setMaxListeners(0);

  //Log the Bot in
  const botKey = process.env.BOT_KEY;
  bot.login(`${botKey}`).catch(console.error);
  bot.on("ready", async () => {
    //Set bot card information
    bot.user.setPresence({ activities: [{name: 'Dani\'s homies! Type "$pinsir help" for more info.', 
      type: "LISTENING"
      }] 
    });
    console.log("This bot is active!");

    //Slash commands
    //new WOKCommands(bot, {
    //  commandsDir: "public/slashCommands",
    //  testServers: [daniServerId], //,
    //showWarns: false
    // });
  });
  return bot;
}

async function FetchSerebii() {
  serebiiNewsHtml = await GetSerebii("https://serebii.net/");
  console.log(serebiiNewsHtml)
}

async function SetErEntries() {
  erBosses = await GetBosses();
  erCreatures = await GetCreatures();
  erAow = await GetAshes();
  erNpcs = await GetNpcs();
  erSpirits = await GetSpirits();
}

async function SetAcEntries() {
  acCharacters = await GetVillagers();
  acBugs = await GetBugs();
  acFishes = await GetFishes();
  acFossils = await GetFossils();
  acArts = await GetArts();
  var acAllItems = await GetBasicItems();
  acItems = acAllItems[0];
  acHangables = acAllItems[1];
}

// Handle $pinsir commands
async function CheckForCommand(message, channel, bot) {
  var firstWord = getFirstWord(message.content.toLowerCase());
  if (
    firstWord == "$pinsir" ||
    firstWord == "$pisir" ||
    firstWord == "$pisnir" ||
    firstWord == "$pin" ||
    firstWord == "$pinisir" ||
    firstWord == "$pinser"
  ) {
    if (
      firstWord == "$pisnir" ||
      firstWord == "$pinser" ||
      firstWord == "$pinisir" ||
      firstWord == "$pisir"
    ) {
      channel.send("M8. It's spelled **PINsir**, innit");
    }
    //channel.send("Hello, you have reached PINsir-Bot.\nSorry, but I'm on annual leave today, so you'll have to use the automated automated bot service.\nHope you don't live in Tokyo!\n", {
    //files: [
    //"https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FShiny%20Distruction.png?v=1617270827623"
    //]
    //});
    const argument = message.content.toLowerCase().split(" ");
    switch (String(argument[1])) {
      //case "iksgfiuewgfhkjsdvbfsdlikyfhvksdjhvboiwursgvwbkjhvlkczxjvhgsd":
      //SendAnnouncement(message);
      //DeletePinsirCommand(message);
      //break;
      case "meatball":
        Meatballed(message, argument);
        DeletePinsirCommand(message);
        break;
      case "gameid":
        GameId(db, message);
        //DeletePinsirCommand(message);
        break;
      case "theme":
        UserTheme(db, message);
        break;
      case "anime":
        getAnime(message);
        break;
      case "manga":
        getManga(message);
        break;
      case "ac":
        AcCommands(
          message,
          acCharacters,
          acBugs,
          acFishes,
          acFossils,
          acArts,
          acItems,
          acHangables
        );
        break;
      case "eldenring":
      case "er":
        ErCommands(
          message,
          erBosses,
          erCreatures,
          erAow,
          erNpcs,
          erSpirits
          );
        break;
      case "genshin":
        message.channel.send("This command is currently down for maintenance");
        //GetGenshinCharacter(message, String(argument[2]));
        break;
      case "jargon":
        JargonMessage(message);
        DeletePinsirCommand(message);
        break;
      case "commands":
        SendCommandMessages(message);
        DeletePinsirCommand(message);
        break;
      case "template":
        //TemplateMessage(message);
        SendTemplateMessage(message);
        DeletePinsirCommand(message);
        break;
      case "help":
        CreateDmMessage(message, true);
        DeletePinsirCommand(message);
        break;
      case "berry":
        channel.send({
          files: [{ 
            attachment: "https://cdn.glitch.com/c4b320cc-ad43-484e-a884-21d5e1bea6c1%2FBerry%20chart.png?v=1605173644446"
        }]
        });
        DeletePinsirCommand(message);
        break;
      case "balls":
        channel.send({
          files: [{ 
            attachment: "https://cdn.glitch.com/59bb141b-c323-4e6e-86e3-ea46f9f062cf%2F250px-Poke_Balls_GL.png?v=1603746616492"
        }]
        });
        DeletePinsirCommand(message);
        break;
      case "types":
        channel.send({
          files: [{ 
            attachment: "https://cdn.glitch.com/c4b320cc-ad43-484e-a884-21d5e1bea6c1%2FTypes.png?v=1605177423780"
        }]
        });
        DeletePinsirCommand(message);
        break;
      case "terrain":
        TerrainMessage(message);
        DeletePinsirCommand(message);
        break;
      case "giveaway":
      case "hosting":
        HostingUpMessage(db, message);
        break;
      case "rehost":
        rehost(db, message);
        DeletePinsirCommand(message);
        break;
      case "pin":
        PinMessage(message);
        DeletePinsirCommand(message);
        break;
      case "repin":
        //Delete handled in method
        Repin(db, message);
        break;
      case "unpin":
        RemovePins(message);
        DeletePinsirCommand(message);
        break;
      case "number":
        PokemonNumberMessage(message, bot);
        DeletePinsirCommand(message);
        break;
      case "balltism":
        BalltismMessage(message, bot);
        break;
      //case "da":
      //await channel.send(DynamaxAdventure(db, message));
      //break;
      case "move":
        //delete handled in message
        ModMoveMessage(message);
        break;
      case "sus":
      case "suspect":
        SusImage(message);
        DeletePinsirCommand(message);
        break;
      case "shame":
        var name = argument[2] != null ? argument[2] : "FAM";
        if (argument[2].toLowerCase().includes("pinsir")) {
          channel.send({ content:"I HAVE NO SHAME",
            files: [
              "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FPinsir%20Bot%20Mad.png?v=1609715165741",
            ]
          });
        } else {
          channel.send({
            content:
              "SHAME ON YOU " +
              name.toUpperCase() +
              " FOR DOING THAT THING YOU DONE DID!",
            files: [
              "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FPinsirShame.png?v=1609715165685",
            ],
          });
        }
        DeletePinsirCommand(message);
        break;
      //case "everyone":
      //channel.send("@everyone I have all the power.");
      //break;
      //case "hfoidgnowregbviusdfgbvasdf":
      //SendAnnouncement(message);
      //message.delete();
      //break;
      //case "roles":
      //roleAssign(message);
      // break;
      //case "dmsend":
      // DmSend(message);
      // DeletePinsirCommand(message);
      // break;
      //case "play":
      //SendSound(message);
      //break;
      default:
        channel.send(
          "Sorry, I do not understand this command. Try typing `$pinsir help` for a list of commands."
        );
    }
  }
}

// Checks if someone is using banned words
function CheckForBadWords(message, channel) {
  if (!stringFound) {
    var isInlist = (list) =>
      list.some(
        (word) =>
          message.content
            .toLowerCase()
            .match(new RegExp("\\b" + word + "\\b")) != null
      );

    if (isInlist(badWords)) {
      if (message.author.bot) {
        return;
      }
      var pinsirMessage =
        "@here\n" + //"This is the automated automated swearing service.\nSomone might have used a banned word in "+ channel.toString() +". \nidk, I'm on annual leave so idgaf" +
        message.author.username +
        " may have just used a banned word in " +
        channel.toString() +
        ".\nMessage: " +
        message.content;
      var modChannel = GetChannelByName(message, "♡-mod-chat");
      modChannel.send(pinsirMessage);
    }
  }
}

// Checks if people are begging for shinies
function CheckForBegging(message, channel) {
  if (!stringFound) {
    if (
      badListStrings.some(
        (word) =>
          message.content
            .toLowerCase()
            .match(new RegExp("\\b" + word + "\\b")) != null
      )
    ) {
      var pinsirMessage =
        "C'mon <@" +
        message.author.id +
        ">, no begging; you have the chance to catch them yourself! \nPlease check the pinned messages for current hosts and dens!";
      channel.send(pinsirMessage);
      stringFound = true;
    }
  }
}

// Checks if someone is asking who the host is
function CheckForBlacklist(message, channel) {
  if (!stringFound) {
    var isInlist = (list) =>
      list.some(
        (word) =>
          message.content
            .toLowerCase()
            .match(new RegExp("\\b" + word + "\\b")) != null
      );

    if (isInlist(blackListStrings) && !isInlist(futureTenseStrings)) {
      var pinsirMessage =
        "Please check the pinned messages for current hosts and dens <@" +
        message.author.id +
        ">!";
      channel.send(pinsirMessage);
      CreateDmMessage(message, false);
      stringFound = true;
    }
  }
}

// Checks if someone is asking who the host is
function CheckForFriendBlacklist(message, channel) {
  if (!stringFound) {
    var isInlist = (list) =>
      list.some(
        (word) =>
          message.content
            .toLowerCase()
            .match(new RegExp("\\b" + word + "\\b")) != null
      );

    if (isInlist(friendBlackListStrings)) {
      var pinsirMessage =
        "Please check the pinned messages for a hosts friend code <@" +
        message.author.id +
        ">!";
      channel.send(pinsirMessage);
      stringFound = true;
    }
  }
}

// Did you just call the bot dumb?
function CheckForDumb(message, channel) {
  if (!stringFound) {
    var isInlist = (list) =>
      list.some(
        (word) =>
          message.content
            .toLowerCase()
            .match(new RegExp("\\b" + word + "\\b")) != null
      );

    if (isInlist(dumbBotStrings)) {
      var botQuote =
        dumbBotReplyStrings[
          Math.floor(Math.random() * dumbBotReplyStrings.length)
        ];
      channel.send({ content: botQuote, 
        files: [
          "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FPinsir%20Bot%20Mad.png?v=1609715165741",
        ]
      });
      stringFound = true;
    }
  }
}

// Did you just call the bot good?
function CheckForGood(message, channel) {
  if (!stringFound) {
    var isInlist = (list) =>
      list.some(
        (word) =>
          message.content
            .toLowerCase()
            .match(new RegExp("\\b" + word + "\\b")) != null
      );

    if (isInlist(goodBotStrings)) {
      var botQuote =
        goodBotReplyStrings[
          Math.floor(Math.random() * goodBotReplyStrings.length)
        ];
      channel.send( { content: botQuote, 
        files: [
          "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FPinsir%20Bot%20Happy.png?v=1609715164603",
        ]
      });
      stringFound = true;
    }
  }
}

// Did you just love the bot good?
function CheckForLove(message, channel) {
  if (!stringFound) {
    var isInlist = (list) =>
      list.some(
        (word) =>
          message.content
            .toLowerCase()
            .match(new RegExp("\\b" + word + "\\b")) != null
      );

    if (isInlist(loveBotStrings)) {
      var botQuote =
        loveBotReplyStrings[
          Math.floor(Math.random() * loveBotReplyStrings.length)
        ];
      channel.send({ content: botQuote, 
        files: [
          "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FShiny%20Love%20PINsir.gif?v=1609811193381",
        ],
      });
      stringFound = true;
    }
  }
}

function KimbleQuote(channel) {
  if (!stringFound) {
    var kimbleQuote = kimble[Math.floor(Math.random() * kimble.length)];
    channel.send({ content: kimbleQuote,
      files: [
        "https://cdn.glitch.com/6024cd69-aae2-43ec-9145-8a104c1b66bb%2FKindergartenCop-650x366.jpg?v=1593599704406",
      ],
    });
    stringFound = true;
  }
}

function ResetStringFoundCheck() {
  stringFound = false;
}

const alolan = [
  19, 20, 26, 27, 28, 37, 38, 50, 51, 52, 53, 74, 75, 76, 88, 89, 103, 105,
];
const galar = [
  52, 77, 78, 79, 80, 83, 110, 122, 144, 145, 146, 199, 222, 263, 264, 554, 555,
  555, 562, 618,
];
const gMax = [
  3, 6, 9, 12, 25, 52, 68, 94, 99, 131, 133, 143, 569, 809, 812, 815, 818, 823,
  826, 834, 839, 841, 842, 844, 849, 851, 858, 861, 869, 879, 884, 892,
];
