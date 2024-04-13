<script setup lang="ts">



</script>

<template>
    <div class="info">
        <Title>Home</Title>
        <div class="page-wrapper">
            <div class="info-content">
                <h1>
                    <div>Sonu</div>
                    <div class="line"></div>
                    <div>Singh</div>
                </h1>
                <div class="heading-wrapper">
                    <h2>
                        Uh Oh...
                    </h2>
                    <img src="~/assets/images/cat-surprised.png" alt="" />
                    <PlusIcon class="plus-icon" />
                </div>
                <div class="content-wrapper">
                    <p class="info-para">
                        Try this website on a desktop for the best experience
                    </p>
                    <p class="secondary">
                        or checkout my
                    </p>
                    <a href="https://github.com/bhpcv252" class="btn" target="_blank">
                        <span>
                            Github
                        </span>
                        <span class="icon external">
                            <SvgoArrowRightLight />
                        </span>
                    </a>
                    <p class="secondary">
                        OR
                    </p>
                    <a href="mailto:sayhellotosonu@gmail.com" class="anchor-line" target="_blank">
                        Email Me
                    </a>
                    <div class="website-icon-wrapper">
                        <SvgoWebsiteIconMobile />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.page-wrapper {


    @media (min-width: #{variables.$baseMobileWidth + 1}px) {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: rgba(variables.$textColor, 0.1);
    }
}


.info-content {
    padding: 20px;
    max-width: #{variables.$baseMobileWidth}px;
    margin: 0 auto;
    width: 100%;
    overflow: hidden;
    background-color: variables.$bgColor;


    @media (min-width: #{variables.$baseMobileWidth + 1}px) {
        width: #{variables.$baseMobileWidth}px;
        box-shadow: 0 7px 29px 0 rgba(100, 100, 111, 0.2);
    }
}

h1 {
    font-size: 36px;
    opacity: 0.2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px 0;
    gap: 10px;
    font-weight: bold;

    span {
        display: inline-block;
    }

    .line {
        height: 1px;
        width: 100%;
        background-color: variables.$textColor;
    }
}

p {
    font-size: 18px;
    line-height: 24px;

    &.secondary {
        font-size: 16px;
        opacity: 0.5;
    }
}

h2,
.h2 {
    font-size: 90px;
    line-height: 80px;
}

.heading-wrapper {
    margin: 88px 0 12px;
    position: relative;
    padding-bottom: 70px;

    h2 {
        width: 285px;
        height: 160px;
        position: relative;
        z-index: 10;
    }

    img {
        position: absolute;
        top: 37px;
        right: 10px;
        width: 162px;
        height: 183px;
        object-fit: cover;
    }

    .plus-icon {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 60px;
        height: 60px;
        transform: translate(50%, 50%);
    }
}

.content-wrapper {
    text-align: center;

    .info-para {
        width: 260px;
        margin: 0 auto;
    }

    .secondary {
        margin: 31px 0 17px;
    }

    .btn {
        font-size: 36px;
        line-height: 36px;
        padding: 14px 17px 10px 22px;

        .icon {
            width: 34px;
        }

    }

    .anchor-line {
        position: relative;
        font-size: 18px;
        line-height: 24px;

        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 1px;
            background-color: variables.$textColor;
        }
    }

    .website-icon-wrapper {
        width: 120px;
        margin: 77px auto 90px;
    }
}
</style>