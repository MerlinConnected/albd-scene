import { state } from '../../utils/store'

export default function Overlay() {
	return (
		<div className='overlay'>
			<button
				onMouseEnter={() => ((state.hover = true), console.log(state.hover))}
				onMouseLeave={() => ((state.hover = false), console.log(state.hover))}
			>
				STARTING NOW
			</button>
		</div>
	)
}
