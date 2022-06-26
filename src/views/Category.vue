<template>
<div class="container">
  <div class="row">
    <div class="col s12"><h3>{{category.title}}</h3></div>
    <div class="col s12"><h6>{{category.description}}</h6></div>
    
  </div>
  <div class="row">
    <div class="col s12 m6 xl4" v-for="product in products" :key="product._id">
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
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Category',
  computed: {
    ...mapGetters({
      category: 'category',
      products: 'products'
    })
  },
  methods: {
    ...mapActions({
      fetchCategory: 'fetchCategory',
      fetchProducts: 'fetchProducts'
    })
  },
  async created() {
    console.log('log created')
    const id = this.$route.params.id
    
    await this.fetchCategory(id)

    const product_ids = this.category.products.map(item => item);
    const payload = { id, product_ids }
    
    await this.fetchProducts(payload)
  },
  // async mounted() {
  //   console.log('log mounted')
  // }
  // async updated() {
  //   const id = this.$route.params.id
    
  //   await this.fetchCategory(id)

  //   const product_ids = this.category.products.map(item => item);
  //   const payload = { id, product_ids }
    
  //   await this.fetchProducts(payload)
  // }
}
</script>

<style>
 .card>a {
   color: black;
 }
 .card-panel__hover:hover {
   cursor: pointer;
 }
 .card-content__align, .card-action__align {
   text-align: left;
 }
 .card-image {
   height: 200px;
   overflow: hidden;
 }
</style>