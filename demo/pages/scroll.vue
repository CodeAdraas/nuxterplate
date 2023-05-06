<script setup lang="ts">
const scroll = useScroll()
const { up, down } = useScrollDirection()
const gsap = useGsap()

const speed = ref(0)
const progress = ref(0)
scroll.scroll(({ speed: speed_, progress: progress_ }) => {
    speed.value = speed_
    progress.value = progress_
})

const cube = ref()
onMounted(() => scroll.init())
</script>

<template>
    <!--
        Lenis up/down detection is still fragile

        <header
        style="position:fixed;width:100%;height:80px;top:40px;left:0;right:0;background:purple;transition:.4s ease"
        :style="{
            transform: down ? 'translatey(-120px)' : 'translatey(0)'
        }"
    /> -->
    <section
        style="min-height: 200vh"
    >
        <span style="position:fixed;top:120px;left:0;">Up: {{ up }} | Down: {{ down }}</span>
        <span style="position:fixed;top:140px;left:0;">Speed: {{ speed }}</span>
        <span style="position:fixed;top:160px;left:0;">Progress: {{ progress }}</span>

        <util-scroll-text-reveal-lines
            :style="{marginTop: '120vh'}"
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </util-scroll-text-reveal-lines>

        <util-scroll-text-reveal-words
            :style="{marginTop: '120vh'}"
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </util-scroll-text-reveal-words>

        <util-scroll-text-reveal-letters
            :style="{marginTop: '120vh'}"
        >
            Lorem ipsum dolor sit amet.
        </util-scroll-text-reveal-letters>

        <div
            v-animation="'fade-in-up'"
            ref="cube"
            :style="{
                background: 'green',
                marginTop: '150vh',
                width: '50vw',
                height: '50vw',
            }"
        />
    </section>
</template>