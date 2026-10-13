<script setup lang="ts">
import type { RevoxCopy } from "./heron-revox-copy"

defineProps<{ copy: RevoxCopy }>()
</script>

<template>
  <section class="uses" aria-labelledby="uses-title">
    <h2 id="uses-title" class="section-title">{{ copy.usesTitle }}</h2>
    <div class="use-grid">
      <div v-for="use in copy.uses" :key="use.name" class="use">
        <h3 class="use-name">{{ use.name }}</h3>
        <p class="use-body">{{ use.body }}</p>
      </div>
    </div>
  </section>
  <section class="capabilities" aria-labelledby="capabilities-title">
    <h2 id="capabilities-title" class="section-title">{{ copy.capabilitiesTitle }}</h2>
    <ul class="capability-list">
      <li v-for="item in copy.capabilities" :key="item" class="capability">{{ item }}</li>
    </ul>
  </section>
</template>

<style scoped>
.section-title {
  margin: 0;
  font-family: var(--heron-display);
  font-size: clamp(30px, 3.6vw, 44px);
  font-weight: 550;
  letter-spacing: -0.025em;
  line-height: 1.3;
}
.uses {
  padding: 54px 0 64px;
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
}
.use-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 40px;
  margin-top: 48px;
}
.use-name {
  margin: 0 0 12px;
  color: var(--vp-c-brand-1);
  font-size: 22px;
  font-weight: 500;
}
.use-body {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 15px;
  line-height: 1.8;
}
.capabilities {
  padding: 80px 0;
}
.capability-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 72px;
  row-gap: 18px;
  margin: 36px 0 0;
  padding-left: 20px;
  list-style: disc;
}
.capability {
  padding-left: 6px;
  color: var(--vp-c-text-2);
  font-size: 16px;
  line-height: 1.7;
}
.capability::marker {
  color: var(--vp-c-brand-1);
}
@media (max-width: 700px) {
  .use-grid,
  .capability-list {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .use-grid {
    margin-top: 32px;
  }
  .capabilities {
    padding: 56px 0;
  }
}
</style>
