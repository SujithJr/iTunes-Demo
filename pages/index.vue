<template>
    <div v-if="user">
        <h1>Search iTunes</h1>
        <p>You should only get here if you are authenticated.!</p>
        <p>Your mail address: {{ email }}</p>
        <form @submit.prevent="submit">
            <input placeholder="Enter Album Name"
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
        }
    },
    computed: {
        email() {
            return !this.$store.getters.user ? false : this.$store.getters.user
        },
        user() {
            return this.$store.getters.token
        }
    },
    mounted() {
          this.$nextTick(function () {
              this.$store.dispatch('tryAutoLogin')
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
