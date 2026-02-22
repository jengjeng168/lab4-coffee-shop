<template>
  <div class="upload-box">
    <div class="mb-3">
      <label class="form-label">Upload Thumbnail:</label>
      <input
        type="file"
        class="form-control"
        @change="onFileChange"
        accept="image/*"
      />
    </div>

    <div v-if="previewImage" class="preview-container">
      <img :src="previewImage" class="img-thumbnail" />
      <p class="mt-2 text-success" v-if="uploadStatus === 'success'">
        Uploaded Successfully!
      </p>
      <p class="mt-2 text-danger" v-if="uploadStatus === 'error'">
        Upload Failed
      </p>
    </div>
  </div>
</template>

<script>
import UploadService from '../../services/UploadService'

export default {
  data () {
    return {
      previewImage: null,
      uploadStatus: ''
    }
  },
  methods: {
    async onFileChange (e) {
      const file = e.target.files[0]
      if (!file) return

      // preview
      this.previewImage = URL.createObjectURL(file)
      this.uploadStatus = 'loading'

      const formData = new FormData()

      // 🔴 สำคัญ: ต้องใช้ชื่อ field = 'file' ให้ตรงกับ multer
      formData.append('file', file)

      try {
        const response = await UploadService.uploadCoffee(formData)

        this.uploadStatus = 'success'
        this.$emit('uploaded', response.data.filename)
      } catch (err) {
        console.error(err)
        this.uploadStatus = 'error'
      }
    }
  }
}
</script>

<style scoped>
.preview-container img {
  max-width: 300px;
  max-height: 200px;
}
</style>