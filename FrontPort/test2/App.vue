<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
let firstBackTime = 0;

export default {
  created() {
    console.log('App Launch');
  },
  mounted() {
    console.log('App Show');
  },
  beforeDestroy() {
    console.log('App Hide');
  },
  methods: {
    // 处理安卓返回键逻辑
    handleLastPageBackPress() {
      console.log('App LastPageBackPress');
      if (firstBackTime === 0) {
        uni.showToast({
          title: '再按一次退出应用',
          position: 'bottom',
        });
        firstBackTime = Date.now();
        setTimeout(() => {
          firstBackTime = 0;
        }, 2000);
      } else if (Date.now() - firstBackTime < 2000) {
        firstBackTime = Date.now();
        uni.exit();
      }
    },
  },
};
</script>

<style scoped>
/* 公共 CSS 样式 */
.uni-row {
  display: flex;
  flex-direction: row;
}

.uni-column {
  display: flex;
  flex-direction: column;
}
</style>
