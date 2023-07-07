const Discord = require("discord.js")

module.exports = {

    name: "avatar",
    description: "montrer l'avatar d'un utilisateur",
    utilisation: "/avatar",
    permission: "Aucune",
    dm: true,
    category: "informations",
    options: [
        {
            type: "user",
            name: "utilisateur",
            description: "information sur une personne",
            required: true,
            autocomplete: false
        }
    ],

    async run(client, interaction) {
        const displayAvatarURL = (user, size) => {
            return user.displayAvatarURL({ dynamic: true, size: size })
        }
        let user = interaction.options.getUser('utilisateur');
        let member = interaction.member;
        if (!user) user = interaction.user;
        const userFlags = await user.fetchFlags().then(e => e.toArray());
        let s;
        if (userFlags.size > 1) {
            s = "Badges";
        } else {
            s = "Badge";
        }

        let EmbedUserInfo = new Discord.EmbedBuilder()
            .setDescription(`
        **Avatar** : **[URL](${user.displayAvatarURL({ dynamic: true, size: 4096})})**`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setColor('#00FFFF')
            .setFooter({ text: `By XIFI` });

        await interaction.reply({ embeds: [EmbedUserInfo] })
    }
}


