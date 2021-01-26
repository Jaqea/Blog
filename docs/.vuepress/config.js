module.exports = {
  title: "Jaqea's Blog",
  description: "苦尽甘来不负众生而善之",
  base: "./Blog/",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
  ],
  theme: "reco",
  themeConfig: {
    type: "blog",
    valineConfig: {
      appId: "JgY8aNSBMv6EOIl2fTDobtyj-gzGzoHsz",
      appKey: "0naGBs1LxCYLPRoOoxrpOHeq",
      avatar: "wavatar",
      visitor: true,
      enableQQ: true,
      visitor: true,
    },
    nav: require("./nav"),
    sidebar: "auto",
    displayAllHeaders: true,
    blogConfig: {
      category: {
        location: 2,
        text: "分类",
      },
      tag: {
        location: 3,
        text: "标签",
      },
    },
    logo: "/logo.png",
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: "Last Updated",
    author: "Jaqea",
    authorAvatar: "/avatar.png",
    record: "蜀ICP备20005033号-1",
    startYear: "2020",
    friendLink: [
      {
        title: "午后南杂",
        desc: "Enjoy when you can, and endure when you must.",
        email: "1156743527@qq.com",
        link: "https://www.recoluan.com",
      },
      {
        title: "vuepress-theme-reco",
        desc: "A simple and beautiful vuepress Blog & Doc theme.",
        avatar:
          "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        link: "https://vuepress-theme-reco.recoluan.com",
      },
    ],
  },
  markdown: {
    lineNumbers: true,
  },
  plugins: [
    [
      "@vuepress-reco/vuepress-plugin-bgm-player",
      {
        position: {
          right: "10px",
          top: "20%",
        },
        autoShrink: true,
        shrinkMode: "mini",
        audios: [
          {
            name: "Starry",
            artist: "K kure",
            url:
              "https://m10.music.126.net/20210114233625/526469978a2822c45639e59d5a9fe79e/ymusic/ecf8/734b/d830/847ed67d1c27067adcc4f7ba1ee38801.mp3",
            cover:
              "http://p2.music.126.net/SLP_QsL6IwP-6g5JbIftCw==/109951162834852670.jpg?param=130y130",
          },
        ],
      },
    ],
    [
      "dynamic-title",
      {
        showIcon: "/favicon.ico",
        showText: "(/≧▽≦/)咦！又好了！",
        hideText: "(●—●)喔哟，崩溃啦！",
        recoverTimer: 2000,
      },
    ],
    [
      "ribbon",
      {
        size: 90,
        opacity: 0.8,
        zIndex: -1,
      },
    ],
    ["flowchart"],
    ["@vuepress/nprogress"], // 加载进度条
    ["reading-progress"], // 阅读进度条,
    [
      "@vuepress-reco/vuepress-plugin-kan-ban-niang",
      {
        theme: [
          "whiteCat",
          "blackCat",
          "haru1",
          "haru2",
          "haruto",
          "koharu",
          "izumi",
          "shizuku",
          "wanko",
          "miku",
          "z16",
        ],
        clean: false,
        messages: {
          welcome: "我是Jaqea欢迎你的关注 ",
          home: "心里的花，我想要带你回家。",
          theme: "好吧，希望你能喜欢我的其他小伙伴。",
          close: "再见哦",
        },
        info: "https://github.com/Jaqea",
        messageStyle: {
          left: "28px",
          bottom: "190px",
        },
        modelStyle: {
          left: "50px",
          bottom: "-20px",
          opacity: "0.9",
        },
        btnStyle: {
          left: "50px",
          bottom: "40px",
        },
      },
    ],
    [
      "cursor-effects",
      {
        size: 3, // size of the particle, default: 2
        shape: ["circle"], // shape of the particle, default: 'star'
        zIndex: 999999999, // z-index property of the canvas, default: 999999999
      },
    ],
  ],
  markdown: {
    lineNumbers: true,
  },
};
