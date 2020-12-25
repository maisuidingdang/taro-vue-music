<!--  -->
<template>
  <view v-if="songInfo">
    123123
    <view
      v-if="songInfo.currentSongInfo.name"
      class="music_components"
      :class="isHome && 'isHome'"
    >
    </view>
  </view>
</template>

<script>
export default {
  props: {
    isHome: {
      type: Boolean,
      default: false,
    },
    songInfo: {
      type: Object,
    },
  },

  mounted() {
    console.log(777, this);
  },

  data() {
    return {
      isOpened: false,
      currentSongInfo: this.songInfo.currentSongInfo,
    };
  },

  components: {},

  computed: {},

  methods: {},
};
</script>
<style lang='scss' scoped>
</style>