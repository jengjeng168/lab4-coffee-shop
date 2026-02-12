<template>
  <div class="coffee-navbar">
    <ul class="nav">

      <!-- เมนูกาแฟ (ทุกคนเห็น) -->
      <li>
        <router-link to="/coffees">
          Menu
        </router-link>
      </li>

      <!-- Order -->
      <li>
        <router-link to="/orders">
          Order
        </router-link>
      </li>

      <!-- แสดงเมื่อ Login แล้ว -->
      <li v-if="isLoggedIn">
        <router-link to="/blogs">
          Blog
        </router-link>
      </li>

      <li v-if="isLoggedIn">
        <router-link to="/users">
          User
        </router-link>
      </li>

      <!-- ยังไม่ Login -->
      <li v-if="!isLoggedIn">
        <router-link :to="{ name: 'login' }">
          Login
        </router-link>
      </li>

      <!-- Login แล้ว -->
      <li v-if="isLoggedIn">
        <a href="#" @click.prevent="logout">
          Logout
        </a>
      </li>

    </ul>

    <div class="clearfix"></div>
  </div>
</template>

<script>
import { useAuthenStore } from '@/stores/authen'

export default {
  name: 'CoffeeHeader',
  computed: {
    isLoggedIn () {
      const authenStore = useAuthenStore()
      return authenStore.isUserLoggedIn
    }
  },
  methods: {
    logout () {
      const authenStore = useAuthenStore()
      authenStore.logout()
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped>
.coffee-navbar {
  background-color: #036800;
  width: 100%;
  padding: 10px 0;
}

.coffee-navbar .nav {
  list-style: none;
  margin: 0;
  padding: 0;
  float: left;
}

.coffee-navbar .nav li {
  float: left;
}

.coffee-navbar .nav li a {
  padding: 10px 15px;
  text-decoration: none;
  color: white;
  font-weight: bold;
}

.coffee-navbar .nav li a:hover {
  background-color: #7bdb90;
}

.coffee-navbar .nav li a.router-link-active {
  background-color: #036800;
}

.clearfix {
  clear: left;
}
</style>
