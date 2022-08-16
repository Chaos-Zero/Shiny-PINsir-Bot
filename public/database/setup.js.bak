function DbDefaultSetup(db) {
  // default db lists
  db.defaults(
    { users: [{ username: "test", message: "test" }] },
    {
      ghUsers: [
        {
          username: "PINsir-Bot",
          url: "https://www.youtube.com/watch?v=v2Ouf5LBhlk",
          videoTitle: "Get Lotto Lucky",
          userId: "794402740138016789"
          },
        {
          username: "STFU-READTHEPINS-BOT",
          url: "https://www.youtube.com/watch?v=0ABiVapvB00",
          videoTitle: "Ultimate Viridian",
          userId: "727925328734847006"
        }
      ]
    },
    { pinMessages: [{ username: "test", message: "test", messageId: "test" }] },
    {
      platform: [
        {
          userId: "0123456",
          username: "testUser",
          switch: ["switch", "123456789100"],
          ps: "playstation",
          xbox: "xbox",
          steam: ["steam", "12345678"],
          epic: "epic",
          battlenet: "battlenet",
          origin: "origin",
          uplay: "uplay"
        },
        {
          userId: "42424242",
          username: "testUser2",
          switch: ["switch", "123456789100"],
          ps: "playstation",
          xbox: "xbox",
          steam: ["steam", "12345678"],
          epic: "epic",
          battlenet: "battlenet",
          origin: "origin",
          uplay: "uplay"
        }
      ]
    },
    {
      liveGiveawayPinMessages: [
        { username: "test", message: "test", messageId: "test" }
      ]
    },
    { giveaways: [{ username: "name", timeUntilMute: "Date()" }] },
    {
      dynamax: [
        {
          username: "name1",
          pokemon: ["entry1", "entry2", "entry3"],
          searching: "pokemonName"
        },
        {
          username: "name2",
          pokemon: ["entry1", "entry2", "entry3"],
          searching: "pokemonName",
          userId: "id"
        }
      ]
    }
  ).write();
}

function GetDb() {
  return db;
}
