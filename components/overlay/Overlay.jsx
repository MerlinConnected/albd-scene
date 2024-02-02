import { state } from '../../utils/store'

export default function Overlay() {
	return (
		<div className='overlay'>
			<nav>
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 208.5 263.1'>
					<circle cx='95.6' cy='18.3' r='18.3' className='st0' fill='white' />
					<path
						fill='#fff'
						d='M112 202.7c-7.5 6.2-18.2 9.8-30.3 9.1-14.4-.9-33.8-7.4-44.5-34-2.7-6.8-3.9-14.1-3.9-21.4 0-35.3 26.4-72.3 27.8-74.2l.8-1.1h-3.3c-6 9-40.4 60.3-47 73.3C4.4 168.3-.2 183.9 0 199.5c.3 22.3 10.3 44.1 30 55.7 22.3 13 59.2 10.8 73.9-13 3.6-5.8 5.2-12.5 6.2-19.2.5-3.2.9-6.5 1.1-9.8.2-.5.8-10.5.8-10.5zM132.1 81.5l-52.8-.6.3 2.2c3.2 25.1 20.3 79.9 36.5 117.1 8.1 18.6 19.7 41.5 30 59.1h62.4c-12.2-18.4-56.7-92.7-76.4-177.8z'
						className='st0'
					/>
				</svg>
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 31 14'>
					<path fill='#fff' fillRule='evenodd' d='M31 2H0V0h31v2Zm0 12H0v-2h31v2Z' clipRule='evenodd' />
				</svg>
			</nav>
			<button
				onMouseEnter={() => ((state.hover = true), console.log(state.hover))}
				onMouseLeave={() => ((state.hover = false), console.log(state.hover))}
			>
				STARTING NOW
			</button>
		</div>
	)
}
