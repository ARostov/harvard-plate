<!-- components/UI/RecommendationCard.vue -->
<template>
  <div class="recommendation-card" :class="type">
    <div class="recommendation-icon">
      <i :class="iconClass"></i>
    </div>

    <div class="recommendation-content">
      <div class="recommendation-header">
        <h6 class="recommendation-title">{{ title }}</h6>
        <span class="recommendation-type">{{ typeLabel }}</span>
      </div>

      <p class="recommendation-message">{{ message }}</p>

      <div v-if="action" class="recommendation-action">
        <i class="fas fa-arrow-right"></i>
        <span>{{ action }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'warning', 'error', 'info'].includes(value)
  },
  title: String,
  message: String,
  action: String
})

// Иконка в зависимости от типа
const iconClass = computed(() => {
  const icons = {
    success: 'fas fa-check-circle',
    warning: 'fas fa-exclamation-triangle',
    error: 'fas fa-times-circle',
    info: 'fas fa-info-circle'
  }
  return icons[props.type] || icons.info
})

// Текст для типа
const typeLabel = computed(() => {
  const labels = {
    success: 'Успех',
    warning: 'Внимание',
    error: 'Ошибка',
    info: 'Совет'
  }
  return labels[props.type] || 'Информация'
})
</script>

<style scoped>
.recommendation-card {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  border-left: 4px solid;
  background: var(--bg-secondary);
  transition: transform 0.2s;
}

.recommendation-card:hover {
  transform: translateX(4px);
}

.recommendation-card.success {
  border-left-color: var(--success-color);
  background: rgba(72, 187, 120, 0.05);
}

.recommendation-card.warning {
  border-left-color: var(--warning-color);
  background: rgba(237, 137, 54, 0.05);
}

.recommendation-card.error {
  border-left-color: var(--danger-color);
  background: rgba(245, 101, 101, 0.05);
}

.recommendation-card.info {
  border-left-color: var(--info-color);
  background: rgba(66, 153, 225, 0.05);
}

.recommendation-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.2rem;
}

.recommendation-card.success .recommendation-icon {
  color: var(--success-color);
  background: rgba(72, 187, 120, 0.1);
}

.recommendation-card.warning .recommendation-icon {
  color: var(--warning-color);
  background: rgba(237, 137, 54, 0.1);
}

.recommendation-card.error .recommendation-icon {
  color: var(--danger-color);
  background: rgba(245, 101, 101, 0.1);
}

.recommendation-card.info .recommendation-icon {
  color: var(--info-color);
  background: rgba(66, 153, 225, 0.1);
}

.recommendation-content {
  flex: 1;
  min-width: 0;
}

.recommendation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xs);
}

.recommendation-title {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
}

.recommendation-type {
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 600;
  text-transform: uppercase;
}

.recommendation-card.success .recommendation-type {
  background: var(--success-color);
  color: white;
}

.recommendation-card.warning .recommendation-type {
  background: var(--warning-color);
  color: white;
}

.recommendation-card.error .recommendation-type {
  background: var(--danger-color);
  color: white;
}

.recommendation-card.info .recommendation-type {
  background: var(--info-color);
  color: white;
}

.recommendation-message {
  margin: 0 0 var(--spacing-xs) 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.recommendation-action {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: 0.85rem;
  color: var(--primary-color);
  font-weight: 500;
}

.recommendation-action i {
  font-size: 0.8rem;
}
</style>