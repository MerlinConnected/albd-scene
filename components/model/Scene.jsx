import * as THREE from 'three'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useRef, useState, useEffect } from 'react'
import { OrbitControls } from '@react-three/drei'
import * as easing from 'maath/easing'
import { useControls } from 'leva'

import CursorLight from './CursorLight'
import Lights from './Lights'
import Model from './Model'

import { state } from '../../utils/store'
import { useSnapshot } from 'valtio'

import { Perf } from 'r3f-perf'

function Rig() {
	const { camera } = useThree()
	const initialPosition = useRef(new THREE.Vector3(0, -1.5, 75))
	const finalPosition = useRef(new THREE.Vector3(0, 0, 50))
	const [hasAnimated, setHasAnimated] = useState(false)

	const empty = new THREE.Object3D()

	useFrame((state) => {
		if (!hasAnimated) {
			camera.position.lerp(initialPosition.current.lerp(finalPosition.current, 0.05), 0.1)

			camera.lookAt(0, 0, 0)
			// Check if the camera is close to the final position
			if (camera.position.distanceTo(finalPosition.current) < 0.1) {
				setHasAnimated(true)
			}
		} else {
			easing.damp3(
				state.camera.position,
				[Math.sin(-state.pointer.x), state.pointer.y, 50 + Math.cos(state.pointer.x)],
				0.2
			)
			state.camera.lookAt(0, 0, 0)
		}
	})
}

export default function Scene() {
	const snap = useSnapshot(state)
	const { debug } = useControls({ debug: false })

	state.debug = debug
	return (
		<>
			<Canvas
				shadows
				onCreated={({ gl }) => {
					gl.toneMapping = THREE.ACESFilmicToneMapping
				}}
				dpr={(0.5, 1)}
				camera={{ fov: 10, position: [0, -1.5, 75] }}
			>
				<Suspense fallback={null}>
					<Model />
					<Lights />
					<CursorLight />
					{snap.debug ? (
						<>
							<OrbitControls />
							<Perf position='bottom-left' minimal />
						</>
					) : (
						<Rig />
					)}
				</Suspense>
			</Canvas>
		</>
	)
}
