<template>
    <v-toolbar dark color="black">
        <v-toolbar-title class="white--text">
            <nuxt-link class="title" to="/">iTunes</nuxt-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat to="/signup">SignUp</v-btn>
            <v-btn flat to="/signin">SignIn</v-btn>
            <v-btn flat to="/">Dashboard</v-btn>
        </v-toolbar-items>
        <v-btn to="/" icon>
            <v-icon style="">format_color_fill</v-icon>
        </v-btn>
    </v-toolbar>
</template>

<script>
export default {
}
</script>

<style scoped>
.title {
  text-decoration: none !important;
}
.title:visited{
  color: white;
}
</style>
