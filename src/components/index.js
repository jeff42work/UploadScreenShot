// src/components/index.js
import UploadScreenshotModal from './UploadScreenshotModal.vue'


UploadScreenshotModal.install = function (Vue) {
    Vue.component('upload-screenshot-modal', UploadScreenshotModal)
}

export default UploadScreenshotModal