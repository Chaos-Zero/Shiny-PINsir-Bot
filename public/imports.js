const fs = require("fs");

const collections = "./public/collections/";
const balltism = require(collections + "balltism.json");
const aBalltism = require(collections + "aballtism.json");
const gBalltism = require(collections + "gballtism.json");
const gmaxBalltism = require(collections + "gmaxballtism.json");

//const pokemonList = require(collections + "pokemonlists.js").pokemonList;
//const pokemonCapList = require(collections + "pokemonlists.js").pokemonCapList;
//const ballList = require(collections + "pokemonlists.js").ballList;
//const regionIdentifiers = require(collections + "pokemonlists.js")
// .regionIdentifiersList;

//const kimble = require(collections + "blacklist.js").kimbleList;
//const blackListStrings = require(collections + "blacklist.js").blackList;
//const friendBlackListStrings = require(collections + "blacklist.js")
//.friendBlackList;
//const badListStrings = require(collections + "blacklist.js").badList;
//const futureTenseStrings = require(collections + "blacklist.js")
//.futureTenseList;
//const goodBotStrings = require(collections + "blacklist.js").goodBotList;
//const goodBotReplyStrings = require(collections + "blacklist.js")
//  .goodBotReplyList;
//const dumbBotStrings = require(collections + "blacklist.js").dumbBotList;
//const dumbBotReplyStrings = require(collections + "blacklist.js")
// .dumbBotReplyList;

eval(fs.readFileSync("./public/collections/blacklist.js") + "");
eval(fs.readFileSync("./public/collections/pokemonlists.js") + "");

eval(fs.readFileSync("./public/database/read.js") + "");
eval(fs.readFileSync("./public/database/write.js") + "");
eval(fs.readFileSync("./public/database/setup.js") + "");
eval(fs.readFileSync("./public/dynamax/damethods.js") + "");
eval(fs.readFileSync("./public/friendcode/fc.js") + "");
eval(fs.readFileSync("./public/genshin/genshin.js") + "");
eval(fs.readFileSync("./public/help/helpembeds.js") + "");
eval(fs.readFileSync("./public/hosting/embedmethods.js") + "");
eval(fs.readFileSync("./public/hosting/hostingmethods.js") + "");
eval(fs.readFileSync("./public/pins/pinmethods.js") + "");
eval(fs.readFileSync("./public/pokemon/embedmethods.js") + "");
eval(fs.readFileSync("./public/pokemon/scrapeserebii.js") + "");
eval(fs.readFileSync("./public/utils/discordutils.js") + "");
eval(fs.readFileSync("./public/utils/pokemonutils.js") + "");
eval(fs.readFileSync("./public/utils/updatemessage.js") + "");
eval(fs.readFileSync("./public/utils/utils.js") + "");
eval(fs.readFileSync("./public/kitsu/kitsuutils.js") + "");
eval(fs.readFileSync("./public/ac/ac.js") + "");
eval(fs.readFileSync("./public/eldenring/er.js") + "");
eval(fs.readFileSync("./public/music/userthemes.js") + "");

eval(fs.readFileSync("./public/dm/dmmessages.js") + "");
eval(fs.readFileSync("./public/help/helpembeds.js") + "");
