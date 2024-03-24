<script setup lang="ts">



</script>

<template>
    <div class="banner">
        <div class="container">
            <PlusIcon class="center" />
            <h1>
                <div>Sonu</div>
                <div class="line"></div>
                <div>Singh</div>
            </h1>
            <div class="menu-wrapper">
                <div class="menu-info jump grotesk-22-light">
                    jump to...
                </div>
                <div class="menu-item item-1">
                    <img src="~/assets/images/work-thumb.png" alt="Work" />
                    <h3>Work</h3>
                </div>
                <div class="menu-item item-2">
                    <img src="~/assets/images/about-thumb.png" alt="About" />
                    <h3>About</h3>
                </div>
                <div class="menu-item item-3">
                    <img src="~/assets/images/experiments-thumb.png" alt="Experiments" />
                    <h3>Experiments</h3>
                </div>
                <div class="menu-item item-4">
                    <img src="~/assets/images/catch-me-thumb.png" alt="Catch Me" />
                    <h3>Catch Me</h3>
                </div>
                <div class="menu-info scroll grotesk-22-light">
                    or just...
                </div>
            </div>
            <div class="bottom-info">
                <div>
                    28.6139° N, 77.2090° E
                </div>
                <div>
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

    &>div {
        position: absolute;
    }

    .menu-item {
        cursor: pointer;

        img {
            margin-bottom: utils.pxToRem(82);
        }
    }

    .jump {
        top: utils.pxToVH(270);
        left: utils.placeAt(2);
    }

    .scroll {
        bottom: utils.pxToVH(118);
        right: utils.placeAt(2);
    }

    .item-1 {
        left: utils.placeAt(2);
        bottom: utils.pxToVH(258);

        img {
            width: utils.pxToRem(235);
        }
    }

    .item-2 {
        right: utils.placeAt(8);
        top: utils.pxToVH(270);
        text-align: right;

        img {
            width: utils.pxToRem(153);
            margin-right: 0;
            margin-left: auto;
        }
    }

    .item-3 {
        left: utils.placeAt(8);
        bottom: utils.pxToVH(118);

        img {
            width: utils.pxToRem(283);
        }
    }

    .item-4 {
        right: utils.placeAt(2);
        top: utils.pxToVH(357);
        text-align: right;

        img {
            width: utils.pxToRem(162);
            margin-right: 0;
            margin-left: auto;
        }
    }
}

.bottom-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: utils.pxToRem(variables.$basePadding);
    left: utils.pxToRem(variables.$basePadding);
    right: utils.pxToRem(variables.$basePadding);
}
</style>