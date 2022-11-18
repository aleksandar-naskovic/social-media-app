<template>
    <div class="bg-gray-100 pt-5">
    <button
        class="w-32 px-4 py-2 font-bold text-white bg-primary rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline float-right mr-5"
        @click="$router.push({path:'/home'});"
    >    <slot>Home Page</slot>
    </button>
    <div class="max-w-2xl mx-auto">

        <div class="px-3 py-2">

            <div class="flex flex-col gap-1 text-center">
                <img class="block mx-auto bg-center bg-no-repeat bg-cover w-20 h-20 rounded-full border border-gray-400 shadow-lg" src="http://cdn.onlinewebfonts.com/svg/img_411575.png" alt="avatar">
                <p class="font-serif font-semibold">{{ user.firstName }} {{ user.lastName }}</p>
                <span class="text-sm text-gray-400">Belgrade, Serbia</span>
            </div>
        </div>
        <h2 class="text-left font-semibold mt-10">My posts:</h2>
        <div v-for="post in filteredPosts">
            <Post :post="post" :comments="getCommentsForPost(post)" />
        </div>
    </div>
    </div>
</template>

<script>
import axios from "axios";
import {mapActions, mapGetters} from "vuex";
import Post from "../components/Post";
import NewPost from "../components/NewPost";

export default {
    name: "Profile",
    components: {
        Post,
        NewPost
    },
    data () {
        return {
            user:{},
            filteredPosts: []
        }
    },
    async mounted() {
        this.getPosts()
        this.getComments()
        let userId = this.$route.params.userId
        let result = await axios.get(`${this.$store.getters.server}/users/${userId}`);
        this.user = result.data
        this.filteredPosts = this.posts.filter(post => post.userId === this.user.id)
        console.log(this.filteredPosts)
    },
    methods: {
        ...mapActions(["getPosts"]),
        ...mapActions(["getComments"]),
        getCommentsForPost(post) {
            return this.comments.filter(comment => comment.postId === post.id)
        },
    },
    computed: {
        ...mapGetters(["posts"]),
        ...mapGetters(["comments"]),

    },
}
</script>

<style scoped>

</style>
