<script setup lang="ts">



</script>

<template>
    <div class="about">
        <div class="container">
            <GridRow class="full-height">
                <GridCol :from="2" :to="6">
                    <div class="left-panel">
                        <img src="~/assets/images/about-thumb.png" alt="About" />
                        <h2 class="split-heading">
                            About
                            <div class="moneta-55-regular">Me</div>
                        </h2>
                        <a href="#" class="btn" target="_blank">
                            <span>
                                Email Me
                            </span>
                            <span class="icon external">
                                <SvgoArrowRightLight />
                            </span>
                        </a>
                    </div>
                </GridCol>

                <GridCol :from="7" :to="12" class="align-bottom">
                    <div class="right-panel">
                        <p>
                            But I must explain to you how all this mistaken idea of denouncing pleasure and praising
                            pain was born and I will give you a complete account of the system, and expound the actual
                            teachings of the great explorer of the truth, the master-builder of human happiness.
                        </p>
                        <p>
                            But I must explain to you how all this mistaken idea of denouncing pleasure and praising
                            pain was born and I will give you a complete account of the system, and expound the actual
                            teachings of the great explorer of the truth, the master-builder of human happiness.
                        </p>
                    </div>
                </GridCol>
            </GridRow>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    height: 100vh;
    position: relative;
}

.full-height {
    height: 100%;

    .align-bottom {
        align-self: flex-end;
    }
}

.left-panel {
    padding-top: utils.pxToRem(223);

    img {
        position: absolute;
        top: utils.pxToRem(150);
        left: utils.pxToRem(180);
        width: utils.pxToRem(153);
    }

    h2 {
        margin-bottom: utils.pxToRem(122);
        position: relative;
    }
}

.right-panel {
    padding-bottom: utils.pxToRem(163);

    p {
        &:nth-child(1) {
            margin-bottom: utils.pxToRem(54);
            padding-right: utils.pxToRem(variables.$baseColSize);
        }

        &:nth-child(2) {
            padding-left: utils.pxToRem(variables.$baseColSize);
        }
    }
}
</style>