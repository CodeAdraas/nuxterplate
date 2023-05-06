<script setup lang="ts">
import { useRuntimeConfig } from 'nuxt/app'
import AchmCredit from '../achm-credit/component.vue'

const runtimeConfig = useRuntimeConfig()
</script>

<template>
    <seo-kit />
    <div
        :class="[
            'max-w-[1000px] w-full mx-auto',
            'flex flex-col lg:flex-row gap-x-16 lg:gap-32',
            'text-white'
        ]"
    >
        <Header />
        <slot />
        <Footer />
    </div>
    <achm-credit
        :theme="runtimeConfig.public?.creditTheme || 'default'"
    />
</template>