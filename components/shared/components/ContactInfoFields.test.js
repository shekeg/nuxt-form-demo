import { shallowMount } from '@vue/test-utils'

import ContactInfoFields from './ContactInfoFields'

describe.only('ContactInfoFields', () => {
  let wrapper = null

  const createComponent = (options) => {
    wrapper = shallowMount(ContactInfoFields, {
      propsData: {
        firstName: '',
        lastName: '',
        email: '',
        phones: [{ type: 'home', value: '' }]
      },
      ...options
    })
  }

  beforeEach(() => { jest.clearAllMocks() })

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy()
      wrapper = null
    }
  })

  it('emits "on-update-field" if "Add phone" is clicked', async () => {
    createComponent()

    await wrapper.find('[data-test-id="add-phone-button"]').trigger('click')

    expect(wrapper.emitted()['on-update-field'][0]).toEqual([
      'phones',
      [{ type: 'home', value: '' }, { type: 'work', value: '' }]
    ])
  })

  it('should disable already selected phone types', () => {
    createComponent({
      propsData: {
        firstName: '',
        lastName: '',
        email: '',
        phones: [
          { type: 'home', value: '' },
          { type: 'work', value: '' },
          { type: 'mobile', value: '' }
        ]
      }
    })

    expect(wrapper.find('option[value="home"]').attributes().disabled).toBeTruthy()
    expect(wrapper.find('option[value="work"]').attributes().disabled).toBeTruthy()
    expect(wrapper.find('option[value="mobile"]').attributes().disabled).toBeTruthy()
  })
})
