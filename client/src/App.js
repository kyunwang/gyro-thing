import './App.css'
import React, { Component } from 'react';

import Viewer from './screens/Viewer';
import Controller from './screens/Controller';

import { initSockets, readySocketData, parseJSON } from './helpers/socket';
import { detectMobile } from './helpers/detectMobile.js';


class App extends Component {
	state = {
		isMobile: detectMobile(),
		// whatVersion: null,
		orientation: {alpha: null, beta: null, gamma: null,},
		wsClient: null,
		connectionID: null
	}

	componentDidMount() {
		const { isMobile } = this.state;
		const url = 'ws://192.168.1.8:8080';
		
		const wsClient = initSockets({url, callback: this.handleSockets});
		
		// Add support shizzle feedback - when using non supporting device

		if (window.DeviceOrientationEvent && isMobile) {
			window.addEventListener('deviceorientation', this.handleDeviceOrientation, false);
			// this.setState({wsClient, whatVersion: 'Mobile'})
		} else {
			// this.setState({wsClient, whatVersion: 'Viewer'})
		}

		this.setState({wsClient});
	}

	componentWillUnmount() {
		window.removeEventListener('deviceorientation', this.handleDeviceOrientation)
	}



	//for desktop/larger screens / viewer
	handleSockets = (data) => {
		// console.log(parseJSON(data.data));
		const parsedData = parseJSON(data.data);
		switch(parsedData.type) {
			case 'register-client':
			case 'result-client-check':;
				this.setState({connectionID: parsedData.data});
				break;
			case 'receive-orientation': 
				this.setState({orientation: parsedData.data.orientation});
				break;
			default: 
				break;
		}
	}

	// for mobile/controller
	handleDeviceOrientation = (orientation) => {
		const { wsClient, connectionID } = this.state;
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


	handleSubmitCode = (connectionID) => {
		const { wsClient } = this.state;
		if (connectionID >= 10000 && connectionID <= 99999) {
			// this.setState({ connectionID });

			const data = readySocketData('check-client', connectionID);
			wsClient.send(data);
		}
	}

	render() {
		const { connectionID, orientation, isMobile } = this.state;

		return (
			<div className="main">
				{
					isMobile
						? <Controller onSubmit={this.handleSubmitCode} connectionID={connectionID} />
						: <Viewer orientation={orientation} connectionID={connectionID} />
				}
				<footer>
					Made on a 🛋 by <a href="https://github.com/kyunwang">kyunwang</a>. Repo <a href="https://github.com/kyunwang/gyro-thing">here</a>
			</footer>
			</div>
		);
	}
}

export default App;
