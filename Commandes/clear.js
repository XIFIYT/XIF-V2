const Discord = require('discord.js');
const ms = require('ms');

module.exports = {

    name: "clear",
    description: "Supprimé des messages dans un salon !",
    permissions: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "moderations",
    options: [
        {
            type: "channel",
            name: "salon",
            description: "Le salon où les messages seront supprimés",
            required: true
        },
        {
            type: "number",
            name: "nombre",
            description: "Le nombre de messages à supprimer",
            required: true
        },

    ],

    async run(bot, message, args) {

        let channel = args.getChannel("salon")
        if (!channel) channel = message.channel
        if (channel.id !== message.channel.id && !message.guild.channel.channelId) return message.reply("Pas de salon spécifié")

        let number = args.getNumber("nombre")
        if (parseInt(number) <= 0 || parseInt(number) > 100) return message.reply("Il me faut un nombre entre 1 et 100 !")


        try {

            let messages = await channel.bulkDelete(parseInt(number))

            await message.reply({ content: `J'ai bien supprimé \`${messages.size}\` message(s) dans le salon ${channel} !`, ephemeral: true })

        } catch (err) {

            let messages = [...(await channel.messages.fetch()).filter(msg => !msg.interaction && (Date.now() - msg.createdAt) <= 1209600000).values()]
            if (messages.length === 0) return message.reply("Aucun message à supprimer dans ce salon")
            await channel.bulkDelete(messages)

            await message.reply({ content: `J'ai pu supprimer uniquement \`${messages.length}\` message(s) dans le salon ${channel} car les autres dataient de plus de 14 jours !`, ephemeral: true })
        }
    },
};
