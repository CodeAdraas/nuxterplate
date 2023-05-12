<template>
    <layout-default :global-captcha="true">
        <main>
            <slot />
        </main>
    </layout-default>
</template>

<style>
* {
    box-sizing: border-box;
    margin: 0;
}
</style>