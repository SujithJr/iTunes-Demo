<template>
    <div>
        <h1>Search iTunes</h1>
        <p>You should only get here if you are authenticated.!</p>
        <p>Your mail address: {{ email }}</p>
        <form @submit.prevent="submit">
            <input placeholder="Enter Recipe Name"
            v-model="search" autofocus>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            search: '',
            email: ''
        }
    },
    created() {
        axios.get('https://itunes-e4def.firebaseio.com/users.json')
        .then((res) => {
            const data = res.data
            const users = []
            for(let key in data) {
                const user = data[key]
                user.id = key
                users.push(user)
            }
            console.log(users)
            this.email = users[0].email
        }).catch((error) => {
            console.log(error);
        })
    },
    methods: {
        submit(event) {
            if (!this.search) {
                return
            }
            this.$router.push(`results/${this.search}`);
        }
    }
}
</script>

<style scoped>
    * {
        text-align: center;
    }
    h1 {
        margin: 2rem 0;
    }
</style>
