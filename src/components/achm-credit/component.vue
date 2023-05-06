<script setup lang="ts">
interface Props {
    height?: number,
    theme:
        | 'default'
        | 'volcano'
        | 'invisible'
        | 'invisible-hc'
        | 'dark'
        | 'blue'
        | 'gray'
}

defineProps<Props>()
</script>

<template>
    <iframe
        border-
        :height="`${height || 60}px`"
        width="100%"
        frameborder="0"
        :src="`https://credit.achoendov.media?theme=${theme}`"
        loading="lazy"
    />
</template>