'use strict'

const dotenv = require('dotenv');
const Discord = require('discord.js');
const client = new Discord.Client();

dotenv.config();

client.on('voiceStateUpdate', (_, newState) => {
	let username = newState.member.displayName;
	console.log(username);

	// TODO: Entrar com o bot no canal.
	// TODO: Fazer o bot entrar no canal e rodar uma mensagem gravada.
	// TODO: Fazer o bot sair do canal.
});

client.login(process.env.TOKEN);
