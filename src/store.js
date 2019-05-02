import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    videos: [
      {
        id: 1,
        src: '../assets/video/advertising720.mp4',
        title: 'Azino TGK',
        likes: 0,
        dislikes: 0,
        views: 0
      },
    ]
  },
  getters: {
    getVideoById: state => id =>{
      return state.videos.find(video => video.id == id)
    }
  },
  mutations: {
    like(state, id){
      state.videos.forEach((video, index) => {
        if(video.id == id){
          video.likes++
        }
      })
    },
    dislike(state, id){
      state.videos.forEach(video => {
        if(video.id == id){
          video.dislikes++
        }
      })
    },
    view(state, id){
      state.videos.forEach(video => {
        if(video.id == id){
          video.views++
        }
      })
    },
    localSave(state){
      const videos = JSON.stringify(state.videos);
      localStorage.setItem('videos', videos);
    },
  },
  actions: {
    like({commit}, id){
      commit('like', id)
      commit('localSave')
    },
    dislike({commit}, id){
      commit('dislike', id)
      commit('localSave')
    },
    view({commit}, id){
      commit('view', id)
      // commit('localSave')
    }
  }
})
