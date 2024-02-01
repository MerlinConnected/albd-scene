import React, { useRef, useMemo, useState } from 'react'
import { useGLTF, Float } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

import { fragmentShader } from './shader/fragment'
import { vertexShader } from './shader/vertex'

import * as THREE from 'three'

export default function Model(props) {
	const { nodes } = useGLTF('/ALBD_PREP_SCENE.glb')

	const [targetPosition, setTargetPosition] = useState(new THREE.Vector3(-4.211, -2.423, -0.588))
	const [targetRotation, setTargetRotation] = useState(new THREE.Vector3(0, -0, 0))
	const chairMesh = useRef()

	const ref = useRef()
	const mesh = useRef()

	useFrame(() => {
		if (ref.current) {
			ref.current.rotation.x += 0.001
			ref.current.rotation.y += 0.001
		}

		if (chairMesh.current) {
			chairMesh.current.position.lerp(targetPosition, 0.1)
			chairMesh.current.rotation.x = THREE.MathUtils.lerp(chairMesh.current.rotation.x, targetRotation.x, 0.1)
			chairMesh.current.rotation.y = THREE.MathUtils.lerp(chairMesh.current.rotation.y, targetRotation.y, 0.1)
			chairMesh.current.rotation.z = THREE.MathUtils.lerp(chairMesh.current.rotation.z, targetRotation.z, 0.1)
		}
	})

	const uniforms = useMemo(
		() => ({
			u_rotated_scale: { value: 0.006 },
			u_primary_scale: { value: 0.003 },
			u_rot_left_divisor: { value: -109.0 },
			u_rot_right_divisor: { value: 49.0 },
			iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
			iTime: { value: 0 }
		}),
		[]
	)

	useFrame(({ clock }) => {
		uniforms.iTime.value = clock.getElapsedTime()
	})

	return (
		<group {...props} dispose={null}>
			<mesh
				ref={mesh}
				castShadow
				receiveShadow
				geometry={nodes.backwall.geometry}
				position={[2.705, -0.762, -5.715]}
				scale={10}
			>
				<shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
			</mesh>
			<mesh castShadow receiveShadow geometry={nodes.props.geometry} position={[2.705, -0.762, -5.715]}>
				<meshPhysicalMaterial color={'#000000'} />
			</mesh>
			<Float rotationIntensity={2} floatIntensity={5} floatingRange={[0, 0.2]}>
				<mesh ref={ref} castShadow receiveShadow geometry={nodes.sphere.geometry} position={[-0.113, -0.152, 0.03]}>
					<meshPhysicalMaterial color={'#010101'} />
				</mesh>
			</Float>
			<mesh
				ref={chairMesh}
				onPointerOver={(event) => {
					event.stopPropagation()
					setTargetPosition(new THREE.Vector3(-4.5, -1.5, -0.588))
					setTargetRotation(new THREE.Vector3(0, -Math.PI / 8, Math.PI / 16))
				}}
				onPointerOut={(event) => {
					setTargetRotation(new THREE.Vector3(0, 0, 0))
					setTargetPosition(new THREE.Vector3(-4.211, -2.423, -0.588))
				}}
				castShadow
				receiveShadow
				geometry={nodes.chair.geometry}
				position={[-4.211, -2.423, -0.588]}
			>
				<meshPhysicalMaterial color={'#000000'} />
			</mesh>
		</group>
	)
}

useGLTF.preload('/ALBD_PREP_SCENE.glb')
