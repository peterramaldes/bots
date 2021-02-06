'use strict';

const dotenv = require('dotenv');
const Discord = require('discord.js');
const client = new Discord.Client();

dotenv.config();

client.on('voiceStateUpdate', async (oldState, newState) => {
	let username = newState.member.displayName;
	let connection;

	if (newState.channel === undefined) return
	if (oldState.channel && oldState.channel.name !== 'AFK') return
	if (newState.channel && newState.channel.name === 'AFK') return 
	if (username === 'Detector de Viadão') return

	connection = await newState.member.voice.channel.join();

	if (connection) {
		let dispatcher = connection.play('./sound.mp3', {
			volume: 1.0
		});
		dispatcher.on('finish', () => {
			// Remove o bot da sala
			newState.member.voice.channel.leave();
			dispatcher.destroy();
		});
	}
});

client.login(process.env.TOKEN);
