<!-- components/Plate/RecommendationsList.vue -->
<template>
  <div class="recommendations-list">
    <!-- Заглушка если нет данных -->
    <div v-if="!hasData" class="no-data">
      <i class="fas fa-info-circle"></i>
      <p>Добавьте продукты в тарелку для получения рекомендаций</p>
    </div>

    <!-- Рекомендации по балансу -->
    <div v-else class="recommendations-container">
      <h5><i class="fas fa-balance-scale"></i> Баланс тарелки</h5>
      <div class="recommendations-grid">
        <RecommendationCard
            v-for="rec in balanceRecommendations"
            :key="rec.id"
            :type="rec.type"
            :title="rec.title"
            :message="rec.message"
            :action="rec.action"
        />
      </div>

      <!-- Рекомендации по питательности -->
      <h5><i class="fas fa-apple-alt"></i> Питательность</h5>
      <div class="recommendations-grid">
        <RecommendationCard
            v-for="rec in nutritionRecommendations"
            :key="rec.id"
            :type="rec.type"
            :title="rec.title"
            :message="rec.message"
        />
      </div>

      <!-- Общие советы -->
      <h5><i class="fas fa-lightbulb"></i> Общие советы</h5>
      <div class="recommendations-grid">
        <RecommendationCard
            v-for="rec in generalRecommendations"
            :key="rec.id"
            type="info"
            :title="rec.title"
            :message="rec.message"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import RecommendationCard from '../UI/RecommendationCard.vue'

const props = defineProps({
  nutrition: {
    type: Object,
    default: () => ({})
  },
  percentages: {
    type: Object,
    default: () => ({})
  }
})

// Проверяем есть ли данные
const hasData = computed(() => {
  return props.nutrition.calories > 0 ||
      props.percentages.vegetable > 0 ||
      props.percentages.protein > 0 ||
      props.percentages.carb > 0
})

// Рекомендации по балансу
const balanceRecommendations = computed(() => {
  const recs = []
  const { vegetable, protein, carb } = props.percentages

  // Овощи
  if (vegetable < 30) {
    recs.push({
      id: 'more-veggies',
      type: 'warning',
      title: 'Мало овощей',
      message: `Овощей всего ${vegetable}% (нужно 50%)`,
      action: 'Добавьте больше овощей и фруктов'
    })
  } else if (vegetable > 70) {
    recs.push({
      id: 'less-veggies',
      type: 'info',
      title: 'Много овощей',
      message: `Овощей ${vegetable}% - это хорошо, но нужен баланс`,
      action: 'Добавьте белки и углеводы'
    })
  }

  // Белки
  if (protein < 15) {
    recs.push({
      id: 'more-protein',
      type: 'warning',
      title: 'Мало белка',
      message: `Белков всего ${protein}% (нужно 25%)`,
      action: 'Добавьте мясо, рыбу, тофу или бобовые'
    })
  } else if (protein > 40) {
    recs.push({
      id: 'less-protein',
      type: 'info',
      title: 'Много белка',
      message: `Белков ${protein}% - возможно перебор`,
      action: 'Уменьшите порцию белков'
    })
  }

  // Углеводы
  if (carb < 15) {
    recs.push({
      id: 'more-carbs',
      type: 'warning',
      title: 'Мало углеводов',
      message: `Углеводов всего ${carb}% (нужно 25%)`,
      action: 'Добавьте крупы, хлеб или картофель'
    })
  }

  // Если всё сбалансировано
  if (recs.length === 0) {
    recs.push({
      id: 'balanced',
      type: 'success',
      title: 'Отличный баланс!',
      message: 'Ваша тарелка хорошо сбалансирована по Гарвардской системе',
      action: 'Так держать!'
    })
  }

  return recs
})

// Рекомендации по питательности
const nutritionRecommendations = computed(() => {
  const recs = []
  const { calories, protein, fiber, sugar } = props.nutrition

  // Калории
  if (calories < 300) {
    recs.push({
      id: 'more-calories',
      type: 'warning',
      title: 'Мало калорий',
      message: `Всего ${calories} ккал`,
      action: 'Для полноценного приема пищи нужно 400-600 ккал'
    })
  } else if (calories > 800) {
    recs.push({
      id: 'less-calories',
      type: 'info',
      title: 'Много калорий',
      message: `${calories} ккал - довольно много`,
      action: 'Рассмотрите уменьшение порций'
    })
  }

  // Клетчатка
  if (fiber < 5) {
    recs.push({
      id: 'more-fiber',
      type: 'warning',
      title: 'Мало клетчатки',
      message: `Всего ${fiber}г клетчатки`,
      action: 'Добавьте овощи, фрукты или цельнозерновые'
    })
  } else if (fiber > 15) {
    recs.push({
      id: 'good-fiber',
      type: 'success',
      title: 'Много клетчатки',
      message: `${fiber}г клетчатки - отлично!`,
      action: 'Это полезно для пищеварения'
    })
  }

  // Сахар
  if (sugar > 20) {
    recs.push({
      id: 'less-sugar',
      type: 'warning',
      title: 'Много сахара',
      message: `${sugar}г сахара`,
      action: 'Попробуйте уменьшить сладкие продукты'
    })
  }

  // Белок
  if (protein > 40) {
    recs.push({
      id: 'high-protein',
      type: 'info',
      title: 'Высокобелковая тарелка',
      message: `${protein}г белка`,
      action: 'Отлично для мышц!'
    })
  }

  return recs
})

// Общие советы
const generalRecommendations = computed(() => {
  const recs = [
    {
      id: 'water',
      title: 'Не забывайте про воду',
      message: 'Выпейте стакан воды до или после еды'
    },
    {
      id: 'chew',
      title: 'Тщательно пережевывайте',
      message: 'Это улучшает пищеварение и насыщение'
    },
    {
      id: 'time',
      title: 'Ешьте не спеша',
      message: 'Прием пищи должен занимать 20-30 минут'
    }
  ]

  // Добавляем сезонные советы
  const month = new Date().getMonth()
  if (month >= 5 && month <= 8) { // Лето
    recs.push({
      id: 'summer',
      title: 'Летний совет',
      message: 'Добавьте сезонные овощи и фрукты'
    })
  }

  if (props.nutrition.calories > 500) {
    recs.push({
      id: 'walk',
      title: 'После сытного обеда',
      message: 'Совершите небольшую прогулку'
    })
  }

  return recs
})
</script>

<style scoped>
.recommendations-list {
  padding: var(--spacing-sm);
}

.no-data {
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--text-secondary);
}

.no-data i {
  font-size: 2rem;
  margin-bottom: var(--spacing-md);
  opacity: 0.5;
}

.no-data p {
  margin: 0;
}

.recommendations-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.recommendations-container h5 {
  margin: 0 0 var(--spacing-sm) 0;
  color: var(--text-primary);
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.recommendations-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

@media (max-width: 768px) {
  .recommendations-list {
    padding: 0;
  }
}
</style>