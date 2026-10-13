<script setup lang="ts">
export interface AccelerationRow {
  platform: string
  backends: string
  status: string
  tone: "ready" | "limited" | "planned"
}

defineProps<{
  title: string
  intro: string
  note: string
  platformLabel: string
  backendsLabel: string
  statusLabel: string
  rows: AccelerationRow[]
}>()
</script>

<template>
  <section class="acceleration" aria-labelledby="acceleration-title">
    <h2 id="acceleration-title" class="section-title">{{ title }}</h2>
    <p class="acceleration-intro">{{ intro }}</p>

    <div class="acceleration-table-wrap" role="region" :aria-label="title" tabindex="0">
      <table class="acceleration-table">
        <thead>
          <tr>
            <th scope="col">{{ platformLabel }}</th>
            <th scope="col">{{ backendsLabel }}</th>
            <th scope="col">{{ statusLabel }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.platform">
            <th scope="row">{{ row.platform }}</th>
            <td>{{ row.backends }}</td>
            <td>
              <span class="status" :data-tone="row.tone">{{ row.status }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <ul class="acceleration-cards">
      <li v-for="row in rows" :key="`card-${row.platform}`" class="acceleration-card">
        <p class="card-platform">{{ row.platform }}</p>
        <p class="card-label">{{ backendsLabel }}</p>
        <p class="card-backends">{{ row.backends }}</p>
        <p class="card-label">{{ statusLabel }}</p>
        <p class="status" :data-tone="row.tone">{{ row.status }}</p>
      </li>
    </ul>

    <p class="acceleration-note">{{ note }}</p>
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

.acceleration {
  padding: 64px 0 24px;
  border-top: 1px solid var(--vp-c-divider);
}

.acceleration-intro {
  max-width: 760px;
  margin: 18px 0 0;
  color: var(--vp-c-text-2);
  font-size: 16px;
  line-height: 1.8;
}

.acceleration-table-wrap {
  margin-top: 36px;
  overflow-x: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.acceleration-table {
  width: 100%;
  min-width: 720px;
  border-collapse: collapse;
  color: var(--vp-c-text-1);
  font-size: 15px;
  line-height: 1.55;
}

.acceleration-table th,
.acceleration-table td {
  padding: 18px 20px;
  text-align: left;
  vertical-align: top;
  border-bottom: 1px solid var(--vp-c-divider);
}

.acceleration-table thead th {
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  background: rgb(0 0 0 / 12%);
}

.acceleration-table tbody th {
  width: 22%;
  color: var(--vp-c-brand-1);
  font-weight: 600;
  white-space: nowrap;
}

.acceleration-table tbody tr:last-child th,
.acceleration-table tbody tr:last-child td {
  border-bottom: 0;
}

.status {
  display: inline-block;
  max-width: 36rem;
}

.status[data-tone="ready"] {
  color: var(--heron-cyan-light, #9bdadd);
}

.status[data-tone="limited"] {
  color: #e5d899;
}

.status[data-tone="planned"] {
  color: var(--vp-c-text-2);
}

.acceleration-cards {
  display: none;
  margin: 28px 0 0;
  padding: 0;
  list-style: none;
}

.acceleration-card {
  padding: 22px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.acceleration-card + .acceleration-card {
  margin-top: 14px;
}

.card-platform {
  margin: 0 0 14px;
  color: var(--vp-c-brand-1);
  font-size: 18px;
  font-weight: 600;
}

.card-label {
  margin: 0;
  color: var(--vp-c-text-3);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.card-backends,
.acceleration-card .status {
  margin: 6px 0 14px;
  color: var(--vp-c-text-2);
  font-size: 15px;
  line-height: 1.65;
}

.acceleration-card .status {
  margin-bottom: 0;
}

.acceleration-note {
  max-width: 820px;
  margin: 22px 0 0;
  color: var(--vp-c-text-3);
  font-size: 13px;
  line-height: 1.7;
}

@media (max-width: 760px) {
  .acceleration-table-wrap {
    display: none;
  }

  .acceleration-cards {
    display: block;
  }
}
</style>
