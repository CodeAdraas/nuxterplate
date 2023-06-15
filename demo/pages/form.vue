<script setup lang="ts">
const formData = ref(new FormData)
</script>

<template>
    <Form
        submit-label="Submit"
        loading-label="Submitting..."
        @submit="fd => formData = fd"
    >
        <form-input :min="3">
            Your name
        </form-input>
        <form-input type="email">
            Your e-mail"
        </form-input>
        <form-multi-select
            required
            :options="['Option 1', 'Option 2']"
        >
            Select services
        </form-multi-select>
        <form-input
            variant="textarea"
            :max="300"
        >
            Optional info
        </form-input>
    </Form>
    <pre v-if="[...formData.entries()].length">
        {{ JSON.stringify(Object.fromEntries(formData.entries())) }}
    </pre>
</template>