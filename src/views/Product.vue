<template>
<div class="container">
  <router-link to="/"><i class="material-icons">chevron_left</i>К категории</router-link>
  <div class="row">
      {{ product }}
  </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Category',
  computed: {
    ...mapGetters({
      product: 'product'
    })
  },
  methods: {
    ...mapActions({
      fetchProduct: 'fetchProduct'
    })
  },
  async created() {
    const id = this.$route.params.id    
    await this.fetchProduct(id)
  }
}
</script>

<style>
</style>