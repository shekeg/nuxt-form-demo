import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import { signUpApi } from './services/sign-up-api'

import OverviewPage from '~/pages/FormPage/OverviewPage'

const localVue = createLocalVue()

localVue.use(Vuex)

const mockRouter = {
  push: jest.fn()
}

const mockActions = {
  resetForm: jest.fn()
}

signUpApi.signUp = jest.fn()

describe('OverviewPage', () => {
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
    wrapper = shallowMount(OverviewPage, {
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

  it('renders client info', () => {
    signUpApi.signUp.mockResolvedValue()

    createStore({
      state: {
        form: {
          firstName: 'firstNameMock',
          lastName: 'lastNameMock',
          email: 'emailMock@example.com',
          phones: [{ type: 'home', value: '+77777777777' }],
          membershipType: 'premium'
        }
      }
    })

    createComponent()

    expect(wrapper.text()).toContain('firstNameMock')
    expect(wrapper.text()).toContain('lastNameMock')
    expect(wrapper.text()).toContain('emailMock@example.com')
    expect(wrapper.text()).toContain('+77777777777')
    expect(wrapper.text()).toContain('premium')
  })

  it('sends sign in request with appropriate payload if submit button is clicked', async () => {
    signUpApi.signUp.mockResolvedValue()

    createStore({
      state: {
        form: {
          firstName: 'firstNameMock',
          lastName: 'lastNameMock',
          email: 'emailMock@example.com',
          phones: [{ type: 'home', value: '+77777777777' }],
          membershipType: 'premium'
        }
      }
    })
    createComponent()

    await wrapper.find('[data-test-id="submit-button"]').trigger('click')

    expect(signUpApi.signUp).toHaveBeenCalled()
    expect(signUpApi.signUp.mock.calls[0][1]).toEqual({
      firstName: 'firstNameMock',
      lastName: 'lastNameMock',
      email: 'emailMock@example.com',
      phones: [{ type: 'home', value: '+77777777777' }],
      membershipType: 'premium'
    })
  })

  it('shows error message if sign in request returns error', async () => {
    signUpApi.signUp.mockRejectedValue()

    createStore()
    createComponent()

    await wrapper.find('[data-test-id="submit-button"]').trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('There was an error submitting your information.')
  })
})
