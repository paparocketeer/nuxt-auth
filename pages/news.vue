<template>
  <div class="container">
    <b-row>
      <b-col cols="6" md="4" v-for="(article, index) in news" :key="index" class="mt-3">
        <a :href="article.url" target="_blank">
          <b-card :img-src="article.multimedia ? article.multimedia[0].url : 'https://via.placeholder.com/450/000000/FFFFFF/?text=no-image'" img-alt="Card image" img-top>
            <b-card-text>
              {{ article.title }}
            </b-card-text>
          </b-card>
        </a>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState(['news']),
  created() {
    this.$store.dispatch('fetchPosts')
  },
}
</script>
