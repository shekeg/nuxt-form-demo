<template>
  <div
    class="fixed inset-0 h-full w-full flex justify-center items-center bg-black bg-opacity-20 overflow-auto"
    @click.self="$emit('on-close-modal')"
  >
    <div class="max-h-full w-full lg:w-1/2">
      <form class="p-9 bg-white rounded" @submit.prevent="handleSubmit">
        <div class="lg:flex">
          <div class="p-3 flex-1">
            <h2 class="text-blue-400 font-bold text-2xl">
              Personal Info
            </h2>
            <ContactInfoFields
              class="mt-4"
              :first-name="form.firstName"
              :last-name="form.lastName"
              :email="form.email"
              :phones="form.phones"
              @on-update-field="(field, value) => form[field] = value"
            />
          </div>
          <div class="p-3 flex-1 lg:border-l">
            <h2 class="text-blue-400 font-bold text-2xl">
              Membership
            </h2>
            <MembershipFields
              class="mt-7"
              :membership-type="form.membershipType"
              @on-update-field="(field, value) => form[field] = value"
            />
          </div>
        </div>
        <div class="mt-6 flex flex-col">
          <button
            class="button"
            type="button"
            @click="$emit('on-close-modal')"
          >
            Cancel
          </button>
          <button class="mt-5 button --accent">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ContactInfoFields from '~/components/shared/components/ContactInfoFields'
import MembershipFields from '~/components/shared/components/MembershipFields'

export default {
  name: 'UpdateInfoModal',
  components: {
    ContactInfoFields,
    MembershipFields
  },
  data () {
    const formStateJson = JSON.stringify(this.$store.state.form)
    const formStateCopy = JSON.parse(formStateJson)

    return {
      form: {
        ...formStateCopy,
        phones: formStateCopy.phones.length
          ? formStateCopy.phones
          : [{ type: 'home', value: '' }]
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$emit('on-update-form', {
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        email: this.form.email,
        phones: this.form.phones.filter(phone => phone.value),
        membershipType: this.form.membershipType
      })
      this.$emit('on-close-modal')
    }
  }
}
</script>
