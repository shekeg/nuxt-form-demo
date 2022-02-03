import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

import ContactInfoPage from '~/pages/FormPage/ContactInfoPage'

const localVue = createLocalVue()

localVue.use(Vuex)

const mockRouter = {
  push: jest.fn()
}

const mockActions = {
  updateForm: jest.fn()
}

describe('ContactInfoPage', () => {
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
    wrapper = shallowMount(ContactInfoPage, {
      data () {
        return {
          form: {
            firstName: '',
            lastName: '',
            email: '',
            phones: [{ type: 'home', value: '' }]
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

  it('dispatches "updateForm" with filled data if submit is triggered', async () => {
    createStore()
    createComponent()
    wrapper.setData({ ...wrapper.vm.$options.asyncData({ store }) })

    const contactInfoComponent = wrapper.find('contactinfofields-stub')
    await contactInfoComponent.vm.$emit('on-update-field', 'firstName', 'firstNameMock')
    await contactInfoComponent.vm.$emit('on-update-field', 'lastName', 'lastNameMock')
    await contactInfoComponent.vm.$emit('on-update-field', 'email', 'emailMock@example.com')
    await contactInfoComponent.vm.$emit('on-update-field', 'phones', [{ type: 'home', value: '+77777777777' }])

    await wrapper.find('form').trigger('submit')

    expect(mockActions.updateForm).toHaveBeenCalled()
    expect(mockActions.updateForm.mock.calls[0][1]).toEqual({
      firstName: 'firstNameMock',
      lastName: 'lastNameMock',
      email: 'emailMock@example.com',
      phones: [{ type: 'home', value: '+77777777777' }]
    })
  })

  it('dispatches "updateForm" without empty phones if submit is triggered', async () => {
    createStore()
    createComponent()
    wrapper.setData({ ...wrapper.vm.$options.asyncData({ store }) })

    const contactInfoComponent = wrapper.find('contactinfofields-stub')
    await contactInfoComponent.vm.$emit('on-update-field', 'phones', [
      { type: 'home', value: '+77777777777' },
      { type: 'work', value: '+88888888888' },
      { type: 'mobile', value: '' },
      { type: 'other', value: '' }
    ])

    await wrapper.find('form').trigger('submit')

    expect(mockActions.updateForm).toHaveBeenCalled()
    expect(mockActions.updateForm.mock.calls[0][1]).toMatchObject({
      phones: [
        { type: 'home', value: '+77777777777' },
        { type: 'work', value: '+88888888888' }
      ]
    })
  })
})
