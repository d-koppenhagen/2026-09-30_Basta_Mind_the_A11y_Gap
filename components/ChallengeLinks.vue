<template>
  <div class="challenge-grid">
    <a
      v-for="challenge in challenges"
      :key="challenge.slug"
      :href="getUrl(challenge.slug)"
      target="_blank"
      class="challenge-tile"
    >
      <span class="challenge-icon">🎮</span>
      <span class="challenge-title">{{ challenge.title }}</span>
    </a>
  </div>
</template>

<script setup>
const props = defineProps({
  challenges: {
    type: Array,
    required: true,
  },
});

const base = import.meta.env.DEV
  ? 'http://localhost:4200'
  : 'https://practica11y.dev';

function getUrl(slug) {
  return `${base}/challenges/${slug}`;
}
</script>

<style scoped>
.challenge-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
}

.challenge-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.5rem 1.25rem;
  border-radius: 1rem;
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.25);
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
  min-width: 180px;
  flex: 1;
  max-width: 220px;
}

.challenge-tile:hover {
  background: rgba(59, 130, 246, 0.15);
  border-color: rgba(59, 130, 246, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
  text-decoration: none;
}

.challenge-icon {
  font-size: 2rem;
}

.challenge-title {
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
}
</style>
