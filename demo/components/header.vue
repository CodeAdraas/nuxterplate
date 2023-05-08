<template>
    <header>
        Header
        <nav>
            <router-link to="/" style="display: block;">Home</router-link>
            <router-link to="/breakpoint" style="display: block;">Breakpoint</router-link>
            <router-link to="/local-storage" style="display: block;">Local storage</router-link>
            <router-link to="/browser" style="display: block;">Browser detect</router-link>
            <router-link to="/lazyload" style="display: block;">Lazyload</router-link>
            <router-link to="/scroll" style="display: block;">Scroll</router-link>
            <router-link to="/slider" style="display: block;">Swiper slider</router-link>
            <router-link to="/turnstile" style="display: block;">Cf Turnstile</router-link>
            <router-link to="/faq" style="display: block;">FAQ</router-link>
            <router-link to="/cms" style="display: block;">CMS</router-link>
            <router-link to="/credit" style="display: block;">Credit</router-link>
            <router-link to="/form" style="display: block;">Form</router-link>
            <router-link to="/fimbox" style="display: block;">Fimbox</router-link>
        </nav>
    </header>
</template>

<style scoped>
header {
    margin-bottom: 50px;
}
nav {
    display: flex;
    gap: 10px;
}
.router-link-active {
    color: green;
}
</style>