<script setup lang="ts">
import { computed } from "vue"
import { useData, withBase } from "vitepress"
import VstTrademarkNotice from "../VstTrademarkNotice.vue"
import HeronRevoxDetails from "./HeronRevoxDetails.vue"
import PluginFeatureGrid from "./PluginFeatureGrid.vue"
import PluginCompatibility from "./PluginCompatibility.vue"
import ProductHero from "../product/ProductHero.vue"
import { revoxCopy } from "./heron-revox-copy"

const { localeIndex } = useData()
const locale = computed(() => (localeIndex.value === "zh" ? "zh" : "en"))
const copy = computed(() => revoxCopy[locale.value])
const prefix = computed(() => (locale.value === "zh" ? "/zh" : ""))
const downloadHref = computed(() => withBase(`${prefix.value}/plugins/releases`))
const manualHref = computed(() => withBase(`${prefix.value}/plugins/manual/heron-revox`))
const image = withBase("/plugins/heron-revox.png")
</script>

<template>
  <main class="revox-page">
    <ProductHero
      name="Heron Revox"
      :tagline="copy.tagline"
      :intro-title="copy.introTitle"
      :intro="copy.intro"
      :included="copy.included"
      :image="image"
      :image-alt="copy.imageAlt"
      :image-width="2080"
      :image-height="1400"
      :enlarge="copy.enlarge"
      :download-href="downloadHref"
      :download-label="copy.download"
      :manual-href="manualHref"
      :manual-label="copy.manual"
    >
      <template #background>
        <svg class="voice-art" viewBox="0 0 1440 440" fill="none" aria-hidden="true">
          <path
            d="M0 330H1440M0 220H1440M0 110H1440M240 0V440M480 0V440M720 0V440M960 0V440M1200 0V440"
            stroke="currentColor"
            opacity=".07"
          />
          <path
            d="M-40 250C80 250 120 180 180 180S280 320 360 300S470 140 560 170S680 330 780 290S920 120 1040 160S1180 310 1280 250S1400 160 1500 180"
            stroke="#a98ade"
            stroke-width="2"
            opacity=".55"
          />
          <path
            d="M-40 250C100 250 150 210 220 210S330 290 420 270S540 160 640 190S780 320 900 280S1060 140 1180 180S1320 300 1500 220"
            stroke="#72c3c7"
            stroke-width="2"
            opacity=".7"
          />
          <path
            d="M-40 250C90 250 140 230 200 230S300 270 390 255S510 190 610 210S760 300 880 265S1040 160 1160 195S1300 285 1500 230"
            stroke="#e5d899"
            stroke-width="4"
          />
          <circle cx="200" cy="230" r="7" fill="#a98ade" stroke="#171a1f" stroke-width="3" />
          <circle cx="610" cy="210" r="7" fill="#72c3c7" stroke="#171a1f" stroke-width="3" />
          <circle cx="1160" cy="195" r="7" fill="#e5d899" stroke="#171a1f" stroke-width="3" />
        </svg>
      </template>
      <template #support>
        <PluginCompatibility class="revox-support" :locale="locale" compact />
      </template>
    </ProductHero>
    <div class="revox-content">
      <p class="revox-media-todo">{{ copy.mediaTodo }}</p>
      <PluginFeatureGrid :title="copy.featuresTitle" :image="image" :features="copy.features" />
      <HeronRevoxDetails :copy="copy" />
      <section class="revox-start" aria-labelledby="start-title">
        <div>
          <h2 id="start-title" class="revox-start-title">{{ copy.startTitle }}</h2>
          <p class="revox-start-body">{{ copy.startBody }}</p>
        </div>
        <a class="revox-download" :href="downloadHref">{{ copy.download }}</a>
      </section>
      <VstTrademarkNotice class="revox-trademark" />
    </div>
  </main>
</template>

<style scoped>
.revox-page {
  color: var(--vp-c-text-1);
}
.voice-art {
  position: absolute;
  top: -64px;
  left: 0;
  width: 100%;
  min-width: 1000px;
  height: 410px;
  opacity: 0.75;
  mask-image: linear-gradient(#000 45%, transparent 96%);
}
.revox-support {
  justify-content: center;
}
.revox-content {
  width: min(1180px, calc(100% - 80px));
  margin: 0 auto;
  padding-bottom: 56px;
}
.revox-media-todo {
  margin: 0 0 8px;
  color: var(--vp-c-text-3);
  font-size: 13px;
  line-height: 1.6;
}
.revox-start {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
  padding: 48px 0;
  border-top: 1px solid var(--vp-c-divider);
}
.revox-start-title {
  margin: 0;
  font-family: var(--heron-display);
  font-size: clamp(30px, 3.6vw, 44px);
  font-weight: 550;
  line-height: 1.3;
}
.revox-start-body {
  max-width: 720px;
  margin: 18px 0 0;
  color: var(--vp-c-text-2);
  font-size: 16px;
  line-height: 1.8;
}
.revox-download {
  flex-shrink: 0;
  padding: 14px 26px;
  border-radius: 28px;
  color: var(--vp-c-bg);
  background: var(--vp-c-brand-1);
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
}
.revox-download:hover {
  background: var(--vp-c-brand-2);
}
.revox-download:focus-visible {
  outline: 3px solid var(--vp-c-brand-1);
  outline-offset: 5px;
}
.revox-trademark {
  --trademark-notice-margin-top: 0;
}
@media (max-width: 900px) {
  .revox-content {
    width: calc(100% - 48px);
  }
  .revox-start {
    align-items: start;
    flex-direction: column;
    gap: 28px;
  }
}
@media (max-width: 540px) {
  .revox-content {
    width: calc(100% - 40px);
  }
  .voice-art {
    left: -210px;
    top: -120px;
  }
}
</style>
