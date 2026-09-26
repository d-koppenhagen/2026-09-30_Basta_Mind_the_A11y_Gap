<template>
  <div class="a11y-tree">
    <div v-if="title" class="at-header">
      <span class="at-icon" aria-hidden="true">{{ icon }}</span>
      {{ title }}
    </div>

    <div class="at-body" :class="{ dense }">
      <AriaTreeNode
        v-for="(node, i) in nodes"
        :key="i"
        :node="node"
        :depth="0"
      />
    </div>

    <div v-if="$slots.note" class="at-note" :class="`at-note-${noteTone}`">
      <slot name="note" />
    </div>
  </div>
</template>

<script setup>
import AriaTreeNode from './AriaTreeNode.vue';

defineProps({
  /**
   * Baumknoten. Jeder Knoten:
   *   { role: string, name?: string, missing?: boolean,
   *     tone?: 'default'|'muted'|'warn'|'danger', children?: Node[] }
   */
  nodes: { type: Array, required: true },
  title: { type: String, default: 'Accessibility Tree' },
  icon: { type: String, default: '🌳' },
  noteTone: { type: String, default: 'warn' }, // 'warn' | 'danger' | 'neutral'
  dense: { type: Boolean, default: false }, // kompaktere Zeilen für tiefe Bäume
});
</script>

<style scoped>
.a11y-tree {
  font-family: system-ui, -apple-system, sans-serif;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--k9n-border);
  background: var(--k9n-code-bg);
}

.at-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: var(--k9n-surface-elevated);
  border-bottom: 1px solid var(--k9n-border);
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--k9n-text-primary);
}

.at-icon {
  font-size: 0.8rem;
}

.at-body {
  padding: 10px 14px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.at-body.dense {
  padding: 6px 12px;
  gap: 0;
}

/* Kompaktere Knoten im dense-Modus */
.at-body.dense :deep(.atn-node) {
  padding: 1px 0;
}
.at-body.dense :deep(.atn-children) {
  padding-left: 12px;
}
.at-body.dense :deep(.atn-props) {
  gap: 1px;
}

.at-note {
  padding: 8px 12px;
  font-size: 0.62rem;
  line-height: 1.5;
  border-top: 1px solid var(--k9n-border);
}

.at-note-warn {
  color: #b45309;
  background: rgba(234, 179, 8, 0.1);
  border-top-color: rgba(234, 179, 8, 0.25);
}
:global(.dark .at-note-warn) {
  color: #fbbf24;
}

.at-note-danger {
  color: #b91c1c;
  background: rgba(239, 68, 68, 0.1);
  border-top-color: rgba(239, 68, 68, 0.25);
}
:global(.dark .at-note-danger) {
  color: #fca5a5;
}

.at-note-neutral {
  color: var(--k9n-text-secondary);
  background: var(--k9n-surface-elevated);
}
</style>
