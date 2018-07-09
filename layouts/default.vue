<template>
	<v-container fluid="true">
		<TheHeader></TheHeader>
		<nuxt/>
	</v-container>
	</div>
</template>

<script>
import TheHeader from '@/components/TheHeader'

export default {
	components: {
		TheHeader,
	}
}
</script>
