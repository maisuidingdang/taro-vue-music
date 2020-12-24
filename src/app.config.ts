export default {
  pages: [
    "pages/index/index",
    "pages/playSong/index",
    // "pages/my/index",
    "pages/playList/index",
    // "pages/recentPlay/index",
    // "pages/account/index",
    // "pages/userList/index",
    // "pages/myEvents/index",
    // "pages/myFans/index",
    // "pages/myFocus/index",
    "pages/login/index",
    // "pages/register/index",
    "pages/webview/index"
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#d43c33",
    navigationBarTitleText: "H5",
    navigationBarTextStyle: "white"
  },
  tabBar: {
    color: "#7A7E83",
    selectedColor: "#c73420",
    borderStyle: "black",
    backgroundColor: "#ffffff",
    list: [
      {
        text: "发现",
        pagePath: "pages/index/index",
        iconPath: "assets/images/music.png",
        selectedIconPath: "assets/images/selected-music.png"
      },
      {
        text: "我的",
        pagePath: "pages/index/index2",
        iconPath: "assets/images/love.png",
        selectedIconPath: "assets/images/selected-love.png"
      },
      {
        text: "账号",
        pagePath: "pages/index/index3",
        iconPath: "assets/images/me.png",
        selectedIconPath: "assets/images/selected-me.png"
      }
    ]
  },
  requiredBackgroundModes: ["audio"]
};
