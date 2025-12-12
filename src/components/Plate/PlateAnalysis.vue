<!-- components/Plate/PlateAnalysis.vue -->
<template>
  <div class="plate-analysis card">
    <h3><i class="fas fa-chart-line"></i> Анализ баланса</h3>

    <!-- Баланс Гарвардской тарелки -->
    <div class="analysis-section">
      <h4>Баланс по Гарвардской тарелке</h4>
      <div class="balance-indicators">
        <div class="balance-item" :class="getBalanceClass('vegetable')">
          <div class="balance-label">
            <i class="fas fa-leaf"></i>
            Овощи и фрукты
          </div>
          <div class="balance-content">
            <div class="balance-bar">
              <div class="balance-fill" :style="{ width: vegetablePercentage + '%' }"></div>
            </div>
            <div class="balance-values">
              <span class="current-value">{{ vegetablePercentage }}%</span>
              <span class="target-value">Цель: 50%</span>
            </div>
          </div>
        </div>

        <div class="balance-item" :class="getBalanceClass('protein')">
          <div class="balance-label">
            <i class="fas fa-drumstick-bite"></i>
            Белки
          </div>
          <div class="balance-content">
            <div class="balance-bar">
              <div class="balance-fill" :style="{ width: proteinPercentage + '%' }"></div>
            </div>
            <div class="balance-values">
              <span class="current-value">{{ proteinPercentage }}%</span>
              <span class="target-value">Цель: 25%</span>
            </div>
          </div>
        </div>

        <div class="balance-item" :class="getBalanceClass('carb')">
          <div class="balance-label">
            <i class="fas fa-bread-slice"></i>
            Углеводы
          </div>
          <div class="balance-content">
            <div class="balance-bar">
              <div class="balance-fill" :style="{ width: carbPercentage + '%' }"></div>
            </div>
            <div class="balance-values">
              <span class="current-value">{{ carbPercentage }}%</span>
              <span class="target-value">Цель: 25%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Оценка -->
    <div class="rating-section">
      <h4>Оценка тарелки</h4>
      <div class="rating">
        <div class="rating-score">
          <span class="score">{{ totalScore }}</span>
          <span class="score-max">/100</span>
        </div>
        <div class="rating-stars">
          <i v-for="n in 5" :key="n" class="fas fa-star" :class="{ filled: n <= starCount }"></i>
        </div>
        <div class="rating-text">{{ ratingText }}</div>
      </div>
    </div>

    <!-- Рекомендации -->
    <div class="recommendations-section">
      <h4>Рекомендации</h4>
      <div class="recommendations">
        <div class="recommendation" v-if="vegetablePercentage < 40">
          <i class="fas fa-leaf recommendation-icon"></i>
          <div class="recommendation-content">
            <p class="recommendation-title">Добавьте больше овощей</p>
            <p class="recommendation-text">Овощи должны занимать половину тарелки</p>
          </div>
        </div>

        <div class="recommendation" v-if="proteinPercentage < 20">
          <i class="fas fa-drumstick-bite recommendation-icon"></i>
          <div class="recommendation-content">
            <p class="recommendation-title">Недостаточно белка</p>
            <p class="recommendation-text">Добавьте белковые продукты: курицу, рыбу, тофу</p>
          </div>
        </div>

        <div class="recommendation" v-if="carbPercentage < 20">
          <i class="fas fa-bread-slice recommendation-icon"></i>
          <div class="recommendation-content">
            <p class="recommendation-title">Мало углеводов</p>
            <p class="recommendation-text">Углеводы дают энергию, добавьте крупы или хлеб</p>
          </div>
        </div>

        <div class="recommendation" v-if="hasRecommendations">
          <i class="fas fa-check-circle recommendation-icon success"></i>
          <div class="recommendation-content">
            <p class="recommendation-title">Хорошая работа!</p>
            <p class="recommendation-text">Ваша тарелка хорошо сбалансирована</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Пропсы будут приходить из родительского компонента
// Пока используем заглушки
const props = defineProps({
  vegetablePercentage: {
    type: Number,
    default: 0
  },
  proteinPercentage: {
    type: Number,
    default: 0
  },
  carbPercentage: {
    type: Number,
    default: 0
  }
})

// Класс для баланса
const getBalanceClass = (category) => {
  const percentages = {
    vegetable: props.vegetablePercentage,
    protein: props.proteinPercentage,
    carb: props.carbPercentage
  }

  const targets = {
    vegetable: 50,
    protein: 25,
    carb: 25
  }

  const diff = Math.abs(percentages[category] - targets[category])

  if (diff < 10) return 'good'
  if (diff < 20) return 'warning'
  return 'bad'
}

// Общий счет
const totalScore = computed(() => {
  let score = 0

  // Оценка овощей
  const vegDiff = Math.abs(props.vegetablePercentage - 50)
  score += Math.max(0, 40 - vegDiff * 0.8)

  // Оценка белков
  const protDiff = Math.abs(props.proteinPercentage - 25)
  score += Math.max(0, 30 - protDiff * 1.2)

  // Оценка углеводов
  const carbDiff = Math.abs(props.carbPercentage - 25)
  score += Math.max(0, 30 - carbDiff * 1.2)

  return Math.round(score)
})

// Количество звезд
const starCount = computed(() => {
  if (totalScore.value >= 90) return 5
  if (totalScore.value >= 70) return 4
  if (totalScore.value >= 50) return 3
  if (totalScore.value >= 30) return 2
  return 1
})

// Текст оценки
const ratingText = computed(() => {
  if (totalScore.value >= 90) return 'Отлично! Идеальный баланс'
  if (totalScore.value >= 70) return 'Хорошо! Почти идеально'
  if (totalScore.value >= 50) return 'Нормально! Можно улучшить'
  if (totalScore.value >= 30) return 'Слабо! Добавьте продукты'
  return 'Очень плохо! Пересмотрите состав'
})

// Есть ли рекомендации
const hasRecommendations = computed(() => {
  return props.vegetablePercentage >= 40 &&
      props.proteinPercentage >= 20 &&
      props.carbPercentage >= 20
})
</script>

<style scoped>
.plate-analysis {
  padding: var(--spacing-lg);
}

.plate-analysis h3 {
  margin-bottom: var(--spacing-lg);
  color: var(--primary-color);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.analysis-section {
  margin-bottom: var(--spacing-xl);
}

.analysis-section h4 {
  margin-bottom: var(--spacing-md);
  font-size: 1.1rem;
  color: var(--text-primary);
}

.balance-indicators {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.balance-item {
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  background: var(--bg-secondary);
  border-left: 4px solid;
}

.balance-item.good {
  border-left-color: var(--success-color);
}

.balance-item.warning {
  border-left-color: var(--warning-color);
}

.balance-item.bad {
  border-left-color: var(--danger-color);
}

.balance-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
}

.balance-label i {
  color: var(--text-secondary);
}

.balance-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.balance-bar {
  flex: 1;
  height: 10px;
  background: var(--border-color);
  border-radius: 5px;
  overflow: hidden;
}

.balance-fill {
  height: 100%;
  background: var(--primary-color);
  transition: width 0.5s ease;
  border-radius: 5px;
}

.balance-values {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 100px;
}

.current-value {
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--primary-color);
}

.target-value {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.rating-section {
  margin-bottom: var(--spacing-xl);
}

.rating-section h4 {
  margin-bottom: var(--spacing-md);
  font-size: 1.1rem;
  color: var(--text-primary);
}

.rating {
  text-align: center;
  padding: var(--spacing-lg);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.rating-score {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: var(--spacing-sm);
}

.score-max {
  font-size: 1.5rem;
  color: var(--text-secondary);
}

.rating-stars {
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-bottom: var(--spacing-sm);
}

.rating-stars i {
  font-size: 1.5rem;
  color: var(--border-color);
}

.rating-stars i.filled {
  color: #fbbf24; /* желтый для звезд */
}

.rating-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.recommendations-section h4 {
  margin-bottom: var(--spacing-md);
  font-size: 1.1rem;
  color: var(--text-primary);
}

.recommendations {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.recommendation {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--info-color);
}

.recommendation-icon {
  font-size: 1.5rem;
  color: var(--info-color);
  margin-top: 2px;
}

.recommendation-icon.success {
  color: var(--success-color);
}

.recommendation-content {
  flex: 1;
}

.recommendation-title {
  font-weight: 600;
  margin: 0 0 4px 0;
  color: var(--text-primary);
}

.recommendation-text {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .balance-content {
    flex-direction: column;
    align-items: stretch;
    gap: var(--spacing-sm);
  }

  .balance-values {
    align-items: flex-start;
  }

  .rating-score {
    font-size: 2rem;
  }
}
</style>