import { useRef } from 'react'

import { EffectComposer } from '@react-three/postprocessing'
import { useHelper } from '@react-three/drei'
import { PointLightHelper, SpotLightHelper } from 'three'
import * as THREE from 'three'

import { state } from '../../utils/store'
import { snapshot } from 'valtio'
import { InvertColorsEffect } from './shader/ShaderPost'

export default function Lights() {
	const snap = snapshot(state)

	const pointLightRef1 = useRef()
	const pointLightRef2 = useRef()
	const spotLightRef1 = useRef()
	const spotLightRef2 = useRef()
	const spotLightRef3 = useRef()

	useHelper(snap.debug && pointLightRef1, PointLightHelper, 1, 'green')
	useHelper(snap.debug && pointLightRef2, PointLightHelper, 1, 'green')
	useHelper(snap.debug && spotLightRef1, SpotLightHelper, 'cyan')
	useHelper(snap.debug && spotLightRef2, SpotLightHelper, 'red')
	useHelper(snap.debug && spotLightRef3, SpotLightHelper, 'blue')

	const target1 = new THREE.Object3D()
	target1.position.set(-7, 0, 0)

	const target2 = new THREE.Object3D()
	target2.position.set(-5, 0, 0)

	return (
		<>
			<ambientLight intensity={2} color={'#cad4de'} />
			<pointLight ref={pointLightRef1} castShadow position={[0, 3, 3]} intensity={50} />
			<pointLight ref={pointLightRef2} castShadow position={[3, -2, 2]} intensity={50} />
			{/* CYAN */}

			<spotLight
				ref={spotLightRef1}
				castShadow
				position={[-4, 0, 4]}
				intensity={50}
				color={'white'}
				distance={75}
				angle={Math.PI / 6}
				penumbra={0.5}
			/>
			<spotLight
				ref={spotLightRef2}
				castShadow
				position={[-14, 0, 40]}
				intensity={250}
				color={'white'}
				distance={75}
				angle={Math.PI / 6}
				penumbra={0.5}
				target={target1}
			/>
			<spotLight
				ref={spotLightRef3}
				castShadow
				position={[0, 5, 0]}
				intensity={25}
				color={'white'}
				distance={75}
				angle={Math.PI / 6}
				penumbra={0.5}
			/>

			{/* <EffectComposer>
				<InvertColorsEffect />
			</EffectComposer> */}
		</>
	)
}
