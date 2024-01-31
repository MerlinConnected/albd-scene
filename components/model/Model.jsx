import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
	const { nodes, materials } = useGLTF('/ALBD_PREP_SCENE.glb')
	return (
		<group {...props} dispose={null}>
			<mesh castShadow receiveShadow geometry={nodes.backwall.geometry} position={[2.705, -0.762, -5.715]}>
				<meshPhysicalMaterial color={'#303030'} />
			</mesh>
			<mesh castShadow receiveShadow geometry={nodes.props.geometry} position={[2.705, -0.762, -5.715]}>
				<meshPhysicalMaterial color={'#303030'} />
			</mesh>
			<mesh castShadow receiveShadow geometry={nodes.sphere.geometry} position={[2.705, -0.762, -5.715]}>
				<meshPhysicalMaterial color={'#303030'} />
			</mesh>
		</group>
	)
}

useGLTF.preload('/ALBD_PREP_SCENE.glb')
