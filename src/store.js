import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    results:[],
    movieData:{},
    endpoint: "http://localhost:3000/api"
  },
  mutations: {
    setResults(state,data) {
      state.results = data
    },
    setLoading(state,onoff) {
      state.loading = onoff
    },
    setMovieData(state,data) {
      state.movieData = data;
    }
  },
  actions: {
    doSearch({state,commit},query) {
      const url = `${state.endpoint}/search?s=${query}`
      console.log(url)
      axios.get(url)
      .then(resp=> {
        let searchresults = resp.data
        if(searchresults.length > 0){
          console.log("FOUND",searchresults)
          commit("setResults", searchresults)
        }
        else {
          console.log("NO RESULTS")
          commit("setResults",[])
        }
      })
      .catch(()=> {
        commit("setResults",[])
      })
      .finally(() => {
        commit("setLoading",false)
      })
    },
    fetchMovie({state,commit}, movieID) {
      commit("setLoading",true)
      const url = `${state.endpoint}/movie/${movieID}`
      console.log(url)
      axios.get(url)
      .then(resp=> {
        let moviedata = resp.data
        console.log("Movie Data",moviedata)
        commit("setMovieData", moviedata)
      })
      .catch(()=> {
        //commit("setResults",[])
      })
      .finally(() => {
        commit("setLoading",false)
      })
    },
    postReview({state,commit}, formdata) {
      console.log("FORMDATA",formdata)
      const url = `${state.endpoint}/sendReview`
      
      axios.post(url, {
        ...formdata,userId:0
      })
      
    }
  }
})
