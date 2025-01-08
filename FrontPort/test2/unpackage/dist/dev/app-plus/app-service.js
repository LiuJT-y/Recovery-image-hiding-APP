if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$3 = {
    methods: {
      choosesendpage() {
        uni.navigateTo({
          url: "/pages/index/send"
        });
      },
      choosereceivepage() {
        uni.navigateTo({
          url: "/pages/index/receive"
        });
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("view", { class: "choosesendpage" }, [
        vue.createElementVNode("button", {
          class: "choosesendpage",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.choosesendpage && $options.choosesendpage(...args))
        }, "进入发送页面")
      ]),
      vue.createElementVNode("view", { class: "choosereceivepage" }, [
        vue.createElementVNode("button", {
          class: "choosereceivepage",
          onClick: _cache[1] || (_cache[1] = (...args) => $options.choosereceivepage && $options.choosereceivepage(...args))
        }, "进入接收页面")
      ])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/Document/课程/专业综合设计/apk/test2/pages/index/index.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {
        successMessage: ""
        // 存储发送成功后的提示信息
      };
    },
    methods: {
      // 选择图片并上传到后端
      chooseImage() {
        uni.chooseImage({
          count: 1,
          // 设置最多选择图片数为 1
          success: (res) => {
            const filePaths = res.tempFilePaths;
            this.uploadImages(filePaths);
          },
          fail: () => {
            uni.showToast({
              title: "未选择图片",
              icon: "none"
            });
          }
        });
      },
      // 上传图片到后端接口
      uploadImages(filePaths) {
        filePaths.forEach((filePath) => {
          uni.uploadFile({
            url: "http://192.168.155.41:5000/encrypt_image",
            // 后端接口地址
            filePath,
            name: "file",
            // 与后端文件参数名称一致
            success: (uploadRes) => {
              try {
                const response = JSON.parse(uploadRes.data);
                if (response && response.status === "success") {
                  this.successMessage = "图片发送成功！";
                } else {
                  uni.showToast({
                    title: "发送失败，未返回有效结果",
                    icon: "none"
                  });
                }
              } catch (e) {
                uni.showToast({
                  title: "解析响应失败",
                  icon: "none"
                });
              }
            },
            fail: () => {
              uni.showToast({
                title: "发送失败，请检查网络或后端设置",
                icon: "none"
              });
            }
          });
        });
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "upload-section" }, [
        vue.createElementVNode("button", {
          class: "upload-button",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.chooseImage && $options.chooseImage(...args))
        }, "发送单张图片")
      ]),
      $data.successMessage ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "success-message"
      }, [
        vue.createElementVNode(
          "text",
          null,
          vue.toDisplayString($data.successMessage),
          1
          /* TEXT */
        )
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesIndexSend = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-04cb09be"], ["__file", "D:/Document/课程/专业综合设计/apk/test2/pages/index/send.vue"]]);
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const _sfc_main$1 = {
    data() {
      return {
        latestImageUrl: null,
        // 嵌入后的图像 URL
        decryptedImageUrl: null,
        // 解密后的图像 URL
        extractedData: [],
        // 嵌入的二进制信息
        decimalData: null
        // 转换为十进制的值
      };
    },
    methods: {
      /**
       * 获取最新嵌入图像
       */
      async fetchLatestImage() {
        try {
          uni.request({
            url: "http://192.168.155.41:5000/get_latest_image",
            method: "GET",
            responseType: "arraybuffer",
            // 接收二进制数据
            success: (res) => {
              if (res.statusCode === 200) {
                const base64 = this.arrayBufferToBase64(res.data);
                this.latestImageUrl = `data:image/jpeg;base64,${base64}`;
              } else {
                formatAppLog("error", "at pages/index/receive.vue:62", "获取嵌入图像失败:", res.statusCode);
              }
            },
            fail: (err) => {
              formatAppLog("error", "at pages/index/receive.vue:66", "获取嵌入图像时出错:", err);
            }
          });
        } catch (error) {
          formatAppLog("error", "at pages/index/receive.vue:70", "获取嵌入图像时出错:", error);
        }
      },
      /**
       * 解密图像并获取嵌入信息
       */
      async decryptImage() {
        try {
          uni.request({
            url: "http://192.168.155.41:5000/decrypt_latest_image",
            method: "GET",
            responseType: "arraybuffer",
            // 接收二进制数据
            success: (res) => {
              if (res.statusCode === 200) {
                const base64 = this.arrayBufferToBase64(res.data);
                this.decryptedImageUrl = `data:image/jpeg;base64,${base64}`;
                const embeddedDataHeader = res.header["X-Embedded-Data"] || "[]";
                this.extractedData = JSON.parse(embeddedDataHeader);
                if (this.extractedData.length > 0) {
                  this.decimalData = this.binaryToDecimal(this.extractedData);
                }
              } else {
                formatAppLog("error", "at pages/index/receive.vue:97", "解密图像失败:", res.statusCode);
              }
            },
            fail: (err) => {
              formatAppLog("error", "at pages/index/receive.vue:101", "解密图像时出错:", err);
            }
          });
        } catch (error) {
          formatAppLog("error", "at pages/index/receive.vue:105", "解密图像时出错:", error);
        }
      },
      /**
       * 将 ArrayBuffer 转换为 Base64 字符串
       * @param {ArrayBuffer} buffer
       * @returns {string}
       */
      arrayBufferToBase64(buffer) {
        let binary = "";
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
      },
      /**
       * 将二进制列表转换为十进制字符串
       * @param {Array} binaryList - 二进制列表
       * @returns {string} - 转换后的十进制字符串
       */
      binaryToDecimal(binaryList) {
        const groupedBinary = [];
        for (let i = 0; i < binaryList.length; i += 4) {
          groupedBinary.push(binaryList.slice(i, i + 4).join(""));
        }
        return groupedBinary.map((bin) => parseInt(bin, 2)).join("");
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", { id: "app" }, [
      vue.createElementVNode("h1", null, "接收端页面"),
      vue.createCommentVNode(" 嵌入图像部分 "),
      vue.createElementVNode("div", { class: "section" }, [
        vue.createElementVNode("h2", null, "嵌入后的图像"),
        vue.createElementVNode("button", {
          class: "button",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.fetchLatestImage && $options.fetchLatestImage(...args))
        }, "获取最新图像（获取图像后请等待几秒再点击解密）"),
        $data.latestImageUrl ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: "image-container"
        }, [
          vue.createElementVNode("img", {
            src: $data.latestImageUrl,
            alt: "嵌入图像"
          }, null, 8, ["src"])
        ])) : (vue.openBlock(), vue.createElementBlock("div", {
          key: 1,
          class: "message"
        }, [
          vue.createElementVNode("p", null, "尚未获取到嵌入图像。")
        ]))
      ]),
      vue.createCommentVNode(" 解密图像部分 "),
      vue.createElementVNode("div", { class: "section" }, [
        vue.createElementVNode("h2", null, "解密后的图像与嵌入信息"),
        vue.createElementVNode("button", {
          class: "button",
          onClick: _cache[1] || (_cache[1] = (...args) => $options.decryptImage && $options.decryptImage(...args))
        }, "解密该图像（解密可能需要花费更多时间，请不要重复点击）"),
        $data.decryptedImageUrl ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: "image-container"
        }, [
          vue.createElementVNode("img", {
            src: $data.decryptedImageUrl,
            alt: "解密图像"
          }, null, 8, ["src"]),
          vue.createElementVNode("div", { class: "info" }, [
            vue.createElementVNode(
              "p",
              null,
              "提取到的二进制信息为: " + vue.toDisplayString($data.extractedData.join(", ") || "未获取到嵌入信息"),
              1
              /* TEXT */
            ),
            $data.decimalData ? (vue.openBlock(), vue.createElementBlock(
              "p",
              { key: 0 },
              "其可能的十进制为: " + vue.toDisplayString($data.decimalData),
              1
              /* TEXT */
            )) : vue.createCommentVNode("v-if", true)
          ])
        ])) : (vue.openBlock(), vue.createElementBlock("div", {
          key: 1,
          class: "message"
        }, [
          vue.createElementVNode("p", null, "尚未解密图像。")
        ]))
      ])
    ]);
  }
  const PagesIndexReceive = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-a06b957f"], ["__file", "D:/Document/课程/专业综合设计/apk/test2/pages/index/receive.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/index/send", PagesIndexSend);
  __definePage("pages/index/receive", PagesIndexReceive);
  let firstBackTime = 0;
  const _sfc_main = {
    created() {
      formatAppLog("log", "at App.vue:12", "App Launch");
    },
    mounted() {
      formatAppLog("log", "at App.vue:15", "App Show");
    },
    beforeDestroy() {
      formatAppLog("log", "at App.vue:18", "App Hide");
    },
    methods: {
      // 处理安卓返回键逻辑
      handleLastPageBackPress() {
        formatAppLog("log", "at App.vue:23", "App LastPageBackPress");
        if (firstBackTime === 0) {
          uni.showToast({
            title: "再按一次退出应用",
            position: "bottom"
          });
          firstBackTime = Date.now();
          setTimeout(() => {
            firstBackTime = 0;
          }, 2e3);
        } else if (Date.now() - firstBackTime < 2e3) {
          firstBackTime = Date.now();
          uni.exit();
        }
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", null, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ]);
  }
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f13b4d11"], ["__file", "D:/Document/课程/专业综合设计/apk/test2/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
