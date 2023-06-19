<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useScroll } from '../../../composables/scroll'
import { useGsap } from '../../../composables/gsap'
import { useSplitType } from '../../../composables/split-type'
import Base from './base.vue'

interface Props {
    duration?: number
    stagger?: number
    delay?: number
}

const prop = withDefaults(defineProps<Props>(), {
    duration: 0.8,
    stagger: 0.1,
    delay: 0
})

const text = ref()
const split = useSplitType(text)
const scroll = useScroll()
const gsap = useGsap()

const encapsulateDivs = (els: HTMLElement[], prefix: string) => {
    for (let el of els) {
        el.innerHTML = `
            <div
                class="${prefix}--inner"
                style="${el.style.cssText};white-space: nowrap;"
            >
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

onMounted(() => {
    let splitted = split.split()
    if (!splitted.lines) return
    encapsulateDivs(splitted.lines, 'line')
    gsap.set(mapFirstChild(splitted.lines), { y: '100%' })
    const killEnter = scroll.enter(text, () => {
        if (!splitted.lines) return
        gsap.to(mapFirstChild(splitted.lines), {
            y: 0,
            duration: prop.duration,
            stagger: prop.stagger,
            delay: prop.delay,
            ease: 'expo.out',
            onCompleted: () => {
                killEnter()
            }
        })
    })
})
</script>

<template>
    <Base>
        <div ref="text" class="_lines">
            <slot />
        </div>
    </Base>
</template>

<style scoped lang="scss">
._lines {
    max-width: 100%;
    padding: 0 20px;
}

:deep(.line) {
    overflow: hidden;
}
</style>