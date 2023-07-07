const Discord = require("discord.js")
const { ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js")

/**
 * @param { ChatInputCommandInteraction } interaction
**/

module.exports = {

    name: "question",
    description: "Poser une question",
    utilisation: "/question",
    permission: Discord.Administrator,
    dm: false,
    category: "moderations",
    options: [
        {
            name: "question",
            type: "string",
            description: "Votre question",
            autocomplete: false,
            required: true
        },
    ],

    async run(Client, interaction) {

        const pollquestion = interaction.options.getString("question");

        const pollEmbed = new EmbedBuilder()
            .setDescription("** Question:**\n" + pollquestion)
            .addFields([
                { name: "Oui", value: "0", inline: true },
                { name: "Non", value: "0", inline: true }
            ])
            .setColor("#00FFFF")

        const replyObject = await interaction.reply({ embeds: [pollEmbed], fetchReply: true })

        const pollButtons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("Oui")
                    .setCustomId(`Poll-Yes-${replyObject.id}`)
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setLabel("Non")
                    .setCustomId(`Poll-No-${replyObject.id}`)
                    .setStyle(ButtonStyle.Danger),
            )
        interaction.editReply({ components: [pollButtons] });
    }
}