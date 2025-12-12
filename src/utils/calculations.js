// Функции для расчета питательности и баланса тарелки

// utils/calculations.js

// Расчет питательности тарелки
export function calculatePlateNutrition(plateItems, foodsData) {
    if (!plateItems || !plateItems.length) {
        return {
            calories: 0,
            protein: 0,
            carbs: 0,
            fats: 0,
            fiber: 0,
            sugar: 0
        }
    }

    let calories = 0
    let protein = 0
    let carbs = 0
    let fats = 0
    let fiber = 0
    let sugar = 0

    plateItems.forEach(item => {
        const food = foodsData.foods.find(f => f.id === item.foodId)
        if (food && food.nutrition) {
            // Расчет на основе веса (в 100г продукта)
            const multiplier = item.amount / 100

            calories += (food.nutrition.calories || 0) * multiplier
            protein += (food.nutrition.protein || 0) * multiplier
            carbs += (food.nutrition.carbs || 0) * multiplier
            fats += (food.nutrition.fats || 0) * multiplier
            fiber += (food.nutrition.fiber || 0) * multiplier
            sugar += (food.nutrition.sugar || 0) * multiplier
        }
    })

    return {
        calories: Math.round(calories),
        protein: Math.round(protein * 10) / 10,
        carbs: Math.round(carbs * 10) / 10,
        fats: Math.round(fats * 10) / 10,
        fiber: Math.round(fiber * 10) / 10,
        sugar: Math.round(sugar * 10) / 10
    }
}

// Расчет баланса тарелки (проценты по категориям)
export function calculatePlateBalance(plateItems, foodsData) {
    if (!plateItems || !plateItems.length) {
        return {
            vegetable: 0,
            protein: 0,
            carb: 0
        }
    }

    // Считаем вес по категориям
    let vegetableWeight = 0
    let proteinWeight = 0
    let carbWeight = 0

    plateItems.forEach(item => {
        const food = foodsData.foods.find(f => f.id === item.foodId)
        if (food) {
            switch (food.category) {
                case 'vegetable':
                    vegetableWeight += item.amount
                    break
                case 'protein':
                    proteinWeight += item.amount
                    break
                case 'carb':
                    carbWeight += item.amount
                    break
            }
        }
    })

    const totalWeight = vegetableWeight + proteinWeight + carbWeight

    if (totalWeight === 0) {
        return {
            vegetable: 0,
            protein: 0,
            carb: 0
        }
    }

    return {
        vegetable: Math.round((vegetableWeight / totalWeight) * 100),
        protein: Math.round((proteinWeight / totalWeight) * 100),
        carb: Math.round((carbWeight / totalWeight) * 100)
    }
}

// Оценка Гарвардской тарелки
export function evaluateHarvardPlate(balance) {
    const ideal = { vegetable: 50, protein: 25, carb: 25 }

    return {
        vegetable: {
            actual: balance.vegetable,
            ideal: ideal.vegetable,
            diff: Math.abs(balance.vegetable - ideal.vegetable),
            status: getStatus(balance.vegetable, ideal.vegetable)
        },
        protein: {
            actual: balance.protein,
            ideal: ideal.protein,
            diff: Math.abs(balance.protein - ideal.protein),
            status: getStatus(balance.protein, ideal.protein)
        },
        carb: {
            actual: balance.carb,
            ideal: ideal.carb,
            diff: Math.abs(balance.carb - ideal.carb),
            status: getStatus(balance.carb, ideal.carb)
        }
    }
}

function getStatus(actual, ideal) {
    const diff = Math.abs(actual - ideal)
    if (diff <= 10) return 'good'
    if (diff <= 20) return 'warning'
    return 'bad'
}

/**
 * Рассчитывает калорийность и макронутриенты для рецепта
 * @param {Array} ingredients - ингредиенты рецепта
 * @param {Object} foodsData - база продуктов
 * @returns {Object} - питательность рецепта
 */
export function calculateRecipeNutrition(ingredients, foodsData) {
    return calculatePlateNutrition(
        ingredients.map(ing => ({ foodId: ing.id, amount: ing.amount })),
        foodsData
    )
}

/**
 * Конвертирует единицы измерения
 * @param {number} amount - количество
 * @param {string} fromUnit - исходная единица
 * @param {string} toUnit - целевая единица
 * @returns {number} - конвертированное количество
 */
export function convertUnits(amount, fromUnit, toUnit) {
    const conversions = {
        'g': { 'kg': 0.001, 'ml': 1 },
        'kg': { 'g': 1000 },
        'ml': { 'l': 0.001, 'g': 1 },
        'l': { 'ml': 1000 },
        'piece': { 'g': 50 } // примерная конвертация
    }

    if (fromUnit === toUnit) return amount
    if (conversions[fromUnit] && conversions[fromUnit][toUnit]) {
        return amount * conversions[fromUnit][toUnit]
    }

    return amount // если конвертация неизвестна, возвращаем как есть
}

/**
 * Рассчитывает соотношение БЖУ в процентах от калорий
 * @param {Object} nutrition - объект с protein, carbs, fat (в граммах)
 * @returns {Object} - проценты БЖУ от калорий
 */
export function calculateMacroPercentages(nutrition) {
    // Калории на грамм: белки - 4 ккал, углеводы - 4 ккал, жиры - 9 ккал
    const proteinCals = nutrition.protein * 4
    const carbCals = nutrition.carbs * 4
    const fatCals = nutrition.fat * 9
    const totalCals = proteinCals + carbCals + fatCals

    return {
        protein: totalCals > 0 ? Math.round((proteinCals / totalCals) * 100) : 0,
        carbs: totalCals > 0 ? Math.round((carbCals / totalCals) * 100) : 0,
        fat: totalCals > 0 ? Math.round((fatCals / totalCals) * 100) : 0
    }
}

// Экспортируем все функции
export default {
    calculatePlateNutrition,
    calculatePlateBalance,
    evaluateHarvardPlate,
    calculateRecipeNutrition,
    convertUnits,
    calculateMacroPercentages
}