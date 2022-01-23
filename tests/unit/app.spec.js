import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import App from '../../src/App'

function mountComponent(countValue = 0) {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store({
        state: {
            count: countValue
        },
        getters: {
            getCount: jest.fn().mockReturnValue(countValue)
        }
    })
    return shallowMount(App, { store, localVue })
}

describe('app component tests', () => {
    it('should be component exist', () => {
        const wrapper = mountComponent()
        expect(wrapper.exists()).toBeTruthy()
    })

    it('should be h1 exist', () => {
        const selector = 'h1'
        const wrapper = mountComponent()
        const h1Element = wrapper.find(selector)
        expect(h1Element.exists()).toBeTruthy()
    })

    it('should be h1 text is "Daily Corona Cases in Turkey"', () => {
        const text = 'Daily Corona Cases in Turkey'
        const selector = 'h1'
        const wrapper = mountComponent()
        const h1Element = wrapper.find(selector)
        expect(h1Element.text()).toEqual(text)
    })

    describe('notificationArea class check based on getCount value and message', () => {
        const selector = '.notificationArea'

        it('getCount value is be equal', () => {
            const count = 3
            const wrapper = mountComponent(count)
            expect(wrapper.vm.getCount).toEqual(count)
        })

        it('getCount value less at 5', () => {
            const count = 3;
            const message = `So safe. Case count is ${count}k`;
            const wrapper = mountComponent(count)
            const notificationAreaElement = wrapper.find(selector)
            expect(notificationAreaElement.text()).toEqual(message)
        })

        it('getCount value between 5 and 10, but not equal to 10', () => {
            const count = 7;
            const message = `Life is normal. Case count is ${count}k`;
            const wrapper = mountComponent(count)
            const notificationAreaElement = wrapper.find(selector)
            expect(notificationAreaElement.text()).toEqual(message)
        })

        it('getCount value equal and greater at 10', () => {
            const count = 15;
            const message = `Danger!!! Case count is ${count}k`;
            const wrapper = mountComponent(count)
            const notificationAreaElement = wrapper.find(selector)
            expect(notificationAreaElement.text()).toEqual(message)
        })
    })
})