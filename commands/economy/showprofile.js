const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const sqlite = require("sqlite3");

module.exports = class ShowProfileCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'showprofile',
            aliases: ["sprofile"],
            group: 'economy',
            memberName: 'showprofile',
            description: 'A Command To View Your Owned Profile Cards!',
            examples: ["sprofile"],
            argsType: "multiple",
            guildOnly: true,
        });
    }
    async run(message, args) {
        try {
            const db = new sqlite.Database("./database/profiles.db", err=>{
                if(err) console.log(err);
              });
            
              db.all(`SELECT * FROM profile WHERE userid = '${message.author.id}' ORDER BY pid ASC`, (err, row) => {
                if (err) {
                  console.log(err);
                  return;
                }
                if(row === undefined){
                  return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**You Are Not Registered Or Do Not Own Any Profile Cards!**").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
                } else{
                  var i;
                const pro = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setTitle("🎴 Your Profile Cards")
                .setFooter(message.guild.me.displayName)
                .setThumbnail(this.client.user.displayAvatarURL())
                .setColor(0xcf3aff)
                .setTimestamp()
                for(i=0;i<row.length;i++){
                  let rw = row[i];
                  pro.addField(`**\`#${i+1}\` ${rw.name} Profile Card**`, `**Profile ID - ${rw.pid}\nTo Set As Current Profile, Send \`${this.client.provider.get(message.guild.id, "prefix", this.client.commandPrefix)}cprofile ${rw.pid}\`**`)
                }
                  message.embed(pro)
              }
            });
            db.close();
        } catch (error) {
            console.log(error);
            message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
        }
    }
};

