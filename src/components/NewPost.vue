<template>
    <form class="mb-14" @submit.prevent="createPost">
        <div class="w-full mb-4 border border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-600">
                <textarea v-model="post.post" required id="post" rows="4" class="w-full px-0 text-sm text-gray-900 bg-white  dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a post..." required></textarea>
            </div>
            <div class="flex items-center justify-between px-3 py-2 border-t  dark:border-gray-600">
                <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                    Post
                </button>
            </div>
        </div>
    </form>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: "NewPost",
    data() {
        return {
            post: {
                post: '',
                userId: JSON.parse(localStorage.getItem("loggedUser")).id

            }
        }
    },
    methods: {
        createPost() {
            this.post.time = new Date(Date.now()).toLocaleString()
            this.newPost(this.post)
        },
        ...mapActions(["newPost"])
    }
}
</script>

<style scoped>

#post:focus {
    outline: none !important;
    border: none;
}

</style>
