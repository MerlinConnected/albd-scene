import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import glsl from 'vite-plugin-glsl'
import glslify from 'vite-plugin-glslify'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), glsl(), glslify.glslify()]
})
