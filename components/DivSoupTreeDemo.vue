<template>
  <A11yTree :nodes="nodes" />
</template>

<script setup>
import A11yTree from './A11yTree.vue';

// Entarteter a11y-Tree der Div-Suppe vom "Code Review"-Snippet:
// header/nav/main fehlen, klickbare divs werden zu reinem Text,
// das Eingabefeld hat keinen zugänglichen Namen.
const nodes = [
  { role: 'document', name: 'Untitled' },
  {
    role: 'generic',
    tone: 'muted',
    children: [
      { role: 'generic', tone: 'muted' },
      { role: 'text', name: 'My App', tone: 'muted' },
      { role: 'text', name: 'Home', tone: 'muted' },
      { role: 'text', name: 'Products', tone: 'muted' },
      { role: 'text', name: 'Welcome', tone: 'muted' },
      { role: 'textbox', name: '(kein Name)', missing: true, tone: 'warn' },
      { role: 'text', name: 'Submit', tone: 'muted' },
    ],
  },
];
</script>
