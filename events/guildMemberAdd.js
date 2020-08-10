const Discord = require("discord.js");
const sqlite = require("sqlite3");
const Canvas = require("canvas");
const fs = require("fs");

module.exports = (bot, member) => {
    const cg = new sqlite.Database("./database/config.db", err => console.log(err));
    cg.get(`SELECT * FROM config WHERE guildid = '${member.guild.id}' AND type = "welcome"`, async (err, row) => {
		if (row === undefined) return;
		const canvas = Canvas.createCanvas(700, 250);
		const ctx = canvas.getContext('2d');


		const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/564520348821749766/689123263464341680/welcome-image.png');

		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

		ctx.strokeStyle = '#74037b';
		ctx.strokeRect(0, 0, canvas.width, canvas.height);


		ctx.font = '28px Segoe Print';
		ctx.fillStyle = '#ffffff';
		ctx.fillText('Welcome To The Server,', canvas.width / 2.5, canvas.height / 3.5);



		ctx.fillStyle = '#ffffff';
		ctx.fillText(`${member.displayName}! \nYou Are The \n${member.guild.memberCount} Member!`, canvas.width / 2.5, canvas.height / 1.8);

		ctx.beginPath();
		ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.clip();

		const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }));
		ctx.drawImage(avatar, 25, 25, 200, 200);
		fs.writeFileSync("./assets/welcome.png", canvas.toBuffer());
		let emb = new Discord.MessageEmbed()
			.setDescription(`**<@${member.id}> Welcome To ${member.guild.name}!\nHope You Enjoy Your Stay Here!**`)
			.attachFiles(['./assets/welcome.png'])
			.setImage('attachment://welcome.png')
			.setFooter(member.guild.me.displayName)
			.setColor("YELLOW")
			.setTimestamp()
		bot.channels.cache.find(c => c.id == row.channel).send(`**<@${member.id}>  Welcome To The Server! :tada:**`, emb);
	});
  };