const Discord = require("discord.js")

module.exports = async (bot, message) => {

    let db = bot.db;
    if (message.author.bot || message.channel.type === Discord.ChannelType.DM) return;
     
    db.query(`SELECT * FROM serveur WHERE guild = '${message.guild.id}'`, async (err, req) => {
        if(req.length < 1) {
       db.query(`INSERT INTO serveur (guild, ticketCategory, antispam) VALUES (${message.guildId}, 'false', 'false') `)
        }
          if(req[0].antispam === 'true') {

           await bot.function.searchSpam(message)
        } else {
            return;
        }
   
    })

    db.query(`SELECT * FROM serveur WHERE guild = '${message.guildId}'`, async(err, req) => {
        if(req.length < 1) {
            db.query(`INSERT INTO serveur (guild, ticketCategory, antispam) VALUES ('${message.guildId}', 'aucun', 'off')`)
        } else {
            return;
        }
    })

    db.query(`SELECT * FROM  xp  WHERE guildID ="${message.guildId}" AND user  = '${message.author.id}'`, async (err, req) => {

        if (req.length < 1) {


            db.query(`INSERT INTO xp (guildID, user, xp, level) VALUES (${message.guildId}, '${message.author.id}', '0', '0')`)

        } else {



            let level = parseInt(req[0].level)

            let xp = parseInt(req[0].xp)

            if ((level + 1) * 1000 <= xp) {

                db.query(`UPDATE xp SET xp = '${((level + 1) * 1000)}'WHERE guildID = '${message.guildId}' AND user = '${message.author.id}'`)
                db.query(`UPDATE xp SET level = '${level + 1}'WHERE guildID = '${message.guildId}' AND user = '${message.author.id}'`)
                await message.channel.send(`${message.author}, est passe niveaux ${level + 1}, felecitations !`)


            } else {

                let xptogive = Math.floor(Math.random() * 25) + 1;
                db.query(`UPDATE xp SET xp = '${xp + xptogive}'WHERE guildID = '${message.guildId}' AND user = '${message.author.id}'`)
            }

        }})

    const { Configuration, OpenAIApi } = require("openai");
    const channel = require("channel")
    const configuration = new Configuration({
        apiKey: `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`,
    });
    const openai = new OpenAIApi(configuration)


    if (bot.gptChannels.includes(message.channel.id)) {
        if (message.author.bot) return;

        try {
            await message.channel.sendTyping();

            let prevMessages = await message.channel.messages.fetch({ limit: 25 });
            prevMessages.sort((a, b) => a - b);

            let conversationLog = '';

            prevMessages.forEach((msg) => {


                conversationLog += `\n${msg.author.username}: ${msg.content}`;
            })

            const result = await openai.createCompletion({
                model: 'text-davinci-003',
                prompt: `${bot.user.username} is a friendly chatbot.
                
                ${bot.user.username}: Hello; how can I help you ?
                ${conversationLog}
                ${bot.user.username}: 
                `,
                temperature: 0.9,
                max_tokens: 1000,
            });

            message.reply({ content: result.data.choices[0].text });
        } catch (error) {
            console.log(`There was an error : ${error}`)
            message.reply({ content: `\`${error}\``, ephemeral: true })
        }
    }

       
}

