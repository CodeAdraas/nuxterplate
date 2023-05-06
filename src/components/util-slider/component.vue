<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue'
import { Autoplay, Swiper } from 'swiper'

interface Props {
    slidesPerView?: number
    spaceBetween?: number
    autoplay?: number | boolean
    loop?: boolean
}

interface Emits {
    (e: 'swiper', instance: Swiper)
}

const prop = withDefaults(defineProps<Props>(), {
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: 5000,
    loop: true
})
const emit = defineEmits<Emits>()

const swiperEl = ref()
const swiperWrapper = ref()
const swiperController: Ref<Swiper | undefined> = ref()

onMounted(() => {
    for (let slide of swiperWrapper.value.children) {
        slide.classList.add('swiper-slide')
    }

    const swiperOptions = {
        modules: [Autoplay],
        slidesPerView: prop.slidesPerView,
        spaceBetween: prop.spaceBetween,
        loop: prop.loop
    }
    if (prop.autoplay != false) {
        swiperOptions['autoplay'] = {
            delay: prop.autoplay
        }
    }

    swiperController.value = new Swiper(swiperEl.value, swiperOptions)

    emit('swiper', swiperController.value)
})

onBeforeUnmount(() => swiperController.value?.destroy())
</script>

<template>
    <div
        ref="swiperEl"
        class="swiper"
    >
        <div
            ref="swiperWrapper"
            class="swiper-wrapper"
        >
            <slot />
        </div>
    </div>
</template>

<style scoped>
.swiper {
    width: 100%;
}
</style>