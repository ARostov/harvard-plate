// visual/plate.visual.test.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Plate from '../components/Plate/Plate.vue'

describe('Visual regression', () => {
    it('empty plate looks correct', () => {
        const wrapper = mount(Plate)
        // Можно делать скриншоты или проверять CSS классы
        expect(wrapper.find('.plate-circle').exists()).toBe(true)
        expect(wrapper.find('.empty-plate-message').exists()).toBe(false)
    })

    it('plate with items looks correct', async () => {
        const wrapper = mount(Plate)
        // Добавляем продукты
        // Проверяем что появились иконки
    })
})