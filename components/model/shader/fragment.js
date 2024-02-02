export const fragmentShader = `
    uniform float u_rotated_scale;
    uniform float u_primary_scale;
    uniform float u_rot_left_divisor;
    uniform float u_rot_right_divisor;
    uniform vec2 iResolution;
    uniform float iTime;

    varying vec2 vUv; 

    vec3 mod289(vec3 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    
    vec2 mod289(vec2 x) {
        return x - floor(x * (1.0 / 289.0)) * 289.0;
    }
    
    vec3 permute(vec3 x) {
        return mod289(((x*34.0)+1.0)*x);
    }
    
    float snoise(vec2 v)
    {
        const vec4 C = vec4(
            0.211324865405187,  // (3.0-sqrt(3.0))/6.0
            0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
            -0.577350269189626,  // -1.0 + 2.0 * C.x
            0.024390243902439
        ); // 1.0 / 41.0
    
        // First corner
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
    
        // Other corners
        vec2 i1;
        //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
        //i1.y = 1.0 - i1.x;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        // x0 = x0 - 0.0 + 0.0 * C.xx ;
        // x1 = x0 - i1 + 1.0 * C.xx ;
        // x2 = x0 - 1.0 + 2.0 * C.xx ;
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
    
        // Permutations
        i = mod289(i); // Avoid truncation effects in permutation
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
    
        // Gradients: 41 points uniformly over a line, mapped onto a diamond.
        // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)
    
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
    
        // Normalise gradients implicitly by scaling m
        // Approximation of: m *= inversesqrt( a0*a0 + h*h );
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    
        // Compute final noise value at P
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
    }
    
    vec2 rotate(vec2 v, float a) {
        float s = sin(a);
        float c = cos(a);
        mat2 m = mat2(c, -s, s, c);
        return m * v;
    }
    
    vec2 rotateOrigin(vec2 v, vec2 center, float a) {
        vec2 t = v - center;
        vec2 r = rotate(t, a);
        return r + center;
    }

    void main() {
        vec3 white = vec3(1.0, 1.0, 1.0);
        vec3 black = vec3(0.0, 0.0, 0.0);

        vec2 rotated_resolution = iResolution * u_rotated_scale;
        vec2 primary_resolution = iResolution * u_primary_scale;

        // Adjusted to use varying vUv
        vec2 rotated_fragCoord = vUv * iResolution * u_rotated_scale;
        vec2 primary_fragCoord = vUv * iResolution * u_primary_scale * 0.05;

        vec2 rotated_center = rotated_resolution.xy / 4.0;
        vec2 primary_center = primary_resolution.xy / 1.0;

        vec2 coord0 = primary_fragCoord + primary_center;
        vec2 coord1 = rotateOrigin(rotated_fragCoord, rotated_center, iTime / u_rot_left_divisor);
        vec2 coord2 = rotateOrigin(rotated_fragCoord, rotated_center, iTime / u_rot_right_divisor);

        float n0 = snoise(coord0);
        float n1 = snoise(coord1);
        float n2 = snoise(coord2);
        float c = (n1 + n2) / 2.0;

        float n = snoise(coord0 * c);

        float r = n;
        float g = n;
        float b = n;
        vec3 color = vec3(r, g, b);
        vec3 final_color = color;
        final_color = floor(final_color * 5.0);
        final_color = clamp(final_color, 0.05, 0.07);

        gl_FragColor = vec4(final_color, 1.0);
    }
`
