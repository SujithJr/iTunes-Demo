<template>
    <div v-if="user">
        <h1>Results for {{ $route.params.id }} / Total - {{ albumData.length }} Albums</h1>
        <p>Pay to listen all the songs</p>
        <form @submit.prevent="pay">
            <v-btn type="submit" :disabled="show" class="pay" color="grey darken-1 white--text">{{ payment }}</v-btn>
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
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import Card from '@/components/Card'

export default {
    data() {
        return {
            show: false,
            color: 'green',
            payment: 'Pay 20$'
        }
    },
    components: {
        Card,
    },
    // created() {
    //     this.$store.dispatch('subscribeList')
    // },
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
            // console.log("Index: " + index);
            return index % 2 == 0 ? 'cyan darken-2' : 'pink';
        },
        pay() {
            this.show = true
            this.payment = 'Paid'
            // const songData = {
            //     artistName: this.$route.params.id,
            //     userId: this.userId
            // }
            // const song = this.$route.params.id
            this.$store.dispatch('paidAlbum', {
                artistName: this.$route.params.id,
                userId: this.userId
            })
            console.log(this.$store.getters.user)
        }
    },
    computed: {
        albumAvail() {
            return this.albumData.length > 0;
        },
        user() {
            return this.$store.getters.token
        },
        userId() {
            return this.$store.getters.userId
        }
        // subscribed() {
        //     return this.$store.getters.subscribe
        // }
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
        margin-bottom: 0;
        color: dimgrey;
        font-family: 'Prompt', sans-serif;
    }
    p {
        padding: 0;
        margin: 1rem 0;
        margin-top: 0.5rem;
        font-size: 1.3rem;
        margin-left: 1rem;
        color: dimgrey;
        font-family: 'Prompt', sans-serif;
    }
    .albums {
        display: flex;
        flex-wrap: wrap;
    }
    .collection {
        width: 47%;
        margin: 1rem;
    }
    .pay {
        margin: 0;
        margin-bottom: 2rem;
        margin-left: 1rem;
        font-size: 1.2rem;
    }
</style>
