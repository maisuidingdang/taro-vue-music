import {
  getSongDetailDao,
  getSongUrlDao,
  getLyricDao,
  getLikelistDao,
  doLikeMusicDao
} from "@/services/store_index";
import { parse_lrc } from "@/utils";
export default {
  namespaced: true,
  state: {
    canPlayList: [],
    currentSongId: "",
    currentSongInfo: {
      id: 0,
      name: "",
      ar: [],
      al: {
        picUrl: "",
        name: ""
      },
      url: "",
      lrcInfo: "",
      dt: 0, // 总时长，ms
      st: 0 // 是否喜欢
    },
    currentSongIndex: 0,
    playMode: "loop",
    likeMusicList: [],
    isPlaying: false,
    recentTab: 0
  },
  mutations: {
    updateState(state, { key, payload }) {
      //   Object.assign(state, payload);
      state[key] = payload;
    }
  },
  actions: {
    async getSongInfoAction({ dispatch, commit }, { id }) {
      let [songDetail, songUrl, lyric] = await Promise.all([
        getSongDetailDao(id),
        getSongUrlDao(id),
        getLyricDao(id)
      ]).then(res => res);
      // console.log(66666, dispatch, commit);
      const lrc = parse_lrc(
        lyric.lrc && lyric.lrc.lyric ? lyric.lrc.lyric : ""
      );

      const songInfo = {
        ...songDetail.songs[0],
        ...{
          url: songUrl.data[0].url,
          lrcInfo: {
            lrclist: lrc.now_lrc,
            scroll: lrc.scroll ? 1 : 0
          }
        }
      };

      commit("updateState", { key: "currentSongInfo", payload: songInfo });
    }
  }
};
