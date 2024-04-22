#define PI 3.141592653589793238

varying vec2 vUv;
varying vec3 vPosition;

uniform sampler2D image;
uniform float time;
uniform float index;
uniform float mouseSpeedSmoother;


void main() {
    vec4 imageTexture = texture2D(image, vUv);

    gl_FragColor = imageTexture;
}