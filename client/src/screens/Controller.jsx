
// controller should be able to set an id / viewer id

import React, {useState} from 'react';
import PropTypes from 'prop-types';

// Yup another repeat
const styles = {
	p: {
		fontWeight: 300,
		fontSize: '1.2rem',
		letterSpacing: '.2rem',
		lineHeight: 1.3
	},
	input: {
		border: 'none',
		borderBottom: '2px solid rgba(255, 255, 255, .6)',
		fontSize: '3.2rem',
		color: '#fff',
		backgroundColor: 'transparent',
		width: '100%',
		maxWidth: '24rem'
	},
	button: {
		display: 'block',
		letterSpacing: '.2rem',
		color: '#fff',
		backgroundColor: 'transparent',
		width: '100%',
		maxWidth: '24rem',
		marginTop: '1.2rem',
		padding: '.8rem',
		border: '2px solid #fff',
	},
	pre: {
		fontSize: '3.6rem',
		textAlign: 'center'
	}
}

const Controller = ({connectionID, onSubmit}) => {
	const [viewCode, setViewCode] = useState(null);

	const handleSetCode = e => {
		const value = e.target.value;
		if (value <= 99999)	setViewCode(value)
		
	}

	const handleOnSubmit = (e) => {	
		onSubmit(viewCode);
		e.preventDefault();
	}

	if (connectionID) {
		return (
			<div>
				<p style={styles.p}>Yay, you are connected to <pre style={styles.pre}>{connectionID}</pre></p>
				<p style={styles.p}>Have fun rotating a box 🤷🏻‍♂️</p>
			</div>
		)
	}

	return (
		<>
			<p style={styles.p} >Enter the code to control the cube</p>
			<form onSubmit={handleOnSubmit}>
					<input style={styles.input} type="number" placeholder="e.g. 61511" value={viewCode} onChange={handleSetCode} ></input>
					<button style={styles.button} onClick={handleOnSubmit}>CONNECT</button>
			</form>
		</>
	);
}

Controller.propTypes = {};
Controller.defaultProps = {};

export default Controller;