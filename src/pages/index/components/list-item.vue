<!-- list item -->
<template>
  <view class="recommend_playlist__item" @tap="goDetail">
    <image
      :src="`${item.picUrl}?imageView&thumbnail=0x200`"
      class="recommend_playlist__item__cover"
    />
    <view v-if="!!item.playCount" class="recommend_playlist__item__cover__num">
      <text class="at-icon at-icon-sound"> </text>
      {{ item.playCount }}
    </view>
    <view class="recommend_playlist__item__title">
      {{ item.name }}
    </view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro";
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },

  methods: {
    goDetail() {
      const { item } = this;
      Taro.navigateTo({
        url: `/pages/playList/index?id=${item.id}&name=${item.name}`,
      });
    },
  },
};
</script>
<style lang='scss' scoped>
</style>