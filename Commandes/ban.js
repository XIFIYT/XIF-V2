const Discord = require('discord.js');

module.exports = {
    name: "ban",
    description: "bannir une personne",
    utilisation: "/ban",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "moderations",
    options: [
        {
            type: `user`,
            name: `membre`,
            description: `l'utilisateur à bannir`,
            required: true,
            autocomplete: false,
        }, {
            type: `string`,
            name: `reason`,
            description: `raison du bannisement`,
            required: false,
            autocomplete: false,
        }
    ],

    async run(bot, message, args) {
        try {
            const utilisateur = args.getMember('membre');
            const reason = args.getString('reason') ?? "Pas de raison fournie !"

            if (message.user.id === utilisateur.id) return reponse.reply({ content: `Vous ne pouvez pas faire ceci sur vous !`, ephemeral: true });
            if (message.guild.ownerId === utilisateur.id) return reponse.reply({ content: `Vous ne pouvez pas essayez ceci sur le fondateur du serveur !`, ephemeral: true });
            if (utilisateur && !utilisateur.bannable) return reponse.reply({ content: `Vous ne pouvez pas bannir cet utilisateur, car il ne peux pas être banni !`, ephemeral: true });
            if (utilisateur && message.member.roles.highest.comparePositionTo(utilisateur.roles.highest) <= 0) return reponse.reply({ content: `Vous ne pouvez pas bannir ce membre, il est plus important que vous !`, ephemeral: true });

            const embedban = new Discord.EmbedBuilder()
                .setTitle(`Vous avez bien banni  !`)
                .setDescription(`
            **Serveur :** \`${message.guild.name}\`
            **Auteur du Bannissement :** ${message.user}
            **Pour la raison suivante :** \`\`\`${reason}\`\`\`
            `)
                .setColor('#00FFFF');
                
                await message.utilisateur.send({embeds: [embedban]})
            message.reply({ content: `Vous avez bien banni ${utilisateur} pour la raison : \`${reason}\`` });
            await message.guild.bans.create(utilisateur.id, { reason: reason });

        } catch (err) {
            console.error(err);
            return message.reply("pas de membre a bannir")
        }
    }
} 
