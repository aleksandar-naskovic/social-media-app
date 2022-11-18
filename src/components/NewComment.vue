<template>
    <form class="mb-14 ml-4 mt-1 md:w-5/6" @submit.prevent="createComment">
        <div class="w-full mb-4 border border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                <textarea v-model="comment.comment" required id="comment" rows="4" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
            </div>
            <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                    Add Comment
                </button>
            </div>
        </div>
    </form>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: "NewComment",
    data() {
        return {
            comment: {
                comment: '',
                userId: JSON.parse(localStorage.getItem("loggedUser")).id,
                postId: this.postId
            }
        }
    },
    props: {
        postId: {
            type: Number
        }
    },
    methods: {
        createComment() {
            this.comment.time = new Date(Date.now()).toLocaleString()
            this.newComment(this.comment);
            this.comment.comment = ''
        },
        ...mapActions(["newComment"])
    }
}
</script>

<style scoped>
#comment:focus {
    outline: none !important;
    border: none;
}
</style>
