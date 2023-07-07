const Discord = require("discord.js")


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

module.exports = {

    name: "profil",
    description: "info profil",
    utilisation: "/profil",
    permission: "Aucune",
    dm: false,
    category: "informations",
    options: [],

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

        let EmbedUserInfo = new Discord.EmbedBuilder()
        .setAuthor({ name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`
    ➞ **__Information sur le membre__ ${user}**
    > **Nom du Membre** : \`${user.username}\`
    > **ID** : \`${user.id}\`
    > **TAG du Membre** : \`${user.discriminator}\`
    > **Avatar** : **[URL](${user.displayAvatarURL({ dynamic: true, size: 4096 })})**
    > **Bannière du Membre** : **[URL](${await (await interaction.client.users.fetch(user.id, { force: true })).bannerURL({ dynamic: true, size: 4096 })})**`)
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setImage(await (await interaction.client.users.fetch(user.id, { force: true })).bannerURL({ dynamic: true, size: 4096 }))
        .setColor('#00FFFF')
        .setFooter({ text: `By XIFI` });

        await interaction.reply({ embeds: [EmbedUserInfo]})
    }
}


