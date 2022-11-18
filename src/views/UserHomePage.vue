<template>
    <div class="bg-gray-100 pt-5">
        <button
            class="w-24 px-4 py-2 font-bold text-white bg-primary rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline float-right mr-5"
            @click="logOut"
        >
            <slot>LogOut</slot>
        </button>
        <div class="container md:mx-auto max-w-md md:max-w-2xl">
            <NewPost/>
            <h2 class="text-left font-semibold mt-10">Your Feed:</h2>
            <div v-for="post in posts">
                <Post :post="post" :comments="getCommentsForPost(post)" />
            </div>
        </div>
    </div>
</template>

<script>
import Post from '../components/Post'
import Button from "../components/Button";
import NewPost from "../components/NewPost";
import {mapGetters, mapActions} from "vuex";
export default {
    name: "UserHomePage.vue",
    components: {
        NewPost,
        Button,
        Post
    },
    data () {
        return {
            // posts: []
        }
    },
    mounted() {
        this.getPosts();
        this.getComments();
        console.log(this.comments)
        console.log(this.posts)
    },
    methods: {
        ...mapActions(["getPosts"]),
        ...mapActions(["getComments"]),
        getCommentsForPost(post) {
            return this.comments.filter(comment => comment.postId === post.id)
        },
        logOut() {
            localStorage.removeItem('loggedUser')
            this.$router.push({path:"/"});
        }
    },
    computed: {
        ...mapGetters(["posts"]),
        ...mapGetters(["comments"]),

    },
}
</script>

<style scoped>

</style>
