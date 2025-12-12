// utils/calculations.test.js
import { describe, it, expect } from 'vitest'
import { calculatePlateNutrition, calculatePlateBalance } from './calculations'
import foodsData from '../data/foods.json'

describe('Nutrition calculations', () => {
    it('calculates calories correctly', () => {
        const plateItems = [
            { foodId: 'tomato', amount: 100 },
            { foodId: 'chicken', amount: 150 }
        ]

        const result = calculatePlateNutrition(plateItems, foodsData)

        expect(result.calories).toBeGreaterThan(0)
        expect(result.protein).toBeGreaterThan(0)
        // Проверяем конкретные значения если знаем ожидаемые
    })

    it('handles empty plate', () => {
        const result = calculatePlateNutrition([], foodsData)
        expect(result.calories).toBe(0)
        expect(result.protein).toBe(0)
    })
})