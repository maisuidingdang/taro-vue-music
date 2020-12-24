<template>
  <view :class="cls">
    <image class="title_components__logo" :src="Logo" mode='aspectFit' />
  </view>
</template>

<script>
import classnames from "classnames";
import Logo from "@/assets/images/logo.png";
export default {
  name: "Z_Title",
  props: {
    isFixed: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    cls() {
      const { isFixed } = this;
      return classnames({
        title_components: true,
        fixed: this.isFixed,
      });
    },
  },
  data() {
    return {
      Logo,
    };
  },
};
</script>
<style lang="scss">
@import "../../assets/taro-ui_#E93B3D/custom-theme.scss";
.title_components {
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: 100%;
  height: 128px;
  background-color: $color-brand;
  box-sizing: border-box;
  &.fixed{
      position: fixed;
  }
  .title_components__logo{
      width: 284px;
      height: 50px;
  }
}
</style>

