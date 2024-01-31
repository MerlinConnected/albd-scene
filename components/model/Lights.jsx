export default function Lights() {
	return (
		<>
			<ambientLight intensity={1} />
			<directionalLight position={[0, 10, 0]} intensity={1} castShadow />
		</>
	)
}
