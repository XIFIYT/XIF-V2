const Discord = require('discord.js');


module.exports = {

    name: "help",
    description: "affiche la liste des commandes",
    utilisation: "/ping",
    permission: "Aucune",
    dm: true,
    category: "informations",

    async run(bot, message, interaction) {
        const Row = new Discord.ActionRowBuilder().addComponents(
            new Discord.StringSelectMenuBuilder()
                .setCustomId('select')
                .setPlaceholder('Choisissez une option')
                .addOptions([
                    {
                        label: 'Accueil',
                        description: 'Cliquez ici pour allez à l\'accueil !',
                        emoji: '🏠',
                        value: 'home',
                    },
                    {
                        label: 'Info',
                        description: 'Cliquez ici pour regarder les commandes d\'informations',
                        emoji: '❓',
                        value: 'info',
                    },
                    {
                        label: 'Dev',
                        description: 'Cliquez ici pour regarder les commandes de dev',
                        emoji: '🛠️',
                        value: 'dev',
                    },
                    {
                        label: 'Modo',
                        description: 'Cliquez ici pour regarder les commandes de modo',
                        emoji: '🛡️',
                        value: 'modo',
                    },
                    {
                        label: 'IA',
                        description: 'Cliquez ici pour regarder les commandes d\'IA',
                        emoji: '❓',
                        value: 'ia',
                    }
                ])
        );

        const EmbedAccueil = new Discord.EmbedBuilder()
            .setTitle('Ci-dessous la liste de mes commandes')
            .setDescription(`
        - \`🛡️\` Administrations :  commande de moderation \n- \`❓\` Informations : en savoir plus sur des utilisateur bot, serveur,\n- \`🛠️\` Developer : commande uniquement reserve au createur du bot \n- \`🤖\` inteligence artificiel : parler ou discuter avec XIF V2\n
        `)
            .setColor('#00FFFF')
            .setImage("https://cdn.discordapp.com/attachments/1118216813050875984/1122563451722670130/Copie_de_Copie_de_Copie_de_Copie_de_up.jpg")
            .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic: true }))

        const ban = await message.reply({
            embeds: [EmbedAccueil],
            components: [Row],
        });

        const time = 22 * 24 * 60 * 60 * 1000;
        const collector = ban.createMessageComponentCollector({ componentType: Discord.ComponentType.StringSelect, time });

        collector.on('collect', async (i) => {
            if (i.user.id !== message.user.id) {
                i.reply({ content: "Vous ne pouvez pas regarder sur celui ci, merci de faire la commande vous même !", ephemeral: true });
            } else {
                if (i.customId === "select") {
                    const selectedValue = i.values[0];
                    if (selectedValue === 'home') {
                        await i.deferUpdate()
                        i.editReply({
                            embeds: [EmbedAccueil],
                            components: [Row],
                        });
                    }

                    if (selectedValue === 'info') {
                        await i.deferUpdate()
                        i.editReply({
                            embeds: [{
                                title: "Commandes D'informations",
                                description: bot.commands
                                    .filter(c => c.category && c.category === "informations")
                                    .map(c => `\`/${c.name}\` **: ${c.description}**`)
                                    .join("\n"),
                                color: 0X00FFFF,
                            }],
                            components: [Row],
                        });
                    }

                    if (selectedValue === 'dev') {
                        await i.deferUpdate()
                        i.editReply({
                            embeds: [{
                                title: "Commandes D'administration",
                                description: bot.commands
                                    .filter(c => c.category && c.category === "developper")
                                    .map(c => `\`/${c.name}\` **: ${c.description}**`)
                                    .join("\n"),
                                color: 0X00FFFF,
                            }],
                            components: [Row],
                        });
                    }

                    if (selectedValue === 'modo') {
                        await i.deferUpdate()
                        i.editReply({
                            embeds: [{
                                title: "Commandes De moderation",
                                description: bot.commands
                                    .filter(c => c.category && c.category === "moderations")
                                    .map(c => `\`/${c.name}\` **: ${c.description}**`)
                                    .join("\n"),
                                color: 0X00FFFF,
                            }],
                            components: [Row],
                        });
                    }

                    if (selectedValue === 'ia') {
                        await i.deferUpdate()
                        i.editReply({
                            embeds: [{
                                title: "Commandes fun",
                                description: bot.commands
                                    .filter(c => c.category && c.category === "ia")
                                    .map(c => `\`/${c.name}\` **: ${c.description}**`)
                                    .join("\n"),
                                color: 0X00FFFF,
                            }],
                            components: [Row],
                        });
                    }
                }
            }
        })
    }
}