<template>
  <div>
    <h1>Get All Coffees</h1>

    <div>จำนวนเมนู {{ coffees.length }}</div>

    <div v-if="coffees.length > 0">
      <div
        v-for="coffee in coffees"
        :key="coffee.id"
        style="margin-bottom: 15px;"
        class="coffee-item"
      >
        <div>id: {{ coffee.id }}</div>

        <!-- ✅ รูปกาแฟวงกลมหน้าชื่อ -->
        <div class="coffee-row">
          <img
            :src="coffee.image
              ? `http://localhost:8081/uploads/${coffee.image}`
              : 'http://localhost:8081/uploads/default-coffee.png'"
            class="coffee-thumb"
            @error="onImgError"
          />
          <span>ชื่อเมนู: {{ coffee.name }}</span>
        </div>

        <div>ราคา: {{ coffee.price }}</div>
        <div>ประเภท: {{ coffee.type }}</div>
        <div>สถานะ: {{ coffee.status }}</div>

        <p>
          <button @click="navigateTo('/coffee/' + coffee.id)">
            ดูรายละเอียด
          </button>

          <template v-if="isLoggedIn">
            <button @click="navigateateToEdit(coffee.id)">
              แก้ไข
            </button>

            <button @click="deleteCoffee(coffee.id)">
              ลบเมนู
            </button>
          </template>
        </p>

        <hr />
      </div>
    </div>

    <div v-else>
      ยังไม่มีเมนูกาแฟ
    </div>
  </div>
</template>

<script>
import CoffeesService from '../../services/CoffeesService'
import { useAuthenStore } from '../../stores/authen'

export default {
  data () {
    return {
      coffees: []
    }
  },

  async created () {
    this.refreshData()
  },

  computed: {
    isLoggedIn () {
      const authenStore = useAuthenStore()
      return authenStore.isUserLoggedIn
    }
  },

  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },

    navigateateToEdit (id) {
      this.$router.push('/coffee/edit/' + id)
    },

    async deleteCoffee (coffeeId) {
      const result = confirm('Want to delete?')
      if (result) {
        try {
          await CoffeesService.delete(coffeeId)
          this.refreshData()
        } catch (err) {
          console.log(err)
        }
      }
    },

    async refreshData () {
      this.coffees = (await CoffeesService.index()).data
    },

    onImgError (e) {
      e.target.src = 'http://localhost:8081/uploads/default-coffee.png'
    }
  }
}
</script>

<style scoped>
.coffee-thumb {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 10px;
}

.coffee-item {
  display: flex;
  flex-direction: column;
}

.coffee-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>