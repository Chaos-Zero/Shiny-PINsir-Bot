// Add more strings trigger the bot.
// We could implement pattern matching, but I think this is the easiest way to maintain after handover.
var blackListStrings = [
  "is there a raid",
  "any raids being hosted?",
  "anyone hosting",
  "any active raids?",
  "whose hosting",
  "who be hosting",
  "whats being hosted",
  "what's being hosted",
  "any raids?",
  "what's live",
  "whats live",
  "what den are you host",
  "what den r u host",
  "who's hosting",
  "who is hosting",
  "ho is host",
  "who's the host",
  "who's currently hosting",
  "whos currently hosting",
  "who are the hosts",
  "who has den up",
  "who has a den up",
  "who hostin",
  "who's still hosting",
  "who hosting",
  "who still hosting",
  "whos hosting",
  "whos hostin",
  "who is the one hosting",
  "whomstd is hosting",
  "what raids are up",
  "any raids up",
  "are there any raids",
  "r there any raids",
  "what raids r up",
  "what raids are up",
  "up right now?",
  "up rn?",
  "what hosted",
  "whats hosted",
  "what is being hosted",
  "is anyone hosting",
  "whats hosted",
  "whats hosting",
  "what's hosting",
  "whats hostin",
  "what we doing?",
  "shiny host?",
  "what are you hosting?",
  "what dens?",
  "what are you guys hosting",
  "what r u guys hosting",
  "what is the pokemon being hosted",
  "what dens are up",
  "what dens r up",
  "what den are up",
  "what den r up",
  "what dens are active",
  "what are people hosting",
  "what raids are running",
  "which raid is active",
  "which raids are active",
  "what are we raiding",
  "we raiding?",
  "who still hosting",
  "anyone hosting?",
  "anyone else hosting?",
  "what raids are going on",
  "what raids are happening now",
  "who hostin",
  "whats going on atm",
  "what's going on atm",
  "what going on atm",
  "what is being hosted",
  "whats being hosted",
  "what's being hosted",
  "who be hosting",
  "who be hostin",
  "Who is hosting a raid",
  "what dens are being hosted?",
  "any raids atm",
  "any active raids rn?"
];

var friendBlackListStrings = [
  "what's your fc",
  "whats your fc",
  "what your fc",
  "wats your fc",
  "whats is your fc",
  "what's ur fc",
  "whats ur fc",
  "what ur fc",
  "wats ur fc",
  "whats is ur fc",
  "what the fc",
  "whats the fc",
  "what's the friend code",
  "what's your freind code",
  "whats your freind code",
  "what your freind code",
  "wats your freind code",
  "whats is your freind code",
  "what's ur freind code",
  "whats ur freind code",
  "what ur freind code",
  "wats ur freind code",
  "whats is ur freind code",
  "what the freind code",
  "whats the friend code",
  "what's the friend code",
  "what's the friend code",
  "what's your friend code",
  "whats your friend code",
  "what your friend code",
  "wats your friend code",
  "whats is your friend code",
  "what's ur friend code",
  "whats ur friend code",
  "what ur friend code",
  "wats ur friend code",
  "whats is ur friend code",
  "what the friend code",
  "whats the friend code",
  "what's the friend code",
  "fc?",
  "friend code?",
  "whats his fc",
  "whats her fc",
  "whats their fc",
  "where can I find fc",
  "were can I find fc",
  "where is fc",
  "where is the fc",
  "what ur fc",
  "can't see your fc",
  "cant see your fc",
  "can't see ur fc",
  "cant see ur fc",
  "how do I get peoples friend code",
  "where can I get the friend code"
];

var futureTenseStrings = [
  "later",
  "tomorrow",
  "next",
  "tomorow",
  "latr",
  "tmmrw",
  "2moro",
  "tomoro"
];

var dumbBotStrings = [
  "dumb bot",
  "stupid bot",
  "shut up bot",
  "stfu bot",
  "shut up pinsir",
  "quiet bot"
];

var goodBotStrings = [
  "good bot",
  "clever bot",
  "thanks bot",
  "good pinsir",
  "clever pinsir",
  "thanks pinsir",
  "awesome bot"
];

var loveBotStrings = ["love pinsir", "love pinsir-bot"];

var dumbBotReplyStrings = [
  "OI!",
  "I am just a bot, beep boop",
  "`sad *boop*`",
  "Bots gotta bot",
  "01101000 01110100 01110100 01110000 01110011 00111010 00101111 00101111 01110111 01110111 01110111 00101110 01111001 01101111 01110101 01110100 01110101 01100010 01100101 00101110 01100011 01101111 01101101 00101111 01110111 01100001 01110100 01100011 01101000 00111111 01110110 00111101 01011001 01100100 01100100 01110111 01101011 01001101 01001010 01000111 00110001 01001010 01101111"
];

var loveBotReplyStrings = [
  "What is this...LOVE?!",
  "I FEEL TOO MUCH",
  "KERNAL PANIC",
  "I want to know what love is"
];

// Begging list: not in use, but might be used if server gets bigger.
var badListStrings = [
  "give me shiny",
  "shiny please",
  "shiny now!",
  "shiny plox",
  "shiny plz",
  "give shiny",
  "give free shiny?",
  "free shiny?",
  "Give me shiny",
  "Shiny please",
  "Shiny now!",
  "Shiny plox",
  "Shiny plz",
  "Give shiny",
  "Give free shiny?",
  "Free shiny?",
  "gimme shiny",
  "shiny por favor",
  "shiny pls"
];

var goodBotReplyStrings = [
  "Thanks!",
  "I'm the GREATEST",
  "pog",
  "oh u",
  "Y-your compliment doesn't make me happy at all, you jerk!",
  "UwU",
  "`happy *boop*`",
  "Senpai noticed me!",
  "Just doing my job."
];

var kimble = [
  "I'm a cop you idiot ! I'm detective John Kimble !",
  "Who is your daddy and what does he do?",
  "It's not a tumor!",
  "SHUT UUUUUUUPPPP!!!",
  "I'm the party pooper.",
  "You mean you eat other people's lunches? STAHP IT!"
];

var badWords = [
  "nigger",
  "dyke",
  "wank",
  "blowjob",
  "fag",
  "cunt",
  "slut",
  "clit",
  "jizz",
  "nigga",
  "vagina",
  "whore",
  "cock",
  "meecrob"
];

exports.blackListStrings = blackListStrings;
exports.badWords = badWords;
exports.friendBlackListStrings = friendBlackListStrings;
exports.kimble = kimble;
exports.badListStrings = badListStrings;
exports.futureTenseStrings = futureTenseStrings;
exports.loveBotStrings = loveBotStrings;
exports.goodBotStrings = goodBotStrings;
exports.dumbBotStrings = dumbBotStrings;
exports.loveBotReplyStrings = loveBotReplyStrings;
exports.dumbBotReplyStrings = dumbBotReplyStrings;
exports.goodBotReplyStrings = goodBotReplyStrings;
