<script setup lang="ts">
import { ref } from 'vue'

interface Emits {
    (e: 'submit', formData: FormData): void
}

interface Props {
    submitLabel: string
    loadingLabel: string
    loading?: boolean
    isError?: boolean
}

const emit = defineEmits<Emits>()
defineProps<Props>()
const isValidityChecked = ref(false)

const onSubmit = (evt: any) => {
    isValidityChecked.value = true
    if (evt.target.checkValidity()) {        
        emit('submit', new FormData(evt.target))
    }
}
</script>

<template>
    <form
        novalidate
        :class="['form', {'is-validated': isValidityChecked}]"
        @submit.prevent="onSubmit"
    >
        <slot />
        <!--  -->
        <div class="captcha">
            <slot name="captcha" />
        </div>
        <!--  -->
        <div :class="['validity-message', {'error': isError}]">
            <slot name="validityMessage" />
        </div>
        <!--  -->
        <button
            type="submit"
            class="form--btn"
            :disabled="loading"
        >
            {{ loading ? loadingLabel : submitLabel }}
        </button>
    </form>
</template>

<style scoped lang="scss">
.form {
    font-size: var(--form-font-size, 1rem);
    display: flex;
    flex-direction: column;
    gap: var(--form-gap-y, 1.5em) 0;
    &--btn {
        font-size: inherit;
        border: 1px solid var(--form-btn-color, #fff);
        border-radius: var(--form-border-radius, 0.5em);
        color: var(--form-button-color, #fff);
        background: var(--form-button-bg-color, #000);
        padding: var(--form-spacing-y, 1em) var(--form-spacing-x, 2em);
        cursor: pointer;
    }
}

.validity-message {
    color: var(--form-valid-color, green);
    &.error {
        color: var(--form-invalid-color, red);
    }
}
</style>