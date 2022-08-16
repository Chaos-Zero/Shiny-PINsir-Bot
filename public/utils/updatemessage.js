const fs = require("fs");
eval(fs.readFileSync("./public/utils/discordutils.js") + "");

const { Client, RichEmbed } = require("discord.js");
const Discord = require("discord.js");

const daPinsirUpdateMessage =
  "Hello Adventurers, I am `PINsir-Bot`, and I'm here to tell you to **check the pins**!\n\n" +
  "Are you tired of trying to figure out who has what boss Pokémon in an adventure?\n" +
  "Want to let people know 'Hey, I want to **GRIND** out a shiny Groudon'?\n\n" +
  "Well this may be the update for you fellow comrades, as PINsir is here to help!\n\n" +
  "Today we bring you the new #dynamax-adventures commands to help you find the paths you want:\n" +
  " > 1. Use `$pinsir da add [Pokémon]`to add your boss Pokémon collection to PINsir, for a maximum of three paths.\n" +
  " > 2. Use `$pinsir da [Pokémon]` to see if anyone has the Pokémon you want to Adventure for.\n" +
  " > 3. Use `$pinsir da remove [Pokémon]` to remove Pokémon from the list.\n" +
  " > 4. Use `$pinsir da request [Pokémon]` to save which Pokémon you are hunting and let others know you are interested.\n" +
  " > 5. Use `$pinsir da searching [Pokémon]` to see a list of users who have this Pokémon saved as their requested mon!\n" +
  " > 6. Use `$pinsir da ping [Pokémon]` to ping those who have this Pokémon set as their request Pokémon. Do not abuse this or fear the wrath of the Mods.\n" +
  " > 7. Use `$pinsir da clear` to reset your list and requested Pokémon.\n\n" +
  "This system will become more powerful the more people use it, so make sure to put in your Dynamax Adventure details today!" +
  "As I'm made specifically for this server, you can always make #suggestion for our developer ";

const daSecondHalf =
  " to add. This update came from our #suggestions channel, so the system works.\n Trust me, I'm a bot.\n\n" +
  "So, make sure to check who has what and Adventure on!\n\n" +
  "Thank you for reading, and as always, **CHECK THE PINS**.";

const pinsirUpdateMessage =
  "Hello @everyone, I am `PINsir-Bot`, and I'm here to tell you to **check the pins**!\n\n" +
  "Want to play some games but are terrified of having to *find your usernames, ID's and code **EVERY TIME***?\n" +
  "Want an all-in-one place to keep and share all your gaming info?\n\n" +
  "Well this may be the update for you fellow comrades, as PINsir is here to help!\n" +
  "Today we bring you the new Game ID commands which allow you to save your credentials for easy access:\n" +
  " > 1. Use `$pinsir gameid add` to trigger a DM where you will be prompted to enter your details. Respond simply with a number or platform name to proceed.\n" +
  " > 2. Use `$pinsir gameid` to then show your details in the current channel.\n" +
  " > 3. Use `$pinsir gameid [@ping or User ID]` to show another users details in the current channel.\n" +
  " > 4. Use `$pinsir gameid remove` to trigger a DM where you can remove previous entries.\n" +
  "`Note`: You can also use the `add` command to overwrite previous entries.\n\n" +
  "This system will become more powerful the more people use it, so make sure to put in your Gaming details today!\n" +
  "As I'm made specifically for this server, you can always make some suggestions for our developer ";

const secondHalf =
  " to work on.\nUnfortunately, you won't find **my** details using `gameid` as I'm banned for using auto aim on scrubs.\nCan't help it: **I'm a bot**.\n\n" +
  "Remember, you can always use `$pinsir help` or `$pinsir commands` to get all the PINsir info ***you crave***.\n\n" +
  "Thank you for reading, and as always, **CHECK THE PINS**.";

function SendAnnouncement(message) {
  var channel = GetChannelByName(message, "❥-announcements");
  var user = "<@" + "268487608680579072" + ">";
  channel.send(pinsirUpdateMessage + user + secondHalf, {
    files: [
      "https://cdn.glitch.com/37568bfd-6a1d-4263-868a-c3b4d503a0b1%2FmlgBot.png?v=1611365650964"
    ]
  });
}
