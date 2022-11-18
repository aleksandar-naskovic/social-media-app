import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    server: 'http://localhost:3000',
    users: [],
    posts: [],
    comments: []
  },
  mutations: {
    setUsers: (state, users) => state.users.push(...users),
    setPosts: (state, posts) => (state.posts = posts),
    newPost: (state, post) => state.posts.unshift(post),
    setComments: (state, comments) => state.comments = comments,
    newComment: (state, comment) => state.comments.push(comment),
    deleteComment: (state, comment) => state.comments = state.comments.filter(commentItem => commentItem.id !== comment.id),
    updateComment: (state, comment) => {
      const indexOfItemInArray = state.comments.findIndex(commentItem => commentItem.id === comment.id);
      if (indexOfItemInArray > -1) {
        state.comments[indexOfItemInArray] = comment;
      }
    },
    deletePost: (state, post) => state.posts = state.posts.filter(postItem => postItem.id !== post.id),
    updatePost: (state, post) => {
      const indexOfItemInArray = state.posts.findIndex(postItem => postItem.id === post.id);
      if (indexOfItemInArray > -1) {
        state.posts[indexOfItemInArray] = post;
      }
    },

  },
  actions: {
    async getUsers(context) {
      let users = await axios.get('http://localhost:3000/users')
      context.commit('setUsers', users.data)
    },
    async getPosts(context) {
      let response = await axios.get(`${context.getters.server}/posts`)
      let posts = response.data.sort((a,b) => b.id - a.id)
      context.commit("setPosts", posts);
    },
    async getComments(context) {
      let response = await axios.get(`${context.getters.server}/comments`)
      context.commit("setComments", response.data);
    },
    async newPost(context, post) {
      let response = await axios.post(`${context.getters.server}/posts`, {...post})
      context.commit('newPost', response.data)
    },
    async newComment(context, comment) {
      let response = await axios.post(`${context.getters.server}/comments`, {...comment})
      context.commit('newComment', response.data)
    },
    async updateComment(context, comment) {
      let response = await axios.put(`${context.getters.server}/comments/${comment.id}`, {...comment})
      context.commit('updateComment', response.data)
    },
    async deleteComment(context, comment) {
      await axios.delete(`${context.getters.server}/comments/${comment.id}`)
      context.commit('deleteComment', comment)
    },
    async updatePost(context, post) {
      let response = await axios.put(`${context.getters.server}/posts/${post.id}`, {...post})
      context.commit('updatePost', response.data)
    },
    async deletePost(context, post) {
      await axios.delete(`${context.getters.server}/posts/${post.id}`)
      context.commit('deletePost', post)
    },


  },
  getters: {
    name (state) {
      return state.name
    },
    server (state) {
      return state.server
    },
    posts (state) {
      return state.posts
    },
    users (state) {
      return state.users
    },
    comments (state) {
      return state.comments
    },
  },
  modules: {
  }
})
