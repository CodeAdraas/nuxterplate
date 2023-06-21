<script setup lang="ts">
import { ref, computed, type Ref } from 'vue'
import MultiSelectOption from './multi-select-option.vue'

interface Props {
    name: string
    options: string[]
    required?: boolean
}

const prop = defineProps<Props>()
const hiddenCheckbox = ref()
const selectOptions = ref(
    Object.fromEntries(
        prop.options.map(label => [label, false])
    )
) as Ref<Record<string, boolean>>

const value = computed(() => {
    let labels: string[] = []
    for (let [label, checked] of Object.entries(selectOptions.value)) {
        if (checked) labels.push(label)
    }
    return labels.join(', ')
})

const errorHelp = ref()

const onClick = (optionLabel: string) => {
    selectOptions.value[optionLabel] = !selectOptions.value[optionLabel]
        ? true
        : false

    // Remove the error help message if not needed
    if (hiddenCheckbox.value.validity && errorHelp.value) {
        errorHelp.value = undefined
    }
}

const onInvalid = (evt) => {
    errorHelp.value = evt.srcElement.validationMessage
}
</script>

<template>
    <div class="form--multi-select">
        <div class="field">
            <label><slot /></label>
            <multi-select-option
                v-for="checked, label, index in selectOptions"
                :key="index"
                :label="label"
                :active="checked"
                @click="onClick(label)"
            />
            <input
                ref="hiddenCheckbox"
                type="checkbox"
                :name="name"
                :value="value"
                :checked="!!value"
                :required="required"
                @invalid="onInvalid"
            />
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
    display: flex;
    flex-direction: column;
    gap: var(--multi-select-gap-y, 0.5em) 0;
}

label {
    color: var(--form-color, #000);
    padding: 0 0 0 var(--form-spacing-x, 1.5em);
}

input {
    display: none;
}

.error-help {
    display: block;
    padding: 0 0 0 var(--form-spacing-x, 1.5em);
    margin: var(--form-spacing-y, 1em) 0 0 0;
    font-size: var(--form-small-font-size, 0.8em);
    color: var(--form-helper-color);
}
</style>