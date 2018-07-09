<template>
    <div>
        <h1>Search Recipes</h1>
        <form @submit.prevent="submit">
            <input placeholder="Enter Recipe Name" 
            v-model="search" autofocus>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: '',
        }
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
