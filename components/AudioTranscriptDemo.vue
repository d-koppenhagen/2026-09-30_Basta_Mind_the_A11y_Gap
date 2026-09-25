<template>
  <div class="audio-transcript-demo">
    <BrowserWindow url="https://my-app.de/podcast" body-height="300px">
      <div class="podcast">
        <!-- Audio-Player -->
        <div class="player-card">
          <div class="cover" :class="{ playing: true }">🎙️</div>
          <div class="meta">
            <div class="title">A11y Weekly – Folge 42</div>
            <div class="subtitle">Untertitel &amp; Transkripte</div>
            <div class="controls">
              <span class="play-btn">❚❚</span>
              <div class="progress">
                <div class="progress-fill" :style="{ width: progress + '%' }"></div>
              </div>
              <span class="time">{{ timeLabel }}</span>
            </div>
          </div>
          <!-- Waveform -->
          <div class="waveform">
            <span
              v-for="(bar, i) in bars"
              :key="i"
              class="bar"
              :class="{ active: i <= activeBar }"
              :style="{ height: bar + '%' }"
            ></span>
          </div>
        </div>

        <!-- Mitlaufendes Transkript -->
        <div class="transcript">
          <div class="transcript-head">
            <span class="doc-icon">📄</span> Transkript
          </div>
          <p class="transcript-body">
            <template v-for="(word, i) in words" :key="i">
              <span
                class="word"
                :class="{ spoken: i < spokenCount, current: i === spokenCount - 1 }"
              >{{ word }}</span>{{ ' ' }}</template>
          </p>
        </div>
      </div>
    </BrowserWindow>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import BrowserWindow from './BrowserWindow.vue';

const transcript =
  'Ein Transkript macht reine Audio-Inhalte für alle zugänglich – ' +
  'für gehörlose Menschen, aber auch für Suchmaschinen und zum Nachlesen.';
const words = transcript.split(' ');

const spokenCount = ref(0);
const progress = computed(() => (spokenCount.value / words.length) * 100);

const bars = [40, 70, 55, 90, 60, 80, 45, 75, 95, 50, 65, 85, 55, 70, 40, 60];
const activeBar = computed(() => Math.floor((spokenCount.value / words.length) * bars.length) - 1);

const timeLabel = computed(() => {
  const total = 28;
  const sec = Math.round((progress.value / 100) * total);
  const mm = String(Math.floor(sec / 60)).padStart(2, '0');
  const ss = String(sec % 60).padStart(2, '0');
  return `${mm}:${ss} / 00:28`;
});

let timer = null;
onMounted(() => {
  timer = setInterval(() => {
    spokenCount.value++;
    if (spokenCount.value > words.length) {
      // kurze Pause, dann von vorne
      spokenCount.value = 0;
    }
  }, 550);
});
onUnmounted(() => clearInterval(timer));
</script>

<style scoped>
.audio-transcript-demo {
  max-width: 100%;
}

.podcast {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  background: #14141f;
}

/* ===== Player ===== */
.player-card {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  gap: 4px 12px;
  align-items: center;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  border-radius: 8px;
  padding: 10px 12px;
}
.cover {
  grid-row: span 2;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
}
.cover.playing {
  animation: pulse 1.6s ease-in-out infinite;
}
.meta {
  min-width: 0;
}
.title {
  color: #fff;
  font-weight: 700;
  font-size: 0.82rem;
}
.subtitle {
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.68rem;
  margin-bottom: 6px;
}
.controls {
  display: flex;
  align-items: center;
  gap: 8px;
}
.play-btn {
  color: #fff;
  font-size: 0.65rem;
}
.progress {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 2px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: #fff;
  border-radius: 2px;
  transition: width 0.5s linear;
}
.time {
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.6rem;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

/* Waveform quer über beide Spalten */
.waveform {
  grid-column: 1 / -1;
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 24px;
  margin-top: 4px;
}
.bar {
  flex: 1;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 2px;
  transition: background 0.3s ease;
}
.bar.active {
  background: #fff;
}

/* ===== Transkript ===== */
.transcript {
  flex: 1;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 10px 12px;
  overflow: hidden;
}
.transcript-head {
  font-size: 0.72rem;
  font-weight: 700;
  color: #94a3b8;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.transcript-body {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.7;
}
.word {
  color: #64748b;
  transition: color 0.2s ease;
}
.word.spoken {
  color: #e2e8f0;
}
.word.current {
  color: #fff;
  background: rgba(124, 58, 237, 0.5);
  border-radius: 3px;
  box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.5);
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}
</style>
