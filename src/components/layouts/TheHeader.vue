<template>
  <header class="header">
    <nav>
      <div class="nav-wrapper">
        <!-- <router-link to="/" class="brand-logo">Logo</router-link> -->
        <ul class="right">
          <li v-if="isAdmin"><router-link to="/admin/products-manager">Управление контентом</router-link></li>
          <li v-if="isAuthorized"><router-link to="/chat">Чат с поставщиком</router-link></li>
          <li class="dropdown-trigger">
            <a href="#">Категории<i class="material-icons right">arrow_drop_down</i></a>
            <ul class="dropdown-content">
              <li 
                v-for="item in categories"
                :key="item._id" >
                <router-link :to="`/category/${item._id}`">
                  {{item.title}}
                </router-link>
              </li>
            </ul>
          </li>
          <div v-if="isAuthorized">
            <li><a>{{userData.username}}</a></li>
            <li><a @click.prevent="logout">Выйти</a></li>
          </div>
          <div v-if="!isAuthorized">
            <router-link to="/auth">Войти</router-link>
          </div>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TheHeader',
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
    userData: {
      type: Object,
      default: () => {},
    },
    isAuthorized: {
      type: Boolean,
      default: false
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions({
      fetchLogout: 'fetchLogout'
    }),
    async logout() {
      await this.fetchLogout()
      this.$router.replace({ path: '/' })
    }
  },
}
</script>

<style lang="scss" scoped>
  .dropdown-trigger:hover .dropdown-content {
    opacity: 1;
    display: flex;
  }
  .dropdown-content {
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    display: none;
    flex-direction: column;
  }
  nav ul{
    display: flex;
    list-style-type: none;
    li {
      position: relative;
      cursor: pointer;
    }
  }
</style>