<script setup lang="ts">
import { computed } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'

interface Props {
    height?: number,
    theme?:
        | 'default'
        | 'white'
        | 'white-hc'
}

const prop = defineProps<Props>()
const theme_ = computed(
    () => prop.theme
       || useRuntimeConfig().public?.creditTheme
       || 'default')
</script>

<template>
    <iframe
        loading="lazy"
        :src="`https://credit.achoendov.media?theme=${theme_}`"
        width="100%"
        :height="`${height || 80}px`"
        frameborder="0"
    />
</template>