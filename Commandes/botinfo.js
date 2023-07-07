const Discord = require("discord.js")

module.exports = {

    name: "botinfo",
    description: "info sur le bot",
    utilisation: "/botinfo",
    permission: "Aucune",
    dm: false,
    category: "informations",
    options: [],

    async run(client, interaction) {
        
    
  
    	


        const cpuModel = require("os").cpus()[0].model;
        const osType = require("os").type();
        const time = require("os").uptime();
        const APIemoji = client.emojis.cache.find(emoji => emoji.name === "API");
        const APIping = Math.round(client.ws.ping);
        

        let EmbedUserInfo = new Discord.EmbedBuilder()
            .setAuthor({ name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`
    ➞ **__Information Systeme__**   
    > **<:discotoolsxyzicon33:1121321288997285908> Hebergeur** : \`CloudHive\`
    > **<:discotoolsxyzicon30:1121319515150626887>Information Stockage** : \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB \`
    > **<:pngclipartcomputericonsencapsula:1121148702891982909> CPU** : \`${cpuModel}\`
    > **💻Type de Systeme** : \`${osType}\`
    > **<:26492485:1121147634598547519> Discord version** : \`${Discord.version}\`
    > **<:pp840x830pad1000x1000f8f8f8:1121147967630475385> Node JS version** : \`${process.version}\`
    > **<:149749:1121149171026628638> Base de Donne** : \`MySql\`
    > **<:pngclipartcomputericonsclockicon:1121149609050390679> Uptime** : \`${time}\`
    > **<:Pinglogo:1121150015281316001> Ping Api** : \`${APIping}\`

    ➞ **__Information sur le Bot__**
    > **<:7088earlyverifiedbotdeveloperPho:1115637831000408176> Proprietaire** : <@1092138769139912796>
    > **<:7871discordstaffPhotoRoom:1115637853444120606>Developer** : <@1092138769139912796>
    > **<:9142discordverifiedbot1fromvega:1116973828564852827><:3099discordverifiedbot2fromvega:1116973842271842324>  Nom du Bot** : \`${interaction.client.user.tag}\`
    > **<:discotoolsxyzicon29:1121152151452917760> ID** : \`${interaction.client.user.id}\`
    > **<:discotoolsxyzicon30:1121319515150626887> Nombre de Serveur** : \`${interaction.client.guilds.cache.size}\`
    > **<:discotoolsxyzicon31:1121319696441036930> Nombre de Membre: ** \`${await interaction.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}\`
    > **<:discotoolsxyzicon32:1121319887881637972> Commandes** : \`31\`
    
    `)
            .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic: true }))
            .setColor('#00FFFF')
            .setImage("https://cdn.discordapp.com/attachments/1092091901747929229/1119689291572986017/Copie_de_up_1.jpg")
            .setFooter({ text: "By XIFI" })

        await interaction.reply({ embeds: [EmbedUserInfo] })
      
     

    }
}


