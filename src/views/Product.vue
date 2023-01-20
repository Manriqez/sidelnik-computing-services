<template>
<div class="container">
  <router-link :to="'/category/' + product.category" class="backward-link"><i class="material-icons">chevron_left</i>К категории</router-link>
  <div class="row">
      <div class="row">
        <div class="col s12 m6 xl4 offset-xl4 offset-m3">
          <div class="card card-panel hoverable card-panel__hover">
            <router-link :to="`/product/${product._id}`">
              <div class="card-image">
                <img :src="product.imageUrl">
                <span class="card-title">{{ product.title }}</span>
              </div>
              <div class="card-content card-content__align">
                <h6>Описание: {{ product.description }}</h6>
              </div>
              <div class="card-action card-action__align">
                <div>Цена: {{ product.price }}р.</div>
                <div>Кол-во на складе: {{ product.amount }}шт.</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>  
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
.backward-link {
  display: flex;
  align-items: center;
  margin: 20px 0;
}
</style>