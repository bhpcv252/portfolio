<script setup lang="ts">
import { ref, onMounted, watch, toRef } from 'vue';
import type { Ref, ToRef } from 'vue';
import { gsap } from 'gsap';
import { CustomEase } from "gsap/CustomEase";
import { Observer } from "gsap/Observer";
import * as THREE from 'three';
import { locationImages } from '~/utils/locationImages';
import fShader from '~/assets/shaders/locationImages/fragment.glsl';
import vShader from '~/assets/shaders/locationImages/vertex.glsl';

gsap.registerPlugin(CustomEase, Observer);

CustomEase.create("throwEase", ".17,.88,.3,.98"); // For Stacking
CustomEase.create("smoothEase", ".61,.04,.45,.96"); // For Spreading


const props = defineProps<{
    isLocationHoveredProp: boolean
}>();
const isLocationHovered: ToRef<boolean> = toRef(props, 'isLocationHoveredProp');

const locationModal: Ref<HTMLDivElement | null> = ref(null);
const imagesMeshData: {
    x: number,
    y: number,
    z: number,
    scale: number,
    rotationZ: number
}[] = [];
const imagesMeshRandomYPosition: number[] = [];
const LIMITER: number = 0.005;
const mouseMoveData: {
    speed: number,
    reducer: number
} = {
    speed: 0,
    reducer: 0
}
const animationStatus: {
    stackEnded: boolean,
    finished: boolean
    startedAt: number
} = {
    stackEnded: false,
    finished: false,
    startedAt: 0
};

// Setup Scene
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});
renderer.setClearColor(0x000000, 0);

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, 1, 2, 7);
camera.position.set(0, 0, 3);
camera.lookAt(0, 0, 0);

const scene: THREE.Scene = new THREE.Scene();
scene.background = null;

const geometry = new THREE.PlaneGeometry(1, 1.625, 100, 100);

let materials: THREE.ShaderMaterial[] = [];
let group: THREE.Group = new THREE.Group();
let planes: THREE.Mesh[] = [];

for (let i: number = 0; i < locationImages.length; i++) {
    console.log(locationImages[i]);
    const texture: THREE.Texture = new THREE.TextureLoader().load(locationImages[i]);

    materials[i] = new THREE.ShaderMaterial({
        uniforms: {
            image: {
                value: texture
            },
            time: {
                value: 0.
            },
            index: {
                value: i
            },
            mouseMoveReducer: {
                value: mouseMoveData.reducer
            }
        },
        fragmentShader: fShader,
        vertexShader: vShader,
        side: THREE.FrontSide,
        transparent: true,
    });

    planes[i] = new THREE.Mesh(geometry, materials[i]);

    imagesMeshData[i] = {
        x: THREE.MathUtils.randInt(-10, 10) * LIMITER,
        y: THREE.MathUtils.randInt(-10, 10) * LIMITER,
        z: 0.3,
        scale: 0,
        rotationZ: THREE.MathUtils.degToRad(gsap.utils.random(-9, 9))
    }

    imagesMeshRandomYPosition[i] = gsap.utils.random(-0.5, 0.5);

    planes[i].scale.set(imagesMeshData[i].scale, imagesMeshData[i].scale, imagesMeshData[i].scale);
    planes[i].position.set(imagesMeshData[i].x, imagesMeshData[i].y, imagesMeshData[i].z);
    planes[i].rotation.set(0, 0, imagesMeshData[i].rotationZ);

    group.add(planes[i]);
}

scene.add(group)

// Setup Animation
const animationTL: GSAPTimeline = gsap.timeline({
    paused: true,
    onStart: () => {
        mouseMoveData.speed = 0;
        mouseMoveData.reducer = 0;
        animationStatus.stackEnded = false
        animationStatus.finished = false
    },
    onComplete: () => {
        animationStatus.finished = true
    },
    defaults: {
        ease: "throwEase"
    }
})
animationTL.to(imagesMeshData, {
    scale: 1,
    duration: 0,
    stagger: 0.12,
}).to(imagesMeshData, {
    z: (i) => {
        return i * LIMITER
    },
    duration: 0.12,
    stagger: 0.12,
    onComplete: () => {
        animationStatus.stackEnded = true
    }
}, 0).to(imagesMeshData, {
    x: (i) => {
        return i * 1.2 - 5
    },
    y: (i) => {
        return 0 + imagesMeshRandomYPosition[i]
    },
    z: 0.7,
    rotationZ: 0,
    duration: 1.5,
    ease: "smoothEase"
});


// Render Scene callback
const renderScene = (time: number, deltaTime: number, frame: number): void => {
    mouseMoveData.speed += mouseMoveData.reducer * 0.3;
    let scrollTime: number = time - animationStatus.startedAt + mouseMoveData.speed;

    for (let i: number = 0; i < locationImages.length; i++) {
        if (animationStatus.stackEnded) {
            let posX: number = (imagesMeshData[i].x - scrollTime * 0.1) % (imagesMeshData.length * 1.2);
            if (posX <= -5) {
                posX = posX + (imagesMeshData.length * 1.2);
            }
            planes[i].position.set(posX, imagesMeshData[i].y + Math.sin(imagesMeshData[i].y * scrollTime * 0.5) * 0.1, imagesMeshData[i].z);
        }
        else {
            planes[i].position.set(imagesMeshData[i].x, imagesMeshData[i].y, imagesMeshData[i].z);
            animationStatus.startedAt = time;
        }
        planes[i].scale.set(imagesMeshData[i].scale, imagesMeshData[i].scale, imagesMeshData[i].scale);
        planes[i].rotation.set(0, 0, imagesMeshData[i].rotationZ);
        materials[i].uniforms.time.value = time - animationStatus.startedAt + mouseMoveData.speed * 0.2;
        materials[i].uniforms.mouseMoveReducer.value = mouseMoveData.reducer;
    }

    resizeCanvas(renderer);

    renderer.render(scene, camera);

    mouseMoveData.reducer *= 0.98
}

// Resize Canvas
const resizeCanvas = (renderer: THREE.WebGLRenderer): void => {
    const canvas: HTMLCanvasElement = renderer.domElement;
    const pixelRatio: number = window.devicePixelRatio;
    const width: number = canvas.clientWidth * pixelRatio | 0;
    const height: number = canvas.clientHeight * pixelRatio | 0;
    const needResize: boolean = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
        const canvas: HTMLCanvasElement = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
}

watch(isLocationHovered, () => {
    if (isLocationHovered.value) {
        animationTL.restart();
    }
})

onMounted(() => {

    // Add canvas element
    locationModal?.value?.appendChild(renderer.domElement);

    // Add event listener for mouse move
    Observer.create({
        target: "bottom-info",
        type: "pointer",
        onMove: (self) => {
            if (animationStatus.finished) {
                mouseMoveData.reducer += Math.abs(self.deltaX) * 0.02;
                mouseMoveData.speed += Math.abs(self.deltaX) * 0.001;
            }
        }
    })

    // Add callback to gsap raf
    gsap.ticker.add(renderScene);
})


</script>

<template>
    <div class="location-modal" :class="isLocationHovered ? '' : 'hide'" ref="locationModal"></div>
</template>

<style lang="scss" scoped>
.location-modal {
    position: absolute;
    bottom: utils.pxToRem(variables.$basePadding * -1);
    left: utils.pxToRem(variables.$basePadding * -1);
    right: utils.pxToRem(variables.$basePadding * -1);
    width: 100vw;
    height: 100vh;
    background-color: rgba(variables.$bgColor, 0.8);
    backdrop-filter: blur(utils.pxToRem(10));
    z-index: 10;
    transition: visibility 0.5s variables.$easeSmooth, opacity 0.5s variables.$easeSmooth;
}
</style>