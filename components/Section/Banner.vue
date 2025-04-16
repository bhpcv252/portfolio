<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { Ref } from 'vue';
import { gsap } from 'gsap';


const isLocationHovered: Ref<boolean> = ref(false);
const locationCurrentTime: Ref<string> = ref('');

/* Will use these later */
// const route = useRoute()
// const router = useRouter()

// Add padding to numbers: 4 -> 04
const padNumber = (n: number, z: number = 2): string => {
    return ('00' + n).slice(-z);
}

// Set location time with UTC offset
const setLocationTime = (time: number, deltaTime: number, frame: number): void => {
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

// Handle mouse hover on location
const showLocation = (): void => {
    if (!isLocationHovered.value) {
        /* Will use this later */
        // router.push("/current-location"); 
        isLocationHovered.value = true;
    }
}

// Handle close location modal
const hideLocation = (): void => {
    if (isLocationHovered.value) {
        /* Will use this later */
        // router.push("/");
        isLocationHovered.value = false;
    }
}

onMounted(() => {
    // Add callback to gsap raf
    gsap.ticker.add(setLocationTime);
})

const showElements = computed(() => isLocationHovered.value ? 'show' : '');
const hideElements = computed(() => isLocationHovered.value ? 'hide' : '');

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
            <div class="menu-wrapper" :class="hideElements">
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
                <NuxtLink to="#experiments" class="menu-item item-3 hover-item">
                    <img src="~/assets/images/experiments-thumb.png" alt="Experiments" />
                    <h3 class="hover-line">Experiments</h3>
                </NuxtLink>
                <a href="#contact" class="menu-item item-4 hover-item">
                    <img src="~/assets/images/catch-me-thumb.png" alt="Catch Me" />
                    <h3 class="hover-line">Catch Me</h3>
                </a>
                <a class="menu-info scroll grotesk-22-light">
                    or just...
                </a>
            </div>
            <div class="bottom-info">
                <div class="location-info" :class="showElements" @mouseenter="showLocation">
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
                <ClientOnly>
                    <LocationModal :isLocationHoveredProp="isLocationHovered" />
                </ClientOnly>
                <div class="modal-close-wrapper grotesk-22-light" :class="showElements" @click="hideLocation">
                    <PlusIcon class="bottom-right rotate-45" />
                </div>
                <div class="scroll-wrapper" :class="hideElements">
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

        &.show {

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

    .modal-close-wrapper {
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 10;
        visibility: hidden;
        opacity: 0;
        cursor: pointer;

        &.show {
            visibility: visible;
            animation: flickerAnimation 3s 2s variables.$easeSmooth forwards;
        }
    }

    .scroll-wrapper {
        position: relative;
        z-index: 5;
    }
}
</style>
