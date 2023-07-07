const Discord = require("discord.js");
const Canvas = require("discord-canvas-easy");

module.exports = {

  name: "rank",
  description: "donne le rank d'une personne",
  utilisation: "/rank",
  permission: "Aucune",
  dm: false,
  category: "informations",
  options: [
    {
      type: "user",
      name: "utilisateur",
      description: "information sur le rank d'une personne",
      required: false,
      autocomplete: false
    }
  ],

  async run(bot, message, args) {

    const db = bot.db;
    let user;
    if (args.getUser("utilisateur")) {
      user = args.getUser("utilisateur")
      if (!user || !message.guild.members.cache.has(user?.id)) return message.channel.reply("Pas de membre !")
    } else user = message.user;

    db.query(`SELECT * FROM xp WHERE guildID ='${message.guildId}' AND user = '${user.id}'`, async (err, req) => {

      db.query(`SELECT * FROM xp WHERE guildID = '${message.guildId}'`, async (err, all) => {

      


        if (req.length < 1) return message.reply("Ce membre na pas de xp!")
        
        await message.deferReply()

        const calculXp = (xp, level) => {

          let xptotal = 0;
          for (let i = 0; i < level + 1; i++) xptotal += i * 1000
          xptotal = xp;
          return xptotal;



        }

        let leaderboard = await all.sort(async (a, b) => calculXp(parseInt(b.xp), parseInt(b.level)) - calculXp(parseInt(a.xp), parseInt(a.level)))

        let xp = parseInt(req[0].xp)
        let level = parseInt(req[0].level)

        let rank = leaderboard.findIndex(r => r.user === user.id) + 1;
        let need = (level + 1) * 1000;

        let Card = await new Canvas.Card()
          .setBackground("https://cdn.discordapp.com/attachments/1092091901747929229/1119994152378171402/Copie_de_Copie_de_up_3.jpg")
          .setBot(bot)
          .setColorFont('#ffffff')
          .setRank(rank + 1)
          .setUser(user)
          .setColorProgressBar("#00FFFF")
          .setGuild(message.guild)
          .setXp(xp)
          .setLevel(level)
          .setXpNeed(need)
          .toCard()

        await message.followUp({ files: [new Discord.AttachmentBuilder(Card.toBuffer(), { name: "rank.png" })] })





      }
      )



    })
  }
}
