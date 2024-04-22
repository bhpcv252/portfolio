#define PI 3.141592653589793238

varying vec2 vUv;
varying vec3 vPosition;

uniform sampler2D image;
uniform float time;
uniform float index;

void main() {
    vUv = (uv - vec2(0.5))*(0.9) + vec2(0.5); // zooming image
    vPosition = position;
    vec3 pos = position;
    vec2 lv = uv - 0.5; // centering (0,0)

    pos.y += sin( PI * uv.x) * 0.02 * sin(time*2.0 + index);

    vUv.y -= sin(time*0.8) * 0.03;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
}