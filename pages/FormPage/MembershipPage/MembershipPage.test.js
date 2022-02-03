import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

import MembershipPage from '~/pages/FormPage/MembershipPage'

const localVue = createLocalVue()

localVue.use(Vuex)

const mockRouter = {
  push: jest.fn()
}

const mockActions = {
  updateForm: jest.fn()
}

describe('MembershipPage', () => {
  let wrapper = null
  let store = null

  const createStore = (options) => {
    store = new Vuex.Store({
      state: {
        form: {
          firstName: '',
          lastName: '',
          email: '',
          phones: [{ type: 'home', value: '' }],
          membershipType: 'regular'
        }
      },
      actions: mockActions,
      ...options
    })
  }

  const createComponent = (options) => {
    wrapper = shallowMount(MembershipPage, {
      data () {
        return {
          form: {
            membershipType: 'regular'
          }
        }
      },
      mocks: {
        $router: mockRouter
      },
      localVue,
      store,
      ...options
    })
  }

  beforeEach(() => { jest.clearAllMocks() })

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy()
      wrapper = null
    }
    if (store) {
      store = null
    }
  })

  it('dispatches "updateForm" with selected membershipType', async () => {
    createStore()
    createComponent()
    wrapper.setData({ ...wrapper.vm.$options.asyncData({ store }) })

    const contactInfoComponent = wrapper.find('membershipfields-stub')
    await contactInfoComponent.vm.$emit('on-update-field', 'membershipType', 'premium')

    await wrapper.find('form').trigger('submit')

    expect(mockActions.updateForm).toHaveBeenCalled()
    expect(mockActions.updateForm.mock.calls[0][1]).toEqual({
      membershipType: 'premium'
    })
  })
})
