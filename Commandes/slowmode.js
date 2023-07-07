const Discord = require("discord.js")
const ms = require("ms")

module.exports = {

    name: "slowmode",
    description: "Applique un slowmode à un channel",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "moderations",
    options: [
        {
            type: "channel",
            name: "channel",
            description: "Le channel à affecter le slowmode",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "temps",
            description: "Le temps de slowmode (s pour secondes, m pour minutes, h pour heures)",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {

        let channel = args.getChannel("channel")
        if(!channel) return message.reply("Pas de channel spécifié !")

        let time = args.getString("temps")
        if(!time) return message.reply("Pas de temps spécifié !")
        if(isNaN(ms(time))) return message.reply("Pas le bon format !")
        if(ms(time) > 21600000) return message.reply("Le slowmode ne peut pas durer plus de 6 heures !");

        await channel.setRateLimitPerUser(ms(time) / 1000)

        message.reply(`**${message.user}** a appliqué un slowmode de **${time}**`)
        
    }
}