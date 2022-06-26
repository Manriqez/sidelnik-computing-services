<template>
  <div>
      <h2>Управление контентом</h2>
      <div class="content-manage">
          <div class="row">
              <div class="col s6">
                  <h4>Категории</h4>
                  <div class="content-manage-category">
                        
                    <div class="collection">
                        <a href="#!" class="collection-item"><span class="badge"><h6>Продуктов:</h6></span><h6>Название</h6></a>
                        <div class="links-wrapper" v-for="item in categories" :key="item._id">
                            <div class="collection-item-wrapper">
                                <router-link class="collection-item" :to="`/category/${item._id}`">{{ item.title }}<span class="badge">{{ item.products.length }}</span></router-link>
                                <button @click.prevent="deleteCategory(item._id)"><i class="material-icons">delete_forever</i></button>
                            </div>
                        </div>
                    </div>
                    <div class="content__add-item">
                        <button class="btn" @click="categoryModal = !categoryModal">Добавить</button>
                    </div>
                  </div>
              </div>
              <div class="col s6">
                  <h4>Продукты</h4>
                  <div class="content-manage-product">
                    <div class="collection">
                        <a href="#!" class="collection-item"><span class="badge"><h6>В наличии:</h6></span><h6>Название</h6></a>
                        <div class="links-wrapper" v-for="item in products" :key="item._id">
                            <div class="collection-item-wrapper">
                                <router-link class="collection-item" :to="`/product/${item._id}`">{{ item.title }}<span class="badge">{{ item.amount }}</span></router-link>
                                <button @click.prevent="deleteProduct(item._id)"><i class="material-icons">delete_forever</i></button>
                            </div>
                        </div>
                    </div>
                    <div class="content__add-item">
                        <button class="btn" @click="productModal = !productModal">Добавить</button>
                    </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="content-modal" v-if="categoryModal">
          <div class="content-modal-block">
              <div class="content-modal-block-title">
                  <h5>Новая категория</h5>
              </div>
              <div class="content-modal-block-fields">
                  <div class="input-field">
                    {{ newCategory.title.view }}
                    <input type="text" v-model="newCategory.title.value">
                  </div>
                  <div class="input-field">
                    {{ newCategory.description.view }}
                    <input type="text" v-model="newCategory.description.value">
                  </div>
              </div>
              <div class="content-modal-block-submit">
                  <button class="btn-small" @click="addCategory(newCategory)">Создать</button>
                  <button class="btn-small red accent-1" @click="categoryModal = !categoryModal">Отмена</button>
              </div>
          </div>
      </div>
      <div class="content-modal" v-if="productModal">
          <div class="content-modal-block">
            <div class="content-modal-block-title">
                <h5>Новый продукт</h5>
            </div>
            <div class="content-modal-block-fields">
                <div class="input-field">
                    {{ newProduct.title.view }}
                    <input type="text" v-model="newProduct.title.value">
                </div>
                <div class="input-field">
                    {{ newProduct.description.view }}
                    <input type="text" v-model="newProduct.description.value">
                </div>
                <div class="input-field">
                    {{ newProduct.price.view }}
                    <input type="text" v-model="newProduct.price.value">
                </div>
                <div class="input-field">
                    {{ newProduct.amount.view }}
                    <input type="text" v-model="newProduct.amount.value">
                </div>
                <div class="input-field">
                    {{ newProduct.imageUrl.view }}
                    <input type="text" v-model="newProduct.imageUrl.value">
                </div>
                <div class="input-field">
                    {{ newProduct.category.view }}
                    <select class="browser-default" v-model="newProduct.category.value">
                        <option value="" disabled selected></option>
                        <option v-for="item in categories" :value="item._id" :key="item._id">{{ item.title }}</option>
                    </select>
                </div>
            </div>
            <div class="content-modal-block-submit">
                <button class="btn-small" @click="addProduct(newProduct)">Создать</button>
                <button class="btn-small red accent-1" @click="productModal = !productModal">Отмена</button>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { useToast } from "vue-toastification";

export default {
    name: 'ProductsManager',
    data() {
        return {
            newCategory: {
                title: {
                    view: 'Название',
                    value: ''
                },
                description: {
                    view: 'Описание',
                    value: ''
                }
            },
            newProduct: {
                title: {
                    view: 'Название',
                    value: ''
                },
                description: {
                    view: 'Описание',
                    value: ''
                },
                price: {
                    view: 'Цена',
                    value: ''
                },
                amount: {
                    view: 'В наличии',
                    value: ''
                },
                imageUrl: {
                    view: 'Ссылка на изображение',
                    value: ''
                },
                category: {
                    view: 'Категория',
                    value: ''
                }

            },
            categoryModal: false,
            productModal: false,
            toast: useToast()
        }
    },
    computed: {
        ...mapGetters({
            categories: 'categories',
            categoryStatus: 'categoryStatus',
            categoryError: 'categoryError',
            products: 'products',
            productStatus: 'productStatus',
            productError: 'productError',
        }),
    },
    methods: {
        ...mapActions({
            fetchAllProducts: 'fetchAllProducts',
            fetchNewCategory: 'fetchNewCategory',
            fetchDeleteCategory: 'fetchDeleteCategory',
            fetchNewProduct: 'fetchNewProduct',
            fetchDeleteProduct: 'fetchDeleteProduct'
        }),
        async addCategory(item) {
            if(this.formValidate(item)) {
                try {
                    await this.fetchNewCategory(item)
                    if(this.categoryStatus !== 200) {
                        this.toast.error(`Ошибка! ${this.categoryError}`, {
                            closeOnClick: false,
                            pauseOnFocusLoss: true,
                        })
                    } else {
                        this.toast.success(`Успешно создан`, {
                            closeOnClick: false,
                            pauseOnFocusLoss: true,
                        });
                    }
                    this.categoryModal = !this.categoryModal
                } catch (error) {
                    this.toast.error(`Ошибка! ${error}`, {
                        closeOnClick: false,
                        pauseOnFocusLoss: true,
                    })
                }
            }
        },
        async deleteCategory(itemId) {
            try {
                await this.fetchDeleteCategory(itemId)
                if(this.categoryStatus !== 200) {
                    this.toast.error(`Ошибка! ${this.categoryStatus}`, {
                        closeOnClick: false,
                        pauseOnFocusLoss: true,
                    });
                } else {
                    this.toast.success(`Успешно удалён`, {
                        closeOnClick: false,
                        pauseOnFocusLoss: true,
                    })
                }
            } catch (error) {
                this.toast.error(`Ошибка! ${error}`, {
                    closeOnClick: false, 
                    pauseOnFocusLoss: true,
                })
            }
        },
        async addProduct(item) {
            if(this.formValidate(item)) {    
                try {
                    await this.fetchNewProduct(item)
                    if(this.productStatus !== 200) {
                    this.toast.error(`Ошибка! ${this.productError}`, {
                            closeOnClick: false,
                            pauseOnFocusLoss: true,
                        }); 
                    } else {
                        this.toast.success(`Успешно создан`, {
                            closeOnClick: false,
                            pauseOnFocusLoss: true,
                        });
                    }
                    this.productModal = !this.productModal
                } catch (error) {
                    this.toast.error(`Ошибка! ${error}`, {
                        closeOnClick: false,
                        pauseOnFocusLoss: true,
                    }); 
                }
            }
        },
        async deleteProduct(itemId) {
            try {
                await this.fetchDeleteProduct(itemId)
                if(this.productStatus !== 200) {
                    this.toast.error(`Ошибка! ${this.productError}`, {
                        closeOnClick: false,
                        pauseOnFocusLoss: true,
                    });
                } else {
                    this.toast.success(`Успешно удалён`, {
                        closeOnClick: false,
                        pauseOnFocusLoss: true,
                    })
                }
            } catch (error) {
                this.toast.error(`Ошибка! ${error}`, {
                    closeOnClick: false, 
                    pauseOnFocusLoss: true,
                })
            }
        },
        formValidate(data) {
            for(let item in data) {
                if(data[item].value.length === 0) {
                    this.toast.error(`Поле ${data[item].view} не может быть пустым!`, {
                        closeOnClick: false,
                        pauseOnFocusLoss: true,
                    });
                    return false
                }
            }
            return true
        }
    },
    async created() {
        await this.fetchAllProducts()
    }
}
</script>

<style lang="scss" scoped>
    input, select {
        max-width: 150px;
    }
    .content-manage-category, .content-manage-product {
        max-width: 400px;
        text-align: left;
        margin: 0 auto;
    }
    .content-modal {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        z-index: 999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0,0,0,0.1);
        &-block {
            border-radius: 15px;
            padding: 35px;
            background-color: #fff;
            &-fields {
                display: flex;
                flex-direction: column;
                text-align: left;
                margin-bottom: 40px;
                .input-field {
                    font-size: 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin: 0;
                    input {
                        margin-left: 10px;
                    }
                }
            }
            &-submit {
                display: flex;
                justify-content: space-around;
                margin-top: 15px;
            }
        }
    }
    .collection {
        overflow: visible;
        &-item-wrapper {
            position: relative;
            button {
                position: absolute;
                background: transparent;
                cursor: pointer;
                border: none;
                color: #f44336;
                top: 10px;
                right: -40px;                
            }
        }
    }
</style>