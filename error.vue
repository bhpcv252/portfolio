<script setup lang="ts">
import type { NuxtError } from "#app";

const { isDesktop } = useDevice();

const props = defineProps({
  error: Object as () => NuxtError,
});

useHead({
  title: `${props.error?.statusCode}: ${props.error?.statusMessage} - Sonu's Portfolio`,
});

const isHovering: Ref<boolean> = ref(false);
</script>

<template>
  <div class="container" v-if="isDesktop">
    <h2>{{ error?.statusCode }}</h2>
    <p class="moneta-195-bold message">
      {{ error?.statusCode === 404 ? "Page Not Found" : error?.statusMessage }}
    </p>
    <GridRow>
      <GridCol :from="6" :to="8">
        <div class="centered-wrapper">
          <p class="para-top">Nothing to see here except a cat chilling</p>
          <!-- Using opacity to avoid flickering -->
          <div class="img-wrapper">
            <img
              src="~/assets/images/cat-screaming.png"
              alt="Cat screaming to stop you"
            />
            <img
              src="~/assets/images/cat-normal.png"
              alt="Cat looking at you"
              :class="{ hide: isHovering }"
            />
          </div>
          <p class="para-bottom">
            Keep looking or
            <NuxtLink
              to="/"
              @mouseover="isHovering = true"
              @mouseleave="isHovering = false"
              >go home
            </NuxtLink>
          </p>
        </div>
      </GridCol>
    </GridRow>
    <PlusIcon class="top-right" />
    <PlusIcon class="bottom-left" />
  </div>
  <MobileInfo v-else />
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  height: 100vh;
  display: grid;
  align-items: center;
}

h2,
.message {
  position: absolute;
}

h2 {
  top: utils.pxToRem(30);
  left: utils.pxToRem(30);
}

.message {
  bottom: utils.pxToRem(30);
  right: utils.pxToRem(30);
  line-height: 1;
}

.centered-wrapper {
  text-align: center;
  display: grid;
  justify-items: center;
  gap: utils.pxToRem(45);
  transform: translate(0, utils.pxToRem(-80));
}

.img-wrapper {
  width: utils.pxToRem(254);
  height: utils.pxToRem(287);
  position: relative;

  img {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    object-fit: cover;

    &.hide {
      opacity: 0;
      visibility: hidden;
    }
  }
}

a {
  display: inline-block;
  position: relative;
  padding-bottom: utils.pxToRem(3);

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 1px;
    width: 100%;
    background-color: variables.$textColor;
  }
}
</style>
