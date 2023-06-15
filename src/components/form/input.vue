<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
    name: string
    type?: 'text' | 'number' | 'email' | 'tel'
    variant?: 'input' | 'textarea'
    required?: boolean
    min?: number
    max?: number
}

const prop = withDefaults(defineProps<Props>(), {
    type: 'text',
    variant: 'input',
    required: true
})
const id = computed(() => {
    // Kind of quick random ID
    return `input-${(new Date).valueOf()}-${prop.name.toLowerCase().replace(/ |\-/gi, '_')}`
})
const value = ref()
const errorHelp = ref()
const isTyping = ref(false)
const isEmpty = computed(() => !(!!value.value))
const isFilled = computed(() => isTyping.value || !isEmpty.value)

const onInput = (evt) => {
    isTyping.value = true
    value.value = evt.target.value
    if (evt.target.validity && errorHelp.value) {
        errorHelp.value = undefined
    }
}

const onInvalid = (evt) => {
    errorHelp.value = evt.srcElement.validationMessage
}
</script>

<template>
    <div class="form--input">
        <div class="field">
            <component
                :is="variant"
                :id="id"
                :type="type"
                :name="name"
                :required="required"
                :minlength="min"
                :maxlength="max"
                @input="onInput"
                @focus="isTyping = true"
                @blur="isTyping = false"
                @invalid="onInvalid"
            />
            <!--  -->
            <label
                :for="id"
                :class="{'filled': isFilled}"
            >
                <slot />
            </label>
        </div>
        <!--  -->
        <span
            v-if="errorHelp"
            class="error-help"
        >
            {{ errorHelp }}
        </span>
    </div>
</template>

<style scoped lang="scss">
.field {
    position: relative;
}

input, textarea {
    width: 100%;
    background-color: var(--form-bg-color, #fff);
    color: var(--form-color, #000);
    padding: var(--form-spacing-y, 1em) var(--form-spacing-x, 1.5em);
    border-radius: var(--form-border-radius, 0.5em);
    border: 1px solid var(--form-color, #000);
    font-size: var(--form-font-size, 1em);
}

textarea {
    resize: vertical;
    font-family: inherit;
}

label {
    position: absolute;
    top: 50%;
    left: var(--form-spacing-x, 1.5em);
    transform: translateY(-50%);
    color: var(--form-color, #000);
    font-size: var(--form-font-size, 1em);
    &.filled {
        top: 0;
        transform: translate(-5px, -50%);
        background-color: var(--form-bg-color, #fff);
        padding: 0 5px;
        font-size: var(--form-small-font-size, 0.8em);
    }
}

.is-validated input,
.is-validated textarea {
    &:valid {
        border-color: var(--form-valid-color, green);
    }
    &:invalid {
        border-color: var(--form-invalid-color, red);
    }
}

.error-help {
    display: block;
    padding: 0 0 0 var(--form-spacing-x, 1.5em);
    margin: var(--form-spacing-y, 1em) 0 0 0;
    font-size: var(--form-small-font-size, 0.8em);
    color: var(--form-helper-color, gray);
}
</style>