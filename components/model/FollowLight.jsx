import { useFrame, useThree } from '@react-three/fiber'
import { useState, useRef, useEffect } from 'react'
import { Vector3 } from 'three'

export default function FollowLight() {
	const lightRef = useRef()
	const gcRef = useRef() // Ground collider reference
	const wcRef = useRef() // Wall collider reference

	const { camera } = useThree()
	const [targetPosition, setTargetPosition] = useState(new Vector3())
	const [canMoveX, setCanMoveX] = useState(true)
	const [canMoveY, setCanMoveY] = useState(true)

	useFrame((state) => {
		const zDepth = -3
		const vector = new Vector3(state.pointer.x, state.pointer.y, 0.5)
		vector.unproject(camera)
		const dir = vector.sub(camera.position).normalize()
		const distance = (zDepth - camera.position.z) / dir.z
		const pos = camera.position.clone().add(dir.multiplyScalar(distance))

		const groundPos = gcRef.current.position
		const wallPos = wcRef.current.position

		if (pos.y > groundPos.y) {
			setCanMoveY(true)
		} else {
			setCanMoveY(false)
		}

		if (pos.x < wallPos.x) {
			setCanMoveX(true)
		} else {
			setCanMoveX(false)
		}

		setTargetPosition(new Vector3(canMoveX ? pos.x : targetPosition.x, canMoveY ? pos.y : targetPosition.y, pos.z))

		const alpha = 0.1
		lightRef.current.position.lerp(targetPosition, alpha)
		// lightRef.current.position.x = targetPosition.x
		// lightRef.current.position.y = targetPosition.y
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
