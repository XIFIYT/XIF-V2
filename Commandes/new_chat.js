const Discord = require('discord.js')
const config = require('../config')
const { Configuration, OpenAIAPI  }  =  require('openai')

module.exports  =  {
    name: "new_chat",
    description: "Ouvrir un salon de  discussion et parler avec XIF V2",
    permission: Discord.PermissionFlagsBits.BanMembers,
    category:  "ia",
    ownerOnly: false,
    dm : false,
    options: [],
    async run (bot, message, args, db) {

      const but = new Discord.ActionRowBuilder().setComponents(
        new Discord.ButtonBuilder()
        .setLabel('Fermer le chat')
        .setCustomId('closeChat')
        .setStyle(Discord.ButtonStyle.Danger)
      )
      const but2 = new Discord.ActionRowBuilder().setComponents(
        new Discord.ButtonBuilder()
        .setLabel('Oui')
        .setCustomId('oui')
        .setStyle(Discord.ButtonStyle.Success),
        new  Discord.ButtonBuilder()
        .setLabel('Non')
        .setCustomId('non')
        .setStyle(Discord.ButtonStyle.Danger)
      )
        await message.guild.channels.create({
            name: `${message.user.tag} - Chat GPT`,
            type: Discord.ChannelType.GuildText,
            permissionOverwrites: [
              {
                id: message.guild.roles.everyone,
                deny: [Discord.PermissionFlagsBits.ViewChannel],
              },
              {
                id: message.user,
                allow: [Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.ViewChannel],
              },
            ],
        }).then(async channel => {
            const msg = await channel.send({content:`**Chat Ouvert** - ${message.user}`, components: []});
            await channel.send('Bonjour, que puis-je faire pour vous? (si vous vouler fermer ce salon suprimer le bientot un bouton (en developement je fixe les bugs)')
            await message.reply(`Salon créé  avec succès: ${channel}`);
            bot.gptChannels.push(channel.id);

            const collector = await msg.createMessageComponentCollector();
            collector.on("collect", async i => {
              const res = await i.reply({content: 'Etes-vous sûr de vouloir fermer ce chat?', components: [but2]});
              const resCollector = await  res.createMessageComponentCollector();
              resCollector.on('collect', async o =>{
                if(i.customId  === 'oui')
                {
                  await i.reply('Chat Fermé avec succès')
                  await channel.delete()
                }
                if(i.customId)
                {
                  i.reply(`D'accord, le chat reste ouvert!`)
                  await res.delete()
                }
              })
            })

        });

      
        
        
       
    }
}