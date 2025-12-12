<!-- components/UI/Tabs.vue -->
<template>
  <div class="tabs">
    <!-- Заголовки табов -->
    <div class="tabs-header">
      <button
          v-for="(tab, index) in tabs"
          :key="tab.id || index"
          class="tab-button"
          :class="{ active: activeTab === tab.id }"
          @click="selectTab(tab.id)"
      >
        <i v-if="tab.icon" :class="tab.icon"></i>
        <span>{{ tab.title }}</span>
        <span v-if="tab.badge" class="tab-badge">{{ tab.badge }}</span>
      </button>
    </div>

    <!-- Контент табов -->
    <div class="tabs-content">
      <div
          v-for="(tab, index) in tabs"
          :key="tab.id || index"
          class="tab-pane"
          :class="{ active: activeTab === tab.id }"
      >
        <slot :name="tab.id"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
    default: () => []
  },
  defaultTab: String
})

const activeTab = ref(props.defaultTab || props.tabs[0]?.id)

const selectTab = (tabId) => {
  activeTab.value = tabId
}
</script>

<style scoped>
.tabs {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.tabs-header {
  display: flex;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  overflow-x: auto;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-md) var(--spacing-lg);
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--transition-fast);
  color: var(--text-secondary);
  font-weight: 500;
}

.tab-button:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.tab-button.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
  background: var(--bg-primary);
}

.tab-badge {
  background: var(--primary-color);
  color: white;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 4px;
}

.tabs-content {
  background: var(--bg-primary);
}

.tab-pane {
  display: none;
  padding: var(--spacing-lg);
  animation: fadeIn 0.3s ease;
}

.tab-pane.active {
  display: block;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Для мобильных */
@media (max-width: 768px) {
  .tabs-header {
    flex-direction: column;
  }

  .tab-button {
    border-bottom: none;
    border-left: 3px solid transparent;
    justify-content: flex-start;
  }

  .tab-button.active {
    border-left-color: var(--primary-color);
    border-bottom-color: transparent;
  }
}
</style>