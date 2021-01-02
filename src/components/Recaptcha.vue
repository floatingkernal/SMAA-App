<template>
    <VueRecaptcha
        :sitekey="siteKey"
        @verify="verify"
        @expired='expired'
    />
        <!-- @error='error'
        @render='render' -->
</template>

<script>

import VueRecaptcha from 'vue-recaptcha';
import {SITE_KEY} from '@/secrets/recaptcha'
export default {
    name: 'Recaptcha',
    components: {
        VueRecaptcha,
    },
    props: {
        isVerified: Boolean,
        verify: Function,
        expired: Function,
    },
    data: () => ({
        siteKey: SITE_KEY
    }),
    methods: {
        error: () =>  console.log("Error occured with Recaptcha"),
        render: (id) => console.log("rendered Recaptcha", id)

    }
}
</script>

<style>

</style>