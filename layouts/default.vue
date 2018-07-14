<template>
	<v-container fluid="true">
        <v-layout row>
            <v-flex xs12>
                <TheHeader></TheHeader>
                <nuxt/>
            </v-flex>
        </v-layout>
	</v-container>
</template>

<script>
import TheHeader from '@/components/TheHeader'

export default {
	components: {
		TheHeader,
	},
    computed: {
        email() {
            return !this.$store.getters.user ? false : this.$store.getters.user
        },
        user() {
            return this.$store.getters.token
        },
    },
    mounted() {
          this.$nextTick(function () {
              this.$store.dispatch('tryAutoLogin')
              this.$store.dispatch('subscribeList')
        })
    },
    middleware: 'soundtrack'
    // created() {
    //     this.$store.dispatch('subscribeList')
    // }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Prompt');

</style>
