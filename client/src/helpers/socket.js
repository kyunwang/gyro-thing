
export function initSockets({url, config = {}, callback}) {
	const wsClient = new WebSocket(url);
	
	wsClient.onopen = () => {
		const data = readySocketData('on-connect', 'connected')
		wsClient.send(data);
		console.log('WebSocket Client Connected');
	};
	
	wsClient.onerror = error => {
		console.log(`WebSocket error: ${error}`, error);
	};
	
	wsClient.onmessage = data => callback(data);
	
	return wsClient;
}

// Subscribing like this doesn't seem to work well with ws package - does better with socket.io
export function subscribeToMessage(socket, callback) {
	socket.onmessage = data => callback(data);
}

export function parseJSON(data) {
	return JSON.parse(data);
}

export function stringifyJSON(data) {
	return JSON.stringify(data);
}

export function readySocketData(type, data) {
	const readyData = { type, data };
	
	const stringifiedData = JSON.stringify(readyData);
	return stringifiedData;
}