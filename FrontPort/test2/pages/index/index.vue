<template>
  <view>
    <view class="choosesendpage">
      <button class="choosesendpage" @click="choosesendpage">进入发送页面</button>
    </view>
    <view class="choosereceivepage">
      <button class="choosereceivepage" @click="choosereceivepage">进入接收页面</button>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    choosesendpage() {
      // 跳转到同级目录下的 send 页面
      uni.navigateTo({
        url: '/pages/index/send',
      });
    },
    choosereceivepage() {
      // 跳转到同级目录下的 receive 页面
      uni.navigateTo({
        url: '/pages/index/receive',
      });
    },
  },
};
</script>

<style scoped>
.choosesendpage {
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0051a8;
}
</style>
