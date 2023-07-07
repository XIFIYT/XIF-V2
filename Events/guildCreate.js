const Discord = require("discord.js")

module.exports = async(bot, guild) => {
      
        bot.channels.cache.get('1121688353004339230').send({ embeds: [
            {
                title: "Nouveau Serveur !",
                description: `\`${guild.name}\` / \`${guild.id}\` / <@${guild.ownerId}>`
            }
        ] }).catch(() => false)
}