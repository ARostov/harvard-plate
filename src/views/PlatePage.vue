<!-- views/PlatePage.vue -->
<template>
  <div class="plate-page">
    <div class="page-header">
      <h2><i class="fas fa-utensils"></i> Конструктор тарелки</h2>
      <p class="subtitle">Соберите идеальную тарелку по принципам Гарвардского питания</p>
    </div>

    <div class="debug-controls" v-if="true"> <!-- Поставь v-if="true" для тестирования -->
      <button @click="loadTestData" class="btn btn-sm">
        <i class="fas fa-vial"></i> Загрузить тестовые данные
      </button>
    </div>

    <div class="plate-container">
      <!-- Основной компонент тарелки -->
      <Plate
          ref="plateComponent"
          @update-nutrition="handleNutritionUpdate"
          @update-totals="handleTotalsUpdate"
      />

      <!-- Статистика тарелки (показываем когда есть данные) -->
      <PlateStats
          v-if="showStats"
          :nutrition="nutrition"
          :total-weight="totalWeight"
          :total-items="totalItems"
      />

      <!-- Анализ баланса -->
      <PlateAnalysis
          v-if="showStats"
          :vegetable-percentage="vegetablePercentage"
          :protein-percentage="proteinPercentage"
          :carb-percentage="carbPercentage"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import Plate from '../components/Plate/Plate.vue'
import PlateStats from '../components/Plate/PlateStats.vue'
import PlateAnalysis from '../components/Plate/PlateAnalysis.vue'

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

// Показывать ли статистику
const showStats = computed(() => totalItems.value > 0)

// Обработчики обновления данных из Plate компонента
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

const loadTestData = () => {
  nutrition.calories = 450
  nutrition.protein = 35
  nutrition.carbs = 55
  nutrition.fats = 15
  nutrition.fiber = 12
  nutrition.sugar = 8
  totalWeight.value = 400
  totalItems.value = 4
  vegetablePercentage.value = 40
  proteinPercentage.value = 30
  carbPercentage.value = 30

  console.log('Тестовые данные загружены:', nutrition)
}

// Примерные данные для демонстрации (можно удалить после тестирования)
// nutrition.calories = 450
// nutrition.protein = 35
// nutrition.carbs = 55
// nutrition.fats = 15
// nutrition.fiber = 12
// nutrition.sugar = 8
// totalWeight.value = 400
// totalItems.value = 4
// vegetablePercentage.value = 40
// proteinPercentage.value = 30
// carbPercentage.value = 30
</script>

<style scoped>
.plate-page {
  padding: var(--spacing-lg) 0;
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.page-header h2 {
  color: var(--primary-color);
  margin-bottom: var(--spacing-sm);
}

.subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.plate-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

@media (min-width: 1200px) {
  .plate-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-areas:
      "plate stats"
      "plate analysis";
    grid-template-rows: auto 1fr;
    gap: var(--spacing-lg);
  }

  .plate-container > :first-child {
    grid-area: plate;
    height: fit-content;
  }
  .plate-container > :nth-child(2) {
    grid-area: stats;
  }
  .plate-container > :nth-child(3) {
    grid-area: analysis;
  }
}

@media (min-width: 768px) and (max-width: 1199px) {
  .plate-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "plate plate"
      "stats analysis";
  }

  .plate-container > :first-child { grid-area: plate; }
  .plate-container > :nth-child(2) { grid-area: stats; }
  .plate-container > :nth-child(3) { grid-area: analysis; }
}
</style>