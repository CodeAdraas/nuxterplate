<script setup lang="ts">
import { computed } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'

interface Props {
    height?: number,
    theme?:
        | 'default'
        | 'volcano'
        | 'invisible'
        | 'invisible-hc'
        | 'dark'
        | 'blue'
        | 'gray'
}

const prop = defineProps<Props>()
const theme_ = computed(
    () => prop.theme
       || useRuntimeConfig().public?.creditTheme
       || 'default')
</script>

<template>
    <iframe
        border-
        :height="`${height || 60}px`"
        width="100%"
        frameborder="0"
        :src="`https://credit.achoendov.media?theme=${theme_}`"
        loading="lazy"
    />
</template>