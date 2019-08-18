
// controller should be able to set an id / viewer id

import React, {useState} from 'react';
import PropTypes from 'prop-types';

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
				<p>Yay, you are connected to <pre>{connectionID}</pre></p>
				<p>Have fun rotating a box I guess 🤷🏻‍♂️</p>
			</div>
		)
	}

	return (
		<>
			<p>Enter the code to control the cube</p>
			<input type="number" placeholder="e.g. 61511" value={viewCode} onChange={handleSetCode} ></input>
			<button onClick={handleOnSubmit}>CONNECT</button>
		</>
	);
}

Controller.propTypes = {};
Controller.defaultProps = {};

export default Controller;