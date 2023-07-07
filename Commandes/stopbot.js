const Discord = require("discord.js");

module.exports = {
    name: 'stopbot',
    category: 'developper',
    permission: Discord.PermissionFlagsBits.Administrator,
    dm : false,
    ownerOnly: true,
    description: 'Permet de stoper  le bot',
    autocomplete: false,

    async run(bot, interaction) {
        await interaction.reply({ content: 'Le bot a été stoper sur vs code', ephemeral: true });
        console.log('Le bot a été stoper sur vs code');
        return process.exit();
    },
};