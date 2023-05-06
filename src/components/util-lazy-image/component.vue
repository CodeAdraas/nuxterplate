<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount} from 'vue'
import { useLazyLoad } from '../../composables/lazy-load'
import { useDebounce } from '../../composables/debounce'

interface Props {
  src: string,
  transition?: string
}

interface Emits {
  (e: 'loaded'): void
}

const prop = withDefaults(defineProps<Props>(), {
    transition: 'opacity 0.6s cubic-bezier(0.66, 0.29, 0.04, 0.98)'
})
const emit = defineEmits<Emits>()
const lazyload = useLazyLoad()
const img = ref()
const reactiveSrc = computed(() => prop.src)
const stopwatchingSrc = watch(reactiveSrc, () => initLazyload())
const initLazyload = useDebounce(() => {
    if (img.value.hasAttribute('data-ll-status')) {
        img.value.removeAttribute('data-ll-status')
    }
    lazyload.update()
    lazyload.loaded(img.value, () => emit('loaded'))
}, 100)

onMounted(() => initLazyload())
onBeforeUnmount(() => stopwatchingSrc())
</script>

<template>
  <img
    ref="img"
    class="lazy"
    :style="{
        '--transition': transition
    }"
    :data-src="reactiveSrc"
  />
</template>

<style scoped lang="scss">
.lazy {
    opacity: 0;
    will-change: opacity;
    transition: var(--transition);
    &[data-ll-status="loaded"] {
        opacity: 1;
    }
}
</style>