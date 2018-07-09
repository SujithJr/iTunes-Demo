<template>
  <v-toolbar dark color="black">
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title class="white--text">
      <nuxt-link class="title" to="/">Recipes</nuxt-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn to="/" icon>
      <v-icon>format_color_fill</v-icon>
    </v-btn>
  </v-toolbar>
</template>
<script>
</script>
<style scoped>
.title {
  text-decoration: none !important;
}
.title:visited{
  color: white;
}
</style>