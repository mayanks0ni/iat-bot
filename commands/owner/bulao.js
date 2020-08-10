const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class BulaoCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'bulao',
            group: 'owner',
            memberName: 'bulao',
            description: 'Owner isse doosre ke server mein ghoomne jaata hai.',
            examples: ["bulao [Guild ID]"],
            guildOnly: true,
            ownerOnly: true,
            argsType: "multiple",        
        });
    }
    async run(message, args) {
        try {
            let id = args[0]
            if(!id) return;
            this.client.guilds.cache.get(id).fetchInvites().then(i => message.say(`**Invite Created By - ${i.first().inviter.tag}**\n${i.first().url}`)).catch(err => message.say(`\`\`\`${err}\`\`\``))
        } catch (error) {
            console.log(error);
            return message.embed(new Discord.MessageEmbed().setTitle("An Error Occured").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

