<script setup lang="ts">
import { PrismicRichText } from '@prismicio/vue'

interface Props {
    question: any
    answer: any
    expanded?: boolean
    expandIcon: string
    collapseIcon: string
    iconSize: number
}

defineProps<Props>()
</script>

<template>
    <div class="faq-qa">
        <div
            class="faq-qa--question"
            @click="$emit('change')"
        >
            <prismic-rich-text :field="question" />
            <!--  -->
            <icon
                :name="expanded ? collapseIcon : expandIcon"
                :sizes="iconSize"
                class="faq-qa--btn"
            />
        </div>
        <!--  -->
        <prismic-rich-text
            :class="['faq-qa--answer', {'--visible' : expanded}]"
            :field="answer"
        />
    </div>
</template>

<style lang="scss">
.faq-qa {
    &--question {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }
    &--btn {
        padding: var(--faq-spacing) 0 var(--faq-spacing) var(--faq-spacing);
    }
    &--answer {
        overflow: hidden;
        transition: all .4s ease;
        max-height: 0px;
        &.--visible {
            max-height: 1000px;
            padding-bottom: var(--faq-spacing);
        }
    }
    & + .faq-qa {
        border-top: 1px solid;
    }
}
</style>