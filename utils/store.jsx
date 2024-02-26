import { proxy } from 'valtio'

const state = proxy({
	hover: false,
	debug: false
})

export { state }
