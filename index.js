'use strict';

const dotenv = require('dotenv');
const Discord = require('discord.js');
const client = new Discord.Client();

var express = require('express');
var app     = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
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
});
