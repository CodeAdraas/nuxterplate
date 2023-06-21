<script setup lang="ts">
interface Props {
    label: string
    active?: boolean
}

defineProps<Props>()
</script>

<template>
    <div class="multi-select-option">
        <span :class="['indicator', {'active': active}]" />
        <label>{{ label }}</label>
    </div>
</template>

<style scoped lang="scss">
.multi-select-option {
    position: relative;
    background-color: var(--form-bg-color);
    color: var(--form-color);
    border: 1px solid var(--form-color);
    border-radius: var(--form-border-radius, 0.5em);
    overflow: hidden;
    padding: var(--form-spacing-y, 1em) var(--form-spacing-x, 1.5em);
    display: flex;
    align-items: center;
    gap: 0 var(--form-spacing-x, 1.5em);
    cursor: pointer;
}

.indicator {
    display: block;
    height: var(--multi-select-option-indicator-size, 0.8em);
    width: var(--multi-select-option-indicator-size, 0.8em);
    border-radius: var(--multi-select-option-indicator-roundness, 50em);
    border: 1px solid var(--multi-select-option-indicator-color);
    &.active {
        background-color: var(--multi-select-option-indicator-color);
    }
}

label {
    font-size: var(--form-font-size, 1em);
}
</style>