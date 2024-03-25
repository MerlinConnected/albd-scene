import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { useState, useRef, useEffect } from 'react'
import { Vector3 } from 'three'

export default function CursorLight() {
	const lightRef = useRef()
	const gcRef = useRef() // Ground collider reference
	const wcRef = useRef() // Wall collider reference

	const { camera } = useThree()
	const [targetPosition, setTargetPosition] = useState(new Vector3())

	useFrame((state) => {
		const zDepth = -3
		const vector = new Vector3(state.pointer.x, state.pointer.y, 0.5)
		vector.unproject(camera)
		const dir = vector.sub(camera.position).normalize()
		const distance = (zDepth - camera.position.z) / dir.z
		const pos = camera.position.clone().add(dir.multiplyScalar(distance))

		const groundPos = gcRef.current.position
		const wallPos = wcRef.current.position

		let newTargetX = targetPosition.x
		let newTargetY = targetPosition.y

		if (pos.y > groundPos.y) {
			newTargetY = pos.y
		}

		if (pos.x < wallPos.x) {
			newTargetX = pos.x
		}

		const newTargetPosition = new Vector3(newTargetX, newTargetY, pos.z)

		const alpha = 0.1
		lightRef.current.position.lerp(newTargetPosition, alpha)

		setTargetPosition(newTargetPosition)
	})

	const { color } = useControls({ color: true })

	return (
		<>
			<group ref={lightRef} position={[0, 0, 0]}>
				<mesh>
					<sphereGeometry args={[0.1, 16, 16]} />
					<meshStandardMaterial color={'#ffffff'} emissive={color ? '#E9CA48' : '#E05837'} emissiveIntensity={10} />
				</mesh>
				<pointLight position={[0, 0, 0]} intensity={50} color={color ? '#E9CA48' : '#E05837'} />
			</group>

			{/* WALLS */}
			<mesh ref={gcRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.4, 0]}>
				<planeGeometry args={[10, 10]} />
				<meshStandardMaterial transparent opacity={0} color={'hotpink'} />
			</mesh>

			<mesh ref={wcRef} rotation={[0, -Math.PI / 2, 0]} position={[5.3, 0, 0]}>
				<planeGeometry args={[10, 10]} />
				<meshStandardMaterial transparent opacity={0} color={'cyan'} />
			</mesh>
		</>
	)
}
