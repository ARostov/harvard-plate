<!-- components/UI/Accordion.vue -->
<template>
  <div class="accordion">
    <div
        class="accordion-header"
        @click="toggle"
        :class="{ active: isOpen }"
    >
      <div class="accordion-title">
        <slot name="title">
          <h3>{{ title }}</h3>
        </slot>
      </div>
      <div class="accordion-icon">
        <i class="fas" :class="isOpen ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
      </div>
    </div>

    <div class="accordion-content" v-show="isOpen">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: String,
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle'])

const isOpen = ref(props.isOpen)

const toggle = () => {
  isOpen.value = !isOpen.value
  emit('toggle', isOpen.value)
}
</script>

<style scoped>
.accordion {
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-bottom: var(--spacing-md);
}

.accordion-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  background: var(--bg-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
  user-select: none;
}

.accordion-header:hover {
  background: var(--bg-tertiary);
}

.accordion-header.active {
  background: var(--primary-color);
  color: white;
}

.accordion-header.active .accordion-icon {
  color: white;
}

.accordion-title {
  flex: 1;
}

.accordion-title h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.accordion-icon {
  color: var(--text-secondary);
  transition: transform var(--transition-fast);
}

.accordion-header.active .accordion-icon {
  transform: rotate(180deg);
}

.accordion-content {
  padding: var(--spacing-md);
  background: var(--bg-primary);
  border-top: 1px solid var(--border-color);
}

/* Анимация открытия */
.accordion-content {
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>