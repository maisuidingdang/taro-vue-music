<template>
  <view class="song_container">
    <image
      class="song__bg"
      :src="currentSongInfo.al.picUrl + '?imageView&thumbnail=368x368'"
    ></image>
    <view class="song__music" :class="showLyric && 'hidden'">
      <view class="song__music__main" :class="isPlaying && 'playing'">
        <image
          class="song__music__main--before"
          :src="require('../../assets/images/aag.png')"
        ></image>
        <view class="song__music__main__cover">
          <view
            class="song__music__main__img circling"
            :class="isPlaying && 'z-pause'"
          >
            <image
              class="song__music__main__img__cover"
              :src="`${currentSongInfo.al.picUrl}?imageView&thumbnail=368x368`"
            />
          </view>
        </view>
      </view>
      <view class="song__music__lgour" :onClick="showLyric">
        <view
          class="song__music__lgour__cover circling"
          :class="isPlaying && 'z-pause'"
        >
        </view>
      </view>
    </view>
    <view
      v-if="showLyric && lrc.lrclist.length > 0"
      class="active-lyric"
    ></view>
    <view class="tools" :class="showLyric">
      <image
        :src="
          star
            ? require('../../assets/images/song/play_icn_loved.png')
            : require('../../assets/images/song/play_icn_love.png')
        "
        class="img"
        :onClick="lickMusic"
      />
      <view class="icon iconfont icon-icon--"></view>
      <view class="icon iconfont icon-zhuanjiguangpan"></view>
      <view class="icon iconfont icon-pinglun"></view>
      <view class="icon iconfont icon-gengduo"></view>
    </view>
    <view class="song__time">
      <text class="time-left">
        {{ timeLengthFormator(currentyTime * 1000) }}
      </text>
      <slider
        :value="playPercent"
        :step="0.01"
        activeColor="#d43c33"
        blockColor="#fff"
        :block-size="24"
        :onChange="percentChange"
        :onChanging="percentChanging"
      />
      <text class="time-right">
        {{ timeLengthFormator(currentSongInfo.dt) }}
      </text>
    </view>
    <c-lyric :lrc="lrc" :lrcIndex="lrcIndex" :showLyric="showLyric" />
    <view class="song__bottom">
      <view class="song__operation">
        <image class="song__operation__mode" :src="playModeImg" />
        <image
          class="song__operation__prev"
          :src="require('@/assets/images/ajh.png')"
        />
        <image
          v-if="isPlaying"
          class="song__operation__play"
          :src="require('@/assets/images/ajd.png')"
        />
        <image
          v-else
          class="song__operation__play"
          :src="require('@/assets/images/ajf.png')"
        />
        <image
          class="song__operation__next"
          :src="require('@/assets/images/ajh.png')"
        />
        <view class="icon iconfont icon-chukou"></view>
      </view>
    </view>
  </view>
</template >
<script>
import Taro from "@tarojs/taro";
import { timeLengthFormator } from "@/utils";
import { getCurrentInstance } from "@tarojs/runtime";
import { mapState, mapActions } from "vuex";
import Clyric from "@/components/CLyric";

const backgroundAudioManager = Taro.getBackgroundAudioManager();

export default {
  computed: {
    songInfo() {
      return this.$store.state.song;
    },
    isPlaying() {
      return this.songInfo.isPlaying;
    },
    currentSongInfo() {
     // console.log(6669, this.songInfo.currentSongInfo);
      const csi = this.songInfo.currentSongInfo;
      Object.assign(this.lrc,csi.lrcInfo);
      return this.songInfo.currentSongInfo;
    },
    playModeImg() {
      let { playMode } = this.songInfo;
      let img = require("@/assets/images/song/icn_loop_mode.png");
      if (playMode === "one") {
        img = require("@/assets/images/song/icn_one_mode.png");
      } else if (playMode === "shuffle") {
        img = require("@/assets/images/song/icn_shuffle_mode.png");
      }
      return img;
    },
  },
  data() {
    return {
      userInfo: Taro.getStorageSync("userInfo"),
      lyric: "",
      showLyric: true,
      lrc: {
        scroll: false,
        nolyric: false,
        uncollected: false,
        lrclist: [],
      },
      lrcIndex: 0,
      star: false,
      firstEnter: true,
      switchStar: false,
      playPercent: 0,
      currentyTime: 0,
      isOpened: false,
    };
  },
  onReady() {
    let { id } = getCurrentInstance().router.params;
    console.log(this.getSongInfoAction);
    this.getSongInfoAction({ id });
  },
  methods: {
    showLyric() {
      console.log("showLyric");
    },
    lickMusic() {
      console.log("lickMusic");
    },
    percentChange() {
      console.log("percentChange");
    },
    percentChanging() {
      console.log("percentChanging");
    },
    timeLengthFormator(num) {
      return timeLengthFormator(num);
    },

    ...mapActions("song", ["getSongInfoAction"]),
  },
  components: {
    "c-lyric": Clyric,
  },
};
</script>
<style lang="scss">
@import "~taro-ui-vue/dist/style/variables/default.scss";


.song_container {
  overflow: hidden;
  .song__bg {
    transform: scale(1.2);
    transform-origin: center top;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    width: 100%;
    height: 100%;
    filter: blur(30px) brightness(0.8);
    overflow: hidden;
    z-index: -1;
    transition: opacity 0.3s linear;
    &:after {
      content: " ";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      background-color: rgba(255, 255, 255, 0.5);
    }
  }
  .song__music {
    position: relative;
    width: 592px;
    height: 592px;
    margin: 140px auto 0;
    &.hidden {
      display: none;
    }
    .song__music__main {
      position: relative;
      width: 100%;
      height: 100%;
      &.playing {
        .song__music__main--before {
          transform: rotate(0deg);
        }
      }
      &:after {
        content: " ";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 2;
        background: url(//s3.music.126.net/m/s/img/disc-ip6.png?69796123ad7cfe95781ea38aac8f2d48)
          no-repeat;
        background-size: contain;
      }
      .song__music__main--before {
        position: absolute;
        width: 222px;
        height: 366px;
        top: -200px;
        left: 240px;
        background-size: contain;
        background-repeat: no-repeat;
        transform-origin: 60px 60px;
        z-index: 5;
        transition: all 1.5s;
        transform: rotate(-20deg);
      }
      .song__music__main__cover {
        position: absolute;
        width: 368px;
        height: 368px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
        overflow: hidden;
        .song__music__main__img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          background: url(//s3.music.126.net/m/s/img/disc_default.png?7c9b3ad…)
            no-repeat;
          background-size: contain;
          .song__music__main__img__cover {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .song__music__lgour {
      position: absolute;
      width: 592px;
      height: 592px;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 3;
      .song__music__lgour__cover {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 3;
        background: url(//s3.music.126.net/m/s/img/disc_light-ip6.png?996fc8a2bc62e1ab3f51f135fc459577)
          no-repeat;
        background-size: contain;
      }
    }
  }

  .active-lyric {
    text-align: center;
    color: #fff;
  }
  .tools {
    position: absolute;
    bottom: 230px;
    width: 550px;
    display: flex;
    padding: 40px 100px;
    align-items: center;
    justify-content: space-between;
    &.hidden {
      display: none;
    }
    .icon {
      color: #fff;
      font-size: 52px;
    }
    .img {
      width: 80px;
      height: 80px;
    }
  }
  .song__time {
    width: 650px;
    position: absolute;
    bottom: 160px;
    left: 50px;
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 28px;
    .time-left {
      position: absolute;
      display: flex;
      top: -78px;
      width: 100px;
    }
    .time-right {
      position: absolute;
      display: flex;
      right: 0;
      width: 100px;
      text-align: right;
    }
    slider,
    .weui-slider-box {
      box-sizing: border-box;
      width: 650px;
      padding: 0 80px;
    }
  }
  .song__bottom {
    position: absolute;
    padding: 40px 0;
    bottom: 0;
    width: 100%;
    height: 200px;
    box-sizing: border-box;
    .song__operation {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .song__operation__mode {
        width: 100px;
        height: 100px;
        position: absolute;
        left: 30px;
        top: 14px;
      }
      .song__operation__prev {
        width: 60px;
        height: 60px;
      }
      .song__operation__play {
        width: 120px;
        height: 120px;
        margin: 0 50px;
      }
      .song__operation__next {
        width: 60px;
        height: 60px;
      }
      .song__operation__like {
        width: 100px;
        height: 100px;
        position: absolute;
        right: 40px;
        top: 14px;
      }
      .icon-chukou {
        position: absolute;
        right: 50px;
        font-size: 60px;
        color: #fff;
      }
    }
  }
}
</style>