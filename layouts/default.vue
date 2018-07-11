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
	}
}
</script>
