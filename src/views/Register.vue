<template>
    <body class="bg-white">
    <!-- Container -->
    <div class="container mx-auto">
        <div class="flex justify-center px-6 my-12">
            <!-- Row -->
            <div class="w-full xl:w-3/4 lg:w-11/12 flex">
                <!-- Col -->
                <div
                    class="w-full h-auto bg-white hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
                >
                    <img
                        alt="Welcome"
                        src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                        style="height: 600px"
                    />
                </div>
                <!-- Col -->
                <div class="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                    <h3 class="pt-4 text-2xl text-center">Create an Account!</h3>
                    <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded" @submit.prevent="registerUser">
                        <div class="mb-4 md:flex md:justify-between">
                            <div class="mb-4 md:mr-2 md:mb-0">
                                <label class="block mb-2 text-sm font-bold text-gray-700" for="firstName">
                                    First Name
                                </label>
                                <input
                                    required
                                    v-model="user.firstName"
                                    class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="firstName"
                                    type="text"
                                    placeholder="First Name"
                                />
                            </div>
                            <div class="md:ml-2">
                                <label class="block mb-2 text-sm font-bold text-gray-700" for="lastName">
                                    Last Name
                                </label>
                                <input
                                    required
                                    v-model="user.lastName"
                                    class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                />
                            </div>
                        </div>
                        <div class="mb-4">
                            <label class="block mb-2 text-sm font-bold text-gray-700" for="email">
                                Email
                            </label>
                            <input
                                required
                                v-model="user.email"
                                class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Email"
                            />
                        </div>
                        <div class="mb-4 md:flex md:justify-between">
                            <div class="mb-4 md:mr-2 md:mb-0">
                                <label class="block mb-2 text-sm font-bold text-gray-700" for="password">
                                    Password
                                </label>
                                <input
                                    required
                                    v-model="user.password"
                                    class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="******************"
                                />
                            </div>
                            <div class="md:ml-2">
                                <label class="block mb-2 text-sm font-bold text-gray-700" for="c_password">
                                    Confirm Password
                                </label>
                                <input
                                    required
                                    v-model="user.confirmPassword"
                                    class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="c_password"
                                    type="password"
                                    placeholder="******************"
                                />
                            </div>
                        </div>
                        <div class="mb-6 text-center">
                            <button
                                class="w-full px-4 py-2 font-bold text-white bg-primary rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Register Account
                            </button>
                        </div>
                        <h3>{{this.error}}</h3>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </body>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
import API from '../api/auth'
export default {
    name: "Register",
    data() {
        return {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            error: ''
        }
    },
    mounted() {
        this.$store.dispatch('getUsers')
        console.log(this.users)
    },
    computed: {
        ...mapState({
            users: state => state.users
        })
    },
    methods: {
        registerUser() {
            this.error = ''
            if (this.user.password !== this.user.confirmPassword) {
                this.error = "Password doesn't match"
                return
            }
            if (!this.userExistInDb(this.user)) {
                API.registerUser(this.user)
                    .then((response) => {
                        this.$router.push({path:"/login" ,query: { user: this.user }});

                    })
                    .catch((error) => {
                        this.error = error;
                    });
            }
            else
                this.error = "User with given email already exist"
        },
        userExistInDb(newUser) {
           return this.users.some(user => user.email === newUser.email)
        }
    }
}
</script>

<style scoped>

</style>
