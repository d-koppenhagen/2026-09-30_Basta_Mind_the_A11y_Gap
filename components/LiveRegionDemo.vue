<template>
  <div class="live-region-demo">
    <!-- Left: Global Live Region -->
    <div class="demo-col">
      <h3 class="demo-label">🌍 Global</h3>
      <BrowserWindow url="https://my-app.de/shop" body-height="260px">
        <div class="page-global">
          <!-- Notification banner at top -->
          <Transition name="notif-slide">
            <div v-if="showNotification" class="notification-banner">
              <span class="notif-icon">🔔</span>
              <span class="notif-text">{{ notificationText }}</span>
            </div>
          </Transition>

          <!-- Fake page content -->
          <div class="page-content">
            <div class="fake-nav">
              <span class="nav-item">Home</span>
              <span class="nav-item">Shop</span>
              <span class="nav-item">Kontakt</span>
            </div>
            <div class="fake-body">
              <div class="fake-card"></div>
              <div class="fake-card"></div>
              <div class="fake-card"></div>
            </div>
          </div>

          <!-- Eyes next to notification area -->
          <div class="eyes-container eyes-global" :class="{ 'looking': showNotification }">
            <div class="eye">
              <div class="pupil"></div>
            </div>
            <div class="eye">
              <div class="pupil"></div>
            </div>
          </div>
        </div>
      </BrowserWindow>
      <div class="pattern-label">
        <code>aria-live="polite"</code><br>
        <span class="pattern-desc">Ein Announcer für alles</span>
      </div>
    </div>

    <!-- Right: Local Live Region -->
    <div class="demo-col">
      <h3 class="demo-label">📍 Lokal</h3>
      <BrowserWindow url="https://my-app.de/support" body-height="260px">
        <div class="page-local">
          <!-- Fake page content -->
          <div class="page-content-local">
            <div class="fake-nav">
              <span class="nav-item">Home</span>
              <span class="nav-item">Support</span>
              <span class="nav-item">FAQ</span>
            </div>
            <div class="fake-body-local">
              <div class="fake-line"></div>
              <div class="fake-line short"></div>
              <div class="fake-line"></div>
            </div>
          </div>

          <!-- Chat widget -->
          <Transition name="chat-pop">
            <div v-if="chatOpen" class="chat-widget">
              <div class="chat-header">
                <span>💬 Live Chat</span>
                <span class="chat-close" @click="chatOpen = false">×</span>
              </div>
              <div class="chat-messages">
                <TransitionGroup name="msg-slide">
                  <div
                    v-for="msg in visibleMessages"
                    :key="msg.id"
                    class="chat-msg"
                    :class="msg.from"
                  >
                    {{ msg.text }}
                  </div>
                </TransitionGroup>
              </div>
              <!-- Eyes inside chat, watching messages -->
              <div class="eyes-container eyes-local" :class="{ 'looking': visibleMessages.length > 0 }">
                <div class="eye">
                  <div class="pupil"></div>
                </div>
                <div class="eye">
                  <div class="pupil"></div>
                </div>
              </div>
            </div>
          </Transition>

          <!-- Chat toggle button -->
          <div
            v-if="!chatOpen"
            class="chat-toggle"
            :class="{ pulse: !chatOpen }"
          >
            💬
          </div>
        </div>
      </BrowserWindow>
      <div class="pattern-label">
        <code>aria-live="polite"</code><br>
        <span class="pattern-desc">In der Komponente</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import BrowserWindow from './BrowserWindow.vue';

// --- Global notification loop ---
const showNotification = ref(false);
const notificationIndex = ref(0);
const notifications = [
  '✅ Artikel zum Warenkorb hinzugefügt',
  '💾 Einstellungen gespeichert',
  '📬 3 neue Nachrichten',
  '🚀 Update verfügbar',
];
const notificationText = computed(() => notifications[notificationIndex.value % notifications.length]);

let globalTimer = null;
function startGlobalLoop() {
  globalTimer = setInterval(() => {
    showNotification.value = true;
    setTimeout(() => {
      showNotification.value = false;
      notificationIndex.value++;
    }, 2200);
  }, 3500);
  // Show first one immediately
  showNotification.value = true;
  setTimeout(() => {
    showNotification.value = false;
    notificationIndex.value++;
  }, 2200);
}

// --- Local chat loop ---
const chatOpen = ref(false);
const visibleMessages = ref([]);
let msgId = 0;

const chatMessages = [
  { from: 'agent', text: 'Hallo! Wie kann ich helfen?' },
  { from: 'user', text: 'Mein Paket ist nicht angekommen.' },
  { from: 'agent', text: 'Ich prüfe das für Sie...' },
  { from: 'agent', text: 'Sendung wird morgen zugestellt!' },
];

let chatTimer = null;
let chatPhase = 0; // 0=closed, 1=opening, 2=messages, 3=closing

function startChatLoop() {
  chatPhase = 0;
  chatTimer = setInterval(() => {
    switch (chatPhase) {
      case 0: // Open chat
        chatOpen.value = true;
        visibleMessages.value = [];
        chatPhase = 1;
        break;
      case 1: // Add messages one by one
        if (visibleMessages.value.length < chatMessages.length) {
          const msg = chatMessages[visibleMessages.value.length];
          visibleMessages.value.push({ ...msg, id: msgId++ });
        } else {
          chatPhase = 2;
        }
        break;
      case 2: // Wait a beat then close
        chatOpen.value = false;
        chatPhase = 3;
        break;
      case 3: // Wait then restart
        chatPhase = 0;
        break;
    }
  }, 1400);
}

onMounted(() => {
  startGlobalLoop();
  // Offset the chat loop start slightly
  setTimeout(() => startChatLoop(), 1000);
});

onUnmounted(() => {
  clearInterval(globalTimer);
  clearInterval(chatTimer);
});
</script>

<style scoped>
.live-region-demo {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  max-width: 100%;
}

.demo-col {
  flex: 1;
  min-width: 0;
}

.demo-label {
  margin: 0 0 8px;
  font-size: 1.1rem;
  color: var(--k9n-text-primary, var(--slidev-theme-text, #e2e8f0));
  font-weight: 700;
}

/* Pattern label below browser */
.pattern-label {
  margin-top: 10px;
  text-align: center;
  font-size: 0.9rem;
  color: var(--slidev-theme-body, #cbd5e1);
}
.pattern-label code {
  background: rgba(100, 116, 139, 0.15);
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 0.85rem;
  color: var(--slidev-theme-code, #3b82f6);
}
.pattern-desc {
  font-size: 0.82rem;
  color: var(--slidev-theme-body, #94a3b8);
}

/* ========== Global page ========== */
.page-global {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.notification-banner {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  padding: 8px 14px;
  font-size: 0.72rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}
.notif-icon { font-size: 0.8rem; }
.notif-text { flex: 1; }

.page-content {
  padding: 10px 14px;
  flex: 1;
}

.fake-nav {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--k9n-border);
}
.nav-item {
  font-size: 0.65rem;
  color: #94a3b8;
}

.fake-body {
  display: flex;
  gap: 8px;
}
.fake-card {
  flex: 1;
  height: 80px;
  background: var(--k9n-accent-subtle);
  border: 1px solid var(--k9n-border);
  border-radius: 6px;
}

/* ========== Local page ========== */
.page-local {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.page-content-local {
  padding: 10px 14px;
  flex: 1;
}

.fake-body-local {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
}
.fake-line {
  height: 10px;
  background: var(--k9n-accent-subtle);
  border-radius: 4px;
  width: 100%;
}
.fake-line.short { width: 65%; }

/* Chat widget */
.chat-widget {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 180px;
  background: var(--k9n-surface);
  border: 1px solid var(--k9n-border);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}

.chat-header {
  background: var(--k9n-accent);
  color: var(--k9n-text-on-accent);
  padding: 5px 10px;
  font-size: 0.65rem;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.chat-close {
  cursor: pointer;
  font-size: 0.85rem;
  opacity: 0.7;
}

.chat-messages {
  padding: 6px 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: 130px;
  overflow: hidden;
}

.chat-msg {
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.6rem;
  max-width: 85%;
  line-height: 1.3;
}
.chat-msg.agent {
  background: rgba(99, 102, 241, 0.15);
  color: var(--k9n-text-primary, #312e81);
  align-self: flex-start;
}
.chat-msg.user {
  background: rgba(34, 197, 94, 0.15);
  color: var(--k9n-text-primary, #14532d);
  align-self: flex-end;
}

/* Chat toggle */
.chat-toggle {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 36px;
  height: 36px;
  background: #4f46e5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  box-shadow: 0 2px 12px rgba(79, 70, 229, 0.4);
  cursor: pointer;
}
.chat-toggle.pulse {
  animation: pulse-ring 2s ease infinite;
}

@keyframes pulse-ring {
  0% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.5); }
  70% { box-shadow: 0 0 0 8px rgba(79, 70, 229, 0); }
  100% { box-shadow: 0 0 0 0 rgba(79, 70, 229, 0); }
}

/* ========== Eyes ========== */
.eyes-container {
  position: absolute;
  display: flex;
  gap: 6px;
  transition: all 0.4s ease;
  opacity: 0.85;
}

/* Global: positioned at top-right, next to notification area */
.eyes-global {
  top: 6px;
  right: 10px;
  z-index: 2;
}

/* Local: inside the chat widget */
.eyes-local {
  position: relative;
  justify-content: center;
  padding: 4px 0 6px;
  border-top: 1px solid rgba(255,255,255,0.06);
}

.eye {
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #334155;
  position: relative;
  overflow: hidden;
}

.pupil {
  width: 8px;
  height: 8px;
  background: #1e293b;
  border-radius: 50%;
  transition: transform 0.4s ease;
}

/* Active state: pupils widen/look toward the region */
.eyes-global.looking .pupil {
  transform: translateX(-2px);
  animation: eye-blink 0.3s ease 0.2s;
}

.eyes-local.looking .pupil {
  transform: translateX(2px);
  animation: eye-blink 0.3s ease 0.2s;
}

/* Blink animation */
@keyframes eye-blink {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.1); }
}

/* ========== Transitions ========== */
.notif-slide-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.notif-slide-leave-active {
  transition: all 0.3s ease-in;
}
.notif-slide-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}
.notif-slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.chat-pop-enter-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.chat-pop-leave-active {
  transition: all 0.2s ease-in;
}
.chat-pop-enter-from {
  transform: scale(0.8) translateY(10px);
  opacity: 0;
}
.chat-pop-leave-to {
  transform: scale(0.8) translateY(10px);
  opacity: 0;
}

.msg-slide-enter-active {
  transition: all 0.3s ease;
}
.msg-slide-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
</style>
