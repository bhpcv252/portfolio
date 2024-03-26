<script setup lang="ts">



</script>

<template>
    <div class="experiments" id="experiments">
        <div class="container">
            <div class="top-panel">
                <h2 class="split-heading">
                    <span>Experiments</span>
                    <div class="moneta-55-regular">and Animations</div>
                </h2>
                <GridRow>
                    <GridCol :from="2" :to="6">
                        <p>
                            But I must explain to you how all this mistaken idea of denouncing pleasure and praising
                            pain
                            was born and I will give you a complete account of the system.
                        </p>
                    </GridCol>
                    <GridCol :from="8" :to="12">
                        <p>
                            But I must explain to you how all this mistaken idea of denouncing pleasure and praising
                            pain
                            was born and I will give you a complete account of the system.
                        </p>
                    </GridCol>
                </GridRow>
            </div>
            <div class="bottom-panel">
                <GridRow>
                    <GridCol :from="2" :to="12">
                        <div class="experiment-links">
                            <div class="experiment-item hover-item">
                                <div class="moneta-55-regular title hover-line origin-center">
                                    GITHUB
                                </div>
                                <div class="link-wrapper">
                                    <a href="https://github.com/stars/bhpcv252/lists/experiments" class="btn" target="_blank">
                                        <span>
                                            Visit
                                        </span>
                                        <span class="icon external">
                                            <SvgoArrowRightLight />
                                        </span>
                                    </a>
                                </div>
                                <div class="grotesk-22-light info">
                                    3D, WebGL, JS
                                </div>
                            </div>
                            <div class="experiment-item hover-item">
                                <div class="moneta-55-regular title hover-line origin-center">
                                    SHADERTOY
                                </div>
                                <div class="link-wrapper">
                                    <a href="https://www.shadertoy.com/user/bhpcv252/" class="btn" target="_blank">
                                        <span>
                                            Visit
                                        </span>
                                        <span class="icon external">
                                            <SvgoArrowRightLight />
                                        </span>
                                    </a>
                                </div>
                                <div class="grotesk-22-light info ">
                                    GLSL Shaders
                                </div>
                            </div>
                            <div class="experiment-item hover-item">
                                <div class="moneta-55-regular title hover-line origin-center">
                                    CODEPEN
                                </div>
                                <div class="link-wrapper">
                                    <a href="https://codepen.io/bhpcv252/" class="btn" target="_blank">
                                        <span>
                                            Visit
                                        </span>
                                        <span class="icon external">
                                            <SvgoArrowRightLight />
                                        </span>
                                    </a>
                                </div>
                                <div class="grotesk-22-light info">
                                    HTML, CSS, JS
                                </div>
                            </div>
                            <div class="experiment-item hover-item">
                                <div class="moneta-55-regular title hover-line origin-center">
                                    P5.JS SKETCHES
                                </div>
                                <div class="link-wrapper">
                                    <a href="https://editor.p5js.org/bhpcv252/sketches" class="btn" target="_blank">
                                        <span>
                                            Visit
                                        </span>
                                        <span class="icon external">
                                            <SvgoArrowRightLight />
                                        </span>
                                    </a>
                                </div>
                                <div class="grotesk-22-light info">
                                    2D, WebGL, JS
                                </div>
                            </div>
                        </div>
                    </GridCol>
                </GridRow>
            </div>
            <PlusIcon class="bottom-right" />
            <PlusIcon class="bottom-left" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    height: 100vh;
    position: relative;
    display: grid;
    align-content: space-between;
}

h2 {
    margin: utils.pxToVH(variables.$baseTopMargin) 0 utils.pxToVH(74);
}

.experiment-links {
    display: flex;
    justify-content: space-between;

    .experiment-item {
        display: grid;
        justify-items: center;
        cursor: context-menu;
    }
}

.link-wrapper {
    height: utils.pxToRem(142);
    display: flex;
    align-items: center;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        width: 1px;
        height: utils.pxToRem(128);
        top: 0;
        background-color: variables.$textColor;
        transform: scale3d(1, 1, 1);
        transition: transform 0.2s 0.2s cubic-bezier(0.61,0.04,0.45,0.96);
        transform-origin: top;
    }

    a {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        visibility: hidden;
        opacity: 0;
        transition: visibility 0.2s linear, opacity 0.2s linear;
    }
}

.hover-item:hover {

    .link-wrapper {

        &::before {
            transform: scale3d(1, 0, 1);
            transition: transform 0.2s cubic-bezier(0.61,0.04,0.45,0.96);
        }

        a {
            visibility: visible;
            opacity: 1;
            transition: visibility 0.2s 0.2s linear, opacity 0.2s 0.2s linear;
        }
    }
}

.bottom-panel {
    padding-bottom: utils.pxToVH(140);
}
</style>