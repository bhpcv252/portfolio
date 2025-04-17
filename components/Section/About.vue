<script setup lang="ts"></script>

<template>
  <div class="about" id="about">
    <div class="container">
      <GridRow class="full-height">
        <GridCol :from="2" :to="6">
          <div class="left-panel">
            <h2 class="split-heading">
              <img src="~/assets/images/about-thumb.png" alt="About" />
              <span>About</span>
              <div class="moneta-55-regular">Me</div>
            </h2>
            <a
              href="mailto:sayhellotosonu@gmail.com"
              class="btn"
              target="_blank"
            >
              <span> Email Me </span>
              <span class="icon external">
                <SvgoArrowRightLight />
              </span>
            </a>
          </div>
        </GridCol>

        <GridCol :from="7" :to="12" class="align-bottom">
          <div class="right-panel">
            <p>
              I'm a <em>software developer</em> with a passion for building both
              web and software solutions that actually work. Over the years,
              I’ve had the chance to team up with awesome clients like Equinox,
              Calibrate and Tlnthub, bringing their digital visions to life with
              my expertise.
            </p>
            <p>
              I believe in building systems that truly add value, not just
              function. Whether it's a sleek, intuitive interface or a backend
              that runs like clockwork, I like creating solutions that solve
              problems and make life easier.
            </p>
          </div>
        </GridCol>
      </GridRow>
      <PlusIcon class="bottom-right" />
      <PlusIcon class="bottom-left" />
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
  padding-top: utils.pxToVH(223);

  h2 {
    margin-bottom: utils.pxToRem(122);
    position: relative;

    img {
      position: absolute;
      top: utils.pxToRem(-103);
      left: utils.pxToRem(-5);
      width: utils.pxToRem(153);
    }

    span {
      position: relative;
    }
  }
}

.right-panel {
  padding-bottom: utils.pxToVH(163);

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
