'use strict';

const dotenv = require('dotenv');
const Discord = require('discord.js');
const client = new Discord.Client();

dotenv.config();

client.on('voiceStateUpdate', async (oldState, newState) => {
	let username = newState.member.displayName;

	if (newState.channel === undefined) return;
	if (oldState.channel && oldState.channel.name !== 'AFK') return;
	if (newState.channel && newState.channel.name === 'AFK') return;
	if (username === 'Detector de Viadão') return;

	newState.member.voice.channel
		.join()
		.then((connection) => playSoundByUser(username, connection, newState));
});

function playSoundByUser(username, connection, newState) {
	if (!username) return;

	let dispatcher;

	if (username === 'João V.') {
		dispatcher = connection.play('./joao.mp3', {
			volume: 1.0,
		});
	} else if (username === 'Gab') {
		dispatcher = connection.play('./ganso.mp3', {
			volume: 1.0,
		});
	} else {
		dispatcher = connection.play('./sound.mp3', {
			volume: 1.0,
		});
	}

	dispatcher.on('finish', () => {
		// Remove o bot da sala
		dispatcher.destroy();
		newState.member.voice.channel.leave();
	});
}

client.login(process.env.TOKEN);
