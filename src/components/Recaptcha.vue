<template>
    <VueRecaptcha
        :sitekey="siteKey"
        @verify="verify"
        @expired='expired'
    />
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
}
</script>

<style>

</style>