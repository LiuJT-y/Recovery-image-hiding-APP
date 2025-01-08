<template>
  <view class="container">
    <view class="upload-section">
      <button class="upload-button" @click="chooseImage">发送单张图片</button>
    </view>
    <view v-if="successMessage" class="success-message">
      <text>{{ successMessage }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      successMessage: '', // 存储发送成功后的提示信息
    };
  },
  methods: {
    // 选择图片并上传到后端
    chooseImage() {
      uni.chooseImage({
        count: 1, // 设置最多选择图片数为 1
        success: (res) => {
          const filePaths = res.tempFilePaths; // 获取图片路径
          this.uploadImages(filePaths); // 调用上传图片方法
        },
        fail: () => {
          uni.showToast({
            title: "未选择图片",
            icon: "none",
          });
        },
      });
    },
    // 上传图片到后端接口
    uploadImages(filePaths) {
      filePaths.forEach((filePath) => {
        uni.uploadFile({
          url: 'http://192.168.155.41:5000/encrypt_image', // 后端接口地址
          filePath: filePath,
          name: 'file', // 与后端文件参数名称一致
          success: (uploadRes) => {
            try {
              const response = JSON.parse(uploadRes.data); // 解析后端响应数据
              if (response && response.status === 'success') {
                this.successMessage = '图片发送成功！'; // 显示成功消息
              } else {
                uni.showToast({
                  title: "发送失败，未返回有效结果",
                  icon: "none",
                });
              }
            } catch (e) {
              uni.showToast({
                title: "解析响应失败",
                icon: "none",
              });
            }
          },
          fail: () => {
            uni.showToast({
              title: "发送失败，请检查网络或后端设置",
              icon: "none",
            });
          },
        });
      });
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
  padding: 20px;
}

.upload-section {
  margin-bottom: 20px;
}

.upload-button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.upload-button:hover {
  background-color: #0056b3;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 14px;
  border: 1px solid #c3e6cb;
}
</style>
