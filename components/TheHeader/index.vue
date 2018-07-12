<template>
    <v-toolbar dark color="red darken-3">
        <v-toolbar-title class="white--text">
            <v-btn flat class="font-weight-black head">i<span>T</span>unes</v-btn>
            <!-- <nuxt-link class="title" to="/#">iTunes</nuxt-link> -->
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn v-if="!user" flat to="/signup">SignUp</v-btn>
            <v-btn v-if="!user" flat to="/signin">SignIn</v-btn>
            <v-btn v-if="user" flat to="/">Dashboard</v-btn>
        </v-toolbar-items>
            <v-btn v-if="user" flat icon @click="logout"><v-icon style="">lock</v-icon></v-btn>
    </v-toolbar>
</template>

<script>
export default {
    computed: {
        user() {
            return this.$store.getters.token
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout')
            // this.$router.push('/signin')
        }
    }
}
</script>

<style scoped>

.title {
  text-decoration: none !important;
}
.title:visited{
  color: white;
}
.head {
    margin: 0;
    padding: 0;
    font-size: 2.5rem;
    text-transform: lowercase;
    font-family: 'Prompt', sans-serif;

}
span {
    text-transform: uppercase;
}
</style>
