<script setup lang="ts">
const controller = ref()
</script>

<template>
    <div class="sw">
        <util-slider
            :slides-per-view="$breakpoint.between('xs', 'md') ? 1 : 3"
            @swiper="swiper => controller = swiper"
        >
            <!-- Important to not apply any padding or margin on the outer 'swiper-slide' -->
            <!-- In this case the p tag instead of the child div -->
            <p><div>1</div></p>
            <p><div>2</div></p>
            <p><div>3</div></p>
            <p><div>4</div></p>
            <p><div>5</div></p>
            <p><div>6</div></p>
        </util-slider>

        <icon
            class="i"
            name="plus-circle"
            @click="controller?.slideNext()"
        />
    </div>
</template>

<style scoped>
p > div {
    background: green;
    padding: 20px;
}

.sw {
    position: relative;
}

.i {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    z-index: 10;
}
</style>