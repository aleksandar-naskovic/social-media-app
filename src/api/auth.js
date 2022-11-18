import axios from "axios";
import store from '../store'


export default {
    async registerUser(user) {
        axios.post(`${store.getters.server}/users`, {
            ...user
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    async loginUser(loggedUser) {
        try {
            let users = await axios.get(`${store.getters.server}/users`);
            if (users.data) {
                const result = users.data.find(user => user.email === loggedUser.email && user.password === loggedUser.password)
                console.log(result)
                if (result)
                    return result
                else {
                    throw {
                        type: "userNotFound",
                        message: "Wrong credentials",
                    };
                }
            }
        }
        catch (error) {
            return error
        }
    }
}
