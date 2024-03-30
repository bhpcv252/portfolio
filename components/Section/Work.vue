<script setup lang="ts">



</script>

<template>
    <div class="work" id="work">
        <div class="container">
            <h2>
                Work
            </h2>
            <div class="list-wrapper">
                <div class="work-list">
                    <div class="work-item">
                        <a href="https://www.equinoxvilla.com/"
                            class="moneta-55-regular hover-item hover-line origin-center">Equinox Villa</a>
                    </div>
                    <div class="work-item">
                        <a href="https://www.tlnthub.com/"
                            class="moneta-55-regular hover-item hover-line origin-center">TLNTHUB</a>
                    </div>
                    <div class="work-item">
                        <a href="https://www.bluestreakmath.com/"
                            class="moneta-55-regular hover-item hover-line origin-center">Bluestreak Math</a>
                    </div>
                    <div class="work-item">
                        <a href="https://weareher.com/dm-slider/"
                            class="moneta-55-regular hover-item hover-line origin-center">DM Slider - Her App</a>
                    </div>
                </div>
                <div class="grotesk-22-light more">
                    <span>and many more...</span>
                    <a href="mailto:sayhellotosonu@gmail.com" target="_blank">contact me to learn more about my work</a>
                </div>
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
    text-align: center;
    display: grid;
    align-content: space-between;
}

h2 {
    margin: utils.pxToVH(variables.$baseTopMargin) 0 0;
}

.work-list {
    display: grid;
    gap: utils.pxToRem(35);

    a {
        display: inline-block;
    }
}

.more {
    margin: utils.pxToVH(98) 0 utils.pxToVH(120);
    display: grid;
    justify-items: center;
    cursor: pointer;
    position: relative;
    padding-bottom: calc(utils.pxToRem(3) + 1px);
    overflow: hidden;

    span {
        visibility: visible;
        opacity: 1;
        transition: visibility 0.5s variables.$easeSmooth, opacity 0.5s variables.$easeSmooth;
    }

    a {
        display: inline-block;
        position: absolute;
        padding-bottom: utils.pxToRem(3);
        transform: translate3d(0, 100%, 0);
        visibility: hidden;
        opacity: 0;
        transition: visibility 0.5s variables.$easeSmooth, opacity 0.5s variables.$easeSmooth, transform 0.5s variables.$easeSmooth;

        &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            height: 1px;
            width: 100%;
            background-color: variables.$textColor;
        }
    }

    &:hover {

        span {
            visibility: hidden;
            opacity: 0;
            transition: visibility 0.5s variables.$easeSmooth, opacity 0.5s variables.$easeSmooth;
        }

        a {
            visibility: visible;
            opacity: 1;
            transform: translate3d(0, 0%, 0);
            transition: visibility 0.5s variables.$easeSmooth, opacity 0.5s variables.$easeSmooth, transform 0.5s variables.$easeSmooth;
        }
    }
}
</style>