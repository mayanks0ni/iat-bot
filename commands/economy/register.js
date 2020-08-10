const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const sqlite = require("sqlite3");

module.exports = class RegisterCommand extends Command {
  constructor(bot) {
    super(bot, {
      name: 'register',
      group: 'economy',
      memberName: 'register',
      description: 'A Command To Register Your Account In The Database!',
      examples: ["register"],
      argsType: "multiple",
      guildOnly: true,
    });
  }
  async run(message, args) {
    try {
      const db = new sqlite.Database("./database/userdb1.db", err => console.log(err));

      const diamond = this.client.emojis.cache.get("706515264451117109");

      const loading = this.client.emojis.cache.get("719087451100151858");

      let pdb = new sqlite.Database("./database/profiles.db", err => console.log(err));

      db.get(`SELECT * FROM userdb WHERE userId = '${message.author.id}'`, async (err, row) => {
        if (err) throw err;
        let sql;
        if (row === undefined) {
          const loadingEmb = await message.embed(new Discord.MessageEmbed().setDescription(`**${loading} Please Wait...**`).setFooter(message.guild.me.displayName).setColor("ORANGE").setTimestamp());
          sql = `INSERT INTO userdb(userId, bal, bankbal, daily, premium, pnsfw, curpro) VALUES('${message.author.id}','500', '0', '', 'no', 'no', null)`
          db.all(sql, async err => console.log(err));
          db.get(`SELECT * FROM userdb WHERE userId = '${message.author.id}'`, (err, rows) => {
            if (err) throw err;
            setTimeout(async function () {
              const registered = new Discord.MessageEmbed()
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setTitle(":tada:You Have Been Registered:tada:")
                .addField("• Name", `**${message.author.tag}**`)
                .addField("• ID", `**${message.author.id}**`)
                .addField("• Balance", `**${rows.bal}${diamond}**`)
                .addField("• Bank Balance", `**${rows.bankbal}${diamond}**`)
                .setThumbnail(message.author.displayAvatarURL())
                .setFooter(message.guild.me.displayName)
                .setColor("GREEN")
                .setTimestamp()
              loadingEmb.edit(registered);
            }, 5000);
            if (err) throw err;
            pdb.all(`INSERT INTO profile(userid, name, link, pid) VALUES('${message.author.id}', 'Default', './assets/defaultprofile.png', 'P0')`, err => console.log(err));
          });
        }
        else {
          return message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setDescription("**You Are Already Registered!**").setFooter(message.guild.me.displayName).setColor(0xff0000).setTimestamp());
        }
      });
    } catch (error) {
      console.log(error);
      message.embed(new Discord.MessageEmbed().setAuthor(`${message.author.tag}`, message.author.displayAvatarURL()).setTitle("An Error Occured!").setDescription(`**Error: ${error}**`).setColor(0xff0000).setFooter(message.guild.me.displayName).setTimestamp());
    }
  }
};

