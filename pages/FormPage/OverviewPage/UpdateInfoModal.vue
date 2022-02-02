<template>
  <div class="fixed inset-0 lg:flex lg:items-center lg:justify-center overflow-auto">
    <div class="fixed inset-0 bg-gray-900 opacity-20" @click="$emit('on-close-modal')" />
    <form class="p-9 w-full relative z-10 lg:w-1/2 bg-white rounded" @submit.prevent="handleSubmit">
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
  props: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phones: {
      type: Array,
      required: true
    },
    membershipType: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      form: {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phones: this.phones.length
          ? this.phones
          : [{ type: 'home', value: '' }],
        membershipType: this.membershipType
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
