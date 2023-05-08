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
            label="Your name"
            :min=3
        />
        <form-input
            label="Your e-mail"
            type="email"
        />
        <form-multi-select
            required
            label="Select services"
            :options="[
                'Option 1',
                'Option 2'
            ]"
        />
        <form-input
            label="Optional info"
            variant="textarea"
            :max="300"
        />
    </Form>
    <pre v-if="[...formData.entries()].length">
        {{ JSON.stringify(Object.fromEntries(formData.entries())) }}
    </pre>
</template>