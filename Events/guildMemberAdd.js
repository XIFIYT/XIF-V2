const { EmbedBuilder } = require('discord.js');

module.exports = async (bot, member) => {
    const db = bot.db;

    try {
        db.query(`SELECT * FROM welcome WHERE guildID = '${member.guild.id}'`, async (err, req) => {
            if (req.length < 1) {
                return;
            } else {
                const title = req[0].titre;
                const description = req[0].description;
                const footer = req[0].footer;
                const timestamp = req[0].timestamp;
                const image = req[0].image;

                const embed = new EmbedBuilder()
                    .setTitle(`${title} 😊`)
                    .setDescription(`${member}, ${description} \nGrâce à lui, nous somme désormais **${member.guild.memberCount}**`)
                    .setColor(bot.color)
                    .setFooter({ iconURL: bot.user.displayAvatarURL({ dynamic: true }), text: `${footer} | By Dark0-Toto` })
                    .setImage(`${image}`)
                    .setThumbnail(member.displayAvatarURL({ dynamic: true }));

                if (timestamp === 'oui') embed.setTimestamp();
                if (!timestamp === 'oui') return;

                db.query(`SELECT * FROM server WHERE guildID = '${member.guild.id}'`, async (err, del) => {
                    let welcome = del[0].welcomeChannel;
                    const welcomechannel = bot.channels.cache.get(welcome);
                    if (!bot.channels.cache.get(welcomechannel)) return welcomechannel.send({ content: `${member}`, embeds: [embed] });
                });
            };
        });
    } catch (err) {
        console.log(err);
    };
};