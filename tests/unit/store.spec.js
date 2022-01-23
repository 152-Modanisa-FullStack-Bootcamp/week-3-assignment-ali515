import { actions, mutations } from '../../src/store'

describe('store tests', () => {
    it('should be addToCount add given number', async () => {
        const count = 2
        const addedNumber = 5
        const state = {
            count
        }
        await mutations.addToCount(state, addedNumber)
        expect(state.count).toEqual(count + addedNumber)
    })

    it('should be increment call with addToCount commit given 1', async () => {
        const context = {
            commit: jest.fn()
        }
        var spy = jest.spyOn(context, 'commit')
        actions.increment(context)
        expect(spy).toHaveBeenCalledWith('addToCount', 1)
    })

    it('should be decrement call with addToCount commit given -1', async () => {
        const context = {
            commit: jest.fn()
        }
        var spy = jest.spyOn(context, 'commit')
        actions.decrement(context)
        expect(spy).toHaveBeenCalledWith('addToCount', -1)
    })
})