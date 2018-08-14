<template>
    <div v-if="user">
        <h1>iTunes</h1>
        <p color="grey darken-3">You should only get here if you are authenticated.!</p>
        <p color="grey darken-3">Your mail address: {{ email }}</p>
        <form @submit.prevent="submit">
            <input placeholder="Enter Album Name" class="input" type="text"
            v-model="search" autofocus>
        </form>
        <!-- <results/> -->
    </div>
    <div v-else>
        <h2>iTunes</h2>
        <div class="banner">
            <img src="@/static/piano1.jpg" alt="iTunes-piano" class="image">
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import results from '@/pages/results/_id'
import lowercase from 'lodash.lowercase'

export default {
    data() {
        return {
            search: '',
        }
    },
    // components: {
    //     results,
    // },
    middleware: ['paymentMode'],
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
            const item = this.search
            const searchItem = lowercase(item)
            var newItem = searchItem.replace(/\s+/g, '');
            this.$router.push(`results/${newItem}`)
            this.$store.dispatch('payment')
        }
    }
}
</script>

<style scoped>
    * {
        text-align: center;
    }
    h1, h2 {
        margin: 2rem 0;
        margin-bottom: 0.5rem;
        color: dimgrey;
        font-size: 3rem;
        font-family: 'Prompt', sans-serif;
    }
    h2 {
        font-size: 4rem;
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
    .banner {
        width: 500px;
        margin: 0 auto;
    }
    .image {
        width: 100%;
    }
</style>
