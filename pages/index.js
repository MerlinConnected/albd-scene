import Head from 'next/head'
import Overlay from '../components/overlay/Overlay.jsx'
import Scene from '../components/model/Scene'

export default function Home() {
	return (
		<>
			<Head>
				<title>A Life By Design</title>
				<meta name='description' content='To be written.' />
				<meta name='theme-color' content='#000000' />
			</Head>

			<Scene />

			<Overlay />
		</>
	)
}
