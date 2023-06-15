<template>
    <form-drop
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
            name="name"
            :min=3
        >
            Your name
        </form-input>
        <form-input
            name="email"
            type="email"
        >
            Your e-mail
        </form-input>
        <form-multi-select
            name="services"
            required
            :options="['Option 1', 'Option 2']"
        >
            Select services
        </form-multi-select>
        <form-input
            name="optional-info"
            label="optional-info"
            variant="textarea"
            :max="300"
        >
            Optional info
        </form-input>
    </form-drop>
</template>