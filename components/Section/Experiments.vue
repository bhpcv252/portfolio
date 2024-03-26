<script setup lang="ts">



</script>

<template>
    <div class="experiments">
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
                            <div class="experiment-item">
                                <div class="moneta-55-regular title">
                                    GITHUB
                                </div>
                                <div class="link-wrapper">
                                    <a href="#" class="btn" target="_blank">
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
                            <div class="experiment-item">
                                <div class="moneta-55-regular title">
                                    SHADERTOY
                                </div>
                                <div class="link-wrapper">
                                    <a href="#" class="btn" target="_blank">
                                        <span>
                                            Visit
                                        </span>
                                        <span class="icon external">
                                            <SvgoArrowRightLight />
                                        </span>
                                    </a>
                                </div>
                                <div class="grotesk-22-light info">
                                    GLSL Shaders
                                </div>
                            </div>
                            <div class="experiment-item">
                                <div class="moneta-55-regular title">
                                    CODEPEN
                                </div>
                                <div class="link-wrapper">
                                    <a href="#" class="btn" target="_blank">
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
                            <div class="experiment-item">
                                <div class="moneta-55-regular title">
                                    P5.JS SKETCHES
                                </div>
                                <div class="link-wrapper">
                                    <a href="#" class="btn" target="_blank">
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
        cursor: pointer;
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
        height: utils.pxToRem(118);
        background-color: variables.$textColor;
    }

    a {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: none;
    }
}

.bottom-panel {
    padding-bottom: utils.pxToVH(140);
}
</style>