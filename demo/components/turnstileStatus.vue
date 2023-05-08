<script setup lang="ts">
const turnstile = useTurnstile()
</script>

<template>
    <div class="ts">
        <p v-if="turnstile.isVerifying">Global Turnstile -</p>
        <p v-if="turnstile.isVerifying">Verifying...</p>
        <p v-else-if="turnstile.isError">Error</p>
        <p v-else>Protected</p>
        <!--  -->
        <input :value="turnstile.responseToken" />
        <!--  -->
    </div>
</template>

<style scoped>
.ts {
    display: flex;
    gap: 0 10px;
}
</style>