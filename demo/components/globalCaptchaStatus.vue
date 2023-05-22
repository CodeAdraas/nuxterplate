<script setup lang="ts">
const captcha = useCaptcha()
</script>

<template>
    <div class="ts">
        <p>Global captcha -</p>
        <p v-if="captcha.isVerifying">Verifying...</p>
        <p v-else-if="captcha.isError">Error</p>
        <p v-else-if="captcha.responseToken">Protected</p>
        <p v-else>Not protected</p>
        <!--  -->
        <input :value="captcha.responseToken" />
        <!--  -->
    </div>
</template>

<style scoped>
.ts {
    display: flex;
    gap: 0 10px;
}
</style>