<template>
	<v-container fluid="true">
        <v-layout row>
            <v-flex xs12>
                <TheHeader></TheHeader>
                <transition name="slide" mode="out-in">
                    <nuxt/>
                </transition>
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
    middleware: 'soundtrack',
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Prompt');
.slide-left-enter,
.slide-right-leave-active {
    opacity: 0;
    transform: translate(30px, 0);
}

.slide-left-leave-active,
.slide-right-enter {
    opacity: 0;
    transform: translate(-30px, 0);
}


</style>
