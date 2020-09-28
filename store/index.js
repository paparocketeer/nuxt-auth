const cookieparser = process.server ? require('cookieparser') : undefined
// const NewsAPI = require('newsapi')

export const state = () => ({
  news: [],
  auth: null,
})

export const mutations = {
  updateNews(state, posts) {
    state.news = posts
  },
  setAuth(state, auth) {
    state.auth = auth
  },
}

export const actions = {
  async fetchPosts({ commit }) {
    const posts = await this.$axios.$get(
      `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${ this.$config.apiSecret }`
    )
    // const newsapi = new NewsAPI(this.$config.apiSecret, {
    //   corsProxyUrl: 'https://cors-anywhere.herokuapp.com/',
    // })
    // newsapi.v2
    //   .everything({
    //     q: 'apple',
    //     from: '2020-09-27',
    //     to: '2020-09-27',
    //     sortBy: 'popularity',
    //   })
    //   .then((response) => {
    //     commit('updateNews', response.articles.slice(0, 10))
    //   })

      commit('updateNews', posts.results.slice(0, 10))
  },
  nuxtServerInit({ commit }, { req }) {
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
