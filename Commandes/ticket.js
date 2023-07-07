const Discord = require('discord.js')

module.exports = {

    name: "ticket",
    description: "ouvrir un ticket",
    utilisation: "/tickets",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "moderations",
    options: [],
    async run(bot, interaction) {
        const embed = new Discord.EmbedBuilder()
        .setTitle('Ouvrir un ticket')
        .setDescription('Ouvrez un ticket uniquement en cas d\'urgent !')
        .setColor('#00FFFF')
        .setFooter({text: `${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL()})

        const btns = new Discord.ActionRowBuilder()
        .addComponents(new Discord.ButtonBuilder()
            .setCustomId('openticket')
            .setLabel('Ouvrir un ticket')
            .setEmoji('🎫')
            .setStyle(Discord.ButtonStyle.Primary)
            )

            await interaction.channel.send({embeds: [embed], components: [btns]});
            await interaction.reply({content: "Commande effectué !", ephemeral: true})
    },
};