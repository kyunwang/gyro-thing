const fs = require('fs');
const https = require('https');
const express = require('express');
const WebSocket = require('ws');
const { detectMobile, parseJSON, readySocketData } = require('./helpers');

var app = express()

const server = https.createServer({
	cert: fs.readFileSync('./server.cert'),
	key: fs.readFileSync('./server.key')
}, app);

const wss = new WebSocket.Server({ server, host: '172.21.88.154' });

// Maintaining clients in this object
const clients = {};

// This code generates unique userid for everyuser.
// const getUniqueID = () => {
// 	const s4 = () =>
// 		Math.floor((1 + Math.random()) * 0x10000)
// 			.toString(16)
// 			.substring(1);
// 	return s4() + s4() + '-' + s4();
// };

function getUniqueID() {
	return Math.floor(Math.random() * 90000 + 10000);
}

app.get('/', function (req, res) {
	res.send('hello world')
  })


wss.on('connection', (ws, req) => {
	const ip = req.socket.remoteAddress;
	console.log(ip);
	const isMobile = detectMobile(req.headers['user-agent'].toLowerCase());

	const userID = getUniqueID();

	if (!isMobile) {
		// Add to clients on connection & send to register on client
		const data = readySocketData('register-client', userID);
		clients[userID] = ws;
		ws.send(data);
	}

	ws.on('message', message => {
		const data = parseJSON(message);
		handleSocketMessages(ws, data);
	});

	// Delete client/viewer on exit
	ws.on('close', stuff => {
		if (!isMobile && clients[userID]) {
			delete clients[userID];
		}
	});
});

function handleSocketMessages(ws, message) {
	switch (message.type) {
		case 'on-connect':
			console.log('just connected');
			break;
		case 'send-orientation':
			const client = clients[message.data.client];

			// Client doesn't exist
			if (!client) return;

			const stringifiedData = readySocketData(
				'receive-orientation',
				message.data
			);

			client.send(stringifiedData);
			break;
		case 'check-client':
			const isExisting = !!clients[message.data];
			let data = isExisting;
			if (isExisting) {
				data = message.data;
			}

			const checkData = readySocketData('result-client-check', data);
			ws.send(checkData);
			break;
		default:
			break;
	}
}

//////
// All client events - server onmessage
//////
// on-connect
// send-orientation
// check-client
//
//
//////
//	All server events - client onmessage
//////
// register-client
// receive-orientation
// result-client-check

server.listen(8080);