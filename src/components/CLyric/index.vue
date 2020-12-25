<!--  -->
<template>
  <!-- :style="{overflow:lrc.scroll && !lrc.nolyric &&!lrc.uncollected ?'auto':'hidden'}"Î -->
  <view class="song__lyric_components" :class="hidden&&'showLyric'">
    <view class="song__lyric__wrap">
      <view v-if="lrc.nolyric && lrc.uncollected" class="song__lyric__notext"
        >纯音乐，无歌词</view
      >
      <view
        v-if="lrc.scroll && !lrc.nolyric && !lrc.uncollected"
        class="song__lyric__notext"
        >*歌词不支持滚动*</view
      >
      <view v-if="lrc.uncollected && !lrc.nolyric" class="song__lyric__notext"
        >暂无歌词</view
      >
      <view
        v-for="(item, index) in lrc.lrclist"
        :key="item.lrc_sec"
        class="song__lyric__text"
        :class="lrcCls(index)"
        :data-time='item.lrc_sec'
      >
        {{ item.lrc_text }}</view
      >
    </view>
  </view>
</template>

<script>
export default {
  props: {
    lrc: {
      type: Object,
      default() {
        return {
          nolyric: false,
          uncollected: false,
          lrclist: [],
        };
      },
    },
    lrcIndex: {
      type: Number,
      default: 0,
    },
    showLyric: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },

  components: {},

  computed: {
    lyricClass() {
      //   let res = ''
      //   if() {
      //       res+='song__lyric__text--current'
      //   }
      //   return res
    },
  },

  mounted: {},

  methods: {
    lrcCls(index) {
      let res = "";
      const { lrcIndex, lrc } = this;
      if (index === lrcIndex && !lrc.scroll) {
        res += " song__lyric__text--current";
      }
      if (
        index === lrcIndex - 7 ||
        index === lrcIndex + 7 ||
        index === lrcIndex - 6 ||
        index === lrcIndex + 6
      ) {
        res += " siblings2";
      }

      if (index === lrcIndex - 5 || index === lrcIndex + 5) {
        res += " siblings1";
      }
      console.log(res)
      return res;
    },
  },
};
</script>
<style lang='scss' scoped>
@import "~taro-ui-vue/dist/style/variables/default.scss";

.song__lyric_components{
    position: absolute;
    left: 60px;
    top: 20px;
    right: 60px;
    bottom: 260px;
    text-align: center;
    color: $color-white;
    overflow: hidden;
    // background: chocolate;
    &.hidden{
        opacity: 0;
        z-index: -1;
        pointer-events:none
    }
    .song__lyric__wrap{
        position: absolute;
        top: 50%;
        width: 100%;
        font-size: 40px;
        text-align: center;
        transform: translateY(-50%);
        transition: all ease 1s;
    }
    .song__lyric__text{
        width: 100%;
        height: 72px;
        line-height: 1.2;
        opacity: .5;
        overflow: hidden;
        text-align: center;
        font-size: 28px;
        transition: all ease .5s;
        word-break:break-all;
        &.song__lyric__text--current{
            opacity: 1;
            font-size: 32px;
        }
        &.siblings1{
            opacity: .3;
        }
        &.siblings2{
            opacity: .1;
        }

    }
}
</style>