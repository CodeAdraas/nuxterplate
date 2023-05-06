<template>
    <div>
        <router-link
            v-if="$route.path !== '/'"
            style="display:block;margin-bottom: 2rem;"
            to="/"
        >
            Back
        </router-link>
    </div>
    <slot />
</template>