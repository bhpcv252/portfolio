<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import { gsap } from 'gsap'
import { CustomEase } from "gsap/CustomEase";
import { Observer } from "gsap/Observer";
import * as THREE from 'three'
import { locationImages } from '~/utils/locationImages';
import type { LocationImageMeshData, LocationImageMeshRandomPosition } from '~/types'
import fShader from '~/assets/shaders/locationImages/fragment.glsl';
import vShader from '~/assets/shaders/locationImages/vertex.glsl';

gsap.registerPlugin(CustomEase, Observer);

CustomEase.create("throwEase", ".17,.88,.3,.98");
CustomEase.create("smoothEase", ".61,.04,.45,.96");


/* REFACTOR CODE ASAP */

const isLocationHovered: Ref<boolean> = ref(false);
const locationCurrentTime: Ref<string> = ref('');
const locationModal: Ref<HTMLDivElement | null> = ref(null);

// Location Images
const imagesMeshData: LocationImageMeshData[] = [];
const imagesMeshRandomPosition: LocationImageMeshRandomPosition[] = [];
const LIMITER: number = 0.005;
let mouseMoveSpeed: number = 0;
let mouseSpeedSmoother:number = 0;

const isAnimationFinished: {
    status: boolean,
    ended: boolean
    time: number
} = {
    status: false,
    ended: false,
    time: 0
};

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

let materials = [];
let group = new THREE.Group();
let planes = [];

for (let i = 0; i < locationImages.length; i++) {
    console.log(locationImages[i]);
    const texture = new THREE.TextureLoader().load(locationImages[i]);

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
            mouseSpeedSmoother: {
                value: mouseSpeedSmoother
            }
        },
        fragmentShader: fShader,
        vertexShader: vShader,
        side: THREE.DoubleSide, // Why Double
        transparent: false,
        //wireframe: true
    });

    planes[i] = new THREE.Mesh(geometry, materials[i]);

    imagesMeshData[i] = {
        x: THREE.MathUtils.randInt(-10, 10) * LIMITER,
        y: THREE.MathUtils.randInt(-10, 10) * LIMITER,
        z: 0.3,
        scale: 0,
        rotationZ: THREE.MathUtils.degToRad(gsap.utils.random(-9, 9))
    }

    imagesMeshRandomPosition[i] = {
        y: gsap.utils.random(-0.5, 0.5),
    }

    planes[i].scale.set(imagesMeshData[i].scale, imagesMeshData[i].scale, imagesMeshData[i].scale);
    planes[i].position.set(imagesMeshData[i].x, imagesMeshData[i].y, imagesMeshData[i].z);
    planes[i].rotation.set(0, 0, imagesMeshData[i].rotationZ);

    group.add(planes[i]);
}

scene.add(group)

const animationTL = gsap.timeline({
    paused: true,
    onStart: () => {
        mouseMoveSpeed = 0;
        mouseSpeedSmoother = 0;
        isAnimationFinished.status = false
        isAnimationFinished.ended = false
    },
    onComplete: () => {
        isAnimationFinished.ended = true
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
        isAnimationFinished.status = true
    }
}, 0).to(imagesMeshData, {
    x: (i) => {
        return i * 1.2 - 5
    },
    y: (i) => {
        return 0 + imagesMeshRandomPosition[i].y
    },
    z: 0.7,
    rotationZ: 0,
    duration: 1.5,
    ease: "smoothEase"
});


const renderScene = (time: number, deltaTime: number, frame: number) => {
    mouseMoveSpeed += mouseSpeedSmoother;
    let scrollTime = time - isAnimationFinished.time + mouseMoveSpeed;

    for (let i = 0; i < locationImages.length; i++) {
        if (isAnimationFinished.status) {
            let posX = (imagesMeshData[i].x - scrollTime * 0.1) % (imagesMeshData.length * 1.2);
            if (posX <= -5) {
                posX = posX + (imagesMeshData.length * 1.2);
            }
            planes[i].position.set(posX, imagesMeshData[i].y + Math.sin(imagesMeshData[i].y * scrollTime) * 0.1, imagesMeshData[i].z);
        }
        else {
            planes[i].position.set(imagesMeshData[i].x, imagesMeshData[i].y, imagesMeshData[i].z);
            isAnimationFinished.time = time;
        }
        planes[i].scale.set(imagesMeshData[i].scale, imagesMeshData[i].scale, imagesMeshData[i].scale);
        planes[i].rotation.set(0, 0, imagesMeshData[i].rotationZ);
        materials[i].uniforms.time.value = time - isAnimationFinished.time + mouseMoveSpeed*0.2;
        materials[i].uniforms.mouseSpeedSmoother.value = mouseSpeedSmoother;

    }

    // TODO: Put it in resizeCanvas function
    if (resizeCanvas(renderer)) {
        const canvas: HTMLCanvasElement = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    console.clear()
    console.log(mouseSpeedSmoother)
    mouseSpeedSmoother *= 0.98
}

const resizeCanvas = (renderer: THREE.WebGLRenderer) => {
    const canvas: HTMLCanvasElement = renderer.domElement;
    const pixelRatio: number = window.devicePixelRatio;
    const width: number = canvas.clientWidth * pixelRatio | 0;
    const height: number = canvas.clientHeight * pixelRatio | 0;
    const needResize: boolean = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}

// Location Time
const hoverLocation = () => {
    if (!isLocationHovered.value) {
        animationTL.restart();
    }
    isLocationHovered.value = !isLocationHovered.value;
}

const padNumber = (n: number, z: number = 2) => {
    z = z || 2;
    return ('00' + n).slice(-z);
}

const setLocationTime = (time: number, deltaTime: number, frame: number) => {
    let s: number = Date.now() + 1000 * 60 * 60 * 5.5; // 5.5 for UTC+5:30

    let ms: number = s % 1000;
    s = (s - ms) / 1000;
    let secs: number = s % 60;
    s = (s - secs) / 60;
    let mins: number = s % 60;
    s = (s - mins) / 60;
    let hrs: number = s % 24;
    let meridiem: string = hrs >= 12 ? 'PM' : 'AM';
    hrs = hrs > 12 ? hrs - 12 : hrs;

    locationCurrentTime.value = `${padNumber(hrs)}:${padNumber(mins)}:${padNumber(secs)} ${meridiem}`;
}

onMounted(() => {
    locationModal?.value?.appendChild(renderer.domElement);
    Observer.create({
        type: "pointer",
        onMove: (self) => {
            if(isAnimationFinished.ended) {
                mouseSpeedSmoother += Math.abs(self.deltaX) * 0.02;
                mouseMoveSpeed += Math.sqrt(Math.abs(self.deltaX*self.deltaX + self.deltaY*self.deltaY))* 0.001;
            }
        }
    })
    gsap.ticker.add(setLocationTime);
    gsap.ticker.add(renderScene);
})


</script>

<template>
    <div class="home" id="home">
        <div class="container">
            <PlusIcon class="center" />
            <h1>
                <span>Sonu</span>
                <span class="line"></span>
                <span>Singh</span>
            </h1>
            <div class="menu-wrapper" :class="isLocationHovered ? 'hide' : ''">
                <div class="menu-info jump grotesk-22-light">
                    jump to...
                </div>
                <a href="#work" class="menu-item item-1 hover-item">
                    <img src="~/assets/images/work-thumb.png" alt="Work" />
                    <h3 class="hover-line">Work</h3>
                </a>
                <a href="#about" class="menu-item item-2 hover-item">
                    <img src="~/assets/images/about-thumb.png" alt="About" />
                    <h3 class="hover-line">About</h3>
                </a>
                <a href="#experiments" class="menu-item item-3 hover-item">
                    <img src="~/assets/images/experiments-thumb.png" alt="Experiments" />
                    <h3 class="hover-line">Experiments</h3>
                </a>
                <a href="#contact" class="menu-item item-4 hover-item">
                    <img src="~/assets/images/catch-me-thumb.png" alt="Catch Me" />
                    <h3 class="hover-line">Catch Me</h3>
                </a>
                <a class="menu-info scroll grotesk-22-light">
                    or just...
                </a>
            </div>
            <div class="bottom-info">
                <div class="location-info" @mouseenter="hoverLocation" @mouseleave="hoverLocation">
                    <div class="time grotesk-22-light">
                        <span>
                            {{ locationCurrentTime }}
                        </span>
                    </div>
                    <div class="info">
                        <div class="name">
                            New Delhi, India
                        </div>
                        <div class="line"></div>
                        <div class="coordinates">
                            28.6139° N, 77.2090° E
                        </div>
                    </div>
                </div>
                <div class="location-modal" :class="isLocationHovered ? '' : 'hide'" ref="locationModal"></div>
                <div class="scroll-wrapper" :class="isLocationHovered ? 'hide' : ''">
                    SCROLL
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    height: 100vh;
    position: relative;
}

.hide {
    opacity: 0;
    visibility: hidden;
    transition: visibility 0.5s variables.$easeSmooth, opacity 0.5s variables.$easeSmooth;
}

h1 {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
        display: inline-block;
    }

    .line {
        height: 1px;
        width: utils.pxToRem(940);
        background-color: variables.$textColor;
    }
}

.menu-wrapper {
    transition: visibility 0.5s variables.$easeSmooth, opacity 0.5s variables.$easeSmooth;


    &>div,
    &>a {
        position: absolute;
    }

    .menu-item {
        display: grid;
        gap: utils.pxToRem(82);
    }

    .jump {
        top: utils.pxToVH(270);
        left: utils.placeAt(2);
    }

    .scroll {
        bottom: utils.pxToVH(118);
        right: utils.placeAt(2);
        transition: visibility 0.5s variables.$easeSmooth, opacity 0.5s variables.$easeSmooth;
    }

    .item-1 {
        left: utils.placeAt(2);
        bottom: utils.pxToVH(258);
        justify-items: start;

        img {
            width: utils.pxToRem(235);
        }
    }

    .item-2 {
        right: utils.placeAt(8);
        top: utils.pxToVH(270);
        text-align: right;
        justify-items: end;

        img {
            width: utils.pxToRem(153);
        }
    }

    .item-3 {
        left: utils.placeAt(8);
        bottom: utils.pxToVH(118);
        justify-items: start;

        img {
            width: utils.pxToRem(283);
        }
    }

    .item-4 {
        right: utils.placeAt(2);
        top: utils.pxToVH(357);
        text-align: right;
        justify-items: end;

        img {
            width: utils.pxToRem(162);
        }
    }
}

.bottom-info {
    display: flex;
    justify-content: space-between;
    align-items: end;
    position: absolute;
    bottom: utils.pxToRem(variables.$basePadding);
    left: utils.pxToRem(variables.$basePadding);
    right: utils.pxToRem(variables.$basePadding);

    .location-info {
        position: relative;
        z-index: 15;
        display: grid;
        gap: utils.pxToRem(9);
        cursor: pointer;

        .time {
            overflow: hidden;

            span {
                display: inline-block;
                transform: translate3d(0, 100%, 0);
                transition: transform 0.5s variables.$easeSmooth;
            }
        }

        .info {
            display: flex;
            align-items: center;
            gap: utils.pxToRem(20);
        }

        .name {
            opacity: 0;
            visibility: hidden;
            transition: visibility 0.5s variables.$easeSmooth, opacity 0.5s variables.$easeSmooth;
        }

        .line {
            height: 1px;
            width: utils.pxToRem(124);
            background-color: variables.$textColor;
            transform: scale3d(0, 1, 1);
            transform-origin: left;
            transition: transform 0.5s variables.$easeSmooth;
        }

        .coordinates {
            transform: translate3d(utils.pxToRem(-344), 0, 0);
            transform-origin: left;
            transition: transform 0.5s 0.15s variables.$easeSmooth;
        }

        &:hover {

            .time {
                span {
                    transform: translate3d(0, 0, 0);
                    transition: transform 0.5s variables.$easeSmooth;
                }
            }

            .name {
                opacity: 1;
                visibility: visible;
                transition: visibility 0.5s 0.15s variables.$easeSmooth, opacity 0.5s 0.15s variables.$easeSmooth;
            }

            .line {
                transform: scale3d(1, 1, 1);
                transition: transform 0.5s 0.15s variables.$easeSmooth;
            }

            .coordinates {
                transform: translate3d(0, 0, 0);
                transition: transform 0.5s variables.$easeSmooth;
            }
        }
    }

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

    .scroll-wrapper {
        position: relative;
        z-index: 5;
    }
}
</style>