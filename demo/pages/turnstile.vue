<template>
    <cf-turnstile
        sitekey="1x00000000000000000000AA"
        theme="light"
        @verify="token => $window.alert(token)"
    />
</template>