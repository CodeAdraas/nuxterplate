<script setup lang="ts">
const formData = ref(new FormData)
</script>

<template>
    <Form
        submit-label="Submit"
        loading-label="Submitting..."
        @submit="fd => formData = fd"
    >
        <form-input
            name="name"
            :min="3"
        >
            Your name
        </form-input>
        <form-input
            name="email"
            type="email"
        >
            Your e-mail"
        </form-input>
        <form-multi-select
            name="services"
            :options="['Option 1', 'Option 2']"
            required
        >
            Select services
        </form-multi-select>
        <form-input
            name="info"
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