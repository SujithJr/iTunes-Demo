<template>
    <div>
        <!-- <result/> -->
        <nuxt-child/>
    </div>
</template>

<script>
import result from '@/pages/results/_id'
export default {
    middleware: ['paymentMode'],
    components: {
        result
    }
}
</script>
