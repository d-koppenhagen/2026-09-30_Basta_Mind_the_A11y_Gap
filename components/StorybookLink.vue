<template>
  <a :href="url" :target="story" class="text-2xl pt-10">
    🔗 Open Storybook Demo
  </a>
</template>

<script setup>
const props = defineProps({
  story: String
});

const base = import.meta.env.DEV
  ? 'http://localhost:6006'
  : '/2026-09-30-Basta_Mind_the_A11y_Gap/storybook';

const url = `${base}/?path=/story/${props.story}`;
</script>
