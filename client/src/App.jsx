import './App.css'
import React, { Component, useState, useEffect } from 'react';

import Viewer from './screens/Viewer';
import Controller from './screens/Controller';

import { initSockets, readySocketData, parseJSON } from './helpers/socket';
import { detectMobile } from './helpers/detectMobile.js';

const App = () => {
	const [isMobile, setIsMobile] = useState(detectMobile())
	const [orientation, setOrientation] = useState({alpha: null, beta: null, gamma: null,})
	const [wsClient, setWsClient] = useState(null)
	const [connectionID, setConnectionID] = useState(null)


	const handleSockets = (data) => {
		// console.log(parseJSON(data.data));
		const parsedData = parseJSON(data.data);
		switch(parsedData.type) {
			case 'register-client':
			case 'result-client-check':;
				setConnectionID(parsedData.data)
				break;
			case 'receive-orientation': 
			console.log('receiving');
				setOrientation(parsedData.data.orientation)
				break;
			default: 
				break;
		}
	}

	const handleDeviceOrientation = (orientation) => {
		const { alpha, beta, gamma } = orientation;

		if (!connectionID) return; // TODO: show a feedback

		// console.log(alpha, beta, gamma);
		if (wsClient.readyState === WebSocket.OPEN) {
			const orientation = {
				client: connectionID,
				orientation: {
					alpha: (alpha + 180) / 20,
					beta: beta / 20,
					gamma: -gamma / 20
				}
			};
			
			const data = readySocketData('send-orientation', orientation);

			wsClient.send(data);
		}
	}
	
	const handleSubmitCode = (connectionID) => {
		if (connectionID >= 10000 && connectionID <= 99999) {
			// this.setState({ connectionID });

			const data = readySocketData('check-client', connectionID);
			wsClient.send(data);
		}
	}

	useEffect(() => {
		// console.log(location);
		// const url = 'ws://localhost:8080';
		// const url = 'wss://127.0.0.1:8080';
		const url = `wss://${location.hostname}:8080`;
		
		const wsClient = initSockets({url, callback: handleSockets});
		
		// Add support shizzle feedback - when using non supporting device

		if (window.DeviceOrientationEvent && isMobile) {
			window.addEventListener('deviceorientation', handleDeviceOrientation, false);
			// this.setState({wsClient, whatVersion: 'Mobile'})
		} else {
			// this.setState({wsClient, whatVersion: 'Viewer'})
		}

		setWsClient(wsClient)

		return () => {
			window.removeEventListener('deviceorientation', handleDeviceOrientation)
		}
	}, [])


	return (
		<div className="main">
			{
				isMobile
					? <Controller onSubmit={handleSubmitCode} connectionID={connectionID} />
					: <Viewer orientation={orientation} connectionID={connectionID} />
			}
			<footer>
				Made on a 🛋 by <a href="https://github.com/kyunwang">kyunwang</a>. Repo <a href="https://github.com/kyunwang/gyro-thing">here</a>
		</footer>
		</div>
	);
}

export default App;
