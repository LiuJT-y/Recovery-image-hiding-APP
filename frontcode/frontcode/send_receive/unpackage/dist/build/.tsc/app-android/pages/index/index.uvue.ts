
const __sfc__ = defineComponent({
  data() {
    return {
      successMessage: '', // 存储发送成功后的提示信息
    };
  },
  methods: {
    // 上传图片并发送到后端
    chooseImage() {
      uni.chooseImage({
        count: 50, // 设置最多选择图片数，如果不设置，默认为9
        success: (res) => {
          const filePaths = res.tempFilePaths; // 获取所有选择的图片路径
          this.uploadImages(filePaths); // 上传多个图片
        }
      });
    },
    // 上传多个图片到后端
    uploadImages(filePaths) {
      filePaths.forEach(filePath => {
        uni.uploadFile({
          url: 'http://10.237.56.105:5000/upload', // 后端接口地址（发送到后端处理）
          filePath: filePath,
          name: 'file', // 与后端接收参数一致
          success: (uploadRes) => {
            try {
              const response = JSON.parse(uploadRes.data); // 解析后端返回的数据
              if (response && response.status === 'success') {
                this.successMessage = '图片发送成功！'; // 成功提示
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
          fail: (err) => {
            uni.showToast({
              title: "发送失败，请检查网络或后端设置",
              icon: "none"
            });
          }
        });
      });
    },
  },
});

export default __sfc__
function GenPagesIndexIndexRender(this: InstanceType<typeof __sfc__>): any | null {
const _ctx = this
const _cache = this.$.renderCache
  return createElementVNode("view", utsMapOf({ class: "container" }), [
    createElementVNode("view", utsMapOf({ class: "upload-section" }), [
      createElementVNode("button", utsMapOf({ onClick: _ctx.chooseImage }), "发送图片", 8 /* PROPS */, ["onClick"])
    ]),
    isTrue(_ctx.successMessage)
      ? createElementVNode("view", utsMapOf({
          key: 0,
          class: "success-message"
        }), toDisplayString(_ctx.successMessage), 1 /* TEXT */)
      : createCommentVNode("v-if", true)
  ])
}
const GenPagesIndexIndexStyles = []
