<template>
    <div v-if="user">
        <h1>Results for {{ $route.params.id }} / Total - {{ albumData.length }} Albums</h1>
        <p>Pay to listen all the songs</p>
        <v-btn type="submit" @click="pay" class="pay" color="black white--text">Pay 20$</v-btn> 
        <div v-if="albumAvail" class="albums">
            <template v-if="show === false">
                <div v-for="(album, index) in albumData.slice(0, 5)" :key="album.index" class="collection">
                    <Card :title="album.collectionCensoredName"
                    :image="album.artworkUrl100"
                    :artistName="album.artistName"
                    :url="album.artistViewUrl"
                    :color="picker(index)"
                    >
                    </Card>
                </div>
            </template>
            <template v-else>
                <div v-for="(album, index) in albumData" :key="album.index" class="collection">
                    <Card :title="album.collectionCensoredName"
                    :image="album.artworkUrl100"
                    :artistName="album.artistName"
                    :url="album.artistViewUrl"
                    :color="picker(index)"
                    >
                    </Card>
                </div>
            </template>
            <!-- {{albumData}} -->
        </div>
        <div v-else>
            <h1>Could Not Find Album</h1>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Card from '@/components/Card'

export default {
    data() {
        return {
            show: false,
            color: 'green'
        }
    },
    components: {
        Card,
    },
    asyncData({params}) {
        return axios.get(`https://itunes.apple.com/search?term=${params.id}&entity=album`)
        .then((response) => {
            return {
                albumData: response.data.results
            }
        })
    },
    middleware: 'search',
    methods: {
        picker(index) {
            console.log("Index: " + index);
            return index % 2 == 0 ? 'cyan darken-2' : 'pink';
        },
        pay() {
            this.show = !this.show
        }
    },
    computed: {
        albumAvail() {
            return this.albumData.length > 0;
        },
        user() {
            return this.$store.getters.token
        }
    },
}
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }
    h1 {
        margin: 2rem 0;
        margin-left: 1rem;
        font-family: 
    }
    p {
        padding: 0;
        margin: 1rem 0;
        font-size: 1.3rem;
        margin-left: 1rem;
    }
    .albums {
        display: flex;
        flex-wrap: wrap;
    }
    .collection {
        width: 48%;
        margin: 1rem;
    }
    .pay {
        margin: 0;
        margin-bottom: 2rem;
        margin-left: 1rem;
        font-size: 1.2rem;
    }
</style>
