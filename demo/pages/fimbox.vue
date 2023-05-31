<template>
    <form-fimbox
        submit-label="Submit"
        loading-label="Loading..."
        :captcha="{
            sitekey: '1x00000000000000000000AA',
            appearance: 'always',
            errorMessage: 'Error: captcha'
        }"
        success-message="Gelukt, bedankt voor je verzoek. We komen zo spoedig mogelijk bij u terug."
        error-message="Error error error"
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
    </form-fimbox>
</template>