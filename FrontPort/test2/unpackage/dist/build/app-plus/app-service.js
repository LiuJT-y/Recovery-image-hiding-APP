if("undefined"==typeof Promise||Promise.prototype.finally||(Promise.prototype.finally=function(e){const t=this.constructor;return this.then((a=>t.resolve(e()).then((()=>a))),(a=>t.resolve(e()).then((()=>{throw a}))))}),"undefined"!=typeof uni&&uni&&uni.requireGlobal){const e=uni.requireGlobal();ArrayBuffer=e.ArrayBuffer,Int8Array=e.Int8Array,Uint8Array=e.Uint8Array,Uint8ClampedArray=e.Uint8ClampedArray,Int16Array=e.Int16Array,Uint16Array=e.Uint16Array,Int32Array=e.Int32Array,Uint32Array=e.Uint32Array,Float32Array=e.Float32Array,Float64Array=e.Float64Array,BigInt64Array=e.BigInt64Array,BigUint64Array=e.BigUint64Array}uni.restoreGlobal&&uni.restoreGlobal(Vue,weex,plus,setTimeout,clearTimeout,setInterval,clearInterval),function(e){"use strict";const t=(e,t)=>{const a=e.__vccOpts||e;for(const[n,o]of t)a[n]=o;return a};const a=t({methods:{choosesendpage(){uni.navigateTo({url:"/pages/index/send"})},choosereceivepage(){uni.navigateTo({url:"/pages/index/receive"})}}},[["render",function(t,a,n,o,r,s){return e.openBlock(),e.createElementBlock("view",null,[e.createElementVNode("view",{class:"choosesendpage"},[e.createElementVNode("button",{class:"choosesendpage",onClick:a[0]||(a[0]=(...e)=>s.choosesendpage&&s.choosesendpage(...e))},"进入发送页面")]),e.createElementVNode("view",{class:"choosereceivepage"},[e.createElementVNode("button",{class:"choosereceivepage",onClick:a[1]||(a[1]=(...e)=>s.choosereceivepage&&s.choosereceivepage(...e))},"进入接收页面")])])}],["__scopeId","data-v-eec38a8d"]]);const n=t({data:()=>({successMessage:""}),methods:{chooseImage(){uni.chooseImage({count:1,success:e=>{const t=e.tempFilePaths;this.uploadImages(t)},fail:()=>{uni.showToast({title:"未选择图片",icon:"none"})}})},uploadImages(e){e.forEach((e=>{uni.uploadFile({url:"http://192.168.155.41:5000/encrypt_image",filePath:e,name:"file",success:e=>{try{const t=JSON.parse(e.data);t&&"success"===t.status?this.successMessage="图片发送成功！":uni.showToast({title:"发送失败，未返回有效结果",icon:"none"})}catch(t){uni.showToast({title:"解析响应失败",icon:"none"})}},fail:()=>{uni.showToast({title:"发送失败，请检查网络或后端设置",icon:"none"})}})}))}}},[["render",function(t,a,n,o,r,s){return e.openBlock(),e.createElementBlock("view",{class:"container"},[e.createElementVNode("view",{class:"upload-section"},[e.createElementVNode("button",{class:"upload-button",onClick:a[0]||(a[0]=(...e)=>s.chooseImage&&s.chooseImage(...e))},"发送单张图片")]),r.successMessage?(e.openBlock(),e.createElementBlock("view",{key:0,class:"success-message"},[e.createElementVNode("text",null,e.toDisplayString(r.successMessage),1)])):e.createCommentVNode("",!0)])}],["__scopeId","data-v-f02c9f8e"]]);function o(e,t,...a){uni.__log__?uni.__log__(e,t,...a):console[e].apply(console,[...a,t])}const r=t({data:()=>({latestImageUrl:null,decryptedImageUrl:null,extractedData:[],decimalData:null}),methods:{async fetchLatestImage(){try{uni.request({url:"http://192.168.155.41:5000/get_latest_image",method:"GET",responseType:"arraybuffer",success:e=>{if(200===e.statusCode){const t=this.arrayBufferToBase64(e.data);this.latestImageUrl=`data:image/jpeg;base64,${t}`}else o("error","at pages/index/receive.vue:62","获取嵌入图像失败:",e.statusCode)},fail:e=>{o("error","at pages/index/receive.vue:66","获取嵌入图像时出错:",e)}})}catch(e){o("error","at pages/index/receive.vue:70","获取嵌入图像时出错:",e)}},async decryptImage(){try{uni.request({url:"http://192.168.155.41:5000/decrypt_latest_image",method:"GET",responseType:"arraybuffer",success:e=>{if(200===e.statusCode){const t=this.arrayBufferToBase64(e.data);this.decryptedImageUrl=`data:image/jpeg;base64,${t}`;const a=e.header["X-Embedded-Data"]||"[]";this.extractedData=JSON.parse(a),this.extractedData.length>0&&(this.decimalData=this.binaryToDecimal(this.extractedData))}else o("error","at pages/index/receive.vue:97","解密图像失败:",e.statusCode)},fail:e=>{o("error","at pages/index/receive.vue:101","解密图像时出错:",e)}})}catch(e){o("error","at pages/index/receive.vue:105","解密图像时出错:",e)}},arrayBufferToBase64(e){let t="";const a=new Uint8Array(e),n=a.byteLength;for(let o=0;o<n;o++)t+=String.fromCharCode(a[o]);return btoa(t)},binaryToDecimal(e){const t=[];for(let a=0;a<e.length;a+=4)t.push(e.slice(a,a+4).join(""));return t.map((e=>parseInt(e,2))).join("")}}},[["render",function(t,a,n,o,r,s){return e.openBlock(),e.createElementBlock("div",{id:"app"},[e.createElementVNode("h1",null,"接收端页面"),e.createElementVNode("div",{class:"section"},[e.createElementVNode("h2",null,"嵌入后的图像"),e.createElementVNode("button",{class:"button",onClick:a[0]||(a[0]=(...e)=>s.fetchLatestImage&&s.fetchLatestImage(...e))},"获取最新图像（获取图像后请等待几秒再点击解密）"),r.latestImageUrl?(e.openBlock(),e.createElementBlock("div",{key:0,class:"image-container"},[e.createElementVNode("img",{src:r.latestImageUrl,alt:"嵌入图像"},null,8,["src"])])):(e.openBlock(),e.createElementBlock("div",{key:1,class:"message"},[e.createElementVNode("p",null,"尚未获取到嵌入图像。")]))]),e.createElementVNode("div",{class:"section"},[e.createElementVNode("h2",null,"解密后的图像与嵌入信息"),e.createElementVNode("button",{class:"button",onClick:a[1]||(a[1]=(...e)=>s.decryptImage&&s.decryptImage(...e))},"解密该图像（解密可能需要花费更多时间，请不要重复点击）"),r.decryptedImageUrl?(e.openBlock(),e.createElementBlock("div",{key:0,class:"image-container"},[e.createElementVNode("img",{src:r.decryptedImageUrl,alt:"解密图像"},null,8,["src"]),e.createElementVNode("div",{class:"info"},[e.createElementVNode("p",null,"提取到的二进制信息为: "+e.toDisplayString(r.extractedData.join(", ")||"未获取到嵌入信息"),1),r.decimalData?(e.openBlock(),e.createElementBlock("p",{key:0},"其可能的十进制为: "+e.toDisplayString(r.decimalData),1)):e.createCommentVNode("",!0)])])):(e.openBlock(),e.createElementBlock("div",{key:1,class:"message"},[e.createElementVNode("p",null,"尚未解密图像。")]))])])}],["__scopeId","data-v-1aa2f10f"]]);__definePage("pages/index/index",a),__definePage("pages/index/send",n),__definePage("pages/index/receive",r);let s=0;const c=t({created(){o("log","at App.vue:12","App Launch")},mounted(){o("log","at App.vue:15","App Show")},beforeDestroy(){o("log","at App.vue:18","App Hide")},methods:{handleLastPageBackPress(){o("log","at App.vue:23","App LastPageBackPress"),0===s?(uni.showToast({title:"再按一次退出应用",position:"bottom"}),s=Date.now(),setTimeout((()=>{s=0}),2e3)):Date.now()-s<2e3&&(s=Date.now(),uni.exit())}}},[["render",function(t,a,n,o,r,s){return e.openBlock(),e.createElementBlock("div",null,[e.renderSlot(t.$slots,"default",{},void 0,!0)])}],["__scopeId","data-v-03402ea0"]]);const{app:l,Vuex:i,Pinia:d}={app:e.createVueApp(c)};uni.Vuex=i,uni.Pinia=d,l.provide("__globalStyles",__uniConfig.styles),l._component.mpType="app",l._component.render=()=>{},l.mount("#app")}(Vue);
