import Api from '@/services/Api'

export default {
  uploadCoffee (formData) {
    return Api().post('/coffee-upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}