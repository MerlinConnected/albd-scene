import { useRef } from 'react'

import { useHelper } from '@react-three/drei'
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
	const spotLightRef7 = useRef()
	const spotLightRef8 = useRef()
	const spotLightRef9 = useRef()
	const spotLightRef10 = useRef()

	useHelper(snap.debug && pointLightRef1, PointLightHelper, 1, 'green')
	useHelper(snap.debug && pointLightRef2, PointLightHelper, 1, 'green')

	useHelper(snap.debug && spotLightRef1, SpotLightHelper, 'cyan')
	useHelper(snap.debug && spotLightRef2, SpotLightHelper, 'red')
	useHelper(snap.debug && spotLightRef3, SpotLightHelper, 'blue')
	useHelper(snap.debug && spotLightRef4, SpotLightHelper, 'purple')
	useHelper(snap.debug && spotLightRef5, SpotLightHelper, 'yellow')
	useHelper(snap.debug && spotLightRef6, SpotLightHelper, 'yellow')
	useHelper(snap.debug && spotLightRef7, SpotLightHelper, 'red')
	useHelper(snap.debug && spotLightRef8, SpotLightHelper, 'blue')
	useHelper(snap.debug && spotLightRef9, SpotLightHelper, 'hotpink')
	useHelper(snap.debug && spotLightRef10, SpotLightHelper, 'purple')

	const target1 = new THREE.Object3D()
	target1.position.set(-7, 0, 0)

	const target2 = new THREE.Object3D()
	target2.position.set(-5, 0, 0)

	return (
		<>
			<ambientLight intensity={2} color={'#cad4de'} />
			<pointLight ref={pointLightRef1} castShadow position={[0, 3, 3]} intensity={25} />
			<pointLight ref={pointLightRef2} castShadow position={[3, -2, 2]} intensity={5} />
			{/* CYAN */}

			<spotLight
				ref={spotLightRef1}
				castShadow
				position={[-4, 0, 4]}
				intensity={50}
				color={'white'}
				distance={15}
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
				intensity={250}
				color={'white'}
				distance={10}
				angle={Math.PI / 4}
				penumbra={0.5}
			/>
			<spotLight
				ref={spotLightRef4}
				castShadow
				position={[0, 2, -3]}
				intensity={250}
				color={'white'}
				distance={10}
				angle={Math.PI / 3}
				penumbra={0.5}
			/>

			<spotLight
				ref={spotLightRef5}
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
				ref={spotLightRef7}
				castShadow
				position={[-4.5, 3.25, 8.5]}
				intensity={2500}
				color={'white'}
				distance={10}
				angle={Math.PI / 12}
				penumbra={0.5}
			/>
			{/* HOTPINK */}
			<spotLight
				ref={spotLightRef9}
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
				ref={spotLightRef10}
				castShadow
				position={[4.5, -3.25, -5]}
				intensity={5500}
				color={'white'}
				distance={10}
				angle={Math.PI / 12}
				penumbra={0.5}
			/>

			{/* <EffectComposer>
				<InvertColorsEffect />
			</EffectComposer> */}
		</>
	)
}
