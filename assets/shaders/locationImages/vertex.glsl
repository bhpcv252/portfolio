#define PI 3.141592653589793238

varying vec2 vUv;
varying vec3 vPosition;

uniform sampler2D image;
uniform float time;
uniform float index;
uniform float mouseSpeedSmoother;

void main() {
    vUv = (uv - vec2(0.5))*(0.9) + vec2(0.5); // zooming image
    vPosition = position;
    vec3 pos = position;

    pos.x -= sin( PI * uv.y) * min(mouseSpeedSmoother*0.09, 0.09);
    pos.y += sin( PI * uv.x) * 0.02 * sin(time*2.0 + index);

    vUv.y -= sin(time*0.3) * 0.03;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
}