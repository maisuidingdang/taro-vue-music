<template>
  <view>
    <at-tabs :current="current" :tabList="tabList" :onClick="handleClick">
      <at-tabs-pane :current="current" :index="0">
        <swiper
          class="test-h"
          indicator-dots="#999"
          indicator-active-color="#333"
          :autoplay="true"
          circular
        >
          <swiper-item v-for="item in banners" :key="item.bannerId">
            <image
              class="img"
              mode="scaleToFill"
              :src="`${item.pic}?imageView&thumbnail=0x300`"
              @tap="clickBanner(item)"
            />
          </swiper-item>
        </swiper>
        <view class="recommend_playlist">
          <view class="recommend_playlist__title"> 推荐歌单 </view>
          <view
            class="recommend_playlist__content"
            v-if="recommendPlayList.length"
          >
            <list-item
              v-for="item in recommendPlayList"
              :key="item.id"
              :item="item"
            />
            <!-- <view
              v-for="item in recommendPlayList"
              :key="item.id"
              class="recommend_playlist__item"
              :onClick="goDetail"
            >
              <image
                :src="`${item.picUrl}?imageView&thumbnail=0x200`"
                class="recommend_playlist__item__cover"
              />
              <view class="recommend_playlist__item__cover__num">
                <text class="at-icon at-icon-sound"> </text>
                {{ item.playCount }}
              </view>
              <view class="recommend_playlist__item__title">
                {{ item.name }}
              </view>
            </view> -->
          </view>
        </view>
      </at-tabs-pane>

      <at-tabs-pane :current="current" :index="1">
        <view class="recommend_playlist">
          <view class="recommend_playlist__title"> 主播电台 </view>
          <view class="recommend_playlist__content">
            <list-item
              v-for="item in recommendDj"
              :key="item.id"
              :item="item"
            />
            <!-- <view
              v-for="item in recommendDj"
              :key="item.id"
              class="recommend_playlist__item"
              :onClick="goDetail"
            >
              <image
                :src="`${item.picUrl}?imageView&thumbnail=0x200`"
                class="recommend_playlist__item__cover"
              />
              <view class="recommend_playlist__item__title">
                {{ item.name }}
              </view>
            </view> -->
          </view>
        </view>
      </at-tabs-pane>
    </at-tabs>
    <c-music :songInfo='songInfo'></c-music>
  </view>
</template>

<script>
import Taro from "@tarojs/taro";
import {mapState} from 'vuex';
import { AtTabs, AtTabsPane } from "taro-ui-vue";
import {
  getRecommendPlayListDao,
  getRecommendDjDao,
  getBannerDao,
  getRecommendSongsDao,
} from "@/services/index";
import CMusic from "@/components/CMusic";
import ListItem from "./components/list-item";
import "./index.scss";

export default {
  computed: {
    songInfo(){
      console.log(888,this.$store)
      return this.$store.state.song
    }
  },
  data() {
    this.tabList = [{ title: "个性推荐" }, { title: "主播电台" }];

    return {
      current: 0,
      banners: [],
      recommendPlayList: [],
      recommendDj: [],
      recommendSongs: [],
    };
  },
  mounted() {
    this.getBanner();
    this.getRecommendPlayList();
    this.getRecommendSongs();
    this.getRecommendDj();
  },
  methods: {
    goDetail() {
      console.log("goDetail click");
    },
    handleClick(val) {
      console.log("tab click", val);
      this.current = val;
    },
    clickBanner(banner) {
      console.log("banner click", banner);
      switch (banner.targetType) {
        case 1:
          Taro.navigateTo({
            url: `/pages/playSong/index?id=${banner.targetId}`,
          });
          break;
        case 10:
          Taro.navigateTo({
            url: `/pages/playList/index?id=${banner.targetId}&name=${banner.typeTitle}`,
          });
          break;
        case 3000:
          Taro.navigateTo({
            url: `/pages/webview/index?name=${banner.typeTitle}&url=${banner.url}`,
          });
          break;
      }
    },
    getBanner() {
      getBannerDao().then((res) => {
        this.banners = res.banners;
      });
    },
    getRecommendPlayList() {
      getRecommendPlayListDao().then((res) => {
        this.recommendPlayList = res.result;
      });
    },
    getRecommendDj() {
      getRecommendDjDao().then((res) => {
        this.recommendDj = res.result;
      });
    },
    getRecommendSongs() {
      getRecommendSongsDao().then((res) => {
        console.log(123, res);
        this.recommendSongs = res.data;
      });
    },
  },
  components: {
    "at-tabs": AtTabs,
    "at-tabs-pane": AtTabsPane,
    "list-item": ListItem,
    "c-music": CMusic,
  },
};
</script>
<style lang="scss">
@import "~taro-ui-vue/dist/style/variables/default.scss";
@import "../../assets/taro-ui_#E93B3D/custom-theme.scss";

.at-tabs__header {
  background: $color-brand;
  color: $color-white;
}
.at-tabs__item,
.at-tabs__item--active {
  color: $color-white;
}

.at-tabs__item-underline {
  background: $color-white;
  height: 2px * $hd;
  width: 30px * $hd;
  bottom: $spacing-v-sm;
  left: 80px * 2;
  border-radius: 6px * $hd;
}

.recommend_playlist {
  padding: 20px * $hd;
  overflow: hidden;
  .recommend_playlist__title {
    margin-bottom: $spacing-v-xl;
  }
  .recommend_playlist__content {
    .recommend_playlist__item {
      float: left;
      position: relative;
      width: 32%;
      margin-bottom: $spacing-v-xl;
      &:nth-child(3n-1) {
        margin: 0 2% $spacing-v-xl 2%;
      }
    }
    .recommend_playlist__item__cover {
      display: block;
      width: 100%;
      height: 200px;
      border-radius: 12px;
    }
    .recommend_playlist__item__cover__num {
      display: flex;
      align-items: center;
      position: absolute;
      right: $spacing-h-sm;
      top: 0;
      font-weight: 700;
      font-size: $font-size-xs;
      z-index: 3;
      color: $color-white;
      .at-icon-sound {
        margin-right: $spacing-h-sm;
      }
    }
  }
  .recommend_playlist__item__title {
    display: -webkit-box;
    overflow: hidden;
    font-size: $font-size-sm;
    margin-top: $spacing-v-sm;
    height: 72px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}

.img {
  width: 100%;
  height: 150px * $hd;
}
</style>
