<template>
    <div>
        <div v-if="songList">
            <h1>List Of Songs<span v-if="songList[0] == null"> - You have not Subscribed to any Albums yet.!</span></h1>
            <div v-if="songList">
                <div class="collect-flex">
                    <div v-for="(song, index) in songList" :key="song.index" class="collection">
                        <div class="grey lighten-3">
                            <v-container fluid>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <v-card class="white--text" target="_blank" :color="picker(index)">
                                            <v-container fluid grid-list-lg>
                                            <v-layout row>
                                                <v-flex xs12>
                                                <div class="adjust">
                                                    <div><h3 class="text-xs-center artistname">{{ song.artistName }}</h3></div>
                                                </div>
                                                </v-flex>
                                            </v-layout>
                                            </v-container>
                                        </v-card>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <h2></h2>
            </div>
        </div>
        <div v-else>
            <h2>You have not Subscribed to any Albums yet.!</span></h2>
        </div>
    </div>

</template>

<script>
import Card from '@/components/Card'

export default {
    components: {
        Card,
    },
    props: [],
    computed: {
        songList() {
            return this.$store.getters.songList
        }
    },
    methods: {
        picker(index) {
            return index % 2 == 0 ? 'cyan darken-2' : 'pink accent-4';
        },
    },
    middleware: ['soundtrack']
}
</script>

<style scoped>
h3 {
    text-transform: capitalize;
}
h1, h2 {
    margin-top: 2rem;
    color: dimgrey;
    font-family: 'Prompt', sans-serif;
}
.collect-flex {
    display: flex;
    flex-wrap: wrap;
}
.collection {
    margin: 2rem 0;
    margin-right: 1.5rem;
    width: 49%;
    display: inline-block;
}
.collection:nth-child(even) {
    margin-right: 0;
}
</style>
