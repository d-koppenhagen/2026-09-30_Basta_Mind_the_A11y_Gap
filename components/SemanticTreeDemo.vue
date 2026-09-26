<template>
  <A11yTree :nodes="nodes" dense />
</template>

<script setup>
import A11yTree from './A11yTree.vue';

// Zugehöriger a11y-Tree zum semantischen HTML (verifiziert in Chrome):
// echte Landmarks, Überschriften mit Level, Links, benanntes Eingabefeld, Button.
const nodes = [
  {
    role: 'banner',
    children: [
      { role: 'heading', name: 'My App', props: [{ key: 'level', value: '1' }] },
      {
        role: 'navigation',
        children: [
          {
            role: 'list',
            children: [
              { role: 'listitem', children: [{ role: 'link', name: 'Home' }] },
              { role: 'listitem', children: [{ role: 'link', name: 'Products' }] },
            ],
          },
        ],
      },
    ],
  },
  {
    role: 'main',
    children: [
      { role: 'heading', name: 'Welcome', props: [{ key: 'level', value: '2' }] },
      {
        role: 'form',
        children: [
          { role: 'textbox', name: 'Enter your name' },
          { role: 'button', name: 'Submit' },
        ],
      },
    ],
  },
];
</script>
