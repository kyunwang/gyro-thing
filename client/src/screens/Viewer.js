import React, { Component } from 'react';
import { Canvas } from 'react-three-fiber'

function Thing({ rotation }) {
  return (
    <mesh
			visible
			userData={{ test: "hello" }} 
			position={[0, 0, 0]}
			rotation={rotation}
		>
			<boxGeometry attach="geometry" args={[2, 2, 2]} />
			<meshStandardMaterial attach="material" color="indianred" transparent />
		</mesh>
  )
}
;
function Plane({position}) {
	return (
		<mesh position={position} receiveShadow>
			<planeBufferGeometry attach="geometry" args={[1000, 1000]} />
			<meshPhongMaterial attach="material" color="#272727" />
		</mesh>)
}

class Viewer extends Component {
	componentDidMount() {
	}

	componentDidUpdate() {

	}

	render() {
		const {connectionID, orientation: {alpha, beta, gamma}} = this.props;

		const rotation = [beta, gamma, alpha];

		return (
			<>
				<p>Go to <a href={window.location.href}>{window.location.href}</a> on your phone and enter: {connectionID}</p>
				<Canvas camera={{ position: [0, 0, 15] }}>
					<ambientLight intensity={0.8} />
					<spotLight intensity={0.9} position={[30, 30, 50]} angle={0.4} penumbra={1} castShadow />
					<Plane position={[0, 0, -20]}/>
					<Thing rotation={rotation} />
				</Canvas>
			</>
		);
	}
}

export default Viewer;