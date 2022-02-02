export const state = () => ({
  form: {
    firstName: null,
    lastName: null,
    email: null,
    phones: null,
    membershipType: null
  }
})

const DEFAULTS = {
  firstName: '',
  lastName: '',
  email: '',
  phones: [{ type: 'home', value: '' }],
  membershipType: 'regular'
}

export const mutations = {
  updateForm (state, userForm) {
    state.form = {
      ...state.form,
      ...userForm
    }
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { app }) {
    const userFormCookie = app.$cookies.get('user-form')
    if (userFormCookie) {
      commit('updateForm', {
        firstName: userFormCookie.firstName || DEFAULTS.firstName,
        lastName: userFormCookie.lastName || DEFAULTS.lastName,
        email: userFormCookie.email || DEFAULTS.email,
        phones: userFormCookie.phones || DEFAULTS.phones,
        membershipType: userFormCookie.membershipType || DEFAULTS.membershipType
      })
    } else {
      commit('updateForm', DEFAULTS)
    }
  },
  updateForm ({ state, commit }, payload) {
    const userForm = {
      ...state.form,
      ...payload
    }

    this.$cookies.set('user-form', userForm)

    commit('updateForm', userForm)
  },
  resetForm ({ commit }) {
    this.$cookies.set('user-form', DEFAULTS)

    commit('updateForm', DEFAULTS)
  }
}
