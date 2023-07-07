const Discord = require("discord.js")

module.exports = {

    name: "update",
    description: "Affiche les mis à jour",
    utilisation: "/addrole",
    permission: Discord.PermissionFlagsBits.ManageGuild,
    ownerOnly: true,
    dm: false,
    category: "developper",

    async run(bot, interaction) {

        const Modal = new Discord.ModalBuilder()
            .setCustomId('ticketmodal')
            .setTitle('Informations sur la maj');

        const question2 = new Discord.TextInputBuilder()
            .setCustomId('sujet')
            .setLabel("Quelles Modification ont été faites ?")
            .setRequired(true)
            .setPlaceholder('Votre sujet... :')
            .setStyle(Discord.TextInputStyle.Paragraph);

        const ActionRow2 = new Discord.ActionRowBuilder().addComponents(question2);

        Modal.addComponents(ActionRow2);

        await interaction.showModal(Modal);

        try {
            const reponse = await interaction.awaitModalSubmit({ time: 300000 });

            const sujet = reponse.fields.getTextInputValue('sujet');

            const EmbedSay = new Discord.EmbedBuilder()
                .setTitle("Voici les derniers changement !")
                .setDescription(`\`\`\`${sujet}\`\`\``)
                .setColor("#00FFFF");

            const channelId = '1118541897791709305';
            const channel = bot.channels.cache.get(channelId);

            channel.send({ embeds: [EmbedSay] })

            await reponse.reply({ content: "Vous avez envoyer votre mis à jour !", ephemeral: true });

        } catch (error) {
            console.log(error);
        }
    }
}