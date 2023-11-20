<template>
  <div>
    <CModal size="xl" title="截圖上傳"
            color="info"
            centered :close-on-backdrop="false"
            :show.sync="isVisible">

      <template #body-wrapper>
        <div class="modal-body">
          <CRow v-if="!pastedImageUrl">
            <CCol md="12" xl="12" class="bg-light text-body border border-top-0 py-3">
              <div
                  v-on:paste="handlePaste"
                  contenteditable="true"
                  style="display: flex; justify-content: center; align-items: center; min-height: 200px;"
              >
                當您截取螢幕畫面後，請先使用滑鼠點擊此區，再使用 Ctrl+V 將截圖貼上
              </div>
            </CCol>
          </CRow>
          <CRow v-else>
            <CCol md="12" xl="12" class="bg-light text-body border border-top-0 py-3">
              <div class="credential"
                   style="border: 1px solid lightgray;
                            border-radius: 5px;
                            height: 100%;
                            width: 70%;
                            margin: auto;
                            cursor: pointer;
                            box-shadow: 3px 3px 10px rgba(211, 211, 211, 0.651);">

                <img v-if="pastedImageUrl" :src="pastedImageUrl"
                     alt="Pasted Image"
                     style="max-width: 100%;
                              max-height: 100%;
                              width: 100%;
                              margin: auto auto;
                              display: block;
                              object-fit: cover;"/>
              </div>
            </CCol>
          </CRow>
        </div>
      </template>

      <template #footer>
        <CButton color="success" size="lg" @click="clearPast()">清空截圖</CButton>
        <CButton color="success" size="lg" @click="onUpload()">上傳截圖</CButton>
        <CButton color="secondary" size="lg" @click="closeModal()">關閉</CButton>
      </template>
    </CModal>

    <CModal title="警示" color="warning" centered :close-on-backdrop="false" :show.sync="errModalVisible">
      <p>{{ errMsg }}</p>
      <template #footer>
        <CButton color="secondary" @click="errModalVisible = false; errMsg = ''">關閉</CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import { CModal, CButton, CRow, CCol } from '@coreui/vue';
// Import any additional components or utilities needed

export default {
  name: 'UploadScreenshotModal',
  components: {
    CModal,
    CButton,
    CRow,
    CCol
  },

  props: {
    showUploadScreenshot: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      pastedImageUrl: null,
      fileBlob: null,
      isVisible: false,

      errModalVisible: false,
      errMsg: '',
    };
  },

  watch: {
    showUploadScreenshot: {
          immediate: true,
          handler(val) {
            this.isVisible = val;
          }
    },
    isVisible(val) {
      this.$emit('update:showUploadScreenshot', val);
    }
  },
  methods: {
    handlePaste(event) {
      console.log("準備處理複製內容")
      // Get the clipboard data
      const clipboardData = event.clipboardData || window.clipboardData;

      // Check if there are any items of type 'file'
      if (clipboardData.items) {
        console.log("取得複製內容")
        for (let i = 0; i < clipboardData.items.length; i++) {
          if (clipboardData.items[i].type.indexOf("image") === 0) {
            // Get the item as a Blob
            this.fileBlob = clipboardData.items[i].getAsFile();

            // Create a URL for the blob object
            this.pastedImageUrl = URL.createObjectURL(this.fileBlob);
          }
        }
      }

      // Prevent the default pasting event
      event.preventDefault();
    },

    onUpload() {
      if (!this.fileBlob) {
        this.showErrModal("請使用 ctrl + v 貼上圖檔後，再執行上傳動作");
        return;
      }
      this.$emit('upload', this.fileBlob);
    },

    clearPast() {
      this.pastedImageUrl = null;
      this.fileBlob = null;
      console.log("已清除複製內容")
    },

    closeModal(){
      this.clearPast();
      this.$emit('update:showUploadScreenshot', false);
    },

    showErrModal(errMsg) {
      this.errMsg = errMsg;
      this.errModalVisible = true;
    },
  }
};
</script>

<style scoped>
.credential {
  border: 1px solid lightgray;
  border-radius: 5px;
  height: 100%;
  width: 70%;
  margin: auto;
  cursor: pointer;
  box-shadow: 3px 3px 10px rgba(211, 211, 211, 0.651);
}

.credential img {
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    margin: auto auto;
    display: block;
    object-fit: cover;
}

</style>
