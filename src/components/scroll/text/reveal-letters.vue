<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useScroll } from '../../../composables/scroll'
import { useGsap } from '../../../composables/gsap'
import { useSplitType } from '../../../composables/split-type'
import Base from './base.vue'

interface Props {
    duration?: number
    stagger?: number
    delay?: number
    direction?:
        | 'vertical'
        | 'horizontal'
}

const prop = withDefaults(defineProps<Props>(), {
    duration: 0.1,
    stagger: 0.01,
    delay: 0,
    direction: 'vertical'
})

const text = ref()
const split = useSplitType(text)
const scroll = useScroll()
const gsap = useGsap()

const encapsulateDivs = (els: HTMLElement[], prefix: string) => {
    for (let el of els) {
        el.innerHTML = `
            <div class="${prefix}--inner">
                ${el.innerHTML}
            </div>`.trim()
    }
}

const mapFirstChild = (els: HTMLElement[]) => {
    let map: Element[] = []
    for (let el of els) {
        map.push(el.children[0])
    }
    return map
}

const getAnimationPropsFrom = computed(() => {
    switch (prop.direction) {
        case 'vertical':
            return {y: '100%'}
        case 'horizontal':
            return {x: '-100%'}
    }
})

const getAnimationPropsTo = computed(() => {
    switch (prop.direction) {
        case 'vertical':
            return {y: 0}
        case 'horizontal':
            return {x: 0}
    }
})

onMounted(() => {
    let splitted = split.split()
    if (!splitted.chars) return

    encapsulateDivs(splitted.chars, 'char')
    gsap.set(
        mapFirstChild(splitted.chars),
        getAnimationPropsFrom.value
    )

    const killOnScrollEnterHook = scroll.enter(text, () => {
        if (!splitted.chars) return
        gsap.to(mapFirstChild(splitted.chars), {
            ...getAnimationPropsTo.value,

            duration: prop.duration,
            stagger: prop.stagger,
            delay: prop.delay,
            ease: 'expo.out',
            onCompleted: () => {
                killOnScrollEnterHook()
            }
        })
    })
})
</script>

<template>
    <Base>
        <div ref="text">
            <slot />
        </div>
    </Base>
</template>

<style scoped>
:deep(.char) {
    overflow: hidden;
}
</style>