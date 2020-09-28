const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  news: [],
  auth: null,
})

export const mutations = {
  updateNews(state, posts) {
    state.news = posts
  },
  setAuth (state, auth) {
    state.auth = auth
  }
}


export const actions = {
  async fetchPosts({ commit }) {
    const posts = await this.$axios.$get(
      `https://newsapi.org/v2/everything?q=apple&from=2020-09-27&to=2020-09-27&sortBy=popularit&apiKey=${ this.$config.apiSecret }`
    )
    commit('updateNews', posts.articles.slice(0, 10))
  },
  nuxtServerInit ({ commit }, { req }) {
    let auth = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = JSON.parse(parsed.auth)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setAuth', auth)
  },
}
