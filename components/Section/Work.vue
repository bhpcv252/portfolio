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
                        <a href="https://www.equinoxvilla.com/" class="moneta-55-regular hover-item hover-line origin-center">Equinox Villa</a>
                    </div>
                    <div class="work-item">
                        <a href="https://www.tlnthub.com/" class="moneta-55-regular hover-item hover-line origin-center">TLNTHUB</a>
                    </div>
                    <div class="work-item">
                        <a href="https://www.bluestreakmath.com/" class="moneta-55-regular hover-item hover-line origin-center">Bluestreak Math</a>
                    </div>
                    <div class="work-item">
                        <a href="https://weareher.com/dm-slider/" class="moneta-55-regular hover-item hover-line origin-center">DM Slider - Her App</a>
                    </div>
                </div>
                <div class="grotesk-22-light more">and many more...</div>
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
}
</style>