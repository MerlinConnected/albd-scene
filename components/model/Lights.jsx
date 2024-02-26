import { useRef } from 'react'

import { EffectComposer, N8AO, Noise } from '@react-three/postprocessing'
import { Environment, useHelper } from '@react-three/drei'
import { PointLightHelper, SpotLightHelper } from 'three'
import * as THREE from 'three'

import { state } from '../../utils/store'
import { snapshot } from 'valtio'

export default function Lights() {
	const snap = snapshot(state)

	const pointLightRef1 = useRef()
	const pointLightRef2 = useRef()
	const spotLightRef1 = useRef()
	const spotLightRef2 = useRef()
	const spotLightRef3 = useRef()
	const spotLightRef4 = useRef()
	const spotLightRef5 = useRef()
	const spotLightRef6 = useRef()

	useHelper(snap.debug && pointLightRef1, PointLightHelper, 1, 'green')
	useHelper(snap.debug && pointLightRef2, PointLightHelper, 1, 'green')
	useHelper(snap.debug && spotLightRef1, SpotLightHelper, 'cyan')
	useHelper(snap.debug && spotLightRef2, SpotLightHelper, 'red')
	useHelper(snap.debug && spotLightRef3, SpotLightHelper, 'blue')
	useHelper(snap.debug && spotLightRef4, SpotLightHelper, 'hotpink')
	useHelper(snap.debug && spotLightRef5, SpotLightHelper, 'purple')
	useHelper(snap.debug && spotLightRef6, SpotLightHelper, 'yellow')

	const target1 = new THREE.Object3D()
	target1.position.set(-7, 0, 0)

	const target2 = new THREE.Object3D()
	target2.position.set(-5, 0, 0)

	return (
		<>
			<pointLight ref={pointLightRef1} castShadow position={[0, 3, 3]} intensity={50} />
			<pointLight ref={pointLightRef2} castShadow position={[3, -2, 0]} intensity={50} />
			{/* CYAN */}
			<spotLight
				ref={spotLightRef1}
				castShadow
				position={[-4, 3, 2]}
				intensity={500}
				color={'white'}
				distance={12}
				angle={Math.PI / 6}
				penumbra={0.5}
			/>
			<spotLight
				ref={spotLightRef6}
				castShadow
				position={[-4, 3, -2]}
				intensity={500}
				color={'white'}
				distance={12}
				angle={Math.PI / 6}
				penumbra={0.5}
			/>
			{/* RED */}
			<spotLight
				ref={spotLightRef2}
				castShadow
				position={[-4.5, 3.25, 8.5]}
				intensity={500}
				color={'white'}
				distance={10}
				angle={Math.PI / 12}
				penumbra={0.5}
			/>
			{/* BLUE */}
			<spotLight
				ref={spotLightRef3}
				castShadow
				position={[-14, 0, 40]}
				intensity={500}
				color={'white'}
				distance={75}
				angle={Math.PI / 6}
				penumbra={0.5}
				target={target1}
			/>
			{/* HOTPINK */}
			<spotLight
				ref={spotLightRef4}
				castShadow
				position={[-9, 0.25, 5.5]}
				intensity={500}
				color={'white'}
				distance={75}
				angle={Math.PI / 6}
				penumbra={0.5}
				target={target2}
			/>
			{/* PURPLE */}
			<spotLight
				ref={spotLightRef5}
				castShadow
				position={[4.5, -3.25, -5]}
				intensity={500}
				color={'white'}
				distance={10}
				angle={Math.PI / 12}
				penumbra={0.5}
			/>

			{/* <EffectComposer disableNormalPass>
				{/* <N8AO color='#000' aoRadius={1} intensity={5} aoSamples={4} quality='performance' halfRes denoiseSamples={4} /> */}
			{/* <Noise opacity={0.05} /> */}
			{/* </EffectComposer>  */}
		</>
	)
}
