<!-- components/Plate/PlateStats.vue -->
<template>
  <div class="plate-stats card">
    <h3><i class="fas fa-chart-bar"></i> Пищевая ценность</h3>

    <div class="stats-grid">
      <!-- Калории -->
      <div class="stat-item calories">
        <div class="stat-header">
          <i class="fas fa-fire"></i>
          <span class="stat-label">Калории</span>
        </div>
        <div class="stat-value">{{ nutrition.calories || 0 }}</div>
        <div class="stat-unit">ккал</div>
        <div class="stat-progress">
          <div class="progress-bar" :style="{ width: caloriePercentage + '%' }"></div>
        </div>
        <div class="stat-recommendation">
          {{ calorieRecommendation }}
        </div>
      </div>

      <!-- Белки -->
      <div class="stat-item protein">
        <div class="stat-header">
          <i class="fas fa-dumbbell"></i>
          <span class="stat-label">Белки</span>
        </div>
        <div class="stat-value">{{ nutrition.protein || 0 }}</div>
        <div class="stat-unit">г</div>
        <div class="stat-progress">
          <div class="progress-bar" :style="{ width: proteinGramPercentage + '%' }"></div>
        </div>
        <div class="stat-recommendation">
          {{ proteinRecommendation }}
        </div>
      </div>

      <!-- Углеводы -->
      <div class="stat-item carbs">
        <div class="stat-header">
          <i class="fas fa-bread-slice"></i>
          <span class="stat-label">Углеводы</span>
        </div>
        <div class="stat-value">{{ nutrition.carbs || 0 }}</div>
        <div class="stat-unit">г</div>
        <div class="stat-progress">
          <div class="progress-bar" :style="{ width: carbGramPercentage + '%' }"></div>
        </div>
        <div class="stat-recommendation">
          {{ carbRecommendation }}
        </div>
      </div>

      <!-- Жиры -->
      <div class="stat-item fats">
        <div class="stat-header">
          <i class="fas fa-oil-can"></i>
          <span class="stat-label">Жиры</span>
        </div>
        <div class="stat-value">{{ nutrition.fats || 0 }}</div>
        <div class="stat-unit">г</div>
        <div class="stat-progress">
          <div class="progress-bar" :style="{ width: fatGramPercentage + '%' }"></div>
        </div>
        <div class="stat-recommendation">
          {{ fatRecommendation }}
        </div>
      </div>

      <!-- Клетчатка -->
      <div class="stat-item fiber">
        <div class="stat-header">
          <i class="fas fa-seedling"></i>
          <span class="stat-label">Клетчатка</span>
        </div>
        <div class="stat-value">{{ nutrition.fiber || 0 }}</div>
        <div class="stat-unit">г</div>
        <div class="stat-progress">
          <div class="progress-bar" :style="{ width: fiberPercentage + '%' }"></div>
        </div>
        <div class="stat-recommendation">
          {{ fiberRecommendation }}
        </div>
      </div>

      <!-- Сахар -->
      <div class="stat-item sugar">
        <div class="stat-header">
          <i class="fas fa-candy-cane"></i>
          <span class="stat-label">Сахар</span>
        </div>
        <div class="stat-value">{{ nutrition.sugar || 0 }}</div>
        <div class="stat-unit">г</div>
        <div class="stat-progress">
          <div class="progress-bar" :style="{ width: sugarPercentage + '%' }"></div>
        </div>
        <div class="stat-recommendation">
          {{ sugarRecommendation }}
        </div>
      </div>
    </div>

    <!-- Итоговая информация -->
    <div class="stats-summary">
      <div class="summary-item">
        <span class="summary-label">Общий вес:</span>
        <span class="summary-value">{{ totalWeight }} г</span>
      </div>
      <div class="summary-item">
        <span class="summary-label">Количество продуктов:</span>
        <span class="summary-value">{{ totalItems }} шт</span>
      </div>
      <div class="summary-item" v-if="nutrition.calories">
        <span class="summary-label">Калорийность на 100г:</span>
        <span class="summary-value">{{ caloriesPer100g }} ккал</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  nutrition: {
    type: Object,
    default: () => ({})
  },
  totalWeight: {
    type: Number,
    default: 0
  },
  totalItems: {
    type: Number,
    default: 0
  }
})

// Рекомендуемые суточные нормы
const dailyRecommendations = {
  calories: 2000, // ккал
  protein: 50,    // г
  carbs: 250,     // г
  fats: 70,       // г
  fiber: 30,      // г
  sugar: 50       // г
}

// Проценты от суточной нормы
const caloriePercentage = computed(() => {
  return Math.min((props.nutrition.calories / dailyRecommendations.calories) * 100, 100)
})

const proteinGramPercentage = computed(() => {
  return Math.min((props.nutrition.protein / dailyRecommendations.protein) * 100, 100)
})

const carbGramPercentage = computed(() => {
  return Math.min((props.nutrition.carbs / dailyRecommendations.carbs) * 100, 100)
})

const fatGramPercentage = computed(() => {
  return Math.min((props.nutrition.fats / dailyRecommendations.fats) * 100, 100)
})

const fiberPercentage = computed(() => {
  return Math.min((props.nutrition.fiber / dailyRecommendations.fiber) * 100, 100)
})

const sugarPercentage = computed(() => {
  return Math.min((props.nutrition.sugar / dailyRecommendations.sugar) * 100, 100)
})

// Рекомендации
const calorieRecommendation = computed(() => {
  const percent = caloriePercentage.value
  if (percent < 30) return 'Очень мало'
  if (percent < 60) return 'Умеренно'
  if (percent < 90) return 'Достаточно'
  return 'Много для одного приема'
})

const proteinRecommendation = computed(() => {
  const percent = proteinGramPercentage.value
  if (percent < 30) return 'Мало белка'
  if (percent < 70) return 'Нормально'
  return 'Много белка'
})

const carbRecommendation = computed(() => {
  const percent = carbGramPercentage.value
  if (percent < 30) return 'Мало углеводов'
  if (percent < 70) return 'Сбалансированно'
  return 'Много углеводов'
})

const fatRecommendation = computed(() => {
  const percent = fatGramPercentage.value
  if (percent < 30) return 'Мало жиров'
  if (percent < 70) return 'Оптимально'
  return 'Много жиров'
})

const fiberRecommendation = computed(() => {
  const percent = fiberPercentage.value
  if (percent < 30) return 'Добавьте клетчатки'
  if (percent < 70) return 'Хорошо'
  return 'Отлично!'
})

const sugarRecommendation = computed(() => {
  const percent = sugarPercentage.value
  if (percent < 30) return 'Мало сахара'
  if (percent < 70) return 'Умеренно'
  return 'Много сахара'
})

// Калорийность на 100г
const caloriesPer100g = computed(() => {
  if (!props.totalWeight || props.totalWeight === 0) return 0
  return Math.round((props.nutrition.calories / props.totalWeight) * 100)
})
</script>

<style scoped>
.plate-stats {
  padding: var(--spacing-lg);
}

.plate-stats h3 {
  margin-bottom: var(--spacing-lg);
  color: var(--primary-color);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.stat-item {
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  border-left: 4px solid;
  transition: transform 0.2s;
}

.stat-item:hover {
  transform: translateY(-2px);
}

.stat-item.calories { border-left-color: #e53e3e; }
.stat-item.protein { border-left-color: #ed8936; }
.stat-item.carbs { border-left-color: #4299e1; }
.stat-item.fats { border-left-color: #805ad5; }
.stat-item.fiber { border-left-color: #48bb78; }
.stat-item.sugar { border-left-color: #d53f8c; }

.stat-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-sm);
}

.stat-header i {
  font-size: 1.2rem;
}

.stat-item.calories .stat-header i { color: #e53e3e; }
.stat-item.protein .stat-header i { color: #ed8936; }
.stat-item.carbs .stat-header i { color: #4299e1; }
.stat-item.fats .stat-header i { color: #805ad5; }
.stat-item.fiber .stat-header i { color: #48bb78; }
.stat-item.sugar .stat-header i { color: #d53f8c; }

.stat-label {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-primary);
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  margin: var(--spacing-xs) 0;
  line-height: 1;
}

.stat-unit {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-sm);
}

.stat-progress {
  height: 6px;
  background: var(--border-color);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: var(--spacing-sm);
}

.progress-bar {
  height: 100%;
  background: currentColor;
  border-radius: 3px;
  transition: width 0.5s ease;
}

.stat-recommendation {
  font-size: 0.8rem;
  color: var(--text-secondary);
  min-height: 2em;
}

.stats-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.summary-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.summary-value {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-sm);
  }

  .stats-summary {
    grid-template-columns: 1fr;
  }

  .stat-value {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>