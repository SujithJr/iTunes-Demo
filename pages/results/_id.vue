<template>
    <div>
        <h1>Results for {{ $route.params.id }} / Total - {{ albumData.length }} Albums</h1>
        <div v-if="albumAvail">
            <div v-for="(album, index) in albumData" :key="album.index">
                <Card :title="album.collectionCensoredName"
                :image="album.artworkUrl100"
                :artistName="album.artistName"
                :url="album.artistViewUrl"
                :color="picker(index)">
                </Card>
            </div>
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
    components: {
        Card,
    },
    asyncData({params}) {
        return axios.get(`https://itunes.apple.com/search?term=${params.id}&entity=album`)
        .then((response) => {
            return { 
                albumData: response.data.results 
            }
        });
    },
    middleware: 'search',
    methods: {
        picker(index) {
            console.log("Index: " + index);
            return index % 2 == 0 ? 'cyan darken-2' : 'pink';
        }
    },
    computed: {
        albumAvail() {
            return this.albumData.length > 0;
        }
    },
}
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }
    h1 {
        margin: 2rem;
    }
</style>
