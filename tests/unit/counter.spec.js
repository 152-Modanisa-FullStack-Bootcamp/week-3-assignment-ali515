import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Counter from "../../src/Counter";

function mountComponent(countValue = 0) {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store({
        state: {
            count: countValue
        }
    })
    return shallowMount(Counter, { store, localVue })
}

describe('counter component tests', () => {
    it('should be component exist', () => {
        const wrapper = mountComponent()
        expect(wrapper.exists()).toBeTruthy()
    })

    it('should be count text is visible', () => {
        const count = 10
        const selector = 'span'
        const wrapper = mountComponent(count)
        const countTextElement = wrapper.find(selector)
        const countText = countTextElement.text()
        expect(parseInt(countText)).toEqual(count)
    })

    it('should be Increase button exist', () => {
        const wrapper = mountComponent()
        const selector = '#button-increase'
        var increaseButtonElement = wrapper.find(selector)
        expect(increaseButtonElement.exists()).toBeTruthy()
    })

    it('should increase by one each time it is clicked', async () => {
        const wrapper = mountComponent()
        wrapper.setMethods({
            increase: jest.fn()
        })
        const spy = jest.spyOn(wrapper.vm, 'increase')
        const selector = '#button-increase'
        const increaseButtonElement = wrapper.find(selector)
        await increaseButtonElement.trigger('click')
        expect(spy).toHaveBeenCalled()
    })

    it('should be Decrease button exist', () => {
        const wrapper = mountComponent()
        const selector = '#button-decrease'
        var decreaseButtonElement = wrapper.find(selector)
        expect(decreaseButtonElement.exists()).toBeTruthy()
    })

    it('should decrease by one each time it is clicked', async () => {
        const wrapper = mountComponent()
        wrapper.setMethods({
            decrease: jest.fn()
        })
        const spy = jest.spyOn(wrapper.vm, 'decrease')
        const selector = '#button-decrease'
        const decreaseButtonElement = wrapper.find(selector)
        await decreaseButtonElement.trigger('click')
        expect(spy).toHaveBeenCalled()
    })
})