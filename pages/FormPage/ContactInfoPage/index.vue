<template>
  <form class="form-step" @submit.prevent="handleSubmit">
    <h1 class="form-step__title">
      Personal Info
    </h1>
    <ContactInfoFields
      class="mt-9"
      :first-name="form.firstName"
      :last-name="form.lastName"
      :email="form.email"
      :phones="form.phones"
      @on-update-field="(field, value) => form[field] = value"
    />
    <button class="mt-7 w-full button --accent">
      Continue
    </button>
  </form>
</template>

<script>
import ContactInfoFields from '~/components/shared/components/ContactInfoFields.vue'

export default {
  name: 'ContactInfoPage',
  components: {
    ContactInfoFields
  },
  asyncData ({ store }) {
    return {
      form: {
        firstName: store.state.form.firstName,
        lastName: store.state.form.lastName,
        email: store.state.form.email,
        phones: store.state.form.phones.length
          ? store.state.form.phones
          : [{ type: 'home', value: '' }]
      }
    }
  },
  methods: {
    handleSubmit () {
      const payload = {
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        email: this.form.email,
        phones: this.form.phones.filter(phone => phone.value)
      }

      this.$store.dispatch('updateForm', payload)

      this.$router.push({ name: 'membership' })
    }
  }
}
</script>
