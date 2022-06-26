<template>
  <div class="row auth-block">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input placeholder="Логин" id="username" type="text" class="validate" v-model="username">
          <label for="username"></label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input placeholder="Пароль" id="password" type="password" class="validate" autocomplete="on" v-model="password">
          <label for="password"></label>
        </div>
      </div>
      <button class="btn waves-effect waves-light red accent-1" type="submit" name="action" @click.prevent="submitLogin" :disabled="!username || !password">Войти</button>
      <button class="btn green accent-2" style="margin-left: 10px;" @click.prevent="submitRegistration" :disabled="!username || !password">Регистрация</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { useToast } from "vue-toastification";

export default {
  name: 'Auth',
  data() {
    return {
      username: '',
      password: '',
      toast: useToast()
    }
  },
  computed: {
    ...mapGetters({
      isAuthorized: 'isAuthorized'
    })
  },
  methods: {
    ...mapActions({
      fetchLogin: 'fetchLogin',
      fetchRegistration: 'fetchRegistration'
    }),
    async submitLogin() {
      const payload = {
        username: this.username, 
        password: this.password
      }
      const { message } = await this.fetchLogin(payload)
      if(message) {
        this.toast.error(message, {
          closeOnClick: false,
          pauseOnFocusLoss: true,
        });
      }
    },
    async submitRegistration() {
      const payload = {
        username: this.username,
        password: this.password
      }
      const { message, errors } = await this.fetchRegistration(payload)
      if(errors) {
        for(let error in errors) {
          this.toast.error(errors[error].msg, {
            closeOnClick: false,
            pauseOnFocusLoss: true,
          });
        }
      }
      if(message) {
        this.toast.success(message, {
            closeOnClick: false,
            pauseOnFocusLoss: true,
          });
      }
    }
  },
  watch: {
    isAuthorized(newValue) {
      if(newValue) {
        this.$router.replace({ path: '/' })
      }
    }
  }
}
</script>

<style>
    .auth-block {
        max-width: 564px;
    }
</style>