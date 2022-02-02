<template>
  <form class="form-step" @submit.prevent="handleSubmit">
    <h1 class="form-step__title">
      Membership
    </h1>
    <MembershipFields
      class="mt-11"
      :membership-type="form.membershipType"
      @on-update-field="(field, value) => form[field] = value"
    />
    <div class="mt-6 flex flex-col">
      <button
        class="button"
        type="button"
        @click="$router.push({ name: 'contact-info' })"
      >
        Back
      </button>
      <button class="mt-5 button --accent">
        Continue
      </button>
    </div>
  </form>
</template>

<script>
import MembershipFields from '~/components/shared/components/MembershipFields'

export default {
  name: 'MembershipPage',
  components: {
    MembershipFields
  },
  asyncData ({ store }) {
    return {
      form: {
        membershipType: store.state.form.membershipType
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$store.dispatch('updateForm', { membershipType: this.form.membershipType })

      this.$router.push({ name: 'overview' })
    }
  }
}
</script>
