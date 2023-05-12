<script setup lang="ts">
defineProps({
  error: Object
})
</script>

<template>
    <layout-default>
        <h1>{{ error?.statusCode || 500 }}</h1>
        <p>{{ error?.statusMessage || 'An uknown error occured' }}</p>
    </layout-default>
</template>
