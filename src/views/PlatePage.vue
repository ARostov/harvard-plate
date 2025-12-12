<!-- views/PlatePage.vue -->
<template>
  <div class="plate-page">
    <div class="page-header">
      <h2><i class="fas fa-utensils"></i> Конструктор тарелки</h2>
      <p class="subtitle">Соберите идеальную тарелку по принципам Гарвардского питания</p>
    </div>

    <div class="layout-container">
      <!-- Левая колонка: Конструктор -->
      <div class="left-column">
        <Accordion title="🍽️ Ваша тарелка" :is-open="true">
          <Plate
              ref="plateComponent"
              @update-nutrition="handleNutritionUpdate"
              @update-totals="handleTotalsUpdate"
          />
        </Accordion>
      </div>

      <!-- Правая колонка: Аналитика -->
      <div class="right-column">
        <!-- Табы для аналитики -->
        <Tabs :tabs="analyticsTabs" default-tab="stats">
          <template #stats>
            <PlateStats
                :nutrition="nutrition"
                :total-weight="totalWeight"
                :total-items="totalItems"
            />
          </template>

          <template #analysis>
            <PlateAnalysis
                :vegetable-percentage="vegetablePercentage"
                :protein-percentage="proteinPercentage"
                :carb-percentage="carbPercentage"
            />
          </template>

          <template #recommendations>
            <div class="recommendations-panel">
              <h4><i class="fas fa-lightbulb"></i> Рекомендации</h4>
              <RecommendationsList
                  :nutrition="nutrition"
                  :percentages="{
                  vegetable: vegetablePercentage,
                  protein: proteinPercentage,
                  carb: carbPercentage
                }"
              />
            </div>
          </template>
        </Tabs>

        <!-- Быстрые действия -->
        <Accordion title="⚡ Быстрые действия" :is-open="false">
          <div class="quick-actions">
            <button class="btn btn-outline" @click="savePlate">
              <i class="fas fa-save"></i> Сохранить тарелку
            </button>
            <button class="btn btn-outline" @click="clearPlate">
              <i class="fas fa-trash"></i> Очистить тарелку
            </button>
            <button class="btn btn-outline" @click="sharePlate">
              <i class="fas fa-share"></i> Поделиться
            </button>
          </div>
        </Accordion>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import Plate from '../components/Plate/Plate.vue'
import PlateStats from '../components/Plate/PlateStats.vue'
import PlateAnalysis from '../components/Plate/PlateAnalysis.vue'
import RecommendationsList from '../components/Plate/RecommendationsList.vue'
import Accordion from '../components/UI/Accordion.vue'
import Tabs from '../components/UI/Tabs.vue'

const plateComponent = ref(null)

// Данные о питательности
const nutrition = reactive({
  calories: 0,
  protein: 0,
  carbs: 0,
  fats: 0,
  fiber: 0,
  sugar: 0
})

// Общие данные
const totalWeight = ref(0)
const totalItems = ref(0)

// Проценты для анализа
const vegetablePercentage = ref(0)
const proteinPercentage = ref(0)
const carbPercentage = ref(0)

// Табы для аналитики
const analyticsTabs = computed(() => [
  {
    id: 'stats',
    title: 'Статистика',
    icon: 'fas fa-chart-bar',
    badge: totalItems.value > 0 ? totalItems.value : null
  },
  {
    id: 'analysis',
    title: 'Анализ',
    icon: 'fas fa-chart-line'
  },
  {
    id: 'recommendations',
    title: 'Советы',
    icon: 'fas fa-lightbulb'
  }
])

// Обработчики обновления данных
const handleNutritionUpdate = (newNutrition) => {
  Object.assign(nutrition, newNutrition)
}

const handleTotalsUpdate = ({ weight, items, percentages }) => {
  totalWeight.value = weight
  totalItems.value = items
  vegetablePercentage.value = percentages.vegetable
  proteinPercentage.value = percentages.protein
  carbPercentage.value = percentages.carb
}

// Быстрые действия
const savePlate = () => {
  console.log('Сохранение тарелки...')
  // Реализация сохранения
}

const clearPlate = () => {
  if (confirm('Очистить тарелку?')) {
    // Очистка через ref компонента
    if (plateComponent.value?.clearPlate) {
      plateComponent.value.clearPlate()
    }
  }
}

const sharePlate = () => {
  console.log('Поделиться тарелкой...')
  // Реализация шаринга
}
</script>

<style scoped>
.plate-page {
  padding: var(--spacing-lg) 0;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  padding: 0 var(--spacing-lg);
}

.page-header h2 {
  color: var(--primary-color);
  margin-bottom: var(--spacing-sm);
}

.subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.layout-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-lg);
  padding: 0 var(--spacing-lg);
}

.left-column,
.right-column {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.recommendations-panel {
  padding: var(--spacing-md);
}

.recommendations-panel h4 {
  margin-top: 0;
  margin-bottom: var(--spacing-md);
  color: var(--primary-color);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.quick-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.quick-actions .btn {
  width: 100%;
  justify-content: flex-start;
}

/* Адаптивность */
@media (max-width: 1200px) {
  .layout-container {
    grid-template-columns: 1.5fr 1fr;
  }
}

@media (max-width: 992px) {
  .layout-container {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }

  .left-column,
  .right-column {
    gap: var(--spacing-sm);
  }
}

@media (max-width: 768px) {
  .plate-page {
    padding: var(--spacing-md) 0;
  }

  .page-header,
  .layout-container {
    padding: 0 var(--spacing-md);
  }
}
</style>