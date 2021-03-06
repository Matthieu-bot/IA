const Command = require("../structure/Command");
const { getQueue } = require("../utils/playerManager");

module.exports = class Leave extends Command {
	constructor() {
		super({
			name: "leave",
			category: "music",
			aliases: ["disconnect"],
			description: "The command disconnects the bot from a voice channel.",
			usage: "{{prefix}}join",
			cooldown: 0
		});
	}

	run(client, message, _args) {
		if(!message.member.voice.channel) return message.channel.send("⚠ You must be connected in a voice channel!");
		if(!message.member.voice.channel.joinable || !message.member.voice.channel.speakable) return message.channel.send("⚠ I don't have the `join permission` or `speak permission` in this channel!");

		const player = client.manager.players.get(message.guild.id);
		if(!player) return message.channel.send("⚠ I'm not connected in a voice channel!");

		let queue = getQueue(client.config.LAVALINK.QUEUES, message.guild.id);
		if (queue.length > 0) queue.splice(0, queue.length);

		try {
			client.manager.leave(message.guild.id);
			return message.channel.send("✅ I successfully left the voice channel!");
		} catch (exception) {
			console.error(exception);
			return message.channel.send("❌ An error has occurred!");
		}
	}
};