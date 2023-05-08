<template>
    <base-layout :global-turnstile="false">
        <main>
            <slot />
        </main>
    </base-layout>
</template>

<style>
* {
    box-sizing: border-box;
    margin: 0;
}
</style>