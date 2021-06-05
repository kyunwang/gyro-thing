import React, { Component } from 'react';
import { Canvas } from '@react-three/fiber';

// Quick styling
const styles = {
	p: {
		position: 'absolute',
		left: 0,
		right: 0,
		zIndex: 1,
		fontWeight: 300,
		textAlign: 'center',
		letterSpacing: '.2rem',
		lineHeight: 1.3
	},
	pTitle: {
		top: '1rem',
	},
	pIntro: {
		top: '60%',
		padding: '0 30%'
	},
	aIntro: {
		color: '#5086EC'
	},
	span: {
		display: 'inline-block',
		fontWeight: 500,
		fontSize: '3.6rem',
		paddingTop: '.4rem'
	}
}

function Box({ rotation }) {
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
};

function Plane({position}) {
	return (
		<mesh position={position} receiveShadow>
			<planeBufferGeometry attach="geometry" args={[1000, 1000]} />
			<meshPhongMaterial attach="material" color="#272727" />
		</mesh>)
}

const Viewer = ({connectionID, orientation: {alpha, beta, gamma}}) => {
	const rotation = [beta, gamma, alpha];

	return (
		<>
			<p style={{...styles.p, ...styles.pTitle}}>
				your code<br/>
				<span style={styles.span}>{connectionID}</span>
			</p>
			<p style={{...styles.p, ...styles.pIntro}}>Go here on yout phone:  <a style={styles.aIntro} href={window.location.href}>{window.location.href}</a></p>
			
			<Canvas camera={{ position: [0, 0, 15] }}>
				<ambientLight intensity={0.8} />
				<spotLight intensity={0.9} position={[30, 30, 50]} angle={0.4} penumbra={1} castShadow />
				<Plane position={[0, 0, -20]}/>
				<Box rotation={rotation} />
			</Canvas>
		</>
	);
}

export default Viewer;