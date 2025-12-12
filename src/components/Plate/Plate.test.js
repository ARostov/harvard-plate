// components/Plate/Plate.test.js
import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Plate from './Plate.vue'
import foodsData from '../../data/foods.json'

describe('Plate component', () => {
    let wrapper

    beforeEach(() => {
        wrapper = mount(Plate)
    })

    it('adds food when button clicked', async () => {
        // Мокаем foodsData или используем реальную
        // Тестируем взаимодействие
    })

    it('updates percentages when foods added', async () => {
        // Проверяем что круговая диаграмма обновляется
    })
})