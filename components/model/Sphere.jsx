import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils'
import * as THREE from 'three'

import noise from './shader/noise.glsl?raw'

function Sphere() {
	const meshRef = useRef()
	const geoRef = useRef()
	const materialRef = useRef()

	useEffect(() => {
		if (geoRef.current) {
			let g = geoRef.current
			g.deleteAttribute('normal')
			g.deleteAttribute('uv')
			g = mergeVertices(g)
			g.computeVertexNormals()
		}
		if (materialRef.current) {
			materialRef.current.onBeforeCompile = (shader) => {
				shader.uniforms.time = { value: 0 }
				shader.uniforms.uMouse = { value: new THREE.Vector2() }

				shader.vertexShader = `
                    uniform float time;
					uniform vec2 uMouse;
                    ${noise}
                    float noise(vec3 p){
						// Modify the noise function to include mouse position
						vec3 adjustedPos = p + vec3((uMouse * 0.5), 0.0);
						float n = snoise(vec4(adjustedPos / 2., time));
						n = sin(n * 3.1415926 * 8.);
						n = n * 1.0 + 0.5;
						// n = clamp(n, 0.1, 0.9);
						n = smoothstep(0.1, 0.9, n);
						n *= n;
						return n;
                      }
                      vec3 getPos(vec3 p){
                        return p * (4. + noise(p * 0.875) * .25);
                      }
                    ${shader.vertexShader}
      `

				// Replace beginnormal_vertex
				shader.vertexShader = shader.vertexShader.replace(
					`#include <beginnormal_vertex>`,
					`#include <beginnormal_vertex>

				    vec3 p0 = getPos(position);

				    // https://stackoverflow.com/a/39296939/4045502

				    float theta = .1;
				    vec3 vecTangent = normalize(cross(p0, vec3(1.0, 0.0, 0.0)) + cross(p0, vec3(0.0, 1.0, 0.0)));
				    vec3 vecBitangent = normalize(cross(vecTangent, p0));
				    vec3 ptTangentSample = getPos(normalize(p0 + theta * normalize(vecTangent)));
				    vec3 ptBitangentSample = getPos(normalize(p0 + theta * normalize(vecBitangent)));

				    objectNormal = normalize(cross(ptBitangentSample - p0, ptTangentSample - p0));

				    ///////////////////////////////////////////////
				  `
				)

				// Replace begin_vertex
				shader.vertexShader = shader.vertexShader.replace(
					`#include <begin_vertex>`,
					`#include <begin_vertex>
				    transformed = p0;
				  `
				)

				shader.vertexShader = shader.vertexShader.replace(
					`#include <common>\n
                    #include <batching_pars_vertex>
                    #include <uv_pars_vertex>`,
					`#include <common>
                    #include <uv_pars_vertex>
                    #include <uv2_pars_vertex>`
				)

				shader.vertexShader = shader.vertexShader.replace(
					`#include <uv_vertex>
                    #include <color_vertex>
                    #include <morphcolor_vertex>
                    #include <batching_vertex>
                    `,
					`#include <uv_vertex>
                    #include <uv2_vertex>
                    #include <color_vertex>
                    #include <morphcolor_vertex>
                    `
				)

				materialRef.current.userData.shader = shader
				// console.log(shader.vertexShader)
			}
		}
	}, [])

	const targetMousePosition = useRef(new THREE.Vector2())

	useFrame(({ clock, pointer }) => {
		if (materialRef.current.userData.shader) {
			materialRef.current.userData.shader.uniforms.time.value = clock.getElapsedTime() / 8

			targetMousePosition.current.x = pointer.x
			targetMousePosition.current.y = pointer.y

			materialRef.current.userData.shader.uniforms.uMouse.value.lerp(targetMousePosition.current, 0.1)
		}
	})

	return (
		<mesh ref={meshRef} scale={0.45}>
			<icosahedronGeometry ref={geoRef} args={[1, 96]} />
			<meshPhysicalMaterial ref={materialRef} color='#000000' specularIntensity={0.33} />
		</mesh>
	)
}

export default Sphere
