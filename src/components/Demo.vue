<template>
  <div class="hello">
    <h1>Demo UploadScreenshotModal</h1>

    <CRow>
      <CCol md="12" xl="12" class="bg-light text-body border border-top-0 py-3">
        <CButton color="success" size="lg" class="ml-2" @click="isModalVisible = true">使用截圖上傳</CButton>
      </CCol>
    </CRow>

    <UploadScreenshotModal :showUploadScreenshot.sync="isModalVisible"
                           @upload="(fileBlob) => uploadScreenShot(fileBlob)"/>


  </div>
</template>

<script>

import UploadScreenshotModal from "@/components/UploadScreenshotModal.vue";

export default {
  name: 'DemoComponent',
  props: {
    msg: String
  },
  components: {
    UploadScreenshotModal,
  },
  data() {
    return {
      isModalVisible: false,
    }
  },
  methods: {
    uploadScreenShot(fileBlob){
      console.log("Receive file Blob, Prepare to upload file");
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
