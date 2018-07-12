<template>
    <div v-if="user">
        <h1>iTunes</h1>
        <p color="grey darken-3">You should only get here if you are authenticated.!</p>
        <p color="grey darken-3">Your mail address: {{ email }}</p>
        <form @submit.prevent="submit">
            <input placeholder="Enter Album Name" class="input"
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
        margin-bottom: 0.5rem;
        color: dimgrey;
        font-size: 3rem;
        font-family: 'Prompt', sans-serif;
    }
    p {
        font-family: 'Prompt', sans-serif;
        margin: 0;
        margin-bottom: 1rem;
    }
    .input {
        border: 1px solid #ccc;
        padding: 0.5rem;
        border-radius: 10px;
        color: dimgrey;
        font-family: 'Prompt', sans-serif;
    }
</style>
