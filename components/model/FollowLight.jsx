import { useFrame, useThree } from '@react-three/fiber'
import { useState, useRef } from 'react'
import { Vector3 } from 'three'

export default function FollowLight() {
	const lightRef = useRef()
	const { camera } = useThree()
	const [targetPosition, setTargetPosition] = useState(new Vector3())

	useFrame((state) => {
		// Adjust the z-depth as needed
		const zDepth = -3
		const vector = new Vector3(state.pointer.x, state.pointer.y, 0.5)
		vector.unproject(camera)
		const dir = vector.sub(camera.position).normalize()
		const distance = (zDepth - camera.position.z) / dir.z
		const pos = camera.position.clone().add(dir.multiplyScalar(distance))

		setTargetPosition(pos)

		// Interpolate position
		const alpha = 0.1 // Adjust alpha for speed of interpolation
		lightRef.current.position.lerp(targetPosition, alpha)
	})

	return (
		<>
			<group ref={lightRef} position={[0, 0, 0]}>
				<mesh>
					<sphereGeometry args={[0.1, 16, 16]} />
					<meshBasicMaterial color={'#ffffff'} />
				</mesh>
				<pointLight position={[0, 0, 0]} intensity={10} />
			</group>
		</>
	)
}
