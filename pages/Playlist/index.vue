<template>
    <div>
        <div v-if="songList !== null">
            <h1>List Of Songs<span v-if="songList[0] == null"> - You have not Subscribed to any Albums yet.!</span></h1>
        </div>
        <div v-if="songList">
            <div class="collect-flex">
                <div v-for="(song, index) in songList" :key="song.index" class="collection">
                    <form @click="urlPage" style="cursor: pointer;" class="form">
                        <div class="grey lighten-3">
                            <v-container fluid>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <v-card class="white--text" :color="picker(index)">
                                            <v-container fluid grid-list-lg>
                                            <v-layout row>
                                                <v-flex xs12>
                                                <div class="adjust">
                                                    <div><h3 class="text-xs-center artistname">{{ song.artistName }}</h3></div>
                                                    <!-- <v-btn class="grey darken-4 text-xs-center button" type="submit">Listen</v-btn> -->
                                                </div>
                                                </v-flex>
                                            </v-layout>
                                            </v-container>
                                        </v-card>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- <div v-else>
            <h2>You have not Subscribed to any Albums yet.!</h2>
        </div> -->
    </div>

</template>

<script>
import Card from '@/components/Card'
import lowercase from 'lodash.lowercase'

export default {
    data() {
        return {
            stringUrl1: "https://itunes.apple.com/search?term=",
            stringUrl2: "&entity=album",
            name: ''
        }
    },
    components: {
        Card,
    },
    props: [],
    methods: {
        picker(index) {
            return index % 2 == 0 ? 'cyan darken-2' : 'pink accent-4';
        },
        urlPage(e) {
            // const routeName = this.$refs.name.innerHTML
            const content = e.target.textContent
            const title = content.replace("Listen", "")
            console.log(title)
            this.$router.replace(`results/${title}`)
        }
    },
    computed: {
        songList() {
            return this.$store.getters.songList
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
.form:hover {
    background: #000;
    opacity: 0.89;
    transition: 0.5s all;
}
.collect-flex {
    display: flex;
    flex-wrap: wrap;
}
.button {
    text-align: center;
}
.collection {
    margin: 2rem 0;
    margin-right: 1.5rem;
    margin-bottom: 0;
    width: 49%;
    display: inline-block;
}
.collection:nth-child(even) {
    margin-right: 0;
}
</style>
