import { Perf } from 'r3f-perf'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Loader, FlyControls } from '@react-three/drei'
import * as easing from 'maath/easing'

import { Suspense } from 'react'

import Model from './Model'
import Lights from './Lights'
import FollowLight from './FollowLight'

function Rig() {
	useFrame((state, delta) => {
		easing.damp3(
			state.camera.position,
			[Math.sin(-state.pointer.x), state.pointer.y, 50 + Math.cos(state.pointer.x)],
			0.2,
			delta
		)
		state.camera.lookAt(0, 0, 0)
	})
}

export default function Scene() {
	return (
		<>
			<Canvas shadows camera={{ fov: 10, position: [0, -1.5, 50] }}>
				<Suspense fallback={null}>
					<Model />
					{/* <OrbitControls makeDefault /> */}
					<Lights />
					<FollowLight />
					{/* <Perf /> */}
					<Rig />
				</Suspense>
			</Canvas>
			{/* <Loader /> */}
		</>
	)
}
