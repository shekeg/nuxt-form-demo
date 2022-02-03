<template>
  <div class="form-step">
    <h1 class="form-step__title">
      Overview:
    </h1>
    <div style="min-height: 420px">
      <table class="mt-8 w-full text-lg">
        <tbody>
          <tr>
            <td class="w-5/12 font-bold">
              First name:
            </td>
            <td>{{ form.firstName }}</td>
          </tr>
          <tr>
            <td class="w-5/12 font-bold">
              Last name:
            </td>
            <td>{{ form.lastName }}</td>
          </tr>
          <tr>
            <td class="w-5/12 font-bold">
              E-mail:
            </td>
            <td>{{ form.email }}</td>
          </tr>
          <tr>
            <td class="w-5/12 font-bold">
              Membership:
            </td>
            <td class="capitalize">
              {{ form.membershipType }}
            </td>
          </tr>
          <tr v-for="(phone, index) in form.phones" :key="index">
            <td class="w-5/12 font-bold">
              <span class="capitalize">
                {{ phone.type }}
              </span>
              Phone:
            </td>
            <td>{{ phone.value }}</td>
          </tr>
        </tbody>
      </table>
      <button class="text-lg font-bold text-blue-400" @click="isUpdateInfoModalVisible = true">
        Edit
      </button>
    </div>
    <div class="mt-6 flex flex-col">
      <button
        class="button"
        type="button"
        @click="$router.push({ name: 'membership' })"
      >
        Back
      </button>
      <button class="mt-5 button --accent" data-test-id="submit-button" @click="handleSubmit">
        Submit
      </button>
      <p v-if="errorMessage" class="mt-6 p-2 bg-red-100 border border-red-400 text-red-500 rounded">
        {{ errorMessage }}
      </p>
    </div>
    <UpdateInfoModal
      v-if="isUpdateInfoModalVisible"
      @on-update-form="handleUpdateForm"
      @on-close-modal="isUpdateInfoModalVisible = false"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import UpdateInfoModal from './UpdateInfoModal'
import { signUpApi } from './services/sign-up-api'

export default {
  name: 'OverviewPage',
  components: {
    UpdateInfoModal
  },
  data () {
    return {
      isUpdateInfoModalVisible: false,
      errorMessage: null
    }
  },
  computed: mapState({ form: 'form' }),
  methods: {
    handleUpdateForm (payload) {
      this.$store.dispatch('updateForm', payload)
    },
    handleSubmit () {
      this.errorMessage = null

      signUpApi.signUp(this.$axios, this.form)
        .then(() => {
          this.$store.dispatch('resetForm')
          this.$router.push({ name: 'success' })
        })
        .catch(() => {
          this.errorMessage = 'There was an error submitting your information.'
        })
    }
  }
}
</script>

<style scoped>
td {
  @apply pb-4;
}
</style>
