import { defineConfig } from 'vite'
// import glsl from 'vite-plugin-glsl'
// import glslify from 'vite-plugin-glslify'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()]
})
