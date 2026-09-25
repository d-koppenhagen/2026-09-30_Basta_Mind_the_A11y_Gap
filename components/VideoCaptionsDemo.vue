<template>
  <div class="video-captions-demo">
    <BrowserWindow url="https://my-app.de/tutorial" body-height="300px">
      <div class="player">
        <!-- "Video"-Bühne -->
        <div class="stage">
          <!-- Szene wechselt im Takt der Untertitel -->
          <Transition name="scene-fade" mode="out-in">
            <div class="scene" :key="current.scene">{{ current.scene }}</div>
          </Transition>

          <!-- Audio-Description (für blinde Menschen) -->
          <Transition name="ad-slide">
            <div v-if="current.ad" class="audio-desc">
              <span class="ad-badge">AD</span>
              <span>{{ current.ad }}</span>
            </div>
          </Transition>

          <!-- Live-Captions (für gehörlose Menschen) -->
          <Transition name="cap-fade" mode="out-in">
            <div class="caption" :key="current.caption" :class="{ 'is-sound': current.sound }">
              {{ current.caption }}
            </div>
          </Transition>
        </div>

        <!-- Player-Controls -->
        <div class="controls">
          <span class="play-btn">▶</span>
          <div class="progress">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
          </div>
          <span class="time">{{ timeLabel }}</span>
          <span class="cc-btn" :class="{ active: true }">CC</span>
        </div>
      </div>
    </BrowserWindow>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import BrowserWindow from './BrowserWindow.vue';

// Cues: caption = sichtbarer Untertitel, sound = Geräusch-/Musik-Cue,
// ad = Audio-Description (beschreibt visuellen Inhalt)
const cues = [
  { scene: '🎬', caption: '[sanfte Klaviermusik]', sound: true, ad: 'Ein Entwickler öffnet den Editor' },
  { scene: '💻', caption: 'Willkommen zum A11y-Tutorial!', sound: false, ad: '' },
  { scene: '💻', caption: 'Wir starten mit dem video-Element.', sound: false, ad: '' },
  { scene: '⌨️', caption: '[Tastatur klappert]', sound: true, ad: 'Code erscheint Zeile für Zeile' },
];

const index = ref(0);
const current = computed(() => cues[index.value % cues.length]);
const progress = computed(() => ((index.value % cues.length) / (cues.length - 1)) * 100);

const timeLabel = computed(() => {
  const total = 42;
  const sec = Math.round((progress.value / 100) * total);
  const mm = String(Math.floor(sec / 60)).padStart(2, '0');
  const ss = String(sec % 60).padStart(2, '0');
  return `${mm}:${ss} / 00:42`;
});

let timer = null;
onMounted(() => {
  timer = setInterval(() => {
    index.value++;
  }, 3800);
});
onUnmounted(() => clearInterval(timer));
</script>

<style scoped>
.video-captions-demo {
  max-width: 100%;
}

.player {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #0b0b14;
}

/* ===== Bühne / "Video" ===== */
.stage {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(circle at 50% 40%, rgba(79, 70, 229, 0.25), transparent 70%),
    #0b0b14;
  overflow: hidden;
}

.scene {
  font-size: 4.5rem;
  filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.5));
}

/* Audio-Description – oben eingeblendet */
.audio-desc {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(6, 78, 59, 0.85);
  color: #d1fae5;
  border-left: 3px solid #34d399;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-style: italic;
}
.ad-badge {
  background: #34d399;
  color: #064e3b;
  font-weight: 700;
  font-style: normal;
  font-size: 0.6rem;
  padding: 1px 5px;
  border-radius: 3px;
  flex-shrink: 0;
}

/* Live-Captions – unten, wie echte Untertitel */
.caption {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 88%;
  background: rgba(0, 0, 0, 0.78);
  color: #fff;
  padding: 5px 12px;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
  text-align: center;
  line-height: 1.3;
}
.caption.is-sound {
  color: #fde68a;
  font-style: italic;
}

/* ===== Controls ===== */
.controls {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: #16161f;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}
.play-btn {
  color: #fff;
  font-size: 0.8rem;
}
.progress {
  flex: 1;
  height: 5px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 3px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: #4f46e5;
  border-radius: 3px;
  transition: width 3.6s linear;
}
.time {
  color: #94a3b8;
  font-size: 0.65rem;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.cc-btn {
  font-size: 0.62rem;
  font-weight: 700;
  color: #0b0b14;
  background: #fff;
  padding: 1px 5px;
  border-radius: 3px;
}
.cc-btn.active {
  background: #4f46e5;
  color: #fff;
}

/* ===== Transitions ===== */
.scene-fade-enter-active,
.scene-fade-leave-active {
  transition: all 0.4s ease;
}
.scene-fade-enter-from,
.scene-fade-leave-to {
  opacity: 0;
  transform: scale(0.85);
}

.cap-fade-enter-active {
  transition: all 0.3s ease;
}
.cap-fade-leave-active {
  transition: all 0.15s ease;
}
.cap-fade-enter-from,
.cap-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, 6px);
}

.ad-slide-enter-active,
.ad-slide-leave-active {
  transition: all 0.35s ease;
}
.ad-slide-enter-from,
.ad-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
