export const signUpApi = {
  signUp: (api, payload) => api.post('users', payload).then(({ data }) => data)
}
