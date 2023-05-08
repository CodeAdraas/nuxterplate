<script setup lang="ts">
import { ref } from 'vue'
import { PrismicRichText } from '@prismicio/vue'
import FaqQa from './qa.vue'

interface Props {
    title?: any
    qas: any[],
    expandIcon?: string
    collapseIcon?: string
    iconSize?: number
}

withDefaults(defineProps<Props>(), {
    expandIcon: 'plus',
    collapseIcon: 'x',
    iconSize: 20
})

const expandedPointer = ref(-1)

const changePointer = (newIndex: number) => {
    expandedPointer.value = newIndex == expandedPointer.value
        ? -1
        : newIndex
}
</script>

<template>
    <div class="faq">
        <prismic-rich-text
            v-if="title"
            :field="title"
            class="faq--title"
        />
        <div>
            <faq-qa
                v-for="[q, a], index in qas"
                :key="index"
                :question="q"
                :answer="a"
                :expanded="expandedPointer == index"
                :expand-icon="expandIcon"
                :collapse-icon="collapseIcon"
                :icon-size="iconSize"
                @change="changePointer(index)"
            />
        </div>
    </div>
</template>

<style>
.faq--title {
    padding-bottom: var(--faq-spacing-y, 1em);
}
</style>