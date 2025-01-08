@file:Suppress("UNCHECKED_CAST", "USELESS_CAST", "INAPPLICABLE_JVM_NAME", "UNUSED_ANONYMOUS_PARAMETER")
package uni.UNI94A329A;
import io.dcloud.uniapp.*;
import io.dcloud.uniapp.extapi.*;
import io.dcloud.uniapp.framework.*;
import io.dcloud.uniapp.runtime.*;
import io.dcloud.uniapp.vue.*;
import io.dcloud.uniapp.vue.shared.*;
import io.dcloud.uts.*;
import io.dcloud.uts.Map;
import io.dcloud.uts.Set;
import io.dcloud.uts.UTSAndroid;
import kotlinx.coroutines.CoroutineScope;
import kotlinx.coroutines.Deferred;
import kotlinx.coroutines.Dispatchers;
import kotlinx.coroutines.async;
import io.dcloud.uniapp.extapi.chooseImage as uni_chooseImage;
import io.dcloud.uniapp.extapi.showToast as uni_showToast;
import io.dcloud.uniapp.extapi.uploadFile as uni_uploadFile;
open class GenPagesIndexIndex : BasePage {
    constructor(__ins: ComponentInternalInstance) : super(__ins) {}
    @Suppress("UNUSED_PARAMETER", "UNUSED_VARIABLE")
    override fun `$render`(): Any? {
        val _ctx = this;
        val _cache = this.`$`.renderCache;
        return createElementVNode("view", utsMapOf("class" to "container"), utsArrayOf(
            createElementVNode("view", utsMapOf("class" to "upload-section"), utsArrayOf(
                createElementVNode("button", utsMapOf("onClick" to _ctx.chooseImage), "发送图片", 8, utsArrayOf(
                    "onClick"
                ))
            )),
            if (isTrue(_ctx.successMessage)) {
                createElementVNode("view", utsMapOf("key" to 0, "class" to "success-message"), toDisplayString(_ctx.successMessage), 1);
            } else {
                createCommentVNode("v-if", true);
            }
        ));
    }
    open var successMessage: String by `$data`;
    @Suppress("USELESS_CAST")
    override fun data(): Map<String, Any?> {
        return utsMapOf("successMessage" to "");
    }
    override fun `$initMethods`() {
        this.chooseImage = fun() {
            uni_chooseImage(ChooseImageOptions(count = 50, success = fun(res){
                val filePaths = res.tempFilePaths;
                this.uploadImages(filePaths);
            }
            ));
        }
        ;
        this.uploadImages = fun(filePaths) {
            filePaths.forEach(fun(filePath){
                uni_uploadFile(UploadFileOptions(url = "http://10.237.56.105:5000/upload", filePath = filePath, name = "file", success = fun(uploadRes){
                    try {
                        val response = JSON.parse(uploadRes.data);
                        if (response && response.status === "success") {
                            this.successMessage = "图片发送成功！";
                        } else {
                            uni_showToast(ShowToastOptions(title = "发送失败，未返回有效结果", icon = "none"));
                        }
                    }
                     catch (e: Throwable) {
                        uni_showToast(ShowToastOptions(title = "解析响应失败", icon = "none"));
                    }
                }
                , fail = fun(err){
                    uni_showToast(ShowToastOptions(title = "发送失败，请检查网络或后端设置", icon = "none"));
                }
                ));
            }
            );
        }
        ;
    }
    open lateinit var chooseImage: () -> Unit;
    open lateinit var uploadImages: (filePaths) -> Unit;
    companion object {
        val styles: Map<String, Map<String, Map<String, Any>>>
            get() {
                return normalizeCssStyles(utsArrayOf(), utsArrayOf(
                    GenApp.styles
                ));
            }
        var inheritAttrs = true;
        var inject: Map<String, Map<String, Any?>> = utsMapOf();
        var emits: Map<String, Any?> = utsMapOf();
        var props = normalizePropsOptions(utsMapOf());
        var propsNeedCastKeys: UTSArray<String> = utsArrayOf();
        var components: Map<String, CreateVueComponent> = utsMapOf();
    }
}
