const Discord = require('discord.js');

module.exports = async (bot, interaction) => {
    if (interaction.customId === 'close') {
        await interaction.channel.delete()
    }
}