<template>
    <div class="grey lighten-3">
        <v-container fluid>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card class="white--text" target="_blank" :href="url" :color="color">
                        <v-container fluid grid-list-lg>
                        <v-layout row>
                            <v-flex xs7>
                            <div class="adjust">
                                <div class="headline text-xs-center title"><h2>{{ title }}</h2></div>
                                <div><h3 class="text-xs-center artistname">{{ artistName }}</h3></div>
                            </div>
                            </v-flex>
                            <v-flex xs5>
                            <v-card-media
                                :src="image"
                                height="100px"
                                contain
                                class="media"
                            ></v-card-media>
                            </v-flex>
                        </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
    props: ['title', 'image', 'artistName', 'url', 'color', 'route', 'artistUrl']
}
</script>

<style scoped>
.artistname {
    margin-top: 1rem;
}
h2, h3 {
    text-transform: capitalize;
}
</style>
