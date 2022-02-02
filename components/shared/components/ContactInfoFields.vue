<template>
  <div class="flex flex-col">
    <label class="flex flex-col">
      <span class="text-lg">First name</span>
      <input
        type="text"
        class="mt-1 input"
        name="first_name"
        :value="firstName"
        required
        @input="$emit('on-update-field', 'firstName', $event.target.value)"
      >
    </label>
    <label class="mt-5 flex flex-col">
      <span class="text-lg">Last name</span>
      <input
        type="text"
        class="mt-1 input"
        name="last_name"
        :value="lastName"
        required
        @input="$emit('on-update-field', 'lastName', $event.target.value)"
      >
    </label>
    <label class="mt-5 flex flex-col">
      <span class="text-lg">E-mail</span>
      <input
        type="email"
        class="mt-1 input"
        name="email"
        :value="email"
        required
        @input="$emit('on-update-field', 'email', $event.target.value)"
      >
    </label>
    <label class="mt-5 flex flex-col">
      <span class="text-lg">Phone</span>
      <div v-for="(phone, index) in phones" :key="`${phone.type}-${index}`" class="mt-1 flex">
        <select class="px-2 capitalize rounded-l" required @change="updatePhoneType(index, $event.target.value)">
          <option
            v-for="(phoneType) in $options.PHONE_TYPES"
            :key="phoneType"
            :disabled="!allowedPhoneTypesDict[phoneType]"
            :value="phoneType"
            :selected="phone.type === phoneType"
          >
            {{ phoneType }}
          </option>
        </select>
        <input
          type="tel"
          class="w-full input"
          style="border-radius: 0; border-top-right-radius: 4px; border-bottom-right-radius: 4px;"
          name="phone"
          :value="phone.value"
          @input="updatePhoneValue(index, $event.target.value)"
        >
      </div>
    </label>
    <button
      v-if="hasAllowedPhoneTypes"
      type="button"
      class="mt-6 self-start text-lg font-medium text-blue-400"
      @click="addPhoneField"
    >
      + Add phone
    </button>
  </div>
</template>

<script>
export default {
  name: 'ContactInfoFields',
  PHONE_TYPES: [
    'home',
    'work',
    'mobile',
    'main',
    'other'
  ],
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
    }
  },
  computed: {
    allowedPhoneTypesDict () {
      return this.$options.PHONE_TYPES.reduce((dict, type) => {
        if (this.phones.every(phone => phone.type !== type)) {
          dict[type] = true
        }
        return dict
      }, {})
    },
    hasAllowedPhoneTypes () {
      return !!Object.keys(this.allowedPhoneTypesDict).length
    }
  },
  methods: {
    addPhoneField () {
      const firstAllowedPhoneType = this.$options.PHONE_TYPES.find(type => this.allowedPhoneTypesDict[type])

      if (firstAllowedPhoneType !== undefined) {
        this.$emit('on-update-field', 'phones', [
          ...this.phones,
          {
            type: firstAllowedPhoneType,
            value: ''
          }
        ])
      }
    },
    updatePhoneType (index, newPhoneType) {
      this.$emit(
        'on-update-field',
        'phones',
        this.phones.map((phone, i) => i === index ? { ...phone, type: newPhoneType } : phone)
      )
    },
    updatePhoneValue (index, value) {
      this.$emit(
        'on-update-field',
        'phones',
        this.phones.map((phone, i) => i === index ? { ...phone, value } : phone)
      )
    }
  }
}
</script>
