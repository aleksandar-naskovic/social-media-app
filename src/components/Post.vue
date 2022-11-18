<template>
    <div class="my-10">
        <div class="flex bg-gray-200 shadow-lg border-2 border-gray-300 rounded-lg mx-4 md:mx-auto">
            <div class="flex items-start px-4 py-6 min-w-full">
                <img @click="openProfile(post.userId)" class="cursor-pointer w-12 h-12 rounded-full object-cover mr-4 shadow" src="http://cdn.onlinewebfonts.com/svg/img_411575.png" alt="avatar">
                <div style="min-width: 80%">
                    <div class="flex items-center justify-between">
                        <h2 @click="openProfile(post.userId)" class="text-lg font-semibold text-gray-900 -mt-1 cursor-pointer">{{getUserName(post.userId)}} </h2>
                        <small class="text-sm text-gray-700">{{ post.time }}</small>
                    </div>
                    <p v-if="!editable" class="mt-3 text-gray-700 text-sm text-left">
                        {{post.post}}
                    </p>
                    <form v-else class="flex-1 ml-4 mt-1 " @submit.prevent="submitPost">
                        <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                            <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                <textarea v-model="post.post" required id="comment" rows="4" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a post..." required></textarea>
                            </div>
                            <div class="flex items-center px-3 py-2 border-t dark:border-gray-600">
                                <button type="submit" class="inline-flex mr-3 items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-green-900 hover:bg-green-800">
                                    Update
                                </button>
                                <button @click="editable=false" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-red-900 hover:bg-red-800">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                    <div class="mt-4 flex items-center justify-between">
                        <div class="flex flex-row">
                            <div class="flex mr-2 text-gray-700 text-sm mr-3">
                                <svg fill="none" viewBox="0 0 24 24"  class="w-4 h-4 mr-1" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                                </svg>
                                <span>12</span>
                            </div>
                            <div class="flex mr-2 text-gray-700 text-sm mr-8">
                                <svg fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-1" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
                                </svg>
                                <span>{{comments.length}}</span>
                            </div>
                            <div class="flex mr-2 text-gray-700 text-sm mr-4">
                                <svg fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-1" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                                </svg>
                                <span>share</span>
                            </div>
                        </div>
                        <div v-if="canEditPost(post.userId) && !editable">
                            <button @click="editable=true" class="inline-flex items-center px-1 pt-2 ml-1 flex-column">
                                <svg width="24" stroke-width="1.5" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M20 12V5.74853C20 5.5894 19.9368 5.43679 19.8243 5.32426L16.6757 2.17574C16.5632 2.06321 16.4106 2 16.2515 2H4.6C4.26863 2 4 2.26863 4 2.6V21.4C4 21.7314 4.26863 22 4.6 22H11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/> <path d="M8 10H16M8 6H12M8 14H11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/> <path d="M16 5.4V2.35355C16 2.15829 16.1583 2 16.3536 2C16.4473 2 16.5372 2.03725 16.6036 2.10355L19.8964 5.39645C19.9628 5.46275 20 5.55268 20 5.64645C20 5.84171 19.8417 6 19.6464 6H16.6C16.2686 6 16 5.73137 16 5.4Z" fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/> <path d="M17.9541 16.9394L18.9541 15.9394C19.392 15.5015 20.102 15.5015 20.5399 15.9394V15.9394C20.9778 16.3773 20.9778 17.0873 20.5399 17.5252L19.5399 18.5252M17.9541 16.9394L14.963 19.9305C14.8131 20.0804 14.7147 20.2741 14.6821 20.4835L14.4394 22.0399L15.9957 21.7973C16.2052 21.7646 16.3988 21.6662 16.5487 21.5163L19.5399 18.5252M17.9541 16.9394L19.5399 18.5252" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/> </svg>
                            </button>
                            <button @click="deletePost(post)" class="inline-flex items-center px-1 -ml-1 flex-column">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/> </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-for="comment in comments" class="flex-col w-full ml-4 py-4 mt-1 bg-white border-b-2 border-r-2 border-gray-200 bg-gray-200 sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm md:w-5/6">
            <Comment :comment="comment" :canEditPost="canEditPost(post.userId)" />
        </div>
        <NewComment :postId=post.id />
    </div>
</template>

<script>
import Comment from './Comment'
import {mapGetters, mapActions} from "vuex";
import NewComment from "./NewComment";
export default {
    name: "Post",
    components: {NewComment, Comment},
    props: {
        post: {
            type: Object
        },
        comments: {
            type: Array,
            default: [],
        },
        editable: false,
    },
    mounted() {
        this.getUsers();
    },
    computed: {
        ...mapGetters(["users"]),
    },
    methods: {
        ...mapActions(["getUsers"]),
        ...mapActions(["updatePost"]),
        ...mapActions(["deletePost"]),
        getUserName(userId) {
            let user = this.users.find(user=> user.id === userId);
            if (user)
                return user.firstName + ' ' + user.lastName;
        },
        canEditPost(userId) {
            let loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
            return loggedUser.id === userId
        },
        submitPost() {
            this.updatePost(this.post)
            this.editable = false
        },
        openProfile(userId) {
            this.$router.push({ path: '/profile/' + userId, params: { userId }})
        }
    }
}
</script>

<style scoped>

</style>
