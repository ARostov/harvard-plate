<!-- components/Plate/FoodSelection.vue -->
<template>
  <div class="food-selection card">
    <div class="food-selection-header">
      <h3>Выберите продукты</h3>
      <div class="search-container">
        <input
            type="text"
            v-model="searchQuery"
            placeholder="Поиск продуктов..."
            class="search-input"
        />
        <i class="fas fa-search search-icon"></i>
      </div>
    </div>

    <!-- Фильтр по категориям -->
    <div class="category-filter">
      <button
          v-for="category in categories"
          :key="category.id"
          class="category-btn"
          :class="{ active: selectedCategory === category.id }"
          @click="selectCategory(category.id)"
      >
        <span class="category-icon">{{ category.icon }}</span>
        <span class="category-name">{{ category.name }}</span>
      </button>
    </div>

    <!-- Информация о выбранной категории -->
    <div class="category-info" v-if="selectedCategory !== 'all'">
      <div class="category-info-content">
        <span class="category-icon">{{ selectedCategoryData.icon }}</span>
        <div>
          <h4>{{ selectedCategoryData.name }}</h4>
          <p class="category-description">{{ selectedCategoryData.description }}</p>
        </div>
      </div>
      <div class="category-count">
        {{ filteredFoods.length }} продуктов
      </div>
    </div>

    <!-- Список продуктов -->
    <div class="food-list-container">
      <div class="food-list" :class="{ 'has-scroll': filteredFoods.length > 4 }">
        <FoodCard
            v-for="food in filteredFoods"
            :key="food.id"
            :food="food"
            @add-to-plate="handleAddToPlate"
        />
      </div>

      <!-- Сообщение если нет продуктов -->
      <div v-if="filteredFoods.length === 0" class="no-products">
        <i class="fas fa-search fa-2x"></i>
        <p>Продукты не найдены</p>
        <button class="btn btn-outline" @click="clearFilters">
          Сбросить фильтры
        </button>
      </div>
    </div>

    <!-- Быстрые действия -->
    <div class="quick-actions" v-if="filteredFoods.length > 0">
      <button class="btn btn-outline btn-sm" @click="addRandomProduct">
        <i class="fas fa-random"></i> Добавить случайный
      </button>
      <button class="btn btn-outline btn-sm" @click="addAllFromCategory" v-if="selectedCategory !== 'all'">
        <i class="fas fa-layer-group"></i> Добавить все
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FoodCard from '../UI/FoodCard.vue'

const props = defineProps({
  foods: Array,
  selectedCategory: String
})

const emit = defineEmits(['add-to-plate', 'category-change', 'add-multiple'])

const searchQuery = ref('')

const categories = [
  {
    id: 'all',
    name: 'Все',
    icon: '🍽️',
    description: 'Все доступные продукты'
  },
  {
    id: 'vegetable',
    name: 'Овощи и фрукты',
    icon: '🥗',
    description: 'Источники витаминов и клетчатки'
  },
  {
    id: 'protein',
    name: 'Белки',
    icon: '🥩',
    description: 'Белковые продукты для энергии'
  },
  {
    id: 'carb',
    name: 'Углеводы',
    icon: '🍞',
    description: 'Источники энергии'
  }
]

// Выбранная категория
const selectedCategoryData = computed(() => {
  return categories.find(c => c.id === props.selectedCategory) || categories[0]
})

// Фильтрация продуктов
const filteredFoods = computed(() => {
  if (!props.foods) return []

  let result = props.foods

  // Фильтр по категории
  if (props.selectedCategory !== 'all') {
    result = result.filter(food => food.category === props.selectedCategory)
  }

  // Поиск по названию
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    result = result.filter(food =>
        food.name.toLowerCase().includes(query) ||
        food.description.toLowerCase().includes(query)
    )
  }

  return result
})

const selectCategory = (categoryId) => {
  emit('category-change', categoryId)
  searchQuery.value = '' // Сбрасываем поиск при смене категории
}

// Обработчик добавления в тарелку
const handleAddToPlate = ({ food, amount }) => {
  emit('add-to-plate', { food, amount })
}

// Быстрые действия
const addRandomProduct = () => {
  if (filteredFoods.value.length === 0) return

  const randomIndex = Math.floor(Math.random() * filteredFoods.value.length)
  const randomFood = filteredFoods.value[randomIndex]

  emit('add-to-plate', {
    food: randomFood,
    amount: 100
  })
}

const addAllFromCategory = () => {
  if (props.selectedCategory === 'all' || filteredFoods.value.length === 0) return

  const foodsToAdd = filteredFoods.value.map(food => ({
    food,
    amount: 100
  }))

  emit('add-multiple', foodsToAdd)
}

const clearFilters = () => {
  emit('category-change', 'all')
  searchQuery.value = ''
}
</script>

<style scoped>
.food-selection {
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 600px;
  max-height: 800px;
}

.food-selection-header {
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
  background: var(--bg-secondary);
  border-radius: var(--radius-md) var(--radius-md) 0 0;
}

.food-selection-header h3 {
  margin: 0 0 var(--spacing-md) 0;
  color: var(--primary-color);
}

.search-container {
  position: relative;
}

.search-input {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md) var(--spacing-sm) 40px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  background: white;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
}

.category-filter {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--border-color);
  border-bottom: 1px solid var(--border-color);
}

.category-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: var(--spacing-sm);
  background: var(--bg-primary);
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
  min-height: 70px;
}

.category-btn.active {
  background: var(--primary-color);
  color: white;
}

.category-btn:hover:not(.active) {
  background: var(--bg-secondary);
}

.category-icon {
  font-size: 1.5rem;
}

.category-name {
  font-size: 0.75rem;
  text-align: center;
  line-height: 1.2;
}

.category-info {
  padding: var(--spacing-md);
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
}

.category-info-content {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xs);
}

.category-info-content h4 {
  margin: 0 0 4px 0;
  font-size: 1rem;
}

.category-description {
  margin: 0;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.category-count {
  text-align: right;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.food-list-container {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.food-list {
  padding: var(--spacing-md);
  overflow-y: auto;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--spacing-md);
  align-content: start;
}

.food-list.has-scroll {
  padding-right: calc(var(--spacing-md) - 8px);
}

.no-products {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  color: var(--text-secondary);
  text-align: center;
  height: 100%;
}

.no-products i {
  margin-bottom: var(--spacing-md);
  opacity: 0.5;
}

.no-products p {
  margin-bottom: var(--spacing-md);
}

.quick-actions {
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  border-top: 1px solid var(--border-color);
  background: var(--bg-secondary);
  border-radius: 0 0 var(--radius-md) var(--radius-md);
}

.btn-outline {
  flex: 1;
  background: white;
  border: 1px solid var(--border-color);
}

.btn-outline:hover {
  background: var(--bg-tertiary);
}

/* Стили прокрутки */
.food-list::-webkit-scrollbar {
  width: 8px;
}

.food-list::-webkit-scrollbar-track {
  background: var(--bg-secondary);
  border-radius: 4px;
}

.food-list::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 4px;
}

.food-list::-webkit-scrollbar-thumb:hover {
  background: var(--text-light);
}

/* Адаптивность */
@media (max-width: 1024px) {
  .food-list {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (max-width: 768px) {
  .food-selection {
    max-height: none;
    min-height: auto;
  }

  .category-filter {
    grid-template-columns: repeat(2, 1fr);
  }

  .food-list {
    grid-template-columns: 1fr;
  }

  .quick-actions {
    flex-direction: column;
  }
}
</style>