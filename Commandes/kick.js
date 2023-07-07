const Discord = require("discord.js")

module.exports = {

    name: "kick",
    description: "Expulser un membre du serveur",
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    category: "moderations",
    options: [
        {
            type: "user",
            name: "membre",
            description: "Le membre à expulser",
            required: true,
        }, {
            type: "string",
            name: "raison",
            description: "la raison du bannissement",
            required: true,
        }
    ],

    async run(bot, message, args) {

            let user = message.options.getUser("membre")
            if(!user) return message.reply("Pas de membre à expulser")
            let member = message.guild.members.cache.get(user.id)
            if(!member) return message.reply("Pas de membre à expulser")

            let reason = message.options.getString("raison")
            if(!reason) reason = "Pas de raison donnée. Veuillez rééxecuter la commande avec une raison"

            if(message.user.id === user.id) return message.reply("Tu ne peux pas t'expulser !")
            if((await message.guild.fetchOwner()).id === user.id) return message.reply("Tu ne peux pas expulser le propriétaire du serveur !")
            if(!member?.kickable) return message.reply("Je ne peux pas expulser ce membre")
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu ne peux pas bannir cette personne !")

            try {await user.send(`Tu as été expulsé du serveur ${message.guild.name} par ${message.user.tag} pour la raison : \`${reason}\``)} catch(err) {}

            await message.reply(`${message.user} a expulsé ${user.tag} pour la raison : \`${reason}\``)

            await member.kick(reason)
    }
}
