<script setup lang="ts">



</script>

<template>
    <div class="contact" id="contact">
        <div class="container">
            <div class="top-panel">
                <GridRow>
                    <GridCol :from="2" :to="7">
                        <h2>
                            <img src="~/assets/images/say-hello.png" alt="Say Hello" />
                            <span>Say Hello</span>
                        </h2>
                    </GridCol>
                </GridRow>
                <GridRow class="para-wrapper">
                    <GridCol :from="8" :to="12">
                        <p>
                            But I must explain to you how all this mistaken idea of denouncing pleasure and praising
                            pain
                            was born and I will give you a complete account of the system, and expound the actual
                            teachings
                            of the great explorer of the truth, the master-builder of human happiness
                        </p>
                    </GridCol>
                </GridRow>
                <div class="link-wrapper">
                    <a href="#" class="btn" target="_blank">
                        <span>
                            Email Me
                        </span>
                        <span class="icon external">
                            <SvgoArrowRightLight />
                        </span>
                    </a>
                </div>
            </div>
            <div class="footer">
                <div class="work-item hover-item hover-line">
                    <a href="#home" class="moneta-55-regular">Home</a>
                </div>
                <PlusIcon class="relative"/>
                <div class="work-item hover-item hover-line">
                    <a href="#about" class="moneta-55-regular">About</a>
                </div>
                <PlusIcon class="relative" />
                <div class="work-item hover-item hover-line">
                    <a href="#work" class="moneta-55-regular">Work</a>
                </div>
                <PlusIcon class="relative"/>
                <div class="work-item hover-item hover-line">
                    <a href="#experiments" class="moneta-55-regular">Experiments</a>
                </div>
            </div>
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
    margin: utils.pxToVH(variables.$baseTopMargin) 0 0;
    position: relative;

    img {
        position: absolute;
        bottom: utils.pxToRem(-142);
        right: utils.pxToRem(-120);
        width: utils.pxToRem(254);
    }

    span {
        position: relative;
    }
}

.para-wrapper {
    margin-top: utils.pxToRem(60);
}

.link-wrapper {
    margin-top: utils.pxToRem(90);
    text-align: center;
}

.footer {
    display: flex;
    justify-content: space-between;
    align-items: end;

    .icon-wrapper {
        transform: translate(0, 50%);
    }
}
</style>