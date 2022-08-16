const collections = "./public/collections/";
const ballList = require(collections + "pokemonlists.js").ballList;
const alolanNumbers = require(collections + "pokemonlists.js").alolanNumbers;
const galarNumbers = require(collections + "pokemonlists.js").galarNumbers;
const gMaxNumbers = require(collections + "pokemonlists.js").gMaxNumbers;

const balltism = require(collections + "balltism.json");
const aBalltism = require(collections + "aballtism.json");
const gBalltism = require(collections + "gballtism.json");
const gmaxBalltism = require(collections + "gmaxballtism.json");

function GetRegionIdentity(region, pokeIndex) {
  const pokeIndexNum = parseInt(pokeIndex, 10);
  switch (region) {
    case "":
      return region;
    case "a":
    case "alola":
    case "alolan":
      region = alolanNumbers.includes(pokeIndexNum) ? "Alolan" : "";
      return region;
      break;
    case "g":
    case "galar":
    case "galarian":
      region = galarNumbers.includes(pokeIndexNum) ? "Galarian" : "";
      return region;
      break;
    case "gmax":
    case "gigantamax":
      region = gMaxNumbers.includes(pokeIndexNum) ? "Gigantamax" : "";
      console.log(region);
      return region;
      break;
    default:
      return "";
  }
}

function GetHtmlRegionTag(region, pokeIndex) {
  const pokeIndexNum = parseInt(pokeIndex, 10);
  switch (region) {
    case "":
      return region;
    case "a":
    case "alola":
    case "alolan":
      if (alolanNumbers.includes(pokeIndexNum)) {
        return "-a";
      }
      break;
    case "g":
    case "galar":
    case "galarian":
      if (galarNumbers.includes(pokeIndexNum)) {
        return "-g";
      }
      break;
    case "gmax":
    case "gigantamax":
      if (gMaxNumbers.includes(pokeIndexNum)) {
        return "-gi";
      }
      break;
    default:
      return "";
  }
  return "";
}

function CheckRegion(index) {
  var region = "Kanto";
  if (index > 151 && index < 252) {
    region = "Johto";
  } else if (index > 251 && index < 387) {
    region = "Hoenn";
  } else if (index > 386 && index < 494) {
    region = "Sinnoh";
  } else if (index > 493 && index < 650) {
    region = "Unova";
  } else if (index > 649 && index < 722) {
    region = "Kalos";
  } else if (index > 721 && index < 810) {
    region = "Alola";
  } else if (index > 809) {
    region = "Galar";
  }
  return region;
}

function GetBalltismEntry(pokemon, region) {
  console.log("\n\n" + region + "This is the region passed\n\n");
  var collection = balltism;
  if (region == "Alolan") {
    collection = aBalltism;
  } else if (region == "Galarian") {
    collection = gBalltism;
  } else if (region == "Gigantamax") {
    collection = gmaxBalltism;
  }
  for (var i = 0; i < collection.length; i++) {
    if (collection[i].Number == pokemon) {
      console.log("We have the regional entry");
      return collection[i];
    }
  }
}

function GetBallImage(ball) {
  for (var i = 0; i < ballList.length; i++) {
    if (ballList[i].ball == ball) {
      return ballList[i];
    }
  }
}

// Returns isPokemon, Pokemon name, Pokemon number, optional region
function GetPokemonDetailsFromMessage(message) {
  var lowerCaseMessage = message.content.toLowerCase();
  var argument = message.content.split(" ");

  const regionIdentifiers = [
    " alolan ",
    " a ",
    " galarian ",
    " galar ",
    " g ",
    " gigantamax ",
    " gmax "
  ];
  var optionalRegion = "";

  if (
    regionIdentifiers.some(lowerCaseMessage.includes.bind(lowerCaseMessage))
  ) {
    optionalRegion = argument[2];
    lowerCaseMessage = lowerCaseMessage.replace(argument[2] + " ", "");
  }

  if (
    lowerCaseMessage.includes(" add ") ||
    lowerCaseMessage.includes(" remove ") ||
    lowerCaseMessage.includes(" request ") ||
    lowerCaseMessage.includes(" searching ") ||
    lowerCaseMessage.includes(" ping ")
  ) {
    lowerCaseMessage = lowerCaseMessage.replace(argument[2] + " ", "");
  }

  argument = lowerCaseMessage.split(" ");
  var pokemon = argument[2] != null ? argument[2] : "";
  var splitPokemon =
    argument[3] != null && isNaN(argument[3]) ? " " + argument[3] : "";
  pokemon += splitPokemon;

  var pokeIndex = pokemon;

  if (isNaN(pokeIndex)) {
    pokeIndex = pokemonList.indexOf(pokemon.toLowerCase()) + 1;
  }
  if (pokeIndex < 1 || pokeIndex > 898 || isNaN(pokeIndex)) {
    var pinsirMessage =
      "I'm sorry <@" +
      message.author.id +
      ">, I do not know this Pokémon. I may have it written down differently.";
    return [false, pinsirMessage];
  }

  var regionIdentity = GetRegionIdentity(optionalRegion, pokeIndex);
  regionIdentity =
    regionIdentity.length > 1 ? regionIdentity + " " : regionIdentity;

  pokemonCapList[pokeIndex - 1];

  return [true, pokemonCapList[pokeIndex - 1], pokeIndex, regionIdentity];
}
