import React, { useRef, useMemo, useState } from 'react'
import { useGLTF, Float } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

import fragmentShader from './shader/fragment.glsl?raw'
import vertexShader from './shader/vertex.glsl?raw'

import Sphere from './Sphere'

import * as THREE from 'three'

import { state } from '../../utils/store'
import { useSnapshot } from 'valtio'
import { useEffect } from 'react'

export default function Model(props) {
	const { nodes } = useGLTF('/ALBD_PREP_SCENE.glb')

	const snap = useSnapshot(state)

	const chairRef = useRef()
	const updRef = useRef()
	const lpdRef = useRef()

	const mesh = useRef()

	const mousePosition = useRef(new THREE.Vector2(0, 0))
	const targetMousePosition = useRef(new THREE.Vector2(0, 0))

	const handleMouseMove = (event) => {
		const x = (event.clientX / window.innerWidth) * 2 - 1
		const y = -(event.clientY / window.innerHeight) * 2 + 1
		targetMousePosition.current.set(x, y)
	}

	useEffect(() => {
		window.addEventListener('mousemove', handleMouseMove)
		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
		}
	}, [])

	useFrame(() => {
		const targetChairRotation = snap.hover ? [0, -Math.PI / 8, Math.PI / 16] : [0, 0, 0]
		const targetChairPosition = snap.hover ? [-4.211, -1.5, -0.588] : [-4.211, -2.423, -0.588]

		if (chairRef.current) {
			chairRef.current.rotation.x = THREE.MathUtils.lerp(chairRef.current.rotation.x, targetChairRotation[0], 0.1)
			chairRef.current.rotation.y = THREE.MathUtils.lerp(chairRef.current.rotation.y, targetChairRotation[1], 0.1)
			chairRef.current.rotation.z = THREE.MathUtils.lerp(chairRef.current.rotation.z, targetChairRotation[2], 0.1)

			chairRef.current.position.x = THREE.MathUtils.lerp(chairRef.current.position.x, targetChairPosition[0], 0.1)
			chairRef.current.position.y = THREE.MathUtils.lerp(chairRef.current.position.y, targetChairPosition[1], 0.1)
			chairRef.current.position.z = THREE.MathUtils.lerp(chairRef.current.position.z, targetChairPosition[2], 0.1)
		}

		const targetUpdRotation = snap.hover ? [0, Math.PI / 8, Math.PI / 16] : [0, 0, 0]
		const targetUpdPosition = snap.hover ? [-0.165, -1.5, 0.868] : [-0.165, -2.697, 0.868]

		if (updRef.current) {
			updRef.current.rotation.x = THREE.MathUtils.lerp(updRef.current.rotation.x, targetUpdRotation[0], 0.1)
			updRef.current.rotation.y = THREE.MathUtils.lerp(updRef.current.rotation.y, targetUpdRotation[1], 0.1)
			updRef.current.rotation.z = THREE.MathUtils.lerp(updRef.current.rotation.z, targetUpdRotation[2], 0.1)

			updRef.current.position.x = THREE.MathUtils.lerp(updRef.current.position.x, targetUpdPosition[0], 0.1)
			updRef.current.position.y = THREE.MathUtils.lerp(updRef.current.position.y, targetUpdPosition[1], 0.1)
			updRef.current.position.z = THREE.MathUtils.lerp(updRef.current.position.z, targetUpdPosition[2], 0.1)
		}

		const targetLpdRotation = snap.hover ? [Math.PI / 32, -Math.PI / 16, -Math.PI / 32] : [0, 0, 0]
		const targetLpdPosition = snap.hover ? [-0.165, -2.7, 0.868] : [-0.165, -3.186, 0.868]

		if (lpdRef.current) {
			lpdRef.current.rotation.x = THREE.MathUtils.lerp(lpdRef.current.rotation.x, targetLpdRotation[0], 0.1)
			lpdRef.current.rotation.y = THREE.MathUtils.lerp(lpdRef.current.rotation.y, targetLpdRotation[1], 0.1)
			lpdRef.current.rotation.z = THREE.MathUtils.lerp(lpdRef.current.rotation.z, targetLpdRotation[2], 0.1)

			lpdRef.current.position.x = THREE.MathUtils.lerp(lpdRef.current.position.x, targetLpdPosition[0], 0.1)
			lpdRef.current.position.y = THREE.MathUtils.lerp(lpdRef.current.position.y, targetLpdPosition[1], 0.1)
			lpdRef.current.position.z = THREE.MathUtils.lerp(lpdRef.current.position.z, targetLpdPosition[2], 0.1)
		}
	})

	const uniforms = useMemo(
		() => ({
			iTime: { value: 0 },
			resolution: { value: new THREE.Vector4() },
			uMouse: { value: new THREE.Vector2() }
		}),
		[]
	)

	useFrame(({ clock }, state) => {
		mousePosition.current.lerp(targetMousePosition.current, 0.1)

		uniforms.iTime.value = clock.getElapsedTime() / 8
		uniforms.uMouse.value = mousePosition.current
	})

	return (
		<group {...props} dispose={null}>
			<mesh ref={mesh} castShadow receiveShadow geometry={nodes.backwall.geometry} position={[-4.93, 5.551, -28.019]}>
				<shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
			</mesh>
			<mesh castShadow receiveShadow geometry={nodes.props.geometry} position={[2.705, -0.762, -5.715]}>
				<meshPhysicalMaterial color={'#b59f93'} />
			</mesh>
			{/* <Float enabled={snap.hover} rotationIntensity={0.4} floatIntensity={2}> */}
			<mesh
				ref={updRef}
				castShadow
				receiveShadow
				geometry={nodes.upperPedestal.geometry}
				position={[-0.165, -2.697, 0.868]}
			>
				<meshPhysicalMaterial color={'#b59f93'} />
			</mesh>
			{/* </Float> */}
			<mesh
				ref={lpdRef}
				castShadow
				receiveShadow
				geometry={nodes.lowerPedestal.geometry}
				position={[-0.165, -3.186, 0.868]}
			>
				<meshPhysicalMaterial color={'#b59f93'} />
			</mesh>
			<Float rotationIntensity={0} floatIntensity={5} floatingRange={[0.15, 0.25]}>
				<Sphere />
			</Float>
			<mesh ref={chairRef} castShadow receiveShadow geometry={nodes.chair.geometry} position={[-4.211, -2.423, -0.588]}>
				<meshPhysicalMaterial color={'#b59f93'} />
			</mesh>
		</group>
	)
}

useGLTF.preload('/ALBD_PREP_SCENE.glb')
