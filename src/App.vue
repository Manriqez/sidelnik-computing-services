<template>
<div>
  <TheHeader :categories="categories" :userData="userData" :isAuthorized="isAuthorized" :isAdmin="isAdmin" />
  <router-view :key="$route.path" />
</div>
</template>

<script>
import TheHeader from '@/components/layouts/TheHeader.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    TheHeader
  },
  data() {
    return {
      socket: ''
    }
  },
  computed: {
    ...mapGetters({
      categories: 'categories',
      userData: 'userData',
      isAuthorized: 'isAuthorized',
      isAdmin: 'isAdmin'
    })
  },
  methods: {
    ...mapActions({
      fetchCategories: 'fetchCategories',
      fetchUserData: 'fetchUserData'
    })
  },
  async created() {
    await this.fetchUserData()
    await this.fetchCategories()
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
