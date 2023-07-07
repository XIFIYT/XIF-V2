const Discord = require("discord.js")

module.exports = {

    name: "info",
    description: "info user",
    utilisation: "/info",
    permission: "Aucune",
    dm: false,
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

        const activities = member.presence?.activities || [];
        let customStatus = 'Aucun statut personnalisé';
        const customStatusActivity = activities.find(activity => activity.type === 'CUSTOM_STATUS');
        if (customStatusActivity) {
            customStatus = `${customStatusActivity.emoji || ''} ${customStatusActivity.state}`;
        }

        const flags = {
            Staff: 'Staff',
            Partner: 'Partner',
            BugHunterLevel1: '<:discordbughuntermugPhotoRoom:1115638192968831007>',
            BugHunterLevel2: '<:9552_BugHunterLvl2:1115637990560120871> ',
            HypeSquadOnlineHouse1: '<:6601hypesquadbraveryPhotoRoom:1115637873425797160>',
            HypeSquadOnlineHouse2: '<:ac1ba465815c5e24e0276fa1a007d47d:1116972371266502666> ',
            HypeSquadOnlineHouse3: '<:stsmall507x507pad600x600f8f8f8:1116972390438674452> ',
            PremiumEarlySupporter: 'PremiumEarlySupporter',
            TeamPseudoUser: 'Équipe Discord',
            System: 'Système',
            VerifiedBot: '<:9142discordverifiedbot1fromvega:1116973828564852827><:3099discordverifiedbot2fromvega:1116973842271842324> ',
            VerifiedDeveloper: '<:7088earlyverifiedbotdeveloperPho:1115637831000408176>  ',
            CertifiedModerator: 'CertifiedModerator',
            ActiveDeveloper: '<:7011activedeveloperbadge:1115637952693928037>',
            Hypesquad: "Hypesquad",
            BotHTTPInteractions: "BotHTTPInteractions"
        };

        let gameName = 'Aucune activité de jeu';
        const gameActivity = activities.find(activity => activity.type === 0);
        if (gameActivity) {
            gameName = gameActivity.name;
        }


        let presence = user ? user.presence ? user.presence.status : "Hors ligne" : "Inconnu";
        if (presence == "idle") presence = "🟡"; else if (presence == "Hors ligne") presence = "⚪"; else if (presence == "online") presence = "🟢"; else if (presence == "streaming") presence = "🟣"; else if (presence == "dnd") presence = "🔴"; else if (presence == "Inconnu") presence = "❓"

        let EmbedUserInfo = new Discord.EmbedBuilder()
            .setAuthor({ name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`
    ➞ **__Information sur le membre__ ${user}**
    
    **Nom du Membre** : \`${user.username}\`
    **Surnom du Membre** : ${user ? user.nickname ? user.nickname : "❌" : "❓"}
    **ID** : \`${user.id}\`
    **TAG du Membre** : \`${user.discriminator}\`
    **Avatar** : **[URL](${user.displayAvatarURL({ dynamic: true, size: 4096 })})**
    **Bannière du Membre** : **[URL](${await (await interaction.client.users.fetch(user.id, { force: true })).bannerURL({ dynamic: true, size: 4096 })})**
    **Est-ce un Bot** : ${user.bot ? "✅" : "❌"}
    **Activité** : \`${gameName}\`
    **Status personnalisé** : \`${customStatus}\`
    **${s}** : ${userFlags.length ? userFlags.map(flag => flags[flag]).join(' ') : '❌'}
    **Status du Membre** : ${presence}
    **Date de Création du Membre** : <t:${Math.floor(user.createdAt / 1000)}:F> (<t:${Math.floor(user.createdAt / 1000)}:R>)`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setImage(await (await interaction.client.users.fetch(user.id, { force: true })).bannerURL({ dynamic: true, size: 4096 }))
            .setColor('#00FFFF')
            .setFooter({ text: `${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL({ dynamic: true }) });

        await interaction.reply({ embeds: [EmbedUserInfo] })
    }
}


