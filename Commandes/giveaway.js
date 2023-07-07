const Discord = require("discord.js");
const ms = require('ms');

module.exports = {
  name: 'giveaway',
  description: 'Lancer un giveaway',
  utilisation: "/giveaway",
  permission: Discord.PermissionFlagsBits.Administrator,
  dm: false,
  category: "moderations",
  options: [
    {
      name: 'duration',
      type: 'string',
      description: 'La duration du giveaway (e.g. 1h)',
      required: true,
      autocomplete: false
    },
    {
      name: 'winners',
      type: 'integer',
      description: 'Le nombre de winners',
      required: true,
      autocomplete: false
    },
    {
      name: 'prize',
      type: 'string',
      description: 'Le prix du giveaway',
      required: true,
      autocomplete: false
    },
  ],
  async run(bot, interaction, args) {
    const duration = args.getString('duration');
    const winners = args.getInteger('winners');
    const prize = args.getString('prize');

    let participants = [];

    // Calculer le temps restant
    const durationMs = ms(duration);
    const endTime = Date.now() + durationMs;

    const embed = new Discord.EmbedBuilder()
      .setColor('#00FFFF')
      .setTitle(`Giveaway: ${prize}`)
      .setDescription(`Clique sur les boutons ci-dessous pour participer ou quitter !\nDurée: **${duration}**\nNombre de gagnants: **${winners}**`)
      .setFooter({ text: `=====================\nBot Support © 2023` })

    const joinButton = new Discord.ButtonBuilder()
      .setCustomId('join')
      .setLabel('🎉 Participer')
      .setStyle('Success');

    const leaveButton = new Discord.ButtonBuilder()
      .setCustomId('leave')
      .setLabel('❌ Quitter')
      .setStyle('Danger');

    const rerollButton = new Discord.ButtonBuilder()
      .setCustomId('reroll')
      .setLabel('🔄 Reroll')
      .setStyle('Primary');

    const buttonRow = new Discord.ActionRowBuilder()
      .addComponents(joinButton, leaveButton);

    const message = await interaction.reply({ embeds: [embed], components: [buttonRow], fetchReply: true });

    const updateInterval = setInterval(() => {
      const timeLeftMs = endTime - Date.now();
      if (timeLeftMs <= 0) {
        clearInterval(updateInterval);
        return;
      }
      embed.setDescription(`**Ecrire ce que tu veux.**\n\n**Temps restant:** **\`${ms(timeLeftMs, { long: true })}\`**\n**Nombre de gagnants:** **\`${winners}\`**\n\n**Participants:** **${participants.length}**`);
      message.edit({ embeds: [embed], components: [buttonRow] });
    }, 1000);

    const filter = (interaction) => (interaction.customId === 'join' || interaction.customId === 'leave') && interaction.user.id !== bot.user.id;
    const collector = message.createMessageComponentCollector({ filter, time: durationMs });

    collector.on('collect', (interaction) => {
      const user = interaction.user;

      if (interaction.customId === 'join') {
        if (participants.includes(user.id)) {
          interaction.reply({ content: `**Tu participes déjà au giveaway !**`, ephemeral: true });
        } else {
          participants.push(user.id);
          interaction.reply({ content: `**Tu participes maintenant au giveaway pour** **${prize}** !`, ephemeral: true });
        }
      }

      if (interaction.customId === 'leave') {
        if (participants.includes(user.id)) {
          participants = participants.filter((id) => id !== user.id);
          interaction.reply({ content: `**Tu as quitté le giveaway pour** **${prize}** !`, ephemeral: true });
        } else {
          interaction.reply({ content: `**Tu ne participes pas au giveaway !**`, ephemeral: true });
        }
      }

      const joinButtonDisabled = joinButton.setDisabled(participants.length >= 10);
      const leaveButtonDisabled = leaveButton.setDisabled(!participants.includes(user.id));

      buttonRow.components = [joinButtonDisabled, leaveButtonDisabled];

      message.edit({ components: [buttonRow] });
    });

    collector.on('end', () => {
      // Choisir des gagnants
      const winnersArray = participants.sort(() => Math.random() - 0.5).slice(0, winners);

      // Annoncer les gagnants
      let winnerString = "";
      for (let i = 0; i < winnersArray.length; i++) {
        const winner = bot.users.cache.get(winnersArray[i]);
        winnerString += `${winner}\n`;
      }

      const rerollButtonRow = new Discord.ActionRowBuilder()
        .addComponents(rerollButton);

      embed.setDescription(`**Le giveaway est terminé ! GG aux gagnants :\n${winnerString}\nRejoins-nous vite en ticket pour récupérer ton prix !**`);
      //embed.setImage("Votre Image")
      message.edit({ embeds: [embed], components: [rerollButtonRow] });

      const rerollFilter = (interaction) => interaction.customId === 'reroll' && interaction.user.id !== bot.user.id;
      const rerollCollector = message.createMessageComponentCollector({ filter: rerollFilter });

      rerollCollector.on('collect', (interaction) => {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
          interaction.reply({ content: `**Tu n'as pas les permissions pour reroll le giveaway !**`, ephemeral: true });
          return;
        }

        const newWinnersArray = participants.sort(() => Math.random() - 0.5).slice(0, winners);

        let newWinnerString = "";
        for (let i = 0; i < newWinnersArray.length; i++) {
          const winner = bot.users.cache.get(newWinnersArray[i]);
          newWinnerString += `${winner}\n`;
        }

        embed.setDescription(`**Le giveaway a été reroll ! GG aux nouveaux gagnants :\n${newWinnerString}\nRejoins-nous vite en ticket pour récupérer ton prix !**`);
        message.edit({ embeds: [embed] });
        interaction.reply({ content: `**Le giveaway a été reroll avec succès !**`, ephemeral: true });
      });
    });
  }
};  