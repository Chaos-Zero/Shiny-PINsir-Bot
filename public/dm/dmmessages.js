const { Client, RichEmbed } = require("discord.js");
const Discord = require("discord.js");

// Create intial DM message - needs to be refactored
function CreateDmMessage(message, isHelp) {
  var title, file, image, thumbNail, colour, description;

  const help =
    "Hello and welcome to PINsir-bot! \n " +
    "Get helpful tips by replying to this DM with one of the following keywords: \n ";
  const caught =
    "Did you just ask who's hosting/what's being hosted? Check the pinned messages to find out!\n\n" +
    "You can also get helpful tips by replying to this DM with one of the following keywords: \n ";

  if (isHelp) {
    title = "PINsir-bot: Here to tell you to read the pinned messages!";
    thumbNail =
      "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FPinsir%20Bot.png?v=1609471160411";
    colour = "0xb33c00";
    description = help;
  } else {
    title = "Please Check the pinned messages!";
    thumbNail =
      "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2Fgiphy.gif?v=1610319224206";
    colour = "0xff0000";
    description = caught;
  }

  // Start of abstraction for DM message.
  const embedMessage = CreateDmEmbedMessage(
    title,
    colour,
    thumbNail,
    description
  );
  if (isHelp) {
    message.author.send({ embeds: [embedMessage], files: ['https://cdn.glitch.com/6024cd69-aae2-43ec-9145-8a104c1b66bb%2Fpin.png?v=1593501335275'] });
  }
  else {
    message.author.send(embedMessage);
  }
  return embedMessage;
}

// Create DM embeded message
function CreateDmEmbedMessage(title, colour, thumbNail, description) {
  var Embed = new Discord.EmbedBuilder()
    .setTitle(title)
    .setColor(colour)
    .setThumbnail(thumbNail)
    .setDescription(description)
    .addFields(
      {
        name: "Commands",
        value: "Display a list of helpful Bot commands.",
        inline: true
      },
      {
        name: "Jargon",
        value: "Display a list of commonly used terms on the server.",
        inline: true
      },
      {
        name: "Templates",
        value:
          "Displays templates for hosts preparing to raid or have a live giveaway.",
        inline: true
      }
    )
    .setFooter({
      text: "danimyuu ♡",
      iconURL: "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FMewditto.png?v=1609471789850"}
    );
  return Embed;
}

// Send Bot commands in DM
function SendCommandMessages(message) {
  //message.author.send(
  //  new Discord.EmbedBuilder()
  //    .setTitle("Rosalina")
  //    .setColor("0x191970")
  //    .setThumbnail(
  //      "https://cdn.glitch.com/59bb141b-c323-4e6e-86e3-ea46f9f062cf%2F42b9bc52-3178-4fd3-b583-b4493de615a1.image.png?v=1605741094586"
  //    )
  //    .setDescription(
  //      "Rosalina keeps track of your friend codes so you don't have to!"
  //    )
  //    .addFields(
  //      {
  //        name: "r!switchcode [SW-0123-4567-8910]",
  //        value: "Register your switch Friend Code with Rosalina bot.",
  //        inline: false
  //      },
  //      {
  //        name: "r!pogocode [123412341234]",
  //        value: "Register your Pokémon Go Trainer Code with Rosalina bot.",
  //        inline: false
  //      },
  //      {
  //        name: "r!sc",
  //        value:
  //          "Publicly display your friend code after enrolling with Rosalina bot.",
  //        inline: false
  //      },
  //      {
  //        name: "r!pogocode",
  //        value:
  //          "Publicly display your Pokémon Go Trainer Code after enrolling with Rosalina bot.",
  //        inline: false
  //      },
  //      {
  //        name: "r!sc @[user]",
  //        value:
  //          "Display the friend code of another user. \n  > r!sc PINsir-Bot#83866",
  //        inline: false
  //      },
  //      {
  //        name: "r!sc help",
  //        value: "Find out even more stuff you can do with Rosalina!",
  //        inline: false
  //      }
  //    )
  //);

  //message.author.send(
  //  new Discord.EmbedBuilder()
  //    .setTitle("Alcremie-B")
  //    .setColor("0xe6e6fa")
  //    .setThumbnail(
  //      "https://cdn.glitch.com/59bb141b-c323-4e6e-86e3-ea46f9f062cf%2F60bf608c-215d-489d-ac98-2a3829aed0e8.image.png?v=1605741062540"
  //    )
  //    .setDescription(
  //      "Alcreamie is a resouce for Pokemon information including, stats, dens and sprites!\n" +
  //        +"Key:\n* < > Indicate required fields." +
  //        "- [ ] Indicate optional fields." +
  //        "- Use * for shiny sprites." +
  //        "- Catch Rates are calculated under Raid Specific Conditions: Levels 30-70, 1 HP, and no status modifiers.\n\n" +
  //        "*Use '%help [command]' for more information about a command.*"
  //    )
  //    .addFields(
  //      {
  //        name: "%ball <ball_name>",
  //        value: "Shows a summary of a Poké-Ball’s statistics",
  //        inline: false
  //      },
  //      {
  //        name: "%catch <pokemon> [form] [ball_name]",
  //        value:
  //          "Shows a detailed summary of catch rates for a given Pokémon and Ball combination.",
  //        inline: false
  //      },
  //      {
  //        name: "%den <den_number|pokemon_name>",
  //        value:
  //          "Shows a list of Pokémon that belong to a den including their HAs.",
  //        inline: false
  //      },
  //      {
  //        name: "%pokedex <pokemon>",
  //        value: "Shows Pokédex info on every Pokémon.",
  //        inline: false
  //      },
  //      {
  //        name: "%sprite <pokemon>",
  //        value:
  //          "Shows the Pokémon Sprite. Include * in the end for the shiny sprite.",
  //        inline: false
  //      },
  //      {
  //        name: "%type <type>",
  //        value: "Shows info regarding Pokémon Types.",
  //        inline: false
  //      },
  //      {
  //        name: "%help",
  //        value: "Show more commands and get more help with Alcremie",
  //        inline: false
  //      },
  //      {
  //        name: "%ball <ball_name>",
  //        value: "Shows a summary of a Poké-Ball’s statistics",
  //        inline: false
  //      },
  //      {
  //        name: "%ball <ball_name>",
  //        value: "Shows a summary of a Poké-Ball’s statistics",
  //        inline: false
  //      },
  //      {
  //        name: "%ball <ball_name>",
  //        value: "Shows a summary of a Poké-Ball’s statistics",
  //        inline: false
  //      }
  //    )
  //);

  //message.author.send(
  //  new Discord.EmbedBuilder()
  //    .setTitle("Gengar-Bot")
  //    .setColor("0x4b0082")
  //    .setThumbnail(
  //      "https://cdn.glitch.com/59bb141b-c323-4e6e-86e3-ea46f9f062cf%2F74f8bae7-a03b-4b37-8eb2-f1af0ab95e4b.image.png?v=1605741212631"
  //    )
  //    .setDescription(
  //      "Gengar-Bot is here to help you find your **Shiny Den**\nTo be used with #gengar-bot channel. \n" +
  //        "This starts a process where Gengar-Bot will initiate a trade" +
  //        "You would then trade using a Pokémon caught in a den." +
  //        "Gengar Bot can then tell how many frames until shiny Pokémon." +
  //        "\nMake sure you accept DM's from this server to get Gengar-Bots messages!"
  //    )
  //    .addFields({
  //      name: "~CheckMySeed",
  //      value:
  //        "Gives you information on how many skips are needed until normal or square shinies",
  //      inline: false
  //    })
  //);

  message.author.send(
    new Discord.EmbedBuilder()
      .setTitle("PINsir-bot")
      .setColor("0xe69500")
      .setThumbnail(
        "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FPinsir%20Bot.png?v=1609471160411"
      )
      .setDescription(
        "PINsir-Bot is our exclusive server bot which has some helpful features! Just start your message with any of the following.\n All PINsir commands from the DM can be accessed directly from the server by using `$pinsir [command]`.\n" +
          "If a command has and entry encloised in [], this needs to be replaced with the contents you want to use (example: `$pinsir number [Pokémon name/number]` becomes `$pinsir number bulbasaur`). You do not have to include the [].\nPINsir also sends DM's so make sure you can receive DM's from this server.\n\n"
      )
  );

  message.author.send(
    new Discord.EmbedBuilder()
      .setTitle("Base Commands")
      .setColor("0x005ce6")
      .setThumbnail(
        "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FCommands.png?v=1609715165717"
      )
      .setDescription(
        "These commands are designed to help you get all the information needed to use PINsir.\n Pro tip: You can use `$pin` instead of `$pinsir` for all commands.\n\n"
      )
      .addFields(
        {
          name: "$pinsir commands",
          value:
            "This triggers these DM's.\nYou can access this by replying in a DM with `commands` or in the server using `$pinsir commands`",
          inline: false
        },
        {
          name: "$pinsir template [raid or giveaway]",
          value:
            "Displays template for hosts preparing to raid or have a live giveaway.\n You can simply use `$pinsir template` to see both.\nYou can also access this by replying in a DM with `template`",
          inline: false
        },
        {
          name: "$pinsir jargon",
          value:
            "This gives you a handy guide containing some acronyms and commonly used phrases used on the server.\nYou can also access this by replying in a DM with `jargon`",
          inline: false
        }
      )
  );
  
    message.author.send(
    new Discord.EmbedBuilder()
      .setTitle("Gaming Commands")
      .setColor("0xcc3300")
      .setThumbnail(
        "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FmlgBot.png?v=1611365650964"
      )
      .setDescription(
        "PINsir can save and present your Game ID's for different platforms, helping you connect and play with other gamers.\n\n"
      )
      .addFields(
        {
          name: "$pinsir gameid",
          value:
            "This shows a message with your saved game credentials for the server to view.\nYou can also access this by replying in a DM with `gameid`.",
          inline: false
        },
        {
          name: "$pinsir gameid [@user or Name]",
          value:
            "This shows a message with the specified usrs saved game credentials for the server to view.",
          inline: false
        },
        {
          name: "$pinsir gameid add",
          value:
            "The add command will trigger a DM from PINsir which will allow you to enter your game ID's and details to be show in the server.\nYou can also access this by replying in a DM with `add`",
          inline: false
        },
         {
          name: "$pinsir gameid remove",
          value:
            "The add command will trigger a DM from PINsir which will allow you to remove priorly entered ID's and details.\nYou can also access this by replying in a DM with `remove`",
          inline: false
        }
      )
  );

  message.author.send(
    new Discord.EmbedBuilder()
      .setTitle("Pokémon Commands")
      .setColor("0xffd700")
      .setThumbnail(
        "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FPinsir%20Bot-Raid.png?v=1609715166741"
      )
      .setDescription(
        "PINsir has a selection of Pokémon specific commands which you may find helpful, including commands for raid hosts!\n\n"
      )
      .addFields(
        {
          name: "$pinsir number [Pokémon name/number]",
          value:
            "This prompts a message letting you know which Pokémon corresponds to the NationalDex number." +
            " You can find the number by Pokémon name, or the Pokémon by number.\n Examples of use:\n > `$pinsir number Bulbasaur` \n > `$pinsir number 1`",
          inline: false
        },
        {
          name:
            "$pinsir balltism [region/Gigantamax] [Pokémon name/number]",
          value:
            "Looking for ideas on which balls to use when catching shiny Pokémon? Using this will give our recommendation on what you can use to conform to the Balltism teachings.\n" +
            "Regions can be defined as 'Alola', Galar' or simply by the first letters ('a' and 'g'). 'Gmax' can be used for Gigantamax forms.\n" +
            "Examples of use:\n > `$pinsir balltism Bulbasaur` \n > `$pinsir balltism Charmander`\n > `$pinsir balltism 7`\n" +
            "> `$pinsir balltism Gigantamax Pikachu`\n > `$pinsir hosting alolan 52`\n" +
            "The last one with a number would display alolan Meowth!\n**NOTE**: This is still in development and only the Kanto Pokemon up to national dex 100, available in Sw/Sh, are ready to see. All GMax too.",
          inline: false
        },
        {
          name: "$pinsir balls",
          value: "Displays an image of Pokéballs that are available in Sw/Sh.",
          inline: false
        },
        {
          name: "$pinsir types",
          value: "Displays an image of Pokémon type match-ups.",
          inline: false
        },
        {
          name: "$pinsir terrain [terrain]",
          value:
            "Get information on the effects of terrains in SW/SH\nUsage example: `$pinsir terrain Electric`",
          inline: false
        },
        {
          name: "$pinsir berry",
          value:
            "Get information on berry flavours for completing the Currydex.",
          inline: false
        },
        {
          name: "\u200b\nHosting Commands!",
          value: "\u200b",
          inline: false
        },
        {
          name: "$pinsir template [raid or giveaway]",
          value:
            "Displays template for hosts preparing to raid or have a live giveaway.\n You can simply use `$pinsir template` to see both",
          inline: false
        },
        {
          name: "$pinsir pin",
          value:
            "Use this after sending a raid message in #active-raids or a giveaway in #live-giveaways to pin it! \nThis does not work in other channels or with messages not recognised as raids or giveaways.\n" +
            "You can use `$pinsir template raid` or `$pinsir template giveaway` to get an example.",
          inline: false
        },
        {
          name: "$pinsir hosting end",
          value:
            "This will automatically remove your pins in #active-raids and let people know you've stopped.",
          inline: false
        },
        {
          name: "$pinsir giveaway end",
          value:
            "This will automatically remove your pins in #live-giveaways and let people know you've stopped.",
          inline: false
        },
        {
          name: "$pinsir repin",
          value:
            "This will pin your last pinned raid or giveaway without you having to look for it!\nIf the message has been deleted, PINsir can post your previous event on your behalf.\n" +
            "`$pinsir hosting end` and `$pinsir giveaway end` will also remove this when you are done!",
          inline: false
        },
        {
          name: "$pinsir unpin",
          value:
            "Gets rid of your pins without telling anyone. Shhh; stealthy.",
          inline: false
        },
        {
          name: "$pinsir hosting",
          value:
            "Let people know you are hosting a new Pokémon with an image by silver#7472.",
          inline: false
        },
        {
          name:
            "$pinsir hosting [region/Gigantamax] [Pokémon name/number] rc: 1234 5678",
          value:
            "This prompts a message that you are hosting with the Pokémon you choose." +
            " You can leave the rc field out to show that no code is needed.\n" +
            "Regions can be defined as 'Alola', Galar' or simply by the first letters ('a' and 'g'). 'Gmax' can be used for Gigantamax forms.\n" +
            "Examples of use:\n > `$pinsir hosting Bulbasaur rc: 1234 5678` \n > `$pinsir hosting Charmander`\n > `$pinsir hosting 7 rc: 1234 5678`\n" +
            "> `$pinsir hosting Gigantamax Charizard rc: 1234 5678`\n > `$pinsir hosting alolan 52 rc: 1234 5678`\n" +
            "The last one with a number would display an alolan Meowth!",
          inline: false
        },
        {
          name: "$pinsir rehost",
          value:
            "This will show message for the previously used Pokémon (i.e. reuse the values given to your last $pinsir hosting message).",
          inline: false
        }
        //{
        //  name: "\u200b\nDynamax Adventures!",
        //  value: "\u200b",
        //  inline: false
        //},
        //{
        //  name: "$pinsir da [Pokémon name/number]",
        //  value:
        //    "Gets a list of Adventurers who have paths availible to this boss Pokémon!\n" +
        //    "Examples of use:\n > `$pinsir da Articuno` \n > `$pinsir da 144 `",
        //  inline: false
        //},
        //{
        //  name: "$pinsir da add [Pokémon name/number]",
        //  value:
        //    "Add a Pokémon to your Adventurer list. Adventurers will then see you have a path to the Pokémon availible\n" +
        //    "You can add a maximum of three Pokémon at a time.\n Examples of use:\n > `$pinsir da add Lugia` \n > `$pinsir da add 249`",
        //  inline: false
        //},
        //{
        //  name: "$pinsir da remove [Pokémon name/number]",
        //  value:
        //    "Remove a Pokémon from your Adventurer list.\n" +
        //    "You must remove Pokémon to add different ones once three are saved.\n Examples of use:\n > `$pinsir da remove Lugia` \n > `$pinsir da remove 249`",
        //  inline: false
        //},
        //{
        //  name: "$pinsir da request [Pokémon name/number]",
        //  value:
        //    "Let people know you are looking for a specific boss Pokémon!\n" +
        //    "After entering your Pokémon, you will then appear in searches and specific mon pings (see bellow). You do not have to have an adventure list set up to do so.\n Examples of use:\n > `$pinsir da request Rayquaza` \n > `$pinsir da request 384`",
        //  inline: false
        //},
        //{
        //  name: "$pinsir da searching [Pokémon name/number]",
        //  value:
        //    "See what other Adventurers have set this Pokémon as there requested mon." +
        //    "\n Examples of use:\n > `$pinsir da searching Rayquaza` \n > `$pinsir da searching 384`",
        //  inline: false
        //},
        //{
        //  name: "$pinsir da ping [Pokémon name/number]",
        //  value:
        //    "Lets you ping other Adventurers who have this as thier requested Pokémon." +
        //    "\n Examples of use:\n > `$pinsir da ping Rayquaza` \n > `$pinsir da ping 384`",
        //  inline: false
        //},
        //{
        //  name: "$pinsir da list",
        //  value:
        //    "This shows you the Pokémon in your current Adventurer list as well as your requested Pokémon.",
        //  inline: false
        //},
        //{
        //  name: "$pinsir da clear",
        //  value:
        //    "Reset your list and requested Pokémon to empty",
        //  inline: false
        //}
      )
  );

  message.author.send(
    new Discord.EmbedBuilder()
      .setTitle("Dank Commands")
      .setColor("0x00e673")
      .setThumbnail(
        "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FdealMeatball.png?v=1611365638977"
      )
      .setDescription(
        "PINsir is just a troll.\n\n"
      )
      .addFields(
        {
          name: "$pinsir meatball [@User or UserID]",
          value:
            "Are you ready for some meatballs?! Join the silent war and meatball another user!\nYou can meatball multiple users at one by adding more users/pings at the end! Make sure to add spaces between.",
          inline: false
        },
        {
          name: "$pinsir suspect [@user or Name]",
          value:
            "Someone acting fishy? Someone acting a bit *sus*? Get PINsir to cast doubt on that imposter!\nYou can also use $pinsir sus [name]",
          inline: false
        },
        {
          name: "$pinsir shame [name]",
          value:
            "Has someone done something **shameful**? Get PINsir to shame them for what they done did!",
          inline: false
        }
      )
      .setFooter({
        text: "danimyuu ♡",
        iconURL: "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FMewditto.png?v=1609471789850"}
      )
  );
}

// Return Jargon DM. Needs refactor.
function JargonMessage(message) {
  const Embed = new Discord.EmbedBuilder()
    .setTitle("Danimyuu Jargon Guide")
    .setColor("0xff00ff")
    .setThumbnail(
      "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FJargont.png?v=1609715231119"
    )
    .setDescription(
      "Here are some acronyms jargon used regularly in the server.\n\n"
    )
    .addFields(
      {
        name: "IGN",
        value: "In Game Name.",
        inline: true
      },
      {
        name: "FC",
        value: "Friend Code.",
        inline: true
      },
      {
        name: "SN",
        value: "Switch Profile name.",
        inline: true
      },
      {
        name: "Square Shiny",
        value:
          "There are two different types of shiny Pokémon: Star and Square. \n Square are less common and have a slightly different animation when appearing.",
        inline: false
      },
      {
        name: "Reroll",
        value:
          "Hosts normally host one shiny Pokémon at a time from a den. \n Rerolling means a host is going to attempt to change the Pokémon being hosted.",
        inline: false
      },
      {
        name: "Seed",
        value:
          "Seeds are what are used to find out when a den is going to produce a shiny Pokémon. \n They are used in conjunction with Gengar bot. ",
        inline: false
      },
      {
        name: "Frames",
        value:
          "Frames are deduced from the seed initially passed to Gengar bot. \n" +
          "They essentially boil down to days, which we can skip through using basic exploits. \n" +
          "If a person says they have x amount of frames until shiny, this is how many days they must skip for the den to be viable",
        inline: false
      },
      {
        name: "Double Dip",
        value:
          "Going into a raid again, once completed. \n Some raids do not allow for this. \n Please respect the hosts rules.",
        inline: false
      },
      {
        name: "Roles",
        value:
          'You can set your roles in the "roles" channel to be updated when those categories are pinged. \n' +
          " > Raiders get alerted to the @Raiders call, Smashers: @Smashers call etc...",
        inline: false
      },
      {
        name: "Ping",
        value:
          "You can directly get the attention of someone, or groups by using the @ symbol, followed by a name. \n" +
          "Abuse at your own peril.",
        inline: false
      }
    )
    .setFooter({
      text: String("danimyuu ♡"),
      iconURL: String("https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FMewditto.png?v=1609471789850")}
    );
    message.author.send({embeds: [Embed]});
}

// Send template.
function SendTemplateMessage(message) {
  var argument = message.content.split(" ");
  const hostingTemplate =
    "```**Hosting**: [Star/Square] [Pokemon], [Gender] | [Den #] \n" +
    "Duration: \n" +
    "FC: \n" +
    "SN: \n" +
    "IGN: \n" +
    "Raid code: \n" +
    "Rules/stipulations: \n" +
    " > - *Rule 1* \n" +
    " > - *Rule 2* \n" +
    " > - *Rule 3*... \n" +
    "Good luck @Raiders! ```\n" +
    " Make sure to use the ``$pinsir pin` command after you post your raid to automatically pin the message!\n" +
    " > This can be used if you don't have pinning permissions. \n" +
    " > Make sure to use the `$pinsir hosting end` command to remove it when done!";

  const giveawayTemplate =
    "```**Incoming Live-Giveaway**\n" +
    "Pokemon Details:\n" +
    "Link-code:\n" +
    "IGN:\n" +
    "Additional Info:```" +
    " Make sure to use the `$pinsir pin` command after you post your giveaway to automatically pin the message!\n" +
    " > This can be used if you don't have pinning permissions. \n" +
    " > Make sure to use the `$pinsir hosting end` command to remove it when done!";

  var template;
  if (argument[2]) {
    if (argument[2] == "raid") {
      message.author.send({embeds: [
        CreateHostingTemplates(
          "Raid Template",
          "0x800000",
          "https://cdn.glitch.com/439fa567-8e83-4386-95a3-65195e84f533%2FTemplate-Raid.png?v=1605879409442",
          hostingTemplate,
          "hosting"
        )
      ], allowedMentions: { repliedUser: false } });
    } else if (argument[2] == "giveaway") {
      message.author.send({embeds: [
        CreateHostingTemplates(
          "Giveaway Template",
          "0xdacec1",
          "https://cdn.glitch.com/439fa567-8e83-4386-95a3-65195e84f533%2FTemplate-Giveaway.png?v=1605879409176",
          giveawayTemplate,
          "live giveaway"
        )
      ], allowedMentions: { repliedUser: false } });
    }
  } else {
    message.author.send({embeds: [
      CreateHostingTemplates(
        "Raid Template",
        "0x800000",
        "https://cdn.glitch.com/439fa567-8e83-4386-95a3-65195e84f533%2FTemplate-Raid.png?v=1605879409442",
        hostingTemplate,
        "hosting"
      )
    ], allowedMentions: { repliedUser: false } });

    message.author.send({embeds: [
      CreateHostingTemplates(
        "Giveaway Template",
        "0xdacec1",
        "https://cdn.glitch.com/439fa567-8e83-4386-95a3-65195e84f533%2FTemplate-Giveaway.png?v=1605879409176",
        giveawayTemplate,
        "live giveaway"
      )
    ], allowedMentions: { repliedUser: false } });
  }
}

function CreateHostingTemplates(title, colour, thumbnail, template, type) {
  var embed = new Discord.EmbedBuilder()
    .setTitle(title)
    .setColor(colour)
    .setThumbnail(thumbnail)
    .setDescription(
      "Copy, paste and fill in the fields for a formatted " +
        type +
        " message.\n"
    )
    .setDescription(template)
    .setFooter({
      text: "danimyuu ♡",
      iconURL: "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FMewditto.png?v=1609471789850"}
    );
  return embed;
}
