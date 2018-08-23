<template>
  <v-form>
    <v-toolbar>
      <v-toolbar-title>Robin8</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="sm-and-down">
        <v-btn flat @click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container>
      <v-layout row wrap>
        <v-flex xs12 sm6 offset-sm3>
          <v-text-field
            label="Search..."
            prepend-icon="search"
            v-model="search"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout justify-space-between wrap>
        <v-flex v-for="product in paginatedProducts"
                :key="product.id"
                xs6>
          <v-card>
            <v-card-media
              contain
              >
              <carousel :perPage=1>
                <slide
                  v-for="image in product.images"
                  :key="image.id"
                  >
                  <img :src="image.src" style="min-height: 200px">
                </slide>
              </carousel>
            </v-card-media>
            <v-card-title primary-title>
              <div>
                <h4 class="headline mb-0">{{product.title}}</h4>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-layout row justify-center>
                <v-btn
                  color="orange"
                  flat
                  @click="openDialog(product)"
                >
                 More
                </v-btn>
                <v-dialog
                  v-model="dialog"
                  max-width="500"
                >
                  <v-card>
                    <v-card-title class="headline">{{vendor}}</v-card-title>

                    <v-card-text>
                      <h3><strong>{{title}}</strong></h3>
                      {{body_html.slice(3, body_html.length - 4)}}
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="green darken-1"
                        flat="flat"
                        @click="dialog = false"
                      >
                        Close
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row justify-center>
        <div class="text-xs-center">
          <button
            :disabled="page === 0"
            @click="prevPage">
            Previous
          </button>
          <button
            :disabled="page >= pageCount -1"
            @click="nextPage">
            Next
          </button>
        </div>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
  import products1 from '../../db/products1'
  import products2 from '../../db/products2'
  import products3 from '../../db/products3'
  import { Carousel, Slide } from 'vue-carousel'

  const data = []
  const products = []

  data.push(products1.products, products2.products, products3.products)

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      products.push(data[i][j])
    }
  }
  export default {
    data () {
      return {
        products,
        dialog: false,
        page: 0,
        title: '',
        body_html: '',
        vendor: '',
        updated_at: '',
        search: ''
      }
    },
    components: {
      Carousel,
      Slide
    },
    props: {
      size: {
        type: Number,
        required: false,
        default: 2
      }
    },
    name: 'Profile',
    methods: {
      logout () {
        this.$router.push({path: '/'})
      },
      nextPage () {
        this.page++
      },
      prevPage () {
        this.page--
      },
      openDialog: function (product) {
        this.title = product.title
        this.vendor = product.vendor
        this.body_html = product.body_html
        this.dialog = !this.dialog
      }
    },
    computed: {
      pageCount () {
        let l = this.products.length
        let s = this.size
        return Math.floor(l / s)
      },
      paginatedProducts () {
        const start = this.page * this.size
        const end = start + this.size
        return this.products.filter(product => {
          return product.title.toLowerCase().includes(this.search.toLowerCase())
        }).slice(start, end)
      }
    }
  }
</script>

<style scoped>
</style>
