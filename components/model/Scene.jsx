import { Canvas } from '@react-three/fiber'
import { OrbitControls, Loader, FlyControls } from '@react-three/drei'

import { Suspense } from 'react'

import Model from './Model'
import Lights from './Lights'
import Sphere from './Sphere'

export default function Scene() {
	return (
		<>
			<Canvas shadows camera={{ fov: 10, position: [0, -1.5, 50] }}>
				<Suspense fallback={null}>
					<Model />
					<Sphere />
					<OrbitControls makeDefault />
					{/* <FlyControls /> */}
					<Lights />
				</Suspense>
			</Canvas>
			{/* <Loader /> */}
		</>
	)
}
