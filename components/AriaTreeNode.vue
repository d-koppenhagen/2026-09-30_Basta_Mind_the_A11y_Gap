<template>
  <div class="atn-wrap" :class="{ 'atn-nested': depth > 0 }">
    <div class="atn-node" :class="[`tone-${node.tone || 'default'}`, { boxed: node.boxed }]">
      <span class="atn-role">{{ node.role }}</span>
      <span
        v-if="node.name || node.missing"
        class="atn-name"
        :class="{ 'atn-missing': node.missing }"
      >{{ node.missing ? (node.name || '(kein Name)') : `"${node.name}"` }}</span>
    </div>

    <!-- Optionale Property-Liste (z. B. pressed, focusable) -->
    <div v-if="node.props && node.props.length" class="atn-props">
      <div v-for="(p, i) in node.props" :key="i" class="atn-prop">
        <span class="atn-prop-key">{{ p.key }}:</span> {{ p.value }}
      </div>
    </div>

    <div v-if="node.children && node.children.length" class="atn-children">
      <AriaTreeNode
        v-for="(child, i) in node.children"
        :key="i"
        :node="child"
        :depth="depth + 1"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  node: { type: Object, required: true },
  depth: { type: Number, default: 0 },
});
</script>

<style scoped>
.atn-node {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 3px 0;
  font-family: monospace;
}

/* Hervorgehobener Knoten (eigene Box, wie im Ecosystem-Demo) */
.atn-node.boxed {
  align-items: center;
  margin-bottom: 8px;
  padding: 6px 10px;
  background: rgba(168, 85, 247, 0.1);
  border: 1px solid rgba(168, 85, 247, 0.25);
  border-radius: 6px;
}

.atn-children {
  padding-left: 14px;
  margin-left: 2px;
  border-left: 2px solid var(--k9n-border);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

/* Role – accent-purple, wie im AriaEcosystemDemo */
.atn-role {
  font-size: 0.7rem;
  font-weight: 700;
  color: #7c3aed;
}
:global(.dark .atn-role) {
  color: #c084fc;
}

/* Muted roles (generic / text): bewusst zurückgenommen, aber lesbar */
.tone-muted .atn-role {
  color: var(--k9n-text-muted);
}

/* Warn role (z. B. textbox ohne Namen) */
.tone-warn .atn-role {
  color: #b45309;
}
:global(.dark .tone-warn .atn-role) {
  color: #fbbf24;
}

/* Danger role */
.tone-danger .atn-role {
  color: #b91c1c;
}
:global(.dark .tone-danger .atn-role) {
  color: #fca5a5;
}

/* Name – blau, wie im AriaEcosystemDemo */
.atn-name {
  font-size: 0.68rem;
  color: #1d4ed8;
}
:global(.dark .atn-name) {
  color: #a5d6ff;
}

.tone-muted .atn-name {
  color: var(--k9n-text-secondary);
}

.atn-missing {
  color: #b91c1c;
  font-style: italic;
}
:global(.dark .atn-missing) {
  color: #fca5a5;
}

/* Property-Liste */
.atn-props {
  padding-left: 16px;
  border-left: 2px solid rgba(168, 85, 247, 0.2);
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-bottom: 2px;
}

.atn-prop {
  font-size: 0.62rem;
  color: var(--k9n-text-secondary);
  font-family: monospace;
}

.atn-prop-key {
  color: #b45309;
  font-weight: 600;
}
:global(.dark .atn-prop-key) {
  color: #fbbf24;
}
</style>
