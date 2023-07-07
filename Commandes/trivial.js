const Discord = require("discord.js");
const {
    Configuration,
    OpenAIApi
} = require("openai");
const configuration = new Configuration({
    apiKey: `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`,
});


module.exports = {

    name: "trivial",
    description: "Pose une question à laquelle il faut répondre",
    permission: "Aucune",
    dm: false,
    ownerOnly: false,
    category: "ia",
    options: [{
        type: "string",
        name: "difficulté",
        description: "La difficulté de la question",
        required: true,
        autocomplete: true
    }, {
        type: "string",
        name: "theme",
        description: 'Le thème sur lequel la question va porter',
        required: false,
        autocomplete: false
    }],

    async run(bot, interaction) {
        await interaction.deferReply();

        const diff = interaction.options.getString('difficulté');
        const theme = interaction.options.getString('theme') ?? "la culture générale";


        if (!["facile", "moyen", "difficile"].includes(diff)) return interaction.reply(`La difficulté ${diff} est invalide!`);

        const openai = new OpenAIApi(configuration);

        try {
            async function chatGPTQuestion(diff) {
                const response = await openai.createChatCompletion({
                    model: "gpt-3.5-turbo",
                    messages: [{
                        role: 'assistant',
                        content: `Génere  moi une  question sur ${theme} de la difficulté: ${diff}`,
                    }],
                });

                const Embed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setTitle(`${interaction.user} votre question:`)
                    .setDescription(`\`\`\`Difficulté: ${diff}\`\`\``)
                    .addFields({
                        name: `Question: `,
                        value: `\`\`\`${response.data.choices[0].message.content}\`\`\``
                    })
                    .setThumbnail()
                    .setFooter({
                        iconURL: bot.user.displayAvatarURL(),
                        text: bot.user.username,
                    });

                await interaction.followUp({
                    embeds: [Embed],
                });

                return response.data.choices[0].message.content;
            };

            const question = await chatGPTQuestion(diff);
            const filter2 = (m) => m.author.id === interaction.member.user.id;
            const t1 = await interaction.channel.awaitMessages({
                filter: filter2,
                max: 1
            })

            const reponse = await t1.first().content;
            async function chatGPTReponse(question) {
                const response = await openai.createChatCompletion({
                    model: "gpt-3.5-turbo",
                    messages: [{
                        role: 'assistant',
                        content: `C'est un jeu de trivial! La question était : ${question} et ${interaction.user.username} a  répondu:  ${reponse} ! Dites-lui s'il a  vrai ou faux!`,
                    }],
                });

                const Embed = new Discord.EmbedBuilder()
                    .setColor("Random")
                    .setTitle(`${interaction.user}`)
                    .setDescription(`\`\`\`Difficulté: ${diff}\`\`\``)
                    .addFields({
                        name: `Réponse: `,
                        value: `\`\`\`${response.data.choices[0].message.content}\`\`\``,
                    })
                    .setThumbnail()
                    .setFooter({
                        iconURL: bot.user.displayAvatarURL(),
                        text: bot.user.username,
                    });

                await interaction.followUp({
                    embeds: [Embed],
                });

            };

            await chatGPTReponse(question);

        } catch (error) {
            console.error(error);
            await interaction.followUp(`Oula, je crains qu'il n'y aie un problème! Désolé!`);
        };
    }
};