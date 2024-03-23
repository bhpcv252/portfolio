<template>
    <div class="icon-wrapper">
        <span class="v"></span>
        <span class="h"></span>
    </div>
</template>

<style lang="scss" scoped>
.icon-wrapper {
    position: absolute;
    width: utils.pxToRem(60);
    height: utils.pxToRem(60);

    &.center {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    &.top-left {
        top: 0;
        left: 0;
    }

    &.top-right {
        top: 0;
        right: 0;
    }

    &.bottom-left {
        bottom: 0;
        left: 0;
    }

    &.bottom-right {
        bottom: 0;
        right: 0;
    }

    span {
        position: absolute;
        display: block;
        height: 1px;
        width: 100%;
        background-color: variables.$textColor;
        top: 50%;
        left: 0;
        transform: translate(0, -50%);
    }

    .v {
        transform: translate(0, -50%) rotateZ(90deg);
    }
}
</style>