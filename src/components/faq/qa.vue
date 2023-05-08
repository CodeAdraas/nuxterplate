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
    <div class="faq--qa">
        <div
            class="faq--question"
            @click="$emit('change')"
        >
            <prismic-rich-text :field="question" />
            <!--  -->
            <icon
                :name="expanded ? collapseIcon : expandIcon"
                :sizes="iconSize"
                class="faq--btn"
            />
        </div>
        <!--  -->
        <prismic-rich-text
            :class="['faq--answer', {'is-visible' : expanded}]"
            :field="answer"
        />
    </div>
</template>

<style lang="scss">
.faq {
    &--question {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }
    &--btn {
        padding: var(--faq-spacing-y, 1em) 0 var(--faq-spacing-y, 1em) var(--faq-spacing-x, 1.5em);
    }
    &--answer {
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.65, 0.32, 0, 0.95);
        max-height: 0px;
        &.is-visible {
            max-height: 1000px;
            padding: 0 0 var(--faq-spacing-y, 1em) 0;
        }
    }
    &--qa + .faq--qa {
        border-top: 1px solid var(--faq-divider-color, gray);
    }
}
</style>